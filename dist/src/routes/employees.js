"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_1 = require("../controllers/employee");
const router = express_1.default.Router();
router.get('/', employee_1.getAllEmployees);
router.get('/:id', employee_1.getEmployeeById);
router.post('/', employee_1.createNewEmployee);
router.put('/:id', employee_1.updateEmployee);
router.delete('/:id', employee_1.deleteEmployee);
exports.default = router;
