'use strict';
let bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please fill in all fields' },
        notEmpty: { msg: 'Please fill in all fields' },
        len: {
          args: 6,
          msg: 'Password must be at least 6 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    }, sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Task, { foreignKey: 'userId' })
  };
  return User;
};