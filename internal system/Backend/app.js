console.log("App.js Entered");

var pool = require('./Database/dbconfig');
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


//////////////////////// Importing Node Modules ////////////////////////////////////////


var capture = require('./captureModule/capture');
var login = require('./loginModule/login');
var cocd = require('./cocdModule/cocd');
var mssg = require('./message/message');
var childproject = require('./projectModule/childproject');
var markDetails = require('./MarkModule/markDetails');
var employeeDetails = require('./EMployeeModule/employeeDetails');
var holiday=require('./HolidayModule/holiday');
var request = require('./RequestModule/request');
var assetDeatails=require('./AssetModule/assetDetails');
var apprver = require('./RequestModule/approveLeaves');
var viewrequest = require('./RequestModule/ViewLev');



app.use('/capture', capture);
app.use('/', login);
app.use('/cocd', cocd);
app.use('/message', mssg);
app.use('/projectModule/childproject', childproject);
app.use('/markDetails', markDetails);
app.use('/employeeDetails', employeeDetails);
app.use('/holiday',holiday);
app.use('/request', request);
app.use('/assetDetails',assetDeatails);
app.use('/approverequest', apprver);
app.use('/viewrequest', viewrequest);