import { Request, Response } from 'express';

import { ObjectId } from 'mongodb';
import { getDb } from '../connection/dbConnect';

// Execute dotenv.config() as a function

const apiKey: string  = process.env.APIKEY || '';

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const result: any = await getDb().db('company').collection('employees').find().toArray();
        // 

        if (Array.isArray(result) && result.length !== 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json('Data not found');
        }
    } catch (error) {
        console.log('Error querying the database:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getEmployeeById = async(req:Request, res:Response)=>{
    const employeeId: object  = new ObjectId(req.params.id);

    const result: any = await getDb().db('company').collection('employees').findOne({_id:employeeId});

    console.log(result)

    try {
         
        if (result === null) {
            res.status(404).json('employee not found');
           
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
            
        }
    } catch (error) {
        console.log('Error querying the database:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
   
}

export const createNewEmployee = async(req:Request, res:Response)=>{

    type Employee = {
        firstName : string,
        lastName: string,
        role: string,
        salary: number,
        phone: number,
        email: string,
        address: string
    }
    const employee : Employee = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        role : req.body.role,
        salary : req.body.salary,
        phone : req.body.phone,
        email : req.body.email,
        address : req.body.address
        
    }

    try {
        const result: any = await getDb().db('company').collection('employees').insertOne(employee);
        console.log(result)

        if(result?.acknowledged){
            res.setHeader('Content-Type', 'application/json');
            res.status(201).json(result.insertedId + ' added to the database');

        }
        else
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json('No data found')
        }
        
    }
     catch (error) {
        console.log('Error querying the database:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export  const deleteEmployee = async (req:Request, res:Response) =>{
    const employeeId: object = new ObjectId(req.params.id);

    try {
        const response: any = await getDb().db('company').collection('employees').deleteOne({_id:employeeId})
        if(response.deletedCount > 0){
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(`${employeeId} deleted successfuly`)
        }
        else{
            res.status(400).json(response.error || 'Some error ocurred while deleting the employee')

        }
        
    } catch (error) {
        console.log('Error querying the database:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }

}

export const updateEmployee = async(req:Request, res:Response)=>{
    const employeeId : string | object = new ObjectId(req.params.id);

    type Employee = {
        firstName : string,
        lastName: string,
        role: string,
        salary: number,
        phone: number,
        email: string,
        address: string
    }
    const employee : Employee = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        role : req.body.role,
        salary : req.body.salary,
        phone : req.body.phone,
        email : req.body.email,
        address : req.body.address
        
    }

    try {
        const response : any = await getDb().db('company').collection('employees').replaceOne({_id:employeeId},employee)
        // console.log(response);
        
        if(response?.modifiedCount > 0){
            res.setHeader('Content-Type', 'application/json');
            res.status(204).json(employeeId +' updated successfuly')
        }
        else{
            res.status(400).json(response.error || 'Some error ocurred while updating the employee')

        }
        
    } catch (error) {
        console.error("Error querying the database:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }

}

