const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    prePassword: DataTypes.VIRTUAL,
    email: DataTypes.STRING,
    xp: DataTypes.INTEGER,
    level: DataTypes.INTEGER,


  }, {
    hooks: {
      beforeCreate: async (user) => {
        if(user.prePassword) {
          user.password = await bcrypt.hash(user.prePassword, 8);
        }
      },
    },

  });
  User.associate = (models) => {
    User.hasMany(models.Todo, {
      foreignKey: 'userId',
      as: 'todo',
    });
  };
  return User;
};
