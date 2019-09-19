const Pet = require("./models").Pet;
const owners_pets = require("./models").owners_pets;

const shortId = require("./helpers/shortid.js");
const shrinkName = require("./helpers/shrink.js");

module.exports = {
  getAllPets(user, callback){
    return user.getPets()
    .then((pet) => {
      callback(null, pet);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addPet(user, pet, callback){
    let returnedPet;

    return user.createPet({
        name: pet.name,
        gender: pet.gender
    })
    .then((pet)=>{
      return pet.update(
        {tag: createTag(pet.name, pet.id)},
        {returning: true}
      )
    })
    .then((newPet)=>{
      returnedPet = newPet;
      return activateUser(user,newPet)
    })
    .then(()=>{
      callback(null,returnedPet)
    })
    .catch((err) => {
      callback(err)
    })
  },

  getPet(pet,callback){
    let foundPet;

    return Pet.findAll({
      where: {
        tag: pet.tag
      }
    })
    .then((pet)=>{
      foundPet = pet[0];
      return foundPet.getOwners();
    })
    .then(owners=>{
      callback(null,{foundPet,owners})
    })
    .catch(err => {
      callback(err)
    })
  },

  destroyPet(user, pet, callback){
    return user.removePet(pet.id)
    .then(()=>{
      callback(null)
    })
    .catch(err=>{
      callback(err)
    })
  },

  addUser(user, pet, callback){
    return pet.addOwner(user)
    .then(user=>{
      callback(null, user)
    })
    .catch(err=>{
      callback(err)
    })
  }
}

function activateUser(user,pet){
  return owners_pets.unscoped().update(
    {active: 1},
    {returning: true, where: {
      petId: pet.id,
      userId: user.id
    }}
  )
}

function createTag(name, id){
  return `${shrinkName(name)}-${shortId.generateId(id)}`
}