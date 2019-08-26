const User = require("./models").User;
const bcrypt = require("bcryptjs");

module.exports = {
  createUser(newUser, callback){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      email: newUser.email,
      password: hashedPassword,
      name: newUser.name
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getAllUsers(callback){
    return User.findAll()
    .then((pet) => {
      callback(null, pet);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getUser(user,callback){
    return User.findByPk(user.id)
    .then((user)=>{
      callback(null,user)
    })
    .catch(err => {
      callback(err)
    })
  },
}