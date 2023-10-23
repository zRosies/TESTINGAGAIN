import express from 'express';
import swaggerUI from 'swagger-ui-express';
import {swaggerDocument} from '../swagger'
import * as swaggerDoc from '../swagger.json';

console.log(swaggerDoc);



const router: any = express.Router()
router.get('/',swaggerUI.setup(swaggerDoc))
router.use('/',swaggerUI.serve)


export default router;

