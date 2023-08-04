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


router.get('/reportDetails', function (req, res) {

    var eid = req.body.user_id;
    var ename = req.body.user_name;

    pool.query("SELECT user_type from users where user_id = $1", [eid], function (err, result) {
        var emp_access = result.rows['0'].user_type;

        console.log("emp_access", emp_access);

        if (emp_access != "A1" && emp_access != "F1") {
            res.json('redirect to admin-dashboard');
        }
        else {
            res.json({
                data: {
                    ename: ename,
                    eid: eid,
                    emp_access: emp_access

                }

            });
        }
    });
});


///////////////////////////////////////////////////// CHOOSE COMP ////////////////////////////////////////////////////////////////////////


router.get('/reportCompChoose', function (req, res) {

    var eid = req.body.user_id;
    var ename = req.body.user_name;

    pool.query("SELECT user_type from users where user_id = $1", [eid], function (err, result) {
        var emp_access = result.rows['0'].user_type;

        if (emp_access != "A1" && emp_access != "F1") {
            res.json('redirect to admin-dashboard');
        }
        else {

            pool.query("SELECT emp_id,emp_name from emp_master_tbl where entity_cre_flg='Y' and del_flg='N' order by emp_id asc", function (err, result) {
                var employee = result.rows;
                var emp_id_count = result.rowCount;

                res.json({
                    data: {
                        ename: ename,
                        eid: eid,
                        emp_access: emp_access,
                        emp_id_count: emp_id_count,
                        employee: employee
                    }
                });
            });
        }
    });
});


