const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
var pool=require('./Database/dbconfig');


app.use(bodyParser.json());
const corsOption = {
  orgin: ['http://localhost:4000', 'http://localhost:4200']
}
app.use(cors(corsOption));

app.listen(4000, () => {
  console.log('API server is running on port 4000');
});


//////////////////////// Importing Node Modules ////////////////////////////////////////



var capture=require('./captureModule/capture');
var login=require('./loginModule/login')

app.use('/capture',capture);
app.use('/',login);