const switcher = require('express').Router();
const employees = require('../controllers/employees')
const validateRoute = require('../dataValidator/validationRules')


switcher.get('/', employees.getAllEmployees)
switcher.get('/:id', employees.getEmployeeById)
switcher.post('/', validateRoute.validateEmployee, employees.createEmployee)
switcher.delete('/:id', employees.deleteEmployee)
switcher.put('/:id', validateRoute.validateEmployee, employees.updateEmployee)
// switcher.put()
// switcher.delete()


module.exports= switcher;