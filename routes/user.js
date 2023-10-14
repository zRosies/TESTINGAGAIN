const router = require('express').Router();
const user = require('../controllers/user');

router.get('/', user.getAllUsers)
router.post('/', user.createUser)
router.get('/:id',user.getUserById)


module.exports = router;