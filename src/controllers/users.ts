import { Response, Request } from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../connection/dbConnect";



export const getAllUsers = async (req:Request , res:Response)=>{

    try {
        const result: any = await getDb().db('company').collection('users').find().toArray()
        if(Array.isArray(result) && result.length !== 0){
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);

        }
        else{
            res.status(404).json('Data not found');
        }
        
    } catch (error) {
        console.log('Error querying the database:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }

}

export const getUserById = async (req:Request , res:Response)=>{
    const userId: object = new ObjectId(req.params.id)

    try {
        const result: any = await getDb().db('company').collection('users').findOne({_id:userId});
        console.log(result);
        
        if (result === null) {
            res.status(404).json('User not found');
           
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
            
        }
    } catch (error) {
        console.log('Error querying the database:', error);
        res.status(500).json({ message: 'Internal server error' });
      
        
    }


}

export const deleteUser = async (req:Request , res:Response)=>{
    const userId: object = new ObjectId(req.params.id)

    try {
        const result: any = await getDb().db('company').collection('users').deleteOne({_id:userId});
        if (result?.length !== 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(userId + ' deleted successfuly');
        } else {
            res.status(404).json('Data not found');
        }
    } catch (error) {
        console.log('Error querying the database:', error);
        res.status(500).json({ message: 'Internal server error' });
      
        
    }


}


export const createNewUser = async(req:Request, res:Response)=>{

    type User = {
        userName: string,
        password: string
      
    }
    const user : User = {
        userName: req.body.userName,
        password: req.body.password
        
    }

    try {
        const result: any = await getDb().db('company').collection('users').insertOne(user);
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


export const updateUser = async(req:Request, res:Response)=>{
    const userId: object = new ObjectId(req.params.id)

    type User = {
        userName: string,
        password: string
      
    }
    const user : User = {
        userName: req.body.userName,
        password: req.body.password
        
    }

    try {
        const result: any = await getDb().db('company').collection('users').replaceOne({_id:userId},user);
        console.log(result)

        if(result?.modifiedCount > 0){
            res.setHeader('Content-Type', 'application/json');
            res.status(204).json(userId + ' updated sucessfuly');

        }
        else
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json('No user found')
        }
        
    }
     catch (error) {
        console.log('Error querying the database:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
