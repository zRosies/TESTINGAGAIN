"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
router.get('/', users_1.getAllUsers);
router.get('/:id', users_1.getUserById);
router.delete('/:id', users_1.deleteUser);
router.post('/', users_1.createNewUser);
router.put('/:id', users_1.updateUser);
exports.default = router;
