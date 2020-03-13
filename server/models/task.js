'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      validate: {
        customValidator(value) {
          if (value === null || value === '') {
            throw new Error("title tidak boleh kosong")
          }
        }
      }
    },
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Task;
};