'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    gender: {
      allowNull: false,
      type: DataTypes.STRING
    },
    tag: {
      unique: true,
      type: DataTypes.STRING
    },
    description: DataTypes.STRING
  }, {});
  Pet.associate = function(models) {
    // associations can be defined here
    Pet.belongsToMany(models.User,{
      as: 'Owners',
      through: 'owners_pets',
      foreignKey: 'petId'
    })
  };
  return Pet;
};