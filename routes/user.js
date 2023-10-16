const router = require('express').Router();
const user = require('../controllers/user');
const validateRoute = require('../dataValidator/validationRules')

router.get('/', user.getAllUsers)
router.get('/:id',user.getUserById)
router.post('/', validateRoute.validateUser, user.createUser)
router.put('/:id', validateRoute.validateUser, user.updateUser);
router.delete('/:id', user.deleteUserById)
// router.delete()
// validateRoute.validateEmployee,

// router.put('')



module.exports = router;