const { Todo, User } = require('../database/models');

const { xpByTask, levelXp } = require('../utils/xpLogic');

module.exports = {
  async create(req, res) {
    const { userId } = req.params;

    const {
      title,
      body,
      difficulty,
    } = req.body;

    const todo = await Todo.create({ userId, title, body, difficulty });

    if(!todo) return res.status(500).send({ error: `something went wrong, try again later` });

    return res.status(200).send(todo);
  },

  async index(req, res) {
    const { userId } = req.params;

    const todos = await Todo.findAll({ where: {
      userId,
    } });

    if(!todos) return res.status(500).send({ error: 'user not found' });

    return res.status(200).send(todos);
  },

  async markAsDone(req, res) {
    const { userId, todoId } = req.params;

    const todo = await Todo.findByPk(todoId);

    if(!todo) return res.status(404).send({ error: 'user not found' });
    
    const gainedXp = xpByTask[todo.difficulty];
    
    const user = await User.findByPk(userId);

    const currentLevel = user.level;
    const currentXp = user.xp;

    if(currentLevel > 6) { // max level scenario
      
      user.xp = currentXp + gainedXp;

      if(user.xp > levelXp.max) user.xp = levelXp.max; 

    } else { // level up and append rest to xp;

      user.xp = currentXp + gainedXp;
      while(user.xp >= levelXp[user.level]) {
        user.level += 1;
        user.xp -= levelXp[user.level - 1];
      }

    }

    await todo.destroy();
    await user.save();

    return res.status(400).send('success');

  },
  
};
