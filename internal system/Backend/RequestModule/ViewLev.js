console.log("Request-3 entered");

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var pool = require('../Database/dbconfig');



router.get('/viewLeave', viewLeave);
router.get('/approveView', aprroverView);
router.get('/markedview', markedview);
router.post('/levBalance', levBalance);


function viewLeave(req, res) {

  var emp_id = req.query.user_id;
  console.log(emp_id);

  pool.query("SELECT comm_code_desc cocd ,emp_name emp, * from leaves l,common_code_tbl cocd , emp_master_tbl emp where  emp.del_flg ='N' and  l.del_flg='N' and l.emp_id =$1 and l.approver_id = emp.emp_id and  cocd.del_flg ='N'and cocd.comm_code_id = l.leave_type and cocd.code_id ='LTYP'", [emp_id], function (err, leavesList) {
    if (err) {
      console.error('Error with table query', err);
    } else {
      leaveData = leavesList.rows;
      // console.log('leaveData value', leaveData);

      //  console.log(leaveData[0].emp_id);
      //  console.log(leaveData[0].emp);
      //  console.log(leaveData[0].app_flg);
    }

    res.json({ Data: leaveData });
  })


}

function aprroverView(req, res) {
  var emp_id = req.query.user_id;
  console.log(emp_id + " --aprrover id");

  pool.query("SELECT  comm_code_desc cocd ,emp_name emp,* from leaves l, emp_master_tbl emp, common_code_tbl cocd  where l.del_flg= 'N' and l.approver_id =$1 and l.app_flg = 'P' and l.emp_id = emp.emp_id and rej_flg = 'N' and cocd.del_flg ='N' and emp.del_flg ='N' and cocd.comm_code_id = l.leave_type and cocd.code_id ='LTYP'", [emp_id], function (err, leavesList) {
    if (err) {
      console.error('Error with table query', err);
    } else {
      leaveData = leavesList.rows;
      console.log('leaveData value', leaveData);

      //  console.log(leaveData[0].emp_id);
      //  console.log(leaveData[0].emp);
      //  console.log(leaveData[0].app_flg);
    }

    res.json({ message: "admin viewed", Data: leaveData });
  })
}

function markedview(req, res) {

  var emp_id = req.query.user_id;
  console.log(emp_id);

  pool.query("SELECT  comm_code_desc cocd ,emp_name emp,* from leaves l, emp_master_tbl emp, common_code_tbl cocd  where l.del_flg= 'N' and l.rcre_user_id =$1 and l.app_flg = 'P' and l.emp_id = emp.emp_id and rej_flg = 'N' and cocd.del_flg ='N' and emp.del_flg ='N' and cocd.comm_code_id = l.leave_type and cocd.code_id ='LTYP'", [emp_id], function (err, leavesList) {
    if (err) {
      console.error('Error with table query', err);
    } else {
      leaveData = leavesList.rows;
      console.log('leaveData value', leaveData);
    }

    res.json({ Data: leaveData });
  })

}

function levBalance(req, res) {

  var user_id = req.body.userinfo.user_id;
  var usertype = req.body.userinfo.leave_type;
  var now = new Date();
  var year = now.getFullYear();

  pool.query("SELECT * from leave_master where emp_id =$1 and del_flg=$2 and leave_type = $3 and year = $4", [user_id, 'N', usertype, year], function (err, done) {
    if (err) {
      console.error('Error with table query', err);
    } else {

      var rowdat = done.rowCount;
      console.log("rowdat" + rowdat);

      if (rowdat != 0) {
        var rowdata1 = done.rows;
        var available_leaves_data = rowdata1[0].credited_leaves;
        console.log(available_leaves_data);
        var availed_Data = rowdata1[0].availed_leaves;
        console.log(availed_Data);
        var lev_year = rowdata1[0].year;

        res.send({ message: "Balance fetched", Data: { available_leaves: available_leaves_data, availed_Lev: availed_Data, year: lev_year } })
      }
      else{
        res.send({message:"Apply leave first"})
      }
    }

  });
}

/////////////////////////////////////////////////////////////////////////////////
module.exports = router;