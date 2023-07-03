console.log("Request-3 entered");

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var pool = require('../Database/dbconfig');



router.get('/viewLeave',viewLeave);


function viewLeave(req,res)
{
    
    var emp_id =req.query.user_id;
    console.log(emp_id);

pool.query("SELECT comm_code_desc cocd ,emp_name emp, * from leaves l,common_code_tbl cocd , emp_master_tbl emp where  emp.del_flg ='N' and  l.del_flg='N' and l.emp_id =$1 and l.approver_id = emp.emp_id and  cocd.del_flg ='N'and cocd.comm_code_id = l.leave_type and cocd.code_id ='LTYP'",[emp_id],function(err,leavesList){
               if (err) {
                  console.error('Error with table query', err);
              } else {
                  leaveData = leavesList.rows;
                  console.log('leaveData value',leaveData);
  
                //  console.log(leaveData[0].emp_id);
                //  console.log(leaveData[0].emp);
                //  console.log(leaveData[0].app_flg);
              }

              res.json({Data:leaveData});
            })


}


// ///////////////////////////////////////////////////////////////////////////////
module.exports = router;