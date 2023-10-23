
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import {getDb, initDb} from "./connection/dbConnect"
import cors from "cors";
import routes from './routes/index'

dotenv.config()

const app = express();

const PORT: any = process.env.PORT || 8080

app.use(bodyParser.json())
    .use(cors({origin : "*"}))
    .use((req,res,next)=>{
        res.setHeader('Access-Control-Origin', "*")
        next()
    })
    .use('/', routes)


initDb((err: Error | null) => {
    if (err) {
      console.log(err);
    } 
    else {
      app.listen(PORT, () => {
        console.log(`Connected to DB and listening on port ${PORT}`);
      });
    }
});

