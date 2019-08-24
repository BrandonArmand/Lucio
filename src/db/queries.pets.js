const Pet = require("./models").Pet;

module.exports = {
  getAllPets(callback){
    return Pet.findAll()
    .then((pet) => {
      callback(null, pet);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addPet(newPet, callback){
    return Pet.create({
      name: newPet.name,
      gender: newPet.gender,
      description: newPet.description
    })
    .then((pet) => {
      callback(null, pet);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getPet(pet,callback){
    return Pet.findByPk(pet.id)
    .then((pet)=>{
      callback(null,pet)
    })
    .catch(err => {
      callback(err)
    })
  },
  destroyPet(pet,callback){
    return Pet.destroy({
      where: {id: pet.id}
    })
    .then(()=>{
      callback(null)
    })
    .catch(err=>{
      callback(err)
    })
  }
}