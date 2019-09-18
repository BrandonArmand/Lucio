const Pet = require("./models").Pet;
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
    return user.createPet({
        name: pet.name,
        gender: pet.gender
    })
    .then((pet)=>{
        Pet.update(
          {tag: createTag(pet.name, pet.id)},
          {returning: true, where: {id: pet.id}}
        )
        .then(pet=>{
          callback(null,pet[1])
        })
        .catch(err=>{
          callback(err)
        })
    })
    .catch(err => {
        callback(err)
    })
  },

  getPet(pet,callback){
    return Pet.findAll({
      where: {
        tag: pet.tag
      }
    })
    .then((pet)=>{
      pet[0].getOwners()
      .then(owners=>{
        callback(null,{pet,owners})
      })
      .catch(err => {
        callback(err)
      })
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
  }
}

function createTag(name, id){
  return `${shrinkName(name)}-${shortId.generateId(id)}`
}