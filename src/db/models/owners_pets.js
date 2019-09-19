'use strict';
module.exports = (sequelize, DataTypes) => {
  const owners_pets = sequelize.define('owners_pets', {
    userId: DataTypes.INTEGER,
    petId: DataTypes.INTEGER,
    active:{
       type: DataTypes.INTEGER,
       defaultValue: 0
      }
  }, {
    defaultScope: {
      where: {
        active: 1
      }
    }
  });
  owners_pets.associate = function(models) {
    // associations can be defined here
  };
  return owners_pets;
};