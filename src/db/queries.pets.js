const Pet = require("./models").Pet;
const owners_pets = require("./models").owners_pets;
const chatUsers = require("./models").chat_room_user;
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

    return getPetFromTag(pet.tag)
    .then((pet)=>{
      foundPet = pet
      return pet.getOwners();
    })
    .then(owners=>{
      callback(null,{Pet:foundPet,owners})
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
  },

  acceptPet(user, tag, callback){
    return getPetFromTag(tag)
    .then((pet)=>{
      activateUser(user, pet)
    })
    .then((association)=>{
      callback(null,association)
    })
    .catch((err)=>{
      callback(err)
    })
  },

  declinePet(user, tag, callback){
    return getPetFromTag(tag)
    .then((pet)=>{
      user.removePet(pet.id)
    })
    .then(()=>{
      callback(null)
    })
    .catch((err)=>{
      callback(err)
    })
  },

  getPendingPets(user,callback){
    return Pet.sequelize.query(`
      SELECT "Pets"."name", "Pets"."tag" 
      FROM "Pets" 
        inner join "owners_pets" 
          on "Pets"."id" = "owners_pets"."petId" 
      where "owners_pets"."userId" = ? and "active" = 0`, 
      { 
        replacements: [user.id],
        type: Pet.sequelize.QueryTypes.SELECT
      })
    .then(pets=>{
      callback(null,pets)
    })
    .catch(err=>{
      callback(err)
    })
  },

  createChat(currentUser, tag, callback){
    let currentPet;
    let chatRoom;

    return getPetFromTag(tag)
    .then((pet)=>{
      currentPet = pet
      return currentPet.createChat()
    })
    .then(chat=>{
      chatRoom = chat
      return currentPet.getOwners();
    })
    .then(owners=>{
      let userArray = []
      owners.forEach(user => {
        userArray.push({
          userId: user.id,
          roomId: chatRoom.id,
          active: 1
        }) 
      });
      userArray.push({
        userId: currentUser.id,
        roomId: chatRoom.id,
        active: 1
      })
      return chatUsers.bulkCreate(userArray)
    })
    .then(chat=>{
      callback(null,chat)
    })
    .catch(err=>{
      callback(err)
    })
  }
}

function getPetFromTag(tag){
  return Pet.findAll({
    where: {
      tag: tag
    }
  })
  .then(pet=>{
    return pet[0]
  })
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