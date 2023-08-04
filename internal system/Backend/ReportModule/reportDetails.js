console.log("Report module entered");
var express = require('express');
var pool = require('../Database/dbconfig');
var router = express.Router();
var app = express();
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
const XLSX = require('xlsx');





// ------------------------------>>>       Mahesh <<<----------------------------------------------------

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


router.post('/getReport', getReport);
function getReport(req, res) {

    var module = req.body.module;
    var emp_id = req.body.emp_id;

    console.log("module", module);
    console.log("emp_id", emp_id);

    // add this to display messages if report is not present
    if (module > "4") {
        res.json('redirect to admin-dashboard');
    }

    // module 2 refer as employee personal details in compact Type
    if (module == "1") {
        pool.query("SELECT * from emp_info_tbl where emp_id = $1  and entity_cre_flg='Y' and del_flg='N' order by emp_id asc", [emp_id], function (err, result) {
            var rowdata = result.rowCount;
            console.log("count-->", rowdata);
            if (rowdata == "0") {

                res.json({
                    notification: "Employee Personal Details does not exist for Employee Id",
                    message: "redirect to admin-dashboard"


                })

            }
            else {

                pool.query("select emp_id,emp_name,gender,to_char(dob,'dd/mm/yyyy') as dob1,blood_group,shirt_size,father_name,mother_name,martial_status,spouse_name,comm_addr1,state,city,pincode,comm_addr2,state1,city1,pincode1,phone1,phone2,emergency_num,emergency_con_person,pan_number,aadhaar_num,passport_num,license_num,uan_num,name_in_bank,bank_name,branch_name,account_num,ifsc_code from emp_info_tbl where emp_id = $1 and entity_cre_flg='Y' and del_flg='N'", [emp_id], function (err, result) {
                    var rowdata = result.rows;
                    var rowdata_count = result.rowCount;

                    console.log("Data-->", rowdata);

                    res.json({
                        data: {
                            rowdata: rowdata,
                            rowdata_count: rowdata_count
                        }
                    });
                });
            }
        });
    }

    // module 2 refer as employee Professional details in compact Type
    if (module == "2") {
        console.log("if entered");
        pool.query("SELECT emp_id,emp_name,to_char(joining_date,'dd/mm/yyyy') as jdate,emp_access,emp_email,designation,emp_classification,salary,project_id,reporting_mgr,pre_emp_flg,prev_expr_year,prev_expr_month,emp_prob,prev_empr,prev_empr2,prev_empr3,prev_empr4,prev_empr5,salary_curr from emp_master_tbl where emp_id = $1 and entity_cre_flg='Y' and del_flg='N' order by emp_id asc", [emp_id], function (err, result) {
            var rowdata = result.rows;
            var rowdata_count = result.rowCount;

            console.log("Data-->", rowdata);
            // res.json({
            //     data: rowdata // Assuming 'rowdata' contains the required employee professional details
            //   });
            const xlsData = XLSX.utils.json_to_sheet(rowdata);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, xlsData, 'EmployeeProfessionalDetails');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        
            // Convert the ArrayBuffer to a Buffer or a Uint8Array
            const buffer = Buffer.from(excelBuffer);
        
            // Send the Buffer or Uint8Array as the response
            res.end(buffer);

        });
    }

    // module 3 refer as empolyee Leave data in compact Type
    if (module == "3") {

        var current_date = new Date();
        var year = current_date.getFullYear();

        pool.query("SELECT * from leaves where emp_id = $1 and del_flg='N' and app_flg='N' and rej_flg='N' and year =$2", [emp_id, year], function (err, result) {
            var emp_leaves_count = result.rowCount;

            if (emp_leaves_count == "0") {

                res.json({
                    message: "redirect to admin-dashboard",
                    notification: "Leave data is not available Employee Id :" + emp_id + " for the Year :" + year + ".",

                })
            }
            else {

                pool.query("select l.leave_type,l.emp_id,e.emp_name,reason,to_char(l.from_date,'dd/mm/yyyy') as fromdate,to_char(l.to_date,'dd/mm/yyyy') as todate,l.approver_id,f.emp_name as approver_name from leaves l,emp_master_tbl e,emp_master_tbl f where l.emp_id = $1 and e.emp_id = l.emp_id and f.emp_id = l.approver_id and l.del_flg='N' and l.app_flg ='Y' and l.rej_flg='N' and l.year=$2 order by l.leave_type asc", [emp_id, year], function (err, result) {
                    var data = result.rows;
                    var data_count = result.rowCount;

                    res.json({
                        data: {
                            eid: eid,
                            ename: ename,
                            emp_access: emp_access,
                            data: data,
                            data_count: data_count
                        }
                    });
                });
            }
        });
    }
    // module 4 refer as employee Leave Balance in compact Type
    if (module == "4") {
        var current_date = new Date();
        var year = current_date.getFullYear();

        pool.query("SELECT * from leave_master where emp_id = $1 and del_flg='N' and year =$2", [emp_id, year], function (err, result) {
            var emp_info_count = result.rowCount;

            if (emp_info_count == "0") {


                res.json({
                    message: "redirect to admin-dashboard",
                    notification: "Leave Balance data is not available Employee Id :" + emp_id + " for the Year :" + year + ".",

                })

            }
            else {

                pool.query("select l.leave_type,l.emp_id,e.emp_name,to_number(l.credited_leaves,'9999') + to_number(l.carry_forwarded,'9999') - to_number(l.availed_leaves,'9999')as total,quaterly_leave from leave_master l , emp_master_tbl e where l.leave_type!='' and l.del_flg='N' and l.emp_id = $1 and e.emp_id = l.emp_id and l.year=$2 order by l.emp_id asc", [emp_id, year], function (err, result) {
                    var data = result.rows;
                    var data_count = result.rowCount;

                    res.render({
                        data: {
                            eid: eid,
                            ename: ename,
                            emp_access: emp_access,
                            data: data,
                            data_count: data_count
                        }
                    });
                });
            }
        });
    }
};





