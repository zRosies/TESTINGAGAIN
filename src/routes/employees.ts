import express from "express";
import { getAllEmployees, getEmployeeById, createNewEmployee } from "../controllers/employee";



const router = express.Router();

router.get('/', getAllEmployees)
router.get('/:id', getEmployeeById)
router.post('/', createNewEmployee)


export default router;