"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employees_1 = __importDefault(require("./employees"));
const user_1 = __importDefault(require("./user"));
const swagger_1 = __importDefault(require("./swagger"));
const router = express_1.default.Router();
router.use('/employee', employees_1.default);
router.use('/user', user_1.default);
router.use('/api-docs', swagger_1.default);
exports.default = router;
