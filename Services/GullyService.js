const gullyDb = require('../Database/GullyDb');
const express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/all', async  (req, res)=> {
    try{
     const gullys = await gullyDb.getGully();
     if(gullys != null){
        console.log(' Gullys retrieved!');
        res.send(gullys);
     }else{
        console.log(' Gullys not retrieved');
        res.send(' Gullys not retrieved');
     }
     }catch(err)
     {
         console.error(err);
         console.log('Controller Exception: Cannot get gullys');
         console.log('Exception: Cannot get gullys');

     }
})

router.post('/add',async (req,res)=>{
    try{
        const clientGully = req.body;
        console.log("The gully",clientGully);

        const result = await gullyDb.addGully(clientGully);
        if (result == 1)
        {
            res.send("gully Added!");
            console.log("gully added successfully");
        }else{
            res.send("gully not added!");
            console.log("gully not added");
        }
    }catch(err)
    {
        console.error(err);
        console.log("Exception: gully not added");
        res.send('Exception: gully not added');
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const JSONId = req.params;
        const id = JSONId.id
        const o_id = new ObjectId(id);
        const clientGully = req.body;

        const result = await gullyDb.updateGully(clientGully,o_id);
        if(result != null)
        {
            res.send('gully updated');
            console.log('gully updated');
        }else{
            console.log('Gully entry not found');
            res.send('Gully entry not found');
        }
    }catch(error){
        console.error(error);
        console.log('Controller Exception: gully not updated');
        res.send('Exception: gully not updated');
    }
})


router.get('/:_id', async (req,res)=>{
    try{
        const JSONId = req.params;
        const id = JSONId._id
        const o_id = new ObjectId(id);
        const result = await gullyDb.getById(o_id);                ;
        if(result != null)
        {
            res.send(result);
            console.log('Gully found!');
        }else{
            res.send('Gully not found!');
            console.log('Gully not found!');
        }
    }catch(error)
    {
        console.error(error);
        console.log('Controller Exception: Cannot get gully by id');
        res.send(' Exception: Cannot get gully');
    }
})


router.get('/name/:name', async (req,res)=>{
    try{
        const nameObject = req.params;
        const name =  nameObject.name;
        const result = await gullyDb.getByName(name);
        if(result != null)
        {
            res.send(result);
            console.log('Gully found!');
        }else{
            res.send('Gully not found!');
            console.log('Gully not found!');
        }
    }catch(error)
    {
        console.error(error);
        console.log('Controller Exception: Cannot get Gully by username');
        res.send('Exception: Cannot get Gully by username');
    }
})


router.delete('/:id', async(req,res)=>{
    try{
        const JSONId = req.params;
        const id = JSONId.id
        const o_id = new ObjectId(id);
        const result = await gullyDb.deleteGully(o_id);
        if(result == 1)
        {
            res.send('Gully deleted successfully');
            console.log('Gully deleted successfully');
        }else{
            console.log('Gully not deleted');
            res.send('Gully not deleted');
        }
    }catch(error){
        //console.error(error);
        console.log('Controller Exception: Gully not deleted ');
        res.send('Exception: Gully not deleted');
    }
})


module.exports = router;
