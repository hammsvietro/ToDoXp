module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    difficulty: DataTypes.INTEGER,
  }, {});
  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return Todo;
};
