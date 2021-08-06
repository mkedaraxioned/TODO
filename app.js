const express = require('express');
const app = express();
const routes = require('./src/routes/routes');
const dotenv = require('dotenv');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoose = require('mongoose');

app.use(express.json());

// Load env vars
dotenv.config();

// Prevent xss attack
app.use(xss());

// setting security headers 
app.use(helmet());

// Rate limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000 , // 10 minutes time
  max: 100 //limit to 100 req
});

app.use(limiter);

// Prevent http param pollution 
app.use(hpp());

//Db address of local database
const DB = process.env.DATABASE_LOCAL;

//mongoose connection
mongoose.connect(DB,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true

}).then(con=> {
  console.log(`Db connection successful !`);
});

// mount routes
app.use('/api',routes);

app.use((req, res, next) => {
  return res.status(500).send({error: 'Internal Server error'});
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
