'use strict';
module.exports = (sequelize, DataTypes) => {
  const owners_pets = sequelize.define('owners_pets', {
    userId: DataTypes.INTEGER,
    petId: DataTypes.INTEGER
  }, {});
  owners_pets.associate = function(models) {
    // associations can be defined here
  };
  return owners_pets;
};