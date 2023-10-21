import express from "express";
import { getAllEmployees } from "../controllers/employee";
import employees from "./employees"
const router = express.Router();


router.use('/employees' , employees)


export default router;