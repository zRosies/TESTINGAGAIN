const router = require('express').Router();
const employees = require('./employees');
const swagger = require('./swagger');



router.use('/employees',employees)
        .use('/api-docs', swagger);

module.exports= router;
