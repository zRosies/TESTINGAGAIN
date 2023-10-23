import express from 'express';
import {getAllUsers,getUserById, deleteUser, updateUser, createNewUser} from '../controllers/users'


const router: any = express.Router();

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUser)
router.post('/', createNewUser)
router.put('/:id', updateUser)


export default router;