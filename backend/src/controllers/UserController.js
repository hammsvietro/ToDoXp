const bcrypt = require('bcryptjs');

const { User } = require('../database/models');
const generateToken = require('../utils/generateToken');

module.exports = {

  async create(req, res) {
    const {
      username,
      prePassword,
      email,
    } = req.body;


    const user = await User.create({
      username,
      prePassword,
      email,
    });

    if (!user) return res.status(500).send({ error: 'problem creating user, try again later' });

    user.prePassword = undefined;
    user.password = undefined;

    return res.status(200).send({
      user,
      token: generateToken({ id: user.id }),
    });
  },


  async get(req, res) {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if(user) return res.status(200).send(user);

    return res.status(400).send({ error: 'user not found' });

  },

  async getTopUsers(req, res) {

    const users = await User.findAll({
      limit: 10,
      order: [
        ['level', 'desc'],
        ['xp', 'desc'],
      ],
      attributes: ['username', 'level', 'xp'],
    });

    return res.status(200).send(users);

  },

  async changePassword(req, res) {
    
    const { userId } = req.params;

    const { oldPassword, newPassword, newPasswordConfirm } = req.body;
    

    if(newPassword !== newPasswordConfirm) return res.status(406).send({ error: 'passwords didnt match' });

    const user = await User.findByPk(userId);

    
    if(await bcrypt.compare(oldPassword, user.password) === false) return res.status(401).send({ error: 'wrong password' });


    user.password = await bcrypt.hash(newPassword, 8);

    
    await user.save();

    return res.status(200).send('success');

  },

};
