var jwt = require('jsonwebtoken');
const {getUser} = require("../db/queries.users.js");
const owners_pets = require("../db/models").owners_pets;
const Pet = require("../db/models").Pet;
const bcrypt = require("bcryptjs");


module.exports = {
    ensureToken(req, res, next) {
        const bearerHeader = req.headers["authorization"];

        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            const token = bearer[0];
            const bearerToken = bearer[1];

            if(token == 'token'){
                req.token = bearerToken;
                
                jwt.verify(req.token, process.env.SECRET, function(err, data) {
                    if(err){
                        res.json({"err":err})
                    }
                    else{
                        getUser(data, (err,user)=>{
                            if(err){
                                res.json({"err": err})
                            }
                            else{
                                req.user = user
                                next()
                            }
                        })
                    }
                })
            }
            else{
                res.sendStatus(403);
            }
        } 
        else {
            res.sendStatus(403);
        }
    },

    comparePass(userPassword, databasePassword) {
        return bcrypt.compareSync(userPassword, databasePassword);
    },

    signToken(user){
        let {id,email} = user
        return jwt.sign({id,email}, process.env.SECRET);
    },

    ensureAPIKey(req, res, next){
        const apiKey = req.headers["apikey"];

        if(apiKey !== process.env.APIKEY){
            res.sendStatus(401)
        }
        else{
            next()
        }
    },

    ensurePet(req, res, next){
        Pet.findAll({
            where: {
              tag: req.params.tag
            }
        })
        .then((pet)=>{
            let currentPet = pet[0]
            
            owners_pets.findAll({
                where:{
                  userId: req.user.id,
                  petId: currentPet.id                }
              })
            .then((isOwner)=>{
                if(isOwner.length){
                    req.pet = currentPet
                    next()
                }
                else{
                    res.sendStatus(401)
                }
            })
        })
        .catch(err=>{
            res.json({"err":err})
        })
    }
}