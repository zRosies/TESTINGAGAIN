const { ObjectId } = require('mongodb');
const mongodb = require('../connection/db');
const { Console } = require('console');

const apiKey= process.env.APIKEY;


const getAllEmployees = async(req, res)=>{
    const result = await mongodb.getDb().db('company').collection('employees').find().toArray();

    console.log(req.header('apiKey'));
    console.log(apiKey)
    try {
        if(req.header('apiKey') === apiKey){
            
            if(result.length!==0){
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(result);;
            }

        }
        else if(req.header('apiKey') != apiKey){
            res.status(404).json('Wrong APIKEY');;

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

const createEmployee = async(req, res)=>{
    const employeeInfo = {
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        salary: req.body.salary,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    }
    
    try {

        if(req.header('apiKey') === apiKey){
            const result= await mongodb.getDb().db('company').collection('employees').insertOne(employeeInfo);
            
            if(result.acknowledged){
                
                res.setHeader('Content-Type', 'application/json');
                // console.log(result)
                res.status(201).json(result.insertedId + ' added to the database');
               
               
            }

        }
        else if(req.header('apiKey') !== apiKey){
            res.status(400).json('Wrong APIKEY');;

        }
        
        else{
            
            res.status(400).json({message:'no data found'});
         
            
        }
    } catch (error) {
        
        console.log("Error querying the database:" , error);
        res.status(500).json({message: "internal server error"});
    }

}

const getSingleEmployee = async(req, res)=>{
    // const result = 
    const result = await mongodb.getDb().db('company').collection('employees').find();
}


module.exports = {
    getAllEmployees, 
    createEmployee

}