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
    // var emp_access =req.user.rows[0].user_type;
    // var emp_name =req.user.rows[0].user_name;

    pool.query("SELECT * from emp_info_tbl where emp_id =$1 and del_flg =$2",[emp_id,'N'],function(err,done){
             if (err) {
                console.error('Error with table query', err);
            } else {
                rowData = done.rows;
              if(rowData.length !=0) { 
                no_of_leaves=done.rows['0'].no_of_leaves;
               }
              else{
                no_of_leaves =0;
              }
           
            }

            console.log(emp_id); 
            pool.query("SELECT comm_code_desc cocd ,emp_name emp, * from leaves l,common_code_tbl cocd , emp_master_tbl emp where  emp.del_flg ='N' and  l.del_flg='N' and l.emp_id =$1 and l.approver_id = emp.emp_id and  cocd.del_flg ='N'and cocd.comm_code_id = l.leave_type and cocd.code_id ='LTYP'",[emp_id],function(err,leavesList){
             if (err) {
                console.error('Error with table query', err);
            } else {
                leaveData = leavesList.rows;
                console.log('leaveData value',leaveData);

               console.log(leaveData[0].emp_id);
               console.log(leaveData[0].ename);
             
           
            }

            res.send("redirect to apprv/Reject");
    // res.json({
    //     message:"Viewed Leave request"
    // })

  });

});
    
}


// ///////////////////////////////////////////////////////////////////////////////
module.exports = router;