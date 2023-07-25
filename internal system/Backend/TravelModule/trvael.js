console.log("Travel Enter");
var express = require('express');
var multer = require('multer');
var app = express();
var util = require('util');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var pool = require('../Database/dbconfig');
var nodemailer = require('nodemailer');
const { log } = require('console');
router.use(express.json())
var { format } = require('date-fns')
var moment = require('moment');

router.get('/travel', travel);
function travel(req, res) {
    var emp_id = req.query.employeeId;
    pool.query("SELECT emp_access from emp_master_tbl where emp_id=$1", [emp_id], function (err, result) {
        if (err) throw err;

        var emp_access = result.rows[0].emp_access;
        if (emp_access == 'L3' || emp_access == 'A1') {
            pool.query("SELECT Distinct project_id from project_master_tbl where closure_flg=$1", ['N'], function (err, result2) {
                if (err) {
                    console.error('Error with table query', err);
                } else {
                    console.log("result", result2);
                    var pid = result2.rows;
                    console.log("pid", pid);
                }
                res.json({
                    redirect: '/travel', projectId: {
                        pid: pid,
                    }
                });

            });
        }

    })
}
router.post('/travelReq', travelReq);
function travelReq(req, res) {
    console.log(req.body);
    var test = req.body.test;
    var test1 = req.body.test1;
    var test2 = req.body.test2;
    var test3 = req.body.test3;
    var test4 = req.body.test4;
    var test5 = req.body.test5;
    var pnr_number = "";
    var ticket_number = "";
    var free_text_1 = "";
    var hr_remarks = "";
    if (test == "Submit") {
        console.log("test::::", test);
        var tenDate = req.body.tenDate;
        var emp_id = req.body.user_id;
        var empname = req.body.user_name;
        var empaccess = req.body.user_type;
        var travelDate = req.body.item.travelDate;
        var now = new Date();
        var rcreuserid = emp_id;
        var rcretime = now;
        var lchguserid = emp_id;
        var lchgtime = now;

        var pid = req.body.item.projectId;
        var travelDate = req.body.item.travelDate;
        var tenDate = req.body.item.tentativeReturnDate;
        var fromLoc = req.body.item.fromLocation;
        var toLoc = req.body.item.toLocation;
        var rmks = req.body.item.remarks;
        // var free_text_1 = req.body.free_text_1;
        var emp_access = req.body.user_type;
        var emp_Name = empname;
        var val_from_date = "";
        var val_from_location = "";
        var valFlag = "";
        var masterTblFlag = "";
        var checkFlag = "";
        var success = "";
        console.log('emp_Name::emp_access', emp_access);
        console.log('emp_id', emp_id.length);
        console.log('travelDate', travelDate);
        console.log('pid', pid);
        var notification = '';

        pool.query("SELECT * from travel_master_tbl_temp where emp_id = $1 and project_id = $2 and del_flg = $3", [emp_id, pid, 'N'], function (err, valDateLoc) {
            if (err) {
                console.error('Error with table query', err);
            } else {
                console.log("valDateLoc.rowCount::", valDateLoc.rowCount);
                // console.log("result::", valDateLoc);
            }

            pool.query("SELECT * from travel_master_tbl where emp_id = $1 and project_id = $2 and del_flg = $3 and request_status NOT IN ($4,$5,$6,$7,$8,$9)", [emp_id, pid, 'N', 'CAN', 'RJF', 'RJD', 'RJM', 'CPF', 'CAF'], function (err, masterTblcheck) {
                if (err) {
                    console.error('Error with table query', err);
                } else {
                    console.log("masterTblcheck.rowCount::", masterTblcheck.rowCount);
                    // console.log("result:masterTblcheck:::", masterTblcheck);
                }
                if (valDateLoc.rowCount != 0 || masterTblcheck.rowCount != 0) {
                    console.log(":either of  rowcount !==0::::::");
                    if (valDateLoc.rowCount != 0) {
                        console.log(":if valDateLoc.rowCount !==0::::::");
                        for (i = 0; i < valDateLoc.rowCount; i++) {

                            console.log("inside valDateLoc validation for loop:::");
                            val_from_date = format(valDateLoc.rows[i].from_date, 'yyyy-MM-dd');
                            console.log("from_date", val_from_date);
                            val_from_location = valDateLoc.rows[i].from_location;

                            console.log("from_location ::val_from_location:", val_from_location);
                            var duration = moment.duration(moment(travelDate).diff(moment(val_from_date)));
                            var days = duration.asDays();
                            console.log("days ::val_from_location:", days);
                            //	if ( travelDate == val_from_date && fromLoc ==  val_from_location){
                            if (days == 0 && fromLoc.toUpperCase() == val_from_location) {
                                console.log("***********INSIDE VAL IF*************");
                                notification: "Travel request  with  same travel date for the same location has been raised already"
                                valFlag = true;

                            }
                            else {
                                valFlag = false;
                                if (masterTblcheck.rowCount == 0) {
                                    masterTblFlag = false;
                                }
                            }
                            console.log("11111111::valFlag:::", valFlag);
                            if (valFlag == true) {
                                console.log("::::@@@@@@@@:::");
                                break;
                            }
                        }
                    }
                    if (masterTblcheck.rowCount != 0) {
                        console.log(":if masterTblcheck.rowCount !==0::::::");
                        for (i = 0; i < masterTblcheck.rowCount; i++) {

                            console.log("inside masterTblcheck validation for loop:::");
                            val_from_date = masterTblcheck.rows[i].from_date;
                            console.log("from_date::masterTblcheck::", val_from_date);
                            val_from_location = masterTblcheck.rows[i].from_location;

                            console.log("from_location ::masterTblcheck:", val_from_location);
                            var duration1 = moment.duration(moment(travelDate).diff(moment(val_from_date)));
                            var days1 = duration1.asDays();
                            console.log("days ::masterTblcheck:", days);
                            //	if ( travelDate == val_from_date && fromLoc ==  val_from_location){
                            if (days1 <= 0 && fromLoc == val_from_location) {
                                console.log("***********INSIDE masterTblcheck IF*************");
                                notification: ('error', "Travel request  with  same travel date for the same location has been raised already");
                                masterTblFlag = true;
                            }
                            else {
                                masterTblFlag = false;
                                if (valDateLoc.rowCount == 0) {
                                    valFlag = false;
                                }
                            }
                            console.log("11111111::masterTblFlag:::", masterTblFlag);
                            if (masterTblFlag == true) {
                                console.log("::::@@@@masterTblFlag@@@@:::");
                                break;
                            }
                        }
                    } console.log("22222222::valFlag:::", valFlag);
                    console.log("22222222::masterTblFlag:::", masterTblFlag);
                    if (valFlag == true && masterTblFlag == true) {
                        checkFlag = true;
                    }
                    if (valFlag == true && masterTblFlag == false) {
                        checkFlag = true;
                    }
                    if (valFlag == false && masterTblFlag == true) {
                        checkFlag = true;
                        console.log("inside flag if condition check OR::::", checkFlag);
                    }
                    if (valFlag == false && masterTblFlag == false) {

                        checkFlag = false;
                        console.log("inside flag else condition check::::", checkFlag);
                    }
                }
                if (valDateLoc.rowCount == 0 && masterTblcheck.rowCount == 0) {
                    checkFlag = false;
                }
                console.log("11111111::checkFlag:::", checkFlag);
                if (checkFlag == true) {
                    console.log("checkFlag::::truetruetruetrue");

                    res.json({ message: 'travelModule/travel', notification: "Travel request  with  same travel date for the same location has been raised already" });
                }
                else if (checkFlag == false) {

                    console.log("checkFlag::::falsefalsefalsefalsefalse");

                    pool.query("SELECT emp_id, emp_name from emp_master_tbl where emp_id IN (SELECT emp_reporting_mgr from project_alloc_tbl where emp_id = $1 and project_id = $2)", [emp_id, pid], function (err, result2) {
                        if (err) {
                            console.error('Error with table query', err);
                        } else {
                            empname = result2.rows['0'].emp_name;
                            console.log("empName", empName);
                            approverid = result2.rows['0'].emp_id;
                            console.log("approverid ::HII:", approverid);

                        }



                        pool.query("SELECT * from travel_master_tbl_temp", function (err, resultset) {
                            if (err) throw err;
                            rcount = resultset.rowCount;
                            console.log("rcount", rcount);
                            var seq = "travelreq";


                            pool.query("select nextval($1)::text code1", [seq], function (err, result) {
                                if (err) throw err;
                                code1 = result.rows['0'].code1;
                                console.log("select done");
                                console.log("code1", code1);
                                console.log("code1", code1);
                                req_id = code1;
                                console.log("req_id after generating", req_id);
                                console.log("approverid after generating", approverid);
                                console.log("tenDate", tenDate);
                                console.log("tenDate.length", tenDate.length);
                                //tenDate=tenDate.toString();
                                console.log("tenDate.length", tenDate.length);

                                if (tenDate.length != "0") {
                                    console.log("tenDate", tenDate);
                                    pool.query("INSERT INTO travel_master_tbl_temp(req_id,emp_id,emp_name,emp_access,project_id,from_date,to_date,from_location,to_location,remarks,approver_id,del_flg,rcre_user_id,rcre_time,lchg_user_id,lchg_time,modify_flg,request_status) values($1,$2,$3,$4,$5,$6,$7,upper($8),upper($9),upper($10),$11,$12,$13,$14,$15,$16,$17,$18)", [req_id, emp_id, empname, empaccess, pid, travelDate, tenDate, fromLoc, toLoc, rmks, approverid, 'N', rcreuserid, rcretime, lchguserid, lchgtime, 'N', 'SUB'], function (err, done) {
                                        if (err) throw err;
                                        //  req.flash('success',"Travel request has been submitted successfully with Request Id:"+ req_id +".");
                                        // res.redirect('/travelModule/travelCyber');
                                        //res.redirect(req.get('referer'));
                                        //  res.redirect('/travelModule/travel/travel');

                                        pool.query("INSERT INTO travel_master_tbl_hist(select * from travel_master_tbl_temp where req_id=$1)", [req_id], function (err, done) {
                                            if (err) throw err;
                                            success = "Travel request has been initiated successfully with Request Id:" + req_id + ".";


                                            console.log("emp_id", emp_id);
                                            console.log("req_id inside loop1", req_id);
                                            pool.query("SELECT * FROM travel_master_tbl_temp WHERE emp_id = $1 AND req_id = $2", [emp_id, req_id], function (err, resultValue) {
                                                if (err) throw err;
                                                var rcount = resultValue.rowCount;
                                                console.log("Inside count", rcount);


                                                var row = resultValue.rows[0]; // Access the first row of the result set

                                                var emp_id = row.emp_id;
                                                var emp_name = row.emp_name;
                                                var emp_access = row.emp_access;
                                                var project_id = row.project_id;
                                                var from_date = row.from_date;
                                                var to_date = row.to_date;
                                                var from_location = row.from_location;
                                                var to_location = row.to_location;
                                                var remarks = row.remarks;
                                                var pnr_number = row.pnr_number;
                                                var free_text_1 = row.free_text_1;
                                                var ticket_number = row.ticket_number;

                                                // Do something with the retrieved data here
                                                // For example, you can use the variables above or call a function with these variables as arguments



                                                pool.query("SELECT emp_id, emp_name from emp_master_tbl where emp_id IN (SELECT emp_reporting_mgr from project_alloc_tbl where emp_id = $1 and project_id =$2 )", [emp_id, pid], function (err, result) {
                                                    if (err) {
                                                        console.error('Error with table query1', err);
                                                    } else {
                                                        //   var empName = result.rows['0'].emp_name;
                                                        empName = result.rows['0'].emp_name;
                                                        console.log("empName", empName);
                                                        approverid = result.rows['0'].emp_id;
                                                        console.log('hii APPVER', approverid);
                                                    }


                                                    //  from_date = from_date.toDateString();
                                                    //  to_date = to_date.toDateString();

                                                    pool.query("select emp_name , emp_email from emp_master_tbl where emp_id in (select approver_id from travel_master_tbl_temp where req_id=$1)", [req_id], function (err, empResult) {
                                                        if (err) {
                                                            console.error('Error with table query', err);
                                                        } else {
                                                            approver_name = empResult.rows['0'].emp_name;
                                                            approver_email = empResult.rows['0'].emp_email;
                                                            console.log('manager name ', approver_name);
                                                            console.log('manager id ', approver_email);
                                                        }
                                                        console.log('smtpTransport call ');
                                                        const transporter = nodemailer.createTransport({
                                                            service: 'gmail',
                                                            auth: {
                                                                user: 'mohammadsab@minorks.com',
                                                                pass: '9591788719'
                                                            }
                                                        });
                                                        const mailOptions = {
                                                            from: 'mohammadsab@minorks.com',
                                                            to: approver_email,

                                                            from: 'amber@nurture.co.in',
                                                            subject: 'Travel Request notification',
                                                            text: 'Travel Request ' + req_id + ' has been raised for your approval with' + project_id + ' to travel from  ' + fromLoc + '  to ' + toLoc + ' on ' + from_date + ' for employee ' + empname + '(' + emp_id + ').\n' + '.  \n' + '\n' + '\n' + '\n' + '\n' + ' - Travel Request System'
                                                            // text: 'This is a test email sent from Node.js using Nodemailer.'
                                                        };


                                                        console.log('mailOptions', mailOptions);
                                                        transporter.sendMail(mailOptions, function (error, info) {
                                                            if (error) {
                                                                console.error('Error sending email', error);
                                                            } else {
                                                                console.log('Email sent:', info.response);
                                                            }


                                                        });

                                                        res.json({
                                                            message: 'travelModule/travelCyber', data: {

                                                                emp_id: emp_id,
                                                                emp_name: empname,
                                                                empName: empName,
                                                                project_id: project_id,
                                                                emp_access: emp_access,
                                                                from_date: from_date,
                                                                to_date: to_date,
                                                                from_location: from_location,
                                                                to_location: to_location,
                                                                remarks: remarks,
                                                                success: success,
                                                                approverid: approverid,
                                                                pnr_number: pnr_number,
                                                                free_text_1: free_text_1,
                                                                ticket_number: ticket_number,
                                                               

                                                            },notification: success
                                                        });

                                                    });
                                                });
                                            });
                                        });
                                    });
                                }




                                console.log("req_id", req_id);

                                if (tenDate.length == "0") {
                                    console.log("inside else tenDate", tenDate);
                                    pool.query("INSERT INTO travel_master_tbl_temp(req_id,emp_id,emp_name,emp_access,project_id,from_date,from_location,to_location,remarks,approver_id,del_flg,rcre_user_id,rcre_time,lchg_user_id,lchg_time,modify_flg,request_status) values($1,$2,$3,$4,$5,$6,$7,upper($8),upper($9),upper($10),$11,$12,$13,$14,$15,$16,$17)", [req_id, emp_id, empname, empaccess, pid, travelDate, fromLoc, toLoc, rmks, approverid, 'N', rcreuserid, rcretime, lchguserid, lchgtime, 'N', 'SUB'], function (err, done) {
                                        if (err) throw err;
                                        else {

                                        }
                                        //req.flash('success',"Travel request has been rised Successfully with request_id:"+ req_id +".");
                                        // res.redirect('/travelModule/travelCyber');
                                        //res.redirect(req.get('referer'));
                                        //  res.redirect('/travelModule/travel/travel');
                                        pool.query("INSERT INTO travel_master_tbl_hist(select * from travel_master_tbl_temp where req_id=$1)", [req_id], function (err, done) {
                                            if (err) throw err;

                                            console.log("emp_id", emp_id);
                                            console.log("req_id", req_id);
                                            pool.query("SELECT req_id,emp_id,emp_name,emp_access,project_id,from_date,to_date,from_location,to_location,remarks,approver_id,del_flg,rcre_user_id,rcre_time,lchg_user_id,lchg_time,free_text_1,pnr_number,ticket_number from travel_master_tbl_temp where emp_id = LOWER($1) and req_id=$2", [emp_id, req_id], function (err, resultValue) {
                                                if (err) throw err;
                                                //var emp_id=resultValue.rows;
                                                var rcount = resultValue.rowCount;
                                                console.log("Inside count", rcount);
                                                //console.log("emp_id",emp_id);


                                                var emp_id = resultValue.rows['0'].emp_id;
                                                var emp_name = resultValue.rows['0'].emp_name;
                                                var emp_access = resultValue.rows['0'].emp_access;
                                                var project_id = resultValue.rows['0'].project_id;
                                                var from_date = resultValue.rows['0'].from_date;
                                                var to_date = resultValue.rows['0'].to_date;
                                                var from_location = resultValue.rows['0'].from_location;
                                                var to_location = resultValue.rows['0'].to_location;
                                                var remarks = resultValue.rows['0'].remarks;
                                                var pnr_number = resultValue.rows['0'].pnr_number;
                                                var free_text_1 = resultValue.rows['0'].free_text_1;
                                                var ticket_number = resultValue.rows['0'].ticket_number;

                                                pool.query("SELECT emp_id, emp_name from emp_master_tbl where emp_id in (SELECT emp_reporting_mgr from project_alloc_tbl where emp_id=LOWER($1) and project_id=$2)", [emp_id, pid], function (err, result) {
                                                    if (err) {
                                                        console.error('Error with table query1', err);
                                                    } else {
                                                        empName = result.rows['0'].emp_name;
                                                        console.log("empName", empName);
                                                        approverid = result.rows['0'].emp_id;
                                                        console.log('hii', approverid);
                                                    }
                                                    success = "Travel request has been initiated successfully with Request Id:" + req_id + ".";
                                                    req.flash('success', "Travel request has been initiated Successfully with request_id:" + req_id + ".");

                                                    // from_date = from_date.toDateString();

                                                    pool.query("select emp_name , emp_email from emp_master_tbl where emp_id in (select approver_id from travel_master_tbl_temp where req_id=$1)", [req_id], function (err, empResult) {
                                                        if (err) {
                                                            console.error('Error with table query', err);
                                                        } else {
                                                            approver_name = empResult.rows['0'].emp_name;
                                                            approver_email = empResult.rows['0'].emp_email;
                                                            console.log('manager name ', approver_name);
                                                            console.log('manager id ', approver_email);
                                                        }
                                                        console.log('smtpTransport call ');
                                                        var smtpTransport = nodemailer.createTransport('SMTP', {
                                                            service: 'gmail',
                                                            auth: {
                                                                user: 'amber@nurture.co.in',
                                                                pass: 'nurture@123'
                                                            }
                                                        });
                                                        var mailOptions = {
                                                            to: approver_email,

                                                            from: 'amber@nurture.co.in',
                                                            subject: 'Travel Request notification',
                                                            text: 'Travel Request ' + req_id + ' has been raised for your approval with' + project_id + ' to travel from  ' + fromLoc + '  to ' + toLoc + ' on ' + from_date + ' for employee ' + empname + '(' + emp_id + ').\n' + '.  \n' + '\n' + '\n' + '\n' + '\n' + ' - Travel Request System'
                                                        };
                                                        console.log('mailOptions', mailOptions);
                                                        smtpTransport.sendMail(mailOptions, function (err) { });
                                                        // from_date= from_date.toDateString();
                                                        //to_date= to_date.toDateString();
                                                        res.render('travelModule/travelCyber', {

                                                            emp_id: emp_id,
                                                            emp_name: empname,
                                                            approverid: approverid,
                                                            empName: empName,
                                                            project_id: project_id,
                                                            emp_access: emp_access,
                                                            from_date: from_date,
                                                            to_date: to_date,
                                                            from_location: from_location,
                                                            to_location: to_location,
                                                            remarks: remarks,
                                                            success: success,
                                                            pnr_number: pnr_number,
                                                            free_text_1: free_text_1,
                                                            ticket_number: ticket_number,
                                                            newError: newError
                                                        });
                                                    });
                                                });

                                            });
                                        });
                                    });

                                };
                            });
                        });

                    });


                }

            });

        });

    }


};
module.exports = router;