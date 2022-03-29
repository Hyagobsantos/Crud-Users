const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');


const prisma = new PrismaClient();

const validPassword = (password) => {
    if(password.length < 8 || password.length > 200 ){
        return "password must contain at least 8 characters"
    }
}

const routeWelcome = (req,res) => {
    res.json({Message: "Welcome to Contele API"})
}

const getAllUsers = async (req,res) => {

    try{
        const users = await prisma.user.findMany();

        //verify if exists users
        if(!users){
            res.json.status(400).json({message:"Not Found Users"})
        }

        return res.status(200).json(users);

    }catch(error){
        return res.status(500).json({erro:error})
    }
}

const getOneUser = async (req,res) => {
    try {
        const id = parseInt(req.params.user_id)

         const userfound = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

      //verify if exists users
      if(!userfound){
        return res.status(400).json({message:"Not Found Users"})
      }

      return res.status(200).json(userfound)

    } catch (error) {
        return res.status(500).json({erro:error})
    }
}

const createUser = async (req,res) => {
    try {
        const {email,password} = req.body
        const hash = await bcrypt.hash(password, 5);

        //valid password
        let valid = validPassword(password);

        if(valid){
            return res.status(400).json({message: valid})
        }



        //verify if user already registered
        const searchUser = await prisma.user.findUnique({
            where: {
                email:email
            }
        })

        if(searchUser){
            return res.status(400).json({message: "E-mail already registered!"})
        }

        //verify if email contains @
        if(!email.includes('@')){
            return res.stauts(400).json({message: "E-mail must contain '@'"})
        }
    
        //create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hash
            },
        });
    
        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({erro:error})
    }

}   

const updateUser = async (req,res) => {

    try{
        const id = parseInt(req.params.user_id);

        const {email,password} = req.body

         //valid password
         let valid = validPassword(password);

         if(valid){
             return res.status(400).json({message: valid})
         }

        const hash = await bcrypt.hash(password, 5);

        const data = {
            email: email,
            password: hash
        }

        //find user
        const searchUser = await prisma.user.findUnique({
                where: {
                    email:email,
                }
            })

        if(searchUser){
            return res.status(404).json({message: "unable to update, user already exists"})
        }

        //update user
        const result = await prisma.user.update({
            data,
            where:{
                id:id
            }
        })

        //verify situation faliled
        if(!result){
            return res.status(400).json({message: "Failed to update user"})
        }

        return res.status(200).json(result)

    }catch (err){
        res.status(500).json({erro:err});
    }
}

const deleteAllUsers = async (req,res) => {
    try{
        //delete users
        const users = await prisma.user.deleteMany();
        
        return res.status(200).json({message: `were deleted ${parseInt(users['count'])} Users`})
    
    }catch(error){
        return res.status(500).json({erro:error})
    }
}

const deletUser = async (req,res) => {
    try {
        const id = parseInt(req.params.user_id)

         const userfound = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

      //verify if exists users
      if(!userfound){
        return res.status(400).json({message:"Not Found Users"})
      }

     //delete user 
      const user = await prisma.user.delete({
          where:{
              id:id
          }
      })

      //verify if user deleted
      if(!user){
        return res.status(400).json({message: "error deleting user"})
      }
        
        return res.status(200).json({message: "user successfully deleted"})

    } catch (error) {
        return res.status(500).json({erro:error})
    }
}

module.exports =  {
    createUser,
    routeWelcome,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteAllUsers,
    deletUser
} 