const userQueries = require("../db/queries.users.js");
var jwt = require('jsonwebtoken');
const auth = require("../auth/helpers.js")
const passport = require("passport");

module.exports = {
    new(req, res, next){
        userQueries.createUser(req.query, (err,user)=>{
            if(err){
                res.json({"err":err})
            }
            else{
                let token = auth.signToken(user)

                res.json({token: token})
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
    // show(req,res,next){
    //     auth.ensureToken(req,res, (user)=>{
    //         userQueries.getUser(user,(err,user)=>{
    //             if(err){
    //                 res.sendStatus(403);
    //             }
    //             else{
    //                 res.json(user)
    //             }
    //         })
    //     })
    // },
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
        let token = auth.signToken(req.user)

        res.json({token: token})
    }
}