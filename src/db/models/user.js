'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: DataTypes.STRING,
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Pet,{
      as: 'Pets',
      through: 'owners_pets',
      foreignKey: 'userId'
    })
  };
  return User;
};