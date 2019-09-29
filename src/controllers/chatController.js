const chatQueries = require("../db/queries.chat.js");

module.exports = {
    new(req, res, next){
        chatQueries.sendMessage(req.user, req.body, req.params.id ,(err, msg)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(msg)
            }
        })
    },
    index(req,res,next){
        chatQueries.getAllRooms(req.user, (err,chats)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(chats)
            }
        })
    },
    show(req,res,next){
        chatQueries.getMessages(req.params.id, (err,msgs)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(msgs)
            }
        })
    },

    destroy(req,res,next){
        chatQueries.leaveRoom(req.user, req.params.id, (err,msgs)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json({success:'ay'})
            }
        })
    }
}