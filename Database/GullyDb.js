"use strict";
const con = require('./MongoDb');
const TABLE_NAME = 'Yung_gully';
const bcrypt = require('bcryptjs');


let gullies = [{
    name : 'Industrial Terrace gully',
    parish: 'west kingston',
    country : 'Jamaica',
    diameter : 90,
    length : 2500,
    images : ''
},
{
    name : 'Seaview Gardens gully',
    parish: 'St Andrew',
    country : 'Jamaica',
    diameter : 190,
    length : 2000,
    images : ''
},
{
    name : 'Sandy gully',
    parish: 'Clarendon',
    country : 'Jamaica',
    diameter : 70,
    length : 1700,
    images : ''
},
{
    name : 'North gully',
    parish: 'St James',
    country : 'Jamaica',
    diameter : 100,
    length : 1800,
    images : ''
},
{
    name : 'south gully',
    parish: 'St. James',
    country : 'Jamaica',
    diameter : 67,
    length : 1500,
    images : ''
}
]


const initGullyDb = async()=>{
    try{
        const client = await con.connectDb();
        const result = client.collection(TABLE_NAME,(error,res)=>{
        if(error){
            console.log('Cannot connect');
        }
        console.log('Gully connection live');        
        })
        return result;
    }catch(err){
        console.log('Database Exception: Cannot establish connection to gully collection');
        console.error(err);
    }
}

const addGully = async (gully)=>{
    try{
        const connect = await initGullyDb();
        const result = connect.insertOne(gully);
        if((await result).insertedCount == 1){
            console.log('gully added successfully');
        }else{
            console.log('gully record not added');
        }
    }catch(err){
        console.error(err);
    }
}

const getGully = async ()=>{
    try{
        const connect = await initGullyDb();
        const result = await connect.find().toArray();
        if( result.length != 0){
            return result;
        }else{
            console.log('No gullies',result.length);
            return result;
        }
    
    }catch(err){
        console.error(err);
        console.log('Database Exception: Cannot get gullys');
    }
    
}


const getById = async (id)=>{
    try{
        const connect = await initGullyDb();
        const result = await connect.findOne({_id:id});
        if (result != null){
            console.log('gully  found',result);
            return result;
        }else{
            console.log('gully not found');
        }

    }catch(err){
        console.error(err);
        console.log('Database Exception: cannot get gully by id');
    }
}


const updateGully= async(id,gully)=>{
    try{
        const connect = await initGullyDb();
        const result = await connect.findOneAndUpdate(
            {_id:id},
            {$set:gully},
            {upsert:false});
            
            if(result.value != null)
            {
                console.log("gully updated");
                return 1;
            }else{
                console.log("gully was not updated");
                return 0;
            }        
    }catch(err){
        console.error(err);
        console.log('Database Exception: cannot update gully')
    }
}

const deleteGully =async(id)=>{
    try{
        const connect = await initGullyDb();
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
        console.log('Database Exception: cannot delete gully');
    }

}


const clearGully = async ()=>{
    try{        
        const gullyTable = await initGullyDb();
        const result = await gullyTable.drop();
        console.log(result);
        
        if (result)
        {
            console.log("Gully collection reset")
        }else{
            console.log("Gully collection reset Failed")
        }

    }catch(error)
    {
        console.error(error);

    }
}
//clearGully();


const populate = async ()=>{   

    let results = [];            
    for (var i in gullies){               
       results.push(await addGully(gullies[i]))
    }      
    console.log("Population complete");    
}

const isDbEmpty = async() =>{
    let result = await getGully();    

    if (result.length == 0)
    {
        console.log('Populating Gully Collection.....');        
        populate();
    }
}

isDbEmpty();


module.exports.getGully = getGully;
module.exports.addGully = addGully;
module.exports.updateGully = updateGully;
module.exports.getById = getById;
module.exports.deleteGully = deleteGully;
