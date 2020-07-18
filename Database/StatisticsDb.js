"use strict";
const con = require('./MongoDb');
const TABLE_NAME = 'Yung_statistics';
const bcrypt = require('bcryptjs');


let statistics = [{
    gullyID : '12rfdew3w432s383423',
    time : '9:30am',
    date : '24-07-2020',
    weight : 500,
    teirNumber : 1
},
{
    gullyID : '12rfdew3w432s38354353',
    time : '9:30am',
    date : '14-06-2020',
    weight : 500,
    teirNumber : 1
},
{
    gullyID : '12rfdew3w432s383455',
    time : '9:30am',
    date : '15-06-2020',
    weight : 500,
    teirNumber : 1
},
{
    gullyID : '12rfdew3w432s383464445',
    time : '11:30am',
    date : '11-07-2020',
    weight : 500,
    teirNumber : 1
},
{
    gullyID : '12rfdew3w432s3834j8',
    time : '10:30am',
    date : '14-07-2020',
    weight : 500,
    teirNumber : 1
},
]


const initStatisticsDb = async()=>{
    try{
        const client = await con.connectDb();
        const result = client.collection(TABLE_NAME,(error,res)=>{
        if(error){
            console.log('Cannot connect');
        }
        console.log('Statistics connection live');        
        })
        return result;
    }catch(err){
        console.log('Database Exception: Cannot establish connection to statistics collection');
        console.error(err);
    }
}

const addStatistics = async (statistics)=>{
    try{
        const connect = await initStatisticsDb();
        const result = connect.insertOne(statistics);
        if((await result).insertedCount == 1){
            console.log('statistics added successfully');
        }else{
            console.log('statistics record not added');
        }
    }catch(err){
        console.error(err);
    }
}

const getStatistics = async ()=>{
    try{
        const connect = await initStatisticsDb();
        const result = await connect.find().toArray();
        if( result.length != 0){
            return result;
        }else{
            console.log('No statistics');
            return result;
        }
    
    }catch(err){
        console.error(err);
        console.log('Database Exception: Cannot get statisticss');
    }
    
}


const getById = async (id)=>{
    try{
        const connect = await initStatisticsDb();
        const result = await connect.findOne({_id:id});
        if (result != null){
            console.log('statistics  found',result);
            return result;
        }else{
            console.log('statistics not found');
        }

    }catch(err){
        console.error(err);
        console.log('Database Exception: cannot get statistics by id');
    }
}


const updateStatistics= async(id,statistics)=>{
    try{
        const connect = await initStatisticsDb();
        const result = await connect.findOneAndUpdate(
            {_id:id},
            {$set:statistics},
            {upsert:false});
            
            if(result.value != null)
            {
                console.log("statistics updated");
                return 1;
            }else{
                console.log("statistics was not updated");
                return 0;
            }        
    }catch(err){
        console.error(err);
        console.log('Database Exception: cannot update statistics')
    }
}

const deleteStatistics =async(id)=>{
    try{
        const connect = await initStatisticsDb();
        const result = connect.deleteOne({_id:id});
        if ( result.deletedCount != 0){
            console.log('gulley deleted');
            return 1;
        }else{
            console.log('gulley not deleted');
            return 0;
        }

    }catch(err){
        console.error(err);
        console.log('Database Exception: cannot delete statistics');
    }

}




const clearStatistics = async ()=>{
    try{        
        const statisticsTable = await initStatisticsDb();
        const result = await statisticsTable.drop();
        console.log(result);
        
        if (result)
        {
            console.log("Statistics collection reset")
        }else{
            console.log("Statistics collection reset Failed")
        }

    }catch(error)
    {
        console.error(error);

    }
}
//clearStatistics();


const populate = async ()=>{   

    let results = [];            
    for (var i in statistics){               
       results.push(await addStatistics(statistics[i]))
    }      
    console.log("Population complete");    
}

const isDbEmpty = async() =>{
    let result = await getStatistics();    

    if (result.length == 0)
    {
        console.log('Populating Statistics Collection......');        
        populate();
    }
}

isDbEmpty();

module.exports.getStatistics = getStatistics;
module.exports.addStatistics = addStatistics;
module.exports.updateStatistics = updateStatistics;
module.exports.getById = getById;
module.exports.deleteStatistics = deleteStatistics;
