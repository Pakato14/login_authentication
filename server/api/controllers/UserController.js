const db = require("../models");
require ('dotenv').config()

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const Op = db.Sequelize.Op;

class UserController {

    static async registerUser(req, res){
        const newUser = req.body;
        console.log('newUser', newUser)
        const salt = await bcrypt.genSalt(8)
        const hashedPassword = await bcrypt.hash(newUser.password, salt)
        newUser.password = hashedPassword

        try {
            const user = await db.User.create(newUser)
            const result = await user.save()
            const { password, ...data  } = await result.toJSON()
            res.send(data)
            
        } catch (error) {
            return res.status(500).json(error.message)
            
        }
    }

    static async getUser(req, res){        
        try{
            const cookie = req.cookies['jwt']
            const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN)
            if(!claims){
                return res.status(401).send({message: 'User not authenticated!'})
            }
            const getUser = await db.User.findAll({
                order: ["username"],
                attributes: ["id","username", "email", "profile_id"],
                include: [
                    {
                        association: "ass_profile",
                        where: db.User.profile_id = db.Role.id,
                        attributes: ["name"]
                    }
                ]
            })
            return res.status(200).json(getUser)
        }
        catch (error){
            return res.status(500).json({message: 'User not authenticated!'})
        }
    }

    static async login(req, res) {
        const user = req.body;
        console.log('user', user)
        try{
            const lookUser = await database.users.findOne({
                where: { email: user.email }
            })
            if(!lookUser){
                return res.status(404).send({ message: 'User not found!'})
            }
            if(!await bcrypt.compare(user.password, lookUser.password )){
                return res.status(400).send({ message: 'Invalid credentials!'})
            }

            const token = jwt.sign({_id:lookUser._id}, process.env.ACCESS_TOKEN)
            //console.log('token', token)

            res.cookie('jwt', token, {
                httpOnly:true,
                maxAge: 24*60*60*1000
            })
            res.send({ message: 'User logged in successfully!' })
            //res.send(verificaUserEmail)
            //return res.status(200).json(verificaUserEmail)
        }catch(error){
            res.send({ message: 'Problems logging in!' })
            //return res.status(500).json(error.message)
        }        
    }

    static async authenticatedUser(req, res){
        try{
            const cookie = req.cookies['jwt']

            const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN)

            if(!claims){
                return res.status(401).send({message: 'User not authenticated!'})
            }

            const user = await db.User.findOne({
                where: {id: claims._id},
                attributes: ["id","username", "email", "profile_id"]
            })

            const { password, ...data } = await user.toJSON()
            res.send(data)

        }catch(error){
            return res.status(401).send({message: 'User not authenticated!'})

        }
        
    }

    static async logout(req, res){
        res.cookie('jwt', '', {maxAge: 0})
        res.send({ message: 'Logout Success!'})
    }

}

module.exports = UserController
