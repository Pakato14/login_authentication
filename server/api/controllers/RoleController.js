const db = require("../models");
require ('dotenv').config()

class RoleController {

    static async registerRole(req, res){
        const newRole = req.body;
        console.log('newUser', newRole)

        try {
            const user = await db.Role.create(newRole)
            
            return res.status(200).json(newRole)
            
        } catch (error) {
            return res.status(500).json(error.message)
            
        }
    }

    static async getRole(req, res){        
        try{            
            const role = await db.Role.findAll({
                order: ["id"]                
            })
            return res.status(200).json(role)
        }
        catch (error){
            return res.status(500).json(error.message)
        }
    }

}

module.exports = RoleController
