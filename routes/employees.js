const switcher = require('express').Router();
const employees = require('../controllers/employees')


switcher.get('/', employees.getAllEmployees)
switcher.post('/', employees.createEmployee)

module.exports= switcher;