"use strict";
const con = require('./MongoDb');
const TABLE_NAME = 'Yung_user';
const bcrypt = require('bcryptjs');

let users = [{    
    password: 'secretWord',
    firstName : 'Demar',
    lastName : 'Johnson',
    username : 'YungestLord',    
},
{    
    password: 'sefsetWord',
    firstName : 'Demario',
    lastName : 'Brown',
    username : 'DanDan',    
}]

const initUserDb = async ()=>{
    try{
        const client = await con.connectDb();
        const result = client.collection(TABLE_NAME,(error,res)=>{
            if(error){
                console.log('Cannot connect');
                throw error;
            }else{
                console.log('User collectin live!');                
            }
        });
        return result;
    }catch(err){
        console.log('Database Exception: Cannot connect to User Collection');
        console.error(err);
    }
}

const addUser = async(user)=>{
    try{
        const connect = await initUserDb();        
        const password = user.password;
        const hash = await bcrypt.hash(password,10);
        user.password = hash;
        const secret = process.env.accessToken;
        const token = con.jwt.sign({_id:user._id,email: user.email,username : user.username,firstName : user.firstName,lastName : user.lastName},secret)
        const result = await connect.insertOne(user);
        if(result.insertedCount == 1){
            console.log('User added successfully');
            return token;
        }else{
            console.log('User not added');
            return 0;
        }
    }catch(err){
        console.error(err);
        console.log('Database Exception: Cannot add user');
    }
}


const getUser= async()=>{
    try{
        const connect = await initUserDb();
        const result = await connect.find().toArray();
        if(result.length != 0){
            console.log('users retrieved');
            return result;
        }console.log('no users exist');
        return result;
    }catch(err){
        console.error(err);
        console.log('Database Exception: cannot get users');
    }
}


const getById = async (id)=>{           
    try{            
        const userTable = await initUserDb();        
        const newUser = await userTable.findOne({_id:id});  
        if ( newUser != null )
            {
                console.log("user was found");                
                return newUser;
            }
            else{
                console.log("user was not found");
                return newUser;
            }
    }catch(error){
        console.log("Database Exception: cannot get by id");
        console.error(error);
    }       
}
//getById(id);

const updateUser = async (user,id)=>{           
    try{        
        const userTable = await initUserDb();
        const newUser = await userTable.findOneAndUpdate(
            {_id: id},
            {$set: user},
            {upsert: false});

            if(newUser.value != null)
            {
                console.log("user updated");
                return 1;
            }else{
                console.log("user was not updated");
                return 0;
            }        
    }catch(error){
        console.log("Database Exception: user was not updated");
        console.error(error);
    }       
}
//updateUser(newUser,id);

const deleteUser = async (id)=>{               
    try{
        const userTable = await initUserDb();
        const result = await userTable.deleteOne({_id : id});                        
            if (result.deletedCount == 1) {
                console.log('user deleted');
                return 1;             
              }
            else   {              
                console.log('No users to delete');
                return 0;
            }              
         
    }catch(error){        
        console.log("Database Exception: user was not deleted");
        console.error(error);
    }       
}
//deleteUser(id);

const clearUser = async ()=>{
    try{        
        const userTable = await initUserDb();
        const result = await userTable.drop();
        console.log(result);
        
        if (result)
        {
            console.log("User collection reset")
        }else{
            console.log("User collection reset Failed")
        }

    }catch(error)
    {
        console.error(error);

    }
}
//clearUser();


const populate = async ()=>{   

    let results = [];            
    for (var i in users){               
       results.push(await addUser(users[i]))
    }      
    console.log("Population complete");    
}

const isDbEmpty = async() =>{
    let result = await getUser();    

    if (result.length == 0)
    {
        console.log('Populating User Collection......');        
        populate();
    }
}

isDbEmpty();


const getByUsername = async (username)=>{    
    try{        
        const userTable = await initUserDb();
        const newUser = await userTable.findOne({username:username});         
        if ( newUser != null ) 
            {
                console.log("User was found");            
                return newUser;
            }            
            else{
                console.log(" No user were found");
                return null;             
            }
    }catch(error){
        console.log("Database Exception: cannot get User by username");
        console.error(error);
    }       
}

module.exports.getById = getById;
module.exports.getUser = getUser;
module.exports.initUserDb = initUserDb;
module.exports.addUser = addUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.getByUsername = getByUsername;
