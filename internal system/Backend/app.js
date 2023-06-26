console.log("App.js Entered");

var pool=require('./Database/dbconfig');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();


app.use(bodyParser.json());
const corsOption = {
  orgin: ['http://localhost:4000', 'http://localhost:4200']
}
app.use(cors(corsOption));

app.listen(4000, () => {
  console.log('API server is running at port 4000');
});


//////////////////////// Importing Node Modules //////////////////////////////////////


app.get("/cocd", (req, res) => {
  var sql = "SELECT * FROM common_code_tbl";
  pool.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });

    }
  });
});

var capture = require('./captureModule/capture');
var login = require('./loginModule/login');
var cocd = require(
  './cocdModule/cocd');
var mssg = require('./message/message');
var childproject = require('./projectModule/childproject');
var markModule = require('./MarkModule/markDetails');
var employeeDetails = require('./EMployeeModule/employeeDetails');
var holiday=require('./HolidayModule/holiday');

app.use('/capture', capture);
app.use('/', login);
app.use('/cocd', cocd);
app.use('/message', mssg);
app.use('/projectModule/childproject', childproject);
app.use('/MarkModule/markDetails', markModule);
app.use('/employeeDetails', employeeDetails);
app.use('/holiday',holiday);



