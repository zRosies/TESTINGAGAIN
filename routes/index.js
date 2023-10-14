const router = require('express').Router();
const employees = require('./employees');
const swagger = require('./swagger');
const user = require('./user')



router.use('/employees',employees)
        .use('/api-docs', swagger)
        .use('/users', user);

module.exports= router;
