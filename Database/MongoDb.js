"use strict";
const MongoClient = require('mongodb').MongoClient;
const con = process.env.con;
const jwt = require('jsonwebtoken');

module.exports.connectDb = async()=>{
    try{
        const db = await MongoClient.connect(con,{useUnifiedTopology: true});
        console.log('Connected to Filtr8 Database');
        return db.db('Filtr8');
    }catch(error)
    {
  //      console.error(error);
  console.log(con)
    }
}

module.exports.jwt = jwt;