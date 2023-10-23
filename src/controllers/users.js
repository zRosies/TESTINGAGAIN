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
exports.updateUser = exports.createNewUser = exports.deleteUser = exports.getUserById = exports.getAllUsers = void 0;
const mongodb_1 = require("mongodb");
const dbConnect_1 = require("../connection/dbConnect");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, dbConnect_1.getDb)().db('company').collection('users').find().toArray();
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
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongodb_1.ObjectId(req.params.id);
    try {
        const result = yield (0, dbConnect_1.getDb)().db('company').collection('users').findOne({ _id: userId });
        console.log(result);
        if (result === null) {
            res.status(404).json('User not found');
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
exports.getUserById = getUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongodb_1.ObjectId(req.params.id);
    try {
        const result = yield (0, dbConnect_1.getDb)().db('company').collection('users').deleteOne({ _id: userId });
        if ((result === null || result === void 0 ? void 0 : result.length) !== 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(userId + ' deleted successfuly');
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
exports.deleteUser = deleteUser;
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        userName: req.body.userName,
        password: req.body.password
    };
    try {
        const result = yield (0, dbConnect_1.getDb)().db('company').collection('users').insertOne(user);
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
exports.createNewUser = createNewUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongodb_1.ObjectId(req.params.id);
    const user = {
        userName: req.body.userName,
        password: req.body.password
    };
    try {
        const result = yield (0, dbConnect_1.getDb)().db('company').collection('users').replaceOne({ _id: userId }, user);
        console.log(result);
        if ((result === null || result === void 0 ? void 0 : result.modifiedCount) > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(204).json(userId + ' updated sucessfuly');
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json('No user found');
        }
    }
    catch (error) {
        console.log('Error querying the database:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateUser = updateUser;
