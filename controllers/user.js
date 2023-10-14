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

module.exports={getAllUsers};