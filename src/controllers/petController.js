const petQueries = require("../db/queries.pets.js");

module.exports = {
    index(req, res, next){
        petQueries.getAllPets(req.user, (err,pets)=>{
            if(err){
                res.json({"error":err})
            }
            else{
                res.json(pets)
            }
        });
    },
    new(req,res,next){
        petQueries.addPet(req.user,req.query,(err,pet)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(pet)
            }
        })
    },
    show(req,res,next){
        petQueries.getPet(req.params,(err,pet)=>{
            if(err){
                res.json({"err":err})
            }
            else{
                res.json(pet)
            }
        })
    },
    destroy(req,res,next){
        petQueries.destroyPet(req.user, req.pet, (err)=>{
            if(err){
                res.json({"err":err})
            }
            else{
                res.json({"Success":"Pet deleted."})
            }
        })
    }
}