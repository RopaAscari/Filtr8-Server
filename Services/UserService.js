const userDb = require('../Database/UserDb');
const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;

router.get('/all', async  (req, res)=> {
    try{
     const users = await userDb.getUser();
     if(users != null){
        console.log(' Users retrieved!');
        res.send(users);
     }else{
        console.log(' Users not retrieved');
        res.send(' Users not retrieved');
     }
     }catch(err)
     {
         console.error(err);
         console.log('Controller Exception: Cannot get users');
         console.log('Exception: Cannot get users');

     }
})

router.post('/add',async (req,res)=>{
    try{
        const clientUser = req.body;
        const token = await userDb.addUser(clientUser);
        if (token)
        {
            console.log("user added successfully");
            return res.status(201).send({ auth: true, token: token })
        }
        else{
            return res.status(400).send({ auth: false, token: null })
            console.log("user not added");
        }
    }catch(err)
    {
        console.error(err);
        console.log("Exception: user not added");
        return res.send('Exception: user not added');
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const JSONId = req.params;
        const id = JSONId.id
        const o_id = new ObjectId(id);
        const clientUser = req.body;

        const result = await userDb.updateUser(clientUser,o_id);
        if(result != null)
        {
            res.send('user updated');
            console.log('user updated');
        }else{
            console.log('User entry not found');
            res.send('User entry not found');
        }
    }catch(error){
        console.error(error);
        console.log('Controller Exception: user not updated');
        res.send('Exception: user not updated');
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const JSONId = req.params;
        const id = JSONId.id
        const o_id = new ObjectId(id);
        const result = await userDb.deleteUser(o_id);
        if(result == 1)
        {
            res.send('User deleted successfully');
            console.log('User deleted successfully');
        }else{
            console.log('User not deleted');
            res.send('User not deleted');
        }
    }catch(error){
        //console.error(error);
        console.log('Controller Exception: User not deleted ');
        res.send('Exception: User not deleted');
    }
})

router.get('/:_id', async (req,res)=>{
    try{
        const JSONId = req.params;
        const id = JSONId._id
        const o_id = new ObjectId(id);
        const result = await userDb.getById(o_id);                ;
        if(result != null)
        {
            res.send(result);
            console.log('User found!');
        }else{
            res.send('User not found!');
            console.log('User not found!');
        }
    }catch(error)
    {
        console.error(error);
        console.log('Controller Exception: Cannot get user by id');
        res.send(' Exception: Cannot get user');
    }
})


router.get('/username/:user', async (req,res)=>{
    try{
        const userNameObject = req.params;
        const username =  userNameObject.user;
        const result = await userDb.getByUsername(username);
        if(result != null)
        {
            res.send(result);
            console.log('User found!');
        }else{
            res.send('User not found!');
            console.log('User not found!');
        }
    }catch(error)
    {
        console.error(error);
        console.log('Controller Exception: Cannot get User by username`');
        res.send('Exception: Cannot get User by username');
    }
})


router.post('/login',async (req,res)=>{
    try{
        const clientUser  = req.body;
        const username = clientUser.username;
        const serverUser = await userDb.getByUsername(username)
        console.log('The record',serverUser);

        if (serverUser == null)
        {
            console.log('User does not exist');
            res.send('User does not exist');
        }else{
            const  hash = serverUser.password;
            console.log(hash);

            const  plainTextPassword = clientUser.password;
            const result = await bcrypt.compare(plainTextPassword,hash);
            const secret = process.env.accessToken;
            const token = jwt.sign({_id:serverUser._id, username :serverUser.username },secret)
            if(result)
                {
                    console.log('User authenticated');
                    return res.status(201).send({auth: true, token: token});
                }else{
                    console.log('Incorrect password');
                    return res.status(201).send({auth: false, token: null});
                }
        }
        }catch(err){
            console.log('Controller Exception: cannot authenticate');
            console.error(err);
            return res.send('Cannot Authenticate');
        }
    })
    

module.exports = router;
