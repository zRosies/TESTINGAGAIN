"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.initDb = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let db = null;
const initDb = (callback) => {
    if (db) {
        console.log('Db is already initialized!');
        return callback(null, db);
    }
    mongodb_1.MongoClient.connect(process.env.URI || '')
        .then((client) => {
        db = client;
        callback(null, db);
    })
        .catch((err) => {
        callback(null, err);
    });
};
exports.initDb = initDb;
const getDb = () => {
    if (!db) {
        throw new Error('Db not intialized!');
    }
    return db;
};
exports.getDb = getDb;
