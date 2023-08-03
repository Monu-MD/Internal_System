console.log("Report module entered");
var express = require('express');
var pool = require('../Database/dbconfig');
var router = express.Router();
// var app = express();
var Promise = require('mpromise');
// var User = require('../../models/user');
// var ensureAuthenticated=require('../../routes/utils/utils');
var moment = require('moment');
// var rp = require('request-promise');
// var mislog=require('winston');
// var generator = require('generate-password');
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');
// var arrayDifference = require("array-difference");
// var mislog=require('winston');
// var dateFormat = require('dateformat');
// var converter = require('number-to-words');
var cron = require('node-cron');
// const roundTo = require('round-to');

console.log("-------start--------");

////////////////////////////////////////////////////////Mahesh///////////////////////////////////////////////////////////////////

///////////////////////////////////////////// PANEL CHOOSE WHETHER BULK OR COMP ////////////////////////////////////////////////


router.get('/reportDetails',function(req,res)
{

        var eid = req.body.user_id;
        var ename = req.body.user_name;

        pool.query("SELECT user_type from users where user_id = $1",[eid],function(err,result){
        var emp_access=result.rows['0'].user_type;
	
	console.log("emp_access",emp_access);	

        if(emp_access != "A1" && emp_access != "F1")
        {
                      res.json('redirect to admin-dashboard');
        }
        else
        {
		res.json({
                 data:{
		ename:ename,
		eid:eid,
		emp_access:emp_access
        
         }

        });
	}
	});
});











///////////////////////////////////////////// Yashu ////////////////////////////////////////////////////////////////


















module.exports = router;