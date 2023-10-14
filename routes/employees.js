const switcher = require('express').Router();
const employees = require('../controllers/employees')


switcher.get('/', employees.getAllEmployees)
switcher.get('/:id', employees.getEmployeeById)
switcher.post('/', employees.createEmployee)

module.exports= switcher;