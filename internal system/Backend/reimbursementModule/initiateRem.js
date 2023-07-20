var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var app = express();
var Promise = require('mpromise');
var pool = require('../Database/dbconfig');
var nodemailer = require('nodemailer');

var bcrypt = require('bcryptjs');
var generatePassword = require("password-generator");
var { format } = require('date-fns')
router.use(express.json())

console.log('reimbursement');

// router.post('/shadow', function (req, res) {
//     console.log('shadow', req.path);
//     res.send("message to be routed to bluetooth");
// });

router.get('/initiateRem', initiateRem);
function initiateRem(req, res) {

    var emp_id = req.query.user_id;
    var emp_access = req.query.user_type;
    var emp_name = req.query.user_name;
    if (emp_access == 'L3' || emp_access == 'L2' || emp_access == 'L1') {
        var remb_id = req.query.remb_id;
        var project_id = req.query.project_id;
        console.log('emp_id in remb', emp_id);
        console.log('emp_access in remb', emp_access);
        console.log('emp_name in remb', emp_name);
        console.log('remb_id', remb_id);
        console.log('project_id', project_id);
        var empL1 = "L1";
        var empL2 = "L2";
        pool.query("SELECT project_id from project_alloc_tbl where emp_id = LOWER($1)", [emp_id], function (err, result2) {
            if (err) {
                console.error('Error with table query', err);
            } else {
                console.log("result in remb", result2);
                var pid = result2.rows;
                console.log("pid in remb", pid);
                var pid_count = result2.rowCount;
                console.log("pid_count in remb", pid_count);
            }
            pool.query("SELECT project_id from project_alloc_tbl where emp_id=$1 order by percentage_alloc desc", [emp_id], function (err, projectList) {
                if (err) {
                    console.error('Error with table query', err);
                } else {

                    console.log("projectList", projectList);
                    if (projectList.rowCount != 0) {
                        var defProjectId = projectList.rows[0].project_id;
                        console.log("defProjectId", defProjectId);
                        var pLst_count = projectList.rowCount;
                        console.log("pLst_count", pLst_count);
                    }
                }
                pool.query("SELECT emp_name,emp_id from emp_master_tbl where emp_id in (select emp_reporting_mgr from project_alloc_tbl where project_id=$1 and emp_id=$2)", [defProjectId, emp_id], function (err, result2) {
                    if (err) {
                        console.error('Error with table query', err);
                    } else {
                        console.log("result", result2);
                        var empName = result2.rows;
                        if (result2.rowCount != 0) {
                            Manager_name = result2.rows['0'].emp_name;
                            Manager_id = result2.rows['0'].emp_id
                            console.log("Manager_name", Manager_name);
                        }
                        else {
                            Manager_name = "";
                            Manager_id = "";
                        }

                    }
                    pool.query("SELECT project_allocation_date,emp_project_relieving_date from project_alloc_tbl where project_id=$1 and emp_id=$2", [defProjectId, emp_id], function (err, locresult) {
                        if (err) {
                            console.error('Error with table query', err);
                        } else {
                            if (locresult.rowCount != 0) {
                                var project_allocation_date = locresult.rows['0'].project_allocation_date;
                                var relieving_date = locresult.rows['0'].emp_project_relieving_date;
                            } else {
                                var project_allocation_date = "";
                                var relieving_date = "";
                            }
                            var resultList = locresult.rows;
                            console.log("project_allocation_date", project_allocation_date);
                            console.log("relieving_date", relieving_date);
                        }
                        // for Fetching the from location and to location
                        //   pool.query("SELECT project_loc from project_master_tbl where project_id in ($1,$2)", [defProjectId], function(err, result2) {
                        // if (err) {
                        //     console.error('Error with table query', err);
                        // } else {
                        //     console.log("result", result2);
                        // }
                        // pool.query("SELECT emp_id, emp_name from emp_master_tbl where emp_access in ($1,$2)", [empL1, empL2], function(err, result3) {
                        //     if (err) {
                        //         console.error('Error with table query', err);
                        //     } else {
                        //         console.log("result in remb", result3);
                        //         var access = result3.rows;
                        //         console.log("access in remb", access);
                        //         var access_count = result3.rowCount;
                        //         console.log("access_count in remb", access_count);
                        //         var reprtMgrId = result3.emp_id;
                        //         var reportingMgr = result3.emp_name;
                        //         console.log("reprtMgrId in remb", reprtMgrId);
                        //         console.log("reportingMgr in remb", reportingMgr);
                        //     }
                        pool.query("SELECT emp_id, emp_name from emp_master_tbl where emp_access in ($1)", ['F1'], function (err, result4) {
                            if (err) {
                                console.error('Error with table query', err);
                            } else {
                                console.log("result in remb", result4);
                                var hraccess = result4.rows;
                                console.log("access in remb", hraccess);
                                var hraccess_count = result4.rowCount;
                                console.log("hraccess_count in remb", hraccess_count);
                                var hrId = result4.emp_id;
                                var hrName = result4.emp_name;
                                console.log("hrId in remb", hrId);
                                console.log("hrName in remb", hrName);
                            }
                            pool.query("SELECT comm_code_id,comm_code_desc from common_code_tbl where code_id = 'TOB'  order by comm_code_id asc", function (err, result) {
                                comm_code_tnu = result.rows;
                                comm_code_tnu_count = result.rowCount;
                                console.log("classdesc::", comm_code_tnu);
                                console.log("classdesc_count:::", comm_code_tnu_count);
                                res.json({message:'reimbursementModule/initiateRem',remData: {
                                    emp_id: emp_id,
                                    emp_name: emp_name,
                                    emp_access: emp_access,
                                    pid: pid,
                                    project_id: project_id,
                                    pid_count: pid_count,
                                    empName: empName,
                                    hraccess: hraccess,
                                    hraccess_count: hraccess_count,
                                    hrId: hrId,
                                    hrName: hrName,
                                    // amt_payable: amt_payable,
                                    // remarks: remarks,
                                    // user_remarks: user_remarks,
                                    // recCount: recCount,
                                    comm_code_tnu_count: comm_code_tnu_count,
                                    comm_code_tnu: comm_code_tnu,
                                    Manager_name: Manager_name,
                                    Manager_id: Manager_id,
                                    defProjectId: defProjectId,
                                    resultList: resultList
                                }});
                            });
                        });
                    });
                });
            });
        });
        //});
        //});
    } else {
        res.json({message:'/admin-dashboard/adminDashboard/admindashboard'});
    }
}
module.exports = router; 
