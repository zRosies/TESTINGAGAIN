const validator = require('./validator');
const strictInt = require('validatorjs');



const validateEmployee = (req, res, next)=>{
    const validationRule = {
        firstName : 'required|string',
        lastName: 'required|string',
        role: 'required|string',
        salary : 'required|integer',
        phone : 'required|integer',
        email : 'required|string',
        address: 'required|string',

    }
    validator(req.body, validationRule, {}, (err,status)=>{

        if(!status){
            res.status(412).send({
                sucess: false,
                message: 'Validation failed',
                data: err
            })
        }
        else{
            next();
        }
    })


}

const validateUser = (req, res , next) =>{
    const validationRule = {
        userName: 'required|string',
        password: 'required|string'
    }
    validator(req.body, validationRule, {}, (err,status)=>{
        if(!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            })
        }
        else{
            next()
        }
    })
}

module.exports={validateEmployee, validateUser};