router.post('/getReport', getReport);
function getReport(req, res) {

    var module = req.body.module;
    var emp_id = req.body.emp_id;
    var year = "2020";

    console.log("module", module);
    console.log("emp_id", emp_id);

    // add this to display messages if report is not present
    if (module > "4") {
        res.json('redirect to admin-dashboard');
    }

    // module 1 refer as employee personal details in compact Type
    if (module == "1") {
        console.log("if entered");
        pool.query("select emp_id,emp_name,gender,to_char(dob,'dd/mm/yyyy') as dob1,blood_group,shirt_size,father_name,mother_name,martial_status,spouse_name,comm_addr1,state,city,pincode,comm_addr2,state1,city1,pincode1,phone1,phone2,emergency_num,emergency_con_person,pan_number,aadhaar_num,passport_num,license_num,uan_num,name_in_bank,bank_name,branch_name,account_num,ifsc_code from emp_info_tbl where emp_id = $1 and entity_cre_flg='Y' and del_flg='N'", [emp_id], function (err, result) {
            var rowdata = result.rows;
            var rowdata_count = result.rowCount;

            console.log("Data-->", rowdata);
            // res.json({
            //     data: rowdata // Assuming 'rowdata' contains the required employee professional details
            //   });
            const xlsData = XLSX.utils.json_to_sheet(rowdata);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, xlsData, 'EmployeePersonalDetails');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            // Convert the ArrayBuffer to a Buffer or a Uint8Array
            const buffer = Buffer.from(excelBuffer);

            // Send the Buffer or Uint8Array as the response
            res.end(buffer);

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
        console.log("if entered");
        pool.query("select l.leave_type,l.emp_id,e.emp_name,reason,to_char(l.from_date,'dd/mm/yyyy') as fromdate,to_char(l.to_date,'dd/mm/yyyy') as todate,l.approver_id,f.emp_name as approver_name from leaves l,emp_master_tbl e,emp_master_tbl f where l.emp_id = $1 and e.emp_id = l.emp_id and f.emp_id = l.approver_id and l.del_flg='N' and l.app_flg ='Y' and l.rej_flg='N' and l.year=$2 order by l.leave_type asc", [emp_id, year], function (err, result) {
            var rowdata = result.rows;
            var rowdata_count = result.rowCount;

            console.log("Data-->", rowdata);

            const xlsData = XLSX.utils.json_to_sheet(rowdata);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, xlsData, 'EmpolyeeLeaveData');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            // Convert the ArrayBuffer to a Buffer or a Uint8Array
            const buffer = Buffer.from(excelBuffer);

            // Send the Buffer or Uint8Array as the response
            res.end(buffer);

        });
    }


    // pool.query("select l.leave_type,l.emp_id,e.emp_name,to_number(l.credited_leaves,'9999') + to_number(l.carry_forwarded,'9999') - to_number(l.availed_leaves,'9999')as total,quaterly_leave from leave_master l , emp_master_tbl e where l.leave_type!='' and l.del_flg='N' and l.emp_id = $1 and e.emp_id = l.emp_id and l.year=$2 order by l.emp_id asc", [emp_id, year], function (err, result) {

    // module 4 refer as empolyee Leave data in compact Type
    if (module == "4") {
        console.log("if entered");

         pool.query("SELECT l.leave_type, l.emp_id, e.emp_name, (l.credited_leaves::numeric + l.carry_forwarded::numeric - l.availed_leaves::numeric) AS total, quaterly_leave FROM leave_master l, emp_master_tbl e WHERE l.leave_type != '' AND l.del_flg = 'N' AND l.emp_id = $1 AND e.emp_id = l.emp_id AND l.year = $2 ORDER BY l.emp_id ASC", [emp_id, year], function (err, result) {
    // pool.query("select l.leave_type,l.emp_id,e.emp_name,to_number(l.credited_leaves,'9999') + to_number(l.carry_forwarded,'9999') - to_number(l.availed_leaves,'9999')as total,quaterly_leave from leave_master l , emp_master_tbl e where l.leave_type!='' and l.del_flg='N' and l.emp_id = $1 and e.emp_id = l.emp_id and l.year=$2 order by l.emp_id asc", [emp_id, year], function (err, result) {

        if (err) {
                console.error("Error executing the query:", err);
                return res.status(500).json({ error: "An error occurred while fetching data." });
            }

            if (!result || !result.rows) {
                console.error("No data or invalid result format received.");
                return res.status(404).json({ error: "No data found." });
            }

            var rowdata = result.rows;
            var rowdata_count = result.rowCount;

            console.log("Data-->", rowdata);

            const xlsData = XLSX.utils.json_to_sheet(rowdata);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, xlsData, 'EmpolyeeLeaveData');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            // Convert the ArrayBuffer to a Buffer or a Uint8Array
            const buffer = Buffer.from(excelBuffer);

            // Send the Buffer or Uint8Array as the response
            res.end(buffer);
        });
    }

    // if (module == "4") {
    //     console.log("if entered");
    
    //     pool.query("SELECT l.leave_type, l.emp_id, e.emp_name, (l.credited_leaves::numeric + l.carry_forwarded::numeric - l.availed_leaves::numeric) AS total, quaterly_leave FROM leave_master l, emp_master_tbl e WHERE l.leave_type != '' AND l.del_flg = 'N' AND l.emp_id = $1 AND e.emp_id = l.emp_id AND l.year = $2 ORDER BY l.emp_id ASC", [emp_id, year], function(err, result) {
    //         if (err) {
    //             console.error("Error executing the query:", err);
    //             return res.status(500).json({ error: "An error occurred while fetching data." });
    //         }
    
    //         if (!result || !result.rows) {
    //             console.error("No data or invalid result format received.");
    //             return res.status(404).json({ error: "No data found." });
    //         }
    
    //         var rowdata = result.rows;
    //         var rowdata_count = result.rowCount;
    
    //         console.log("Data-->", rowdata);
    
    //         const xlsData = XLSX.utils.json_to_sheet(rowdata);
    //         const workbook = XLSX.utils.book_new();
    //         XLSX.utils.book_append_sheet(workbook, xlsData, 'EmpolyeeLeaveData');
    //         const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    
    //         // Convert the ArrayBuffer to a Buffer or a Uint8Array
    //         const buffer = Buffer.from(excelBuffer);
    
    //         // Send the Buffer or Uint8Array as the response
    //         res.end(buffer);
    //     });
    // }
    
};

// ------------------------------>>>      Jadhav    <<<----------------------------------------------------

module.exports = router;