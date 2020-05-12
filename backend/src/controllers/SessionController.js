const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

const { User } = require('../database/models');
const generateToken = require('../utils/generateToken');

module.exports = {
  async authenticate(req, res) {

    const { username, password } = req.body;    
    

    // eslint-disable-next-line max-len
    const user = await User.findOne({ where: { username }});

    if(!user) return res.status(404).send('wrong crendentials');
    if(await bcrypt.compare(password, user.password) === false) return res.status(404).send('wrong crendentials');

    return res.status(200).json({
      token: generateToken({ id: user.id }),
      user,
    }).send();
  },
};
