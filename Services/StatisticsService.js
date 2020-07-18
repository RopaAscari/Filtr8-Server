const statisticsDb = require('../Database/StatisticsDb');
const gullyDb = require('../Database/GullyDb');
const express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/all', async  (req, res)=> {
    try{
     const statisticss = await statisticsDb.getStatistics();
     if(statisticss != null){
        console.log(' Statisticss retrieved!');
        res.send(statisticss);
     }else{
        console.log(' Statisticss not retrieved');
        res.send(' Statisticss not retrieved');
     }
     }catch(err)
     {
         console.error(err);
         console.log('Controller Exception: Cannot get statisticss');
         console.log('Exception: Cannot get statisticss');

     }
})

router.post('/add',async (req,res)=>{
    try{
        const clientStatistics = req.body;
        console.log("The statistics",clientStatistics);

        const result = await statisticsDb.addStatistics(clientStatistics);
        if (result == 1)
        {
            res.send("statistics Added!");
            console.log("statistics added successfully");
        }else{
            res.send("statistics not added!");
            console.log("statistics not added");
        }
    }catch(err)
    {
        console.error(err);
        console.log("Exception: statistics not added");
        res.send('Exception: statistics not added');
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const JSONId = req.params;
        const id = JSONId.id
        const o_id = new ObjectId(id);
        const clientStatistics = req.body;

        const result = await statisticsDb.updateStatistics(clientStatistics,o_id);
        if(result != null)
        {
            res.send('statistics updated');
            console.log('statistics updated');
        }else{
            console.log('Statistics entry not found');
            res.send('Statistics entry not found');
        }
    }catch(error){
        console.error(error);
        console.log('Controller Exception: statistics not updated');
        res.send('Exception: statistics not updated');
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
            console.log('Statistics found!');
        }else{
            res.send('Statistics not found!');
            console.log('Statistics not found!');
        }
    }catch(error)
    {
        console.error(error);
        console.log('Controller Exception: Cannot get statistics by id');
        res.send(' Exception: Cannot get statistics');
    }
})


router.get('/name/:name', async (req,res)=>{
    try{
        const nameObject = req.params;
        const name =  nameObject.name;
        const result = await statisticsDb.getByName(name);
        if(result != null)
        {
            res.send(result);
            console.log('Statistics found!');
        }else{
            res.send('Statistics not found!');
            console.log('Statistics not found!');
        }
    }catch(error)
    {
        console.error(error);
        console.log('Controller Exception: Cannot get Statistics by username');
        res.send('Exception: Cannot get Statistics by username');
    }
})


router.delete('/:id', async(req,res)=>{
    try{
        const JSONId = req.params;
        const id = JSONId.id
        const o_id = new ObjectId(id);
        const result = await statisticsDb.deleteStatistics(o_id);
        if(result == 1)
        {
            res.send('Statistics deleted successfully');
            console.log('Statistics deleted successfully');
        }else{
            console.log('Statistics not deleted');
            res.send('Statistics not deleted');
        }
    }catch(error){
        //console.error(error);
        console.log('Controller Exception: Statistics not deleted ');
        res.send('Exception: Statistics not deleted');
    }
})


module.exports = router;
