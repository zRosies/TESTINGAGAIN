const { ObjectId } = require('mongodb');
const mongodb = require('../connection/db');
const { Console } = require('console');

const apiKey= process.env.APIKEY;


const getAllEmployees = async(req, res)=>{
    const result = await mongodb.getDb().db('company').collection('employees').find().toArray();

    // console.log(req.header('apiKey'));
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

const getEmployeeById = async(req,res)=>{
    const userId = new ObjectId(req.params.id);
    // console.log(userId)
    const result = await mongodb.getDb().db('company').collection('employees').findOne({_id:userId});

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

const deleteEmployee = async (req, res, next)=>{
    const employeeId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('company').collection('employees').deleteOne({_id:employeeId});
    console.log(response)
    
    try {
           
        if(response.deletedCount > 0){
                res.status(200).json(`${employeeId} deleted successfuly`)
            }
    
        else{
            res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
        }
        
    } catch (error) {
        console.error("Error querying the database:", error);
        res.status(500).json({ message: "Internal server error" });
    }


}

const updateEmployee = async (req, res, next) =>{
    const employeeId = new ObjectId(req.params.id);

    const newEmployee = {

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        salary: req.body.salary,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    }

    const result = await mongodb.getDb().db('company').collection('employees').replaceOne({_id:employeeId}, newEmployee);

    
    try {
   
           
        if(result.modifiedCount > 0){
                res.status(204).json(`${employeeId} updated successfuly`)
       
        }
        else{
            res.status(500).json(response.error || 'Some error occurred while updtaing the contact.');
        }
        
    } catch (error) {
        console.error("Error querying the database:", error);
        res.status(500).json({ message: "Internal server error" });
    }




}

module.exports = {
    getAllEmployees, 
    createEmployee,
    getEmployeeById,
    deleteEmployee,
    updateEmployee

}