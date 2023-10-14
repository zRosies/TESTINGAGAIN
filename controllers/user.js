const  ObjectId  = require('mongodb').ObjectId;
const mongodb = require('../connection/db');

const apiKey= process.env.APIKEY;

const getAllUsers = async(req, res)=>{
    const result = await mongodb.getDb().db('company').collection('users').find().toArray();

    console.log(req.header('apiKey'));
    // console.log(apiKey)
    try {
        if(req.header('apiKey') === apiKey){
            
            if(result.length!==0){
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(result);;
            }

        }
        else if(req.header('apiKey') != apiKey){
            res.status(404).json('APIKEY NOT FOUND');;

        }
        
        else{
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json('Not Found');
            
        }
    } catch (error) {
        
        console.log("Error querying the database:" , error);
        res.status(500).json({message: "internal server error"});
    }

}

const createUser = async(req, res)=>{
    const employeeInfo = {
        userName : req.body.userName,
        password: req.body.password
       
    }
    
    try {

        if(req.header('apiKey') === apiKey){
            const result= await mongodb.getDb().db('company').collection('users').insertOne(employeeInfo);
            
            if(result.acknowledged){
                
                res.setHeader('Content-Type', 'application/json');
                // console.log(result)
                res.status(201).json(result.insertedId + ' added to the database');
               
               
            }

        }
        else if(req.header('apiKey') !== apiKey){
            res.status(400).json('APIKEY NOT FOUND');;

        }
        
        else{
            
            res.status(400).json({message:'no data found'});
         
            
        }
    } catch (error) {
        
        console.log("Error querying the database:" , error);
        res.status(500).json({message: "internal server error"});
    }

}


const getUserById = async(req,res)=>{
    const userId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().db('company').collection('users').findOne({_id:userId});

    try{
        
        if (result.length === 0) {
            res.status(404).json({ message: "No data found" });
        } 
        else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(result); 
        }
       
      
    }
    catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ message: "Internal server error" });
    }

}

module.exports={getAllUsers, createUser, getUserById};