router.post('/displayReport',displayReport);
function displayReport(req , res)
{
	var array = req.body.button;
	console.log("array",array);

        var eid = req.user.rows['0'].user_id;
        var ename = req.user.rows['0'].user_name;
        var emp_access = req.user.rows['0'].user_type;
	

	// value of button describes a module Example button 0 refers to employee Module

	if(array == "1")
	{
		pool.query("SELECT emp_id,emp_name,to_char(joining_date,'dd/mm/yyyy') as jdate,emp_access,emp_email,designation,emp_classification,salary,salary_curr,project_id,reporting_mgr,pre_emp_flg,prev_expr_year,prev_expr_month,emp_prob,prev_empr,prev_empr2,prev_empr3,prev_empr4,prev_empr5 from emp_master_tbl where entity_cre_flg='Y' and del_flg='N' order by emp_id asc",function(err,result){
		var data=result.rows;
		var data_count=result.rowCount;

		res.json({
		eid:eid,
		ename:ename,
		emp_access:emp_access,
		button:array,
		data:data,
		data_count:data_count	
		});
		});
	}

        if(array == "2")
        {
                pool.query("select emp_id,emp_name,gender,to_char(dob,'dd/mm/yyyy') as dob1,blood_group,shirt_size,father_name,mother_name,martial_status,spouse_name,comm_addr1,state,city,pincode,comm_addr2,state1,city1,pincode1,phone1,phone2,emergency_num,emergency_con_person,pan_number,aadhaar_num,passport_num,license_num,uan_num,name_in_bank,bank_name,branch_name,account_num,ifsc_code from emp_info_tbl where entity_cre_flg='Y' and del_flg='N' order by emp_id asc",function(err,result){
                var data=result.rows;
                var data_count=result.rowCount;

                res.render('reportModule/reportempPerlist',{
		eid:eid,
		ename:ename,
		emp_access:emp_access,
                button:array,
                data:data,
                data_count:data_count
                });
                });
        }

        if(array == "3")
        {
                pool.query("select e.emp_id,e.emp_name,p.project_id from emp_master_tbl e, project_alloc_tbl p where e.entity_cre_flg='Y' and e.del_flg='N' order by emp_id asc",function(err,result){
                var data=result.rows;
                var data_count=result.rowCount;

                res.render('reportModule/reportProjAllctdEmplist',{
		eid:eid,
		ename:ename,
		emp_access:emp_access,
                button:array,
                data:data,
                data_count:data_count
                });
                });
        }


        if(array == "4")
        {
		var current_date = new Date();
		var year = current_date.getFullYear();

                pool.query("select l.leave_type,to_char(from_date,'dd/mm/yyyy') as fromdate,to_char(to_date,'dd/mm/yyyy') as todate,l.emp_id,e.emp_name,l.approver_id,f.emp_name as empname from leaves l,emp_master_tbl e,emp_master_tbl f where l.leave_type ='EL' and e.emp_id=l.emp_id and f.emp_id=l.approver_id and l.del_flg='N' and l.year=$1 order by l.emp_id asc",[year],function(err,result){
                var data=result.rows;
                var data_count=result.rowCount;

                res.render('reportModule/reportempleaveELlistavailed',{
                eid:eid,
                ename:ename,
                emp_access:emp_access,
                button:array,
                data:data,
                data_count:data_count
                });
                });
        }


        if(array == "5")
        {
		var current_date = new Date();
		var year = current_date.getFullYear();

                pool.query("select l.leave_type,to_char(from_date,'dd/mm/yyyy') as fromdate,to_char(to_date,'dd/mm/yyyy') as todate,l.emp_id,e.emp_name,l.approver_id,f.emp_name as empname from leaves l,emp_master_tbl e,emp_master_tbl f where l.leave_type ='SL' and e.emp_id=l.emp_id and f.emp_id=l.approver_id and l.del_flg='N' and l.year=$1 order by l.emp_id asc",[year],function(err,result){
                var data=result.rows;
                var data_count=result.rowCount;

                res.render('reportModule/reportempleaveSLlistavailed',{
                eid:eid,
                ename:ename,
                emp_access:emp_access,
                button:array,
                data:data,
                data_count:data_count
                });
                });
        }

        if(array == "6")
        {
		var current_date = new Date();
		var year = current_date.getFullYear();

                pool.query("select l.leave_type,to_char(from_date,'dd/mm/yyyy') as fromdate,to_char(to_date,'dd/mm/yyyy') as todate,l.emp_id,e.emp_name,l.approver_id,f.emp_name as empname from leaves l,emp_master_tbl e,emp_master_tbl f where l.leave_type ='LOP' and e.emp_id=l.emp_id and f.emp_id=l.approver_id and l.del_flg='N' and l.year=$1 order by l.emp_id asc",[year],function(err,result){
                var data=result.rows;
                var data_count=result.rowCount;

                res.render('reportModule/reportempleaveLOPlistavailed',{
                eid:eid,
                ename:ename,
                emp_access:emp_access,
                button:array,
                data:data,
                data_count:data_count
                });
                });
        }


        if(array == "7")
        {
		var current_date = new Date();
		var year = current_date.getFullYear();

                pool.query("select l.leave_type,l.emp_id,e.emp_name,to_number(l.credited_leaves,'9999') + to_number(l.carry_forwarded,'9999') - to_number(l.availed_leaves,'9999')as total,l.quaterly_leave from leave_master l , emp_master_tbl e where l.leave_type='EL' and l.del_flg='N' and e.emp_id = l.emp_id and l.year = $1 order by l.emp_id",[year],function(err,result){
                var data=result.rows;
                var data_count=result.rowCount;

                res.render('reportModule/reportLeaveBalanceEL',{
                eid:eid,
                ename:ename,
                emp_access:emp_access,
                button:array,
                data:data,
                data_count:data_count
                });
                });
        }


        if(array == "8")
        {
		var current_date = new Date();
		var year = current_date.getFullYear();

                pool.query("select l.leave_type,l.emp_id,e.emp_name,to_number(l.credited_leaves,'9999') + to_number(l.carry_forwarded,'9999') - to_number(l.availed_leaves,'9999')as total from leave_master l , emp_master_tbl e where l.leave_type='SL' and l.del_flg='N' and e.emp_id = l.emp_id and l.year=$1 order by l.emp_id",[year],function(err,result){
                var data=result.rows;
                var data_count=result.rowCount;

                res.render('reportModule/reportLeaveBalanceSL',{
                eid:eid,
                ename:ename,
                emp_access:emp_access,
                button:array,
                data:data,
                data_count:data_count
                });
                });
        }


        if(array == "9")
        {
                pool.query("select e.emp_id,e.emp_name,e.reporting_mgr,m.emp_name as mgr_name from emp_master_tbl e,emp_master_tbl m where e.del_flg='N' and e.entity_cre_flg='Y' and m.emp_id = e.reporting_mgr order by e.emp_id",function(err,result){
                
		var data=result.rows;
                var data_count=result.rowCount;

                res.render('reportModule/reportempRepManagerList',{
                eid:eid,
                ename:ename,
                emp_access:emp_access,
                button:array,
                data:data,
                data_count:data_count
                });
                });
        }

        if(array == "10")
        {

                pool.query("SELECT * from holidays where del_flg =$1",['N'],function(err,holidayList)
                    {
                            if (err)
                            {
                                        console.error('Error with table query', err);
                            }
                            else
                            {
                                        holidayData = holidayList.rows;
                            }

			   var current_date = new Date();
			   var current_year = current_date.getFullYear();

			   pool.query("SELECT * from leave_config where year=$1 and del_flg = 'N' ",[current_year],function(err,leaveConfigList)
			   {
				    if (err)
				    {
						console.error('Error with table query', err);
				    }
				    else
				    {
						leaveConfigData = leaveConfigList.rows;
				    }


				    res.render('reportModule/reportLeaveDetailsValue',{
				    eid:eid,
				    ename:ename,
				    emp_access:emp_access,
				    leaveConfigData:leaveConfigData,
				    holidayData:holidayData
			
										       });
                	});
                });
        }
}









// ------------------------------>>>      Jadhav    <<<----------------------------------------------------













module.exports = router;