import express from 'express';
import { getAllEmployees } from '../controllers/employee';
import employees from "./employees"
import user from './user'
import swagger from './swagger'


const router = express.Router();


router.use('/employee' , employees)
router.use('/user', user)
router.use('/api-docs', swagger)


export default router;