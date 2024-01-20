const db = require("../models");

class VerifySignUp {

    checkDuplicateUsernameOrEmail = async (req, res, next) => {
        try{
            let user = await db.User.findOne({
                where: {
                    username: req.body.username
                }
            });
            if(user) {
                return res.status(400).send({
                    message: "Failed Username is already in use!"
                })
            }
    
            user = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            });
            if(user) {
                return res.status(400).send({
                    message: "Failed Email is already in use!"
                })
            }
    
            next();        
        } catch (error){
            return res.status(500).send({
                message: "Unable to validate Username!"
            });
        }
    };
    
    checkRolesExisted = (req, res, next) =>{
        if(req.body.roles){
            for (let i=0; i< req.body.roles.length; i++){
                if(!Role.includes(req.body.roles[i])){
                    res.status(400).send({
                        message: "Failed! Role does not exist = " +req.body.roles[i]
                    });
                    return
                }
            }
        }
    
        next();
    }
}

module.exports = VerifySignUp