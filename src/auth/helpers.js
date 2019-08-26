var jwt = require('jsonwebtoken');
const {getUser} = require("../db/queries.users.js");

module.exports = {
    ensureToken(req, res, next) {
        const bearerHeader = req.headers["authorization"];

        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];

            req.token = bearerToken;
            
            jwt.verify(req.token, 'token', function(err, data) {
                if(err){
                    res.json({"err":err})
                }
                else{
                    getUser(data, (err,user)=>{
                        if(err){
                            res.json({"err": err})
                        }
                        else{
                            next(user)
                        }
                    })
                }
            })
        } else {
            res.sendStatus(403);
        }
    }
}