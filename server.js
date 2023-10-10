const express = require('express');
const route= require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./connection/db')

const PORT = process.env.PORT;
const app = express();


app.use(bodyParser.json())
    .use(cors({origin: '*'}))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      })
    .use('/', route);

mongodb.initDb((err) => {
      if (err) {
        console.log(err);
      } else {
        app.listen(PORT);
        console.log(`Connected to DB and listening on ${PORT}`);
      }
  });
