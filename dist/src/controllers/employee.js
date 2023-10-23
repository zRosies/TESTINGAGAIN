"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = exports.deleteEmployee = exports.createNewEmployee = exports.getEmployeeById = exports.getAllEmployees = void 0;
const mongodb_1 = require("mongodb");
const dbConnect_1 = require("../connection/dbConnect");
// Execute dotenv.config() as a function
const apiKey = process.env.APIKEY || '';
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, dbConnect_1.getDb)().db('company').collection('employees').find().toArray();
        // 
        if (Array.isArray(result) && result.length !== 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        }
        else {
            res.status(404).json('Data not found');
        }
    }
    catch (error) {
        console.log('Error querying the database:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeId = new mongodb_1.ObjectId(req.params.id);
    const result = yield (0, dbConnect_1.getDb)().db('company').collection('employees').findOne({ _id: employeeId });
    console.log(result);
    try {
        if (result === null) {
            res.status(404).json('employee not found');
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        }
    }
    catch (error) {
        console.log('Error querying the database:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getEmployeeById = getEmployeeById;
const createNewEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        salary: req.body.salary,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    };
    try {
        const result = yield (0, dbConnect_1.getDb)().db('company').collection('employees').insertOne(employee);
        console.log(result);
        if (result === null || result === void 0 ? void 0 : result.acknowledged) {
            res.setHeader('Content-Type', 'application/json');
            res.status(201).json(result.insertedId + ' added to the database');
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json('No data found');
        }
    }
    catch (error) {
        console.log('Error querying the database:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createNewEmployee = createNewEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeId = new mongodb_1.ObjectId(req.params.id);
    try {
        const response = yield (0, dbConnect_1.getDb)().db('company').collection('employees').deleteOne({ _id: employeeId });
        if (response.deletedCount > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(`${employeeId} deleted successfuly`);
        }
        else {
            res.status(400).json(response.error || 'Some error ocurred while deleting the employee');
        }
    }
    catch (error) {
        console.log('Error querying the database:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteEmployee = deleteEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeId = new mongodb_1.ObjectId(req.params.id);
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        salary: req.body.salary,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    };
    try {
        const response = yield (0, dbConnect_1.getDb)().db('company').collection('employees').replaceOne({ _id: employeeId }, employee);
        // console.log(response);
        if ((response === null || response === void 0 ? void 0 : response.modifiedCount) > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(204).json(employeeId + ' updated successfuly');
        }
        else {
            res.status(400).json(response.error || 'Some error ocurred while updating the employee');
        }
    }
    catch (error) {
        console.error("Error querying the database:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateEmployee = updateEmployee;
