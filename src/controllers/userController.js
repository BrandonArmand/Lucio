const userQueries = require("../db/queries.users.js");
const {signToken} = require("../auth/helpers.js")

module.exports = {
    new(req, res, next){
        userQueries.createUser(req.query, (err,user)=>{
            if(err){
                res.json({"err":err})
            }
            else{
                let token = signToken(user)

                res.json({token: token})
            }
        })
    },
    update(req,res,next){
        userQueries.updateInfo(req.user, req.query, (err,user)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(user)
            }
        })
    },
    index(req,res,next){
        userQueries.getAllUsers((err,users)=>{
            if(err){
                res.json({"err":err})
            }
            else{
                res.json(users)
            }
        })
    },
    show(req,res,next){
        userQueries.getUser(req.user,(err,user)=>{
            if(err){
                res.sendStatus(403);
            }
            else{
                res.json(user)
            }
        })
    },
    signIn(req,res,next){
        let token = signToken(req.user)

        res.json({token: token})
    }
}