const router = require('express').Router();
const user = require('../controllers/user');

router.get('/', user.getAllUsers)
router.post('/', user.createUser)


module.exports = router;