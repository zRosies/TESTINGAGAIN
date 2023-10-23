import express from "express";
import { getAllEmployees, getEmployeeById, createNewEmployee, deleteEmployee, updateEmployee } from "../controllers/employee";



const router: any = express.Router();

router.get('/', getAllEmployees)
router.get('/:id', getEmployeeById)
router.post('/', createNewEmployee)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)


export default router;