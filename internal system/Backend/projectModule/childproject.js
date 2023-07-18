console.log("child enterd");
var express = require('express');
var multer = require('multer');
var app = express();
var util = require('util');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var pool = require('./../Database/dbconfig');
var nodemailer = require('nodemailer');
const { log } = require('console');
const { AsyncLocalStorage } = require('async_hooks');
router.use(express.json())



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// Child Project Add (GET) ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/childproject', function (req, res) {
	var empId = req.body.empid;
	console.log(empId);
	pool.query("SELECT user_type from users where user_id = $1", [empId], function (err, result) {
		console.log(result);
		var emp_access = result.rows[0].user_type;
		console.log(emp_access);

		if (emp_access != "L3") {
			res.json({ message: "redirect ot dashboard" })


			pool.query("SELECT emp_id from emp_master_tbl ", function (err, result) {
				var employee = result.rows;
				var empid_count = result.rowCount;
				console.log("empid:::", employee);
				console.log("empid_count:::", empid_count);

				pool.query("SELECT emp_name from emp_master_tbl ", function (err, result) {
					var empname = result.rows;
					var empname_count = result.rowCount;
					console.log("empname:::", empname);
					console.log("empname_count:::", empname_count);


					pool.query("SELECT customer_id from customer_master_tbl ", function (err, result) {
						var customer_id = result.rows;
						var customer_count = result.rowCount;
						console.log("cid:::", customer_id);
						console.log("cid_count:::", customer_count);

						pool.query("SELECT customer_name from customer_master_tbl order by customer_id asc", function (err, result) {
							var customer_name = result.rows;
							var customername_count = result.rowCount;
							console.log("cname:::", customer_name);
							console.log("cidname_count:::", customername_count);

							pool.query("SELECT comm_code_id from common_code_tbl where code_id = 'CUS' order by comm_code_id asc", function (err, result) {
								var comm_code_id = result.rows;
								var comm_code_id_count = result.rowCount;
								console.log("classid:::", comm_code_id);
								console.log("classid_count:::", comm_code_id_count);

								pool.query("SELECT comm_code_desc from common_code_tbl where code_id = 'CUS'  order by comm_code_id asc", function (err, result) {
									var comm_code_desc = result.rows;
									var comm_code_desc_count = result.rowCount;
									console.log("classdesc::", comm_code_desc);
									console.log("classdesc_count:::", comm_code_desc_count);

									pool.query("SELECT comm_code_id from common_code_tbl where code_id = 'PCR'  order by comm_code_id asc", function (err, result) {
										var comm_code_pcr = result.rows;
										var comm_code_pcr_count = result.rowCount;
										console.log("classdesc::", comm_code_pcr);
										console.log("classdesc_count:::", comm_code_pcr_count);

										pool.query("SELECT comm_code_id,comm_code_desc from common_code_tbl where code_id = 'PTY'  order by comm_code_id asc", function (err, result) {
											var comm_code_pty = result.rows;
											var comm_code_pty_count = result.rowCount;
											console.log("classdesc::", comm_code_pty);
											console.log("classdesc_count:::", comm_code_pty_count);

											pool.query("SELECT comm_code_id,comm_code_desc from common_code_tbl where code_id = 'TNU'  order by comm_code_id asc", function (err, result) {
												comm_code_tnu = result.rows;
												comm_code_tnu_count = result.rowCount;
												console.log("classdesc::", comm_code_tnu);
												console.log("classdesc_count:::", comm_code_tnu_count);

												pool.query("SELECT emp_name from emp_master_tbl where emp_access in ('L1','L2') order by emp_id asc", function (err, result) {
													var delname = result.rows;
													var delname_count = result.rowCount;
													console.log("delname:::", delname);
													console.log("delname_count:::", delname_count);

													pool.query("SELECT emp_id from emp_master_tbl where emp_access in ('L1','L2') order by emp_id asc", function (err, result) {
														var delid = result.rows;
														var delid_count = result.rowCount;
														console.log("delid:::", delid);
														console.log("delid_count:::", delid_count);

														pool.query("SELECT comm_code_id,comm_code_desc from common_code_tbl where code_id = 'PAT' order by comm_code_id asc", function (err, result) {
															var comm_paymentype = result.rows;
															var comm_paymentype_count = result.rowCount;
															console.log("classpayment:::", comm_paymentype);
															console.log("classpayment_count:::", comm_paymentype_count);

															pool.query("select project_id from project_master_tbl where closure_flg='N'  order by project_id asc ", function (err, result) {
																// and chld_flg='N' --->this coloumn is not present in a table
																var parpid = result.rows;
																var parpid_count = result.rowCount;
																console.log("at end");

																res.json({
																	message: 'redirect to child project',
																	data: {

																		emp_access: emp_access,
																		// ename: req.user.rows['0'].user_name,
																		// eid: req.user.rows['0'].user_id,
																		parpid: parpid,
																		parpid_count: parpid_count,
																		employee: employee,
																		empid_count: empid_count,
																		empname: empname,
																		customer_id: customer_id,
																		customer_count: customer_count,
																		customer_name: customer_name,
																		comm_code_id: comm_code_id,
																		comm_code_id_count: comm_code_id_count,
																		comm_code_desc: comm_code_desc,
																		comm_code_pcr: comm_code_pcr,
																		comm_code_pcr_count: comm_code_pcr_count,
																		comm_code_pty: comm_code_pty,
																		comm_code_pty_count: comm_code_pty_count,
																		comm_code_tnu: comm_code_tnu,
																		comm_code_tnu_count: comm_code_tnu_count,
																		delname_count: delname_count,
																		delname: delname,
																		delid: delid,
																		delid_count: delid_count,
																		comm_paymentype_count: comm_paymentype_count,
																		comm_paymentype: comm_paymentype
																	}
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		}

	});
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// Child Parent Project Fetch ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/fetchDet', (req, res) => {

	var parpid = req.query.parpid;

	console.log("project id", parpid);
	pool.query("select cid,delivery_mgr,payment_type,customer_class,team_size,project_mgr,project_type,project_curr,bill_addrline1,bill_addrline2,bill_country,bill_city,bill_pin_code,project_loc,perdium_amount_per_day,perdium_curr_per_day from project_master_tbl where project_id=$1", [parpid], function (err, result) {
		console.log(result.rows);
		// console.log(result);
		const cid = result.rows[0].cid
		console.log(cid);
		var delmgr = result.rows[0].delivery_mgr;
		var paymenttype = result.rows[0].payment_type;
		console.log("paymenttype", paymenttype);
		var classid = result.rows[0].customer_class;
		var projectsize = result.rows[0].team_size;
		var projmgr = result.rows[0].project_mgr;
		var projtype = result.rows[0].project_type;
		var projcur = result.rows[0].project_curr;
		var clientaddr1 = result.rows[0].bill_addrline1;
		var clientaddr2 = result.rows[0].bill_addrline2;
		var countryId = result.rows[0].bill_country;
		var cityId = result.rows[0].bill_city;
		var pincode = result.rows[0].bill_pin_code;
		var perloc = result.rows[0].project_loc;
		var perdiumamt = result.rows[0].perdium_amount_per_day;
		var perprocurr = result.rows[0].perdium_curr_per_day;

		pool.query("SELECT customer_id,customer_name from customer_master_tbl where customer_id=$1", [cid], function (err, result) {
			var customer_name = result.rows['0'].customer_name;
			var cid = result.rows['0'].customer_id;
			var cid = cid + "-" + customer_name;

			pool.query("SELECT emp_id,emp_name from emp_master_tbl where emp_id=$1", [delmgr], function (err, result) {
				var delmgr_name = result.rows['0'].emp_name;
				var delmgr = result.rows['0'].emp_id;
				var delmgr = delmgr + "-" + delmgr_name;

				pool.query("SELECT comm_code_id,comm_code_desc from common_code_tbl where code_id = 'CUS' and comm_code_id=$1", [classid], function (err, result) {
					var class_id_name = result.rows['0'].comm_code_desc;
					var classid = result.rows['0'].comm_code_id;
					var classid = classid + "-" + class_id_name;

					pool.query("SELECT comm_code_id,comm_code_desc from common_code_tbl where code_id = 'PTY' and comm_code_id=$1", [projtype], function (err, result) {
						var project_type_name = result.rows['0'].comm_code_desc;
						var projtype = result.rows['0'].comm_code_id;
						var projtype = projtype + "-" + project_type_name;


						res.json({ key: cid, key1: delmgr, key2: paymenttype, key3: classid, key4: projectsize, key5: projmgr, key6: projtype, key7: projcur, key8: clientaddr1, key9: clientaddr2, key10: countryId, key11: cityId, key12: pincode, key13: perloc, key14: perdiumamt, key15: perprocurr, key16: parpid });

					});
				});
			});
		});

	});
})




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// Child Project Add (POST) //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// router.post('/addchildproject', (req, res) => {
// 	console.log(req.body);
// 	var empId = req.user_id;
// 	var eid = req.user_id;
// 	var now = new Date();
// 	var rcreuserid = empId;
// 	var rcretime = now;
// 	var lchguserid = empId;
// 	var lchgtime = now;
// 	var parpid = req.body.parpid1;
// 	console.log(parpid);
// 	var paymenttype = req.body.paymenttype;
// 	var projectsize = req.body.projectsize;
// 	var projectmgr = req.body.projmgr;
// 	var projcur = req.body.projcur;
// 	var projsdate = req.body.projsdate;
// 	var projcdate = req.body.projcdate;
// 	var Projbud = req.body.Projbud;
// 	var targmar = req.body.targmar;
// 	var Totalbud = req.body.Totalbud;
// 	var salary = req.body.salary;
// 	var perdium = req.body.perdium;
// 	var travel = req.body.travel;
// 	var other = req.body.other;
// 	var module = req.body.module;
// 	var nousers = req.body.nousers;
// 	var nobranch = req.body.nobranch;
// 	var fpexpdate = req.body.fpexpdate;
// 	var millength = req.body.millength;

// 	if (fpexpdate == "") {
// 		var fpexpdate = null;
// 	}

// 	var tenure = req.body.tenure;
// 	var projexpdate = req.body.projexpdate;

// 	if (projexpdate == "") {
// 		var projexpdate = null;
// 	}

// 	var subper = req.body.subper;
// 	var subamt = req.body.subamt;
// 	var povalue = req.body.povalue;
// 	var Noofppl = req.body.Noofppl;
// 	var perloc = req.body.perloc;
// 	var perdiumamt = req.body.perdiumamt;
// 	var percur = req.body.percur;
// 	var rateamt = req.body.rateamt;
// 	var ponumber = req.body.ponumber;
// 	var rmks = req.body.rmks;
// 	var perloc = req.body.perloc;
// 	var perdiumamt = req.body.perdiumamt;
// 	var perprocurr = req.body.perprocurr;
// 	var salarycurr = req.body.salarycurr;
// 	var perdiemamtcurr = req.body.perdiemamtcurr;
// 	var travelamtcurr = req.body.travelamtcurr;
// 	var otheramtcurr = req.body.otheramtcurr;
// 	var projectid = 0;
// 	var milcount = 0;
// 	var datetime = new Date();
// 	var salrate = req.body.salrate;
// 	var perrate = req.body.perrate;
// 	var travelrate = req.body.travelrate;
// 	var otherrate = req.body.otherrate;
// 	var salconamt = req.body.salconamt;
// 	var perconamt = req.body.perconamt;
// 	var traconamt = req.body.traconamt;
// 	var othconamt = req.body.othconamt;


// 	pool.query("select cid,delivery_mgr,customer_class,team_size,project_type,bill_addrline1,bill_addrline2,bill_country,bill_city,bill_pin_code from project_master_tbl where project_id=$1", [parpid], function (err, result) {
// 		console.log(result);
// 		var cid = result.rows[0].cid
// 		var delmgr = result.rows[0].delivery_mgr;
// 		var classid = result.rows[0].customer_class;
// 		var projectsize = result.rows[0].team_size;
// 		var projtype = result.rows[0].project_type;
// 		var clientaddr1 = result.rows[0].bill_addrline1;
// 		var clientaddr2 = result.rows[0].bill_addrline2;
// 		var countryId = result.rows[0].bill_country;
// 		var cityId = result.rows[0].bill_city;
// 		var pincode = result.rows[0].bill_pin_code;


// 		pool.query("SELECT chld_cnt from project_master_tbl where project_id = $1", [parpid], function (err, result) {
// 			if (err) throw err;

// 			var proj_count = result.rows[0].chld_cnt;
// 			console.log("child count", proj_count);

// 			if (proj_count == 0) {
// 				proj_count = 1;
// 			}
// 			else {
// 				proj_count = (proj_count - 0) + (1 - 0);
// 			}

// 			projectid = classid + "-" + cid + "-" + projtype + "-" + "C" + "-" + proj_count;
// 			console.log("project id", projectid);

// 			pool.query("SELECT * from project_master_tbl where LOWER(project_id) = LOWER($1)", [projectid], function (err, resultset) {
// 				if (err) throw err;
// 				var rcount = resultset.rowCount;
// 				console.log("rcount", rcount);

// 				if (rcount == 0) {
// 					console.log("inside rcount");

// 					var milname_arr = [];
// 					var caper_arr = [];
// 					var diramt_arr = [];
// 					var milDate_arr = [];

// 					pool.query("INSERT INTO project_master_tbl(project_id,cid,project_loc,payment_type,customer_class,team_size,project_mgr,delivery_mgr,project_type,project_curr,project_budget,target_margin,tot_budget,salary,salarycurr,perdium,perdiumcurr,travel,travelcurr,other_exp,other_expcurr,fl_modules_included,fl_num_users,fl_num_of_branches,start_date,end_date,rcre_user_id,rcre_time,lchg_user_id,lchg_time,del_flg,perdium_amount_per_day,perdium_curr_per_day,bill_addrline1,bill_addrline2,bill_country,bill_city,bill_pin_code,rate,po_number,remarks,closure_flg,sow_upld,chld_flg,chld_parent_prj,salary_rate,perdiem_rate,travel_rate,other_rate,salary_converted_amt,travel_converted_amt,perdiem_converted_amt,other_converted_amt) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53)", [projectid, cid, perloc, paymenttype, classid, projectsize, projectmgr, delmgr, projtype, projcur, Projbud, targmar, Totalbud, salary, salarycurr, perdium, perdiemamtcurr, travel, travelamtcurr, other, otheramtcurr, module, nousers, nobranch, projsdate, projcdate, rcreuserid, rcretime, lchguserid, lchgtime, 'N', perdiumamt, perprocurr, clientaddr1, clientaddr2, countryId, cityId, pincode, rateamt, ponumber, rmks, 'N', 'N', 'Y', parpid, salrate, perrate, travelrate, otherrate, salconamt, perconamt, traconamt, othconamt], function (err, done) {
// 						if (err) throw err;
// 						//var millength1 = (millength - 0) - (1 - 0);

// 						for (i = 0; i < millength; i++) {
// 							var milname = req.body["milname_" + i];
// 							var caper = req.body["caper_" + i];
// 							var diramt = req.body["diramt_" + i];
// 							var milDate = req.body["milDate_" + i];
// 							console.log("name", milname);
// 							console.log("caper", caper);
// 							console.log("diramt", diramt);
// 							console.log("milDate", milDate);

// 							if (typeof milname === 'undefined') {

// 							}
// 							else {
// 								milname_arr.push(milname);
// 								caper_arr.push(caper);
// 								diramt_arr.push(diramt);
// 								milDate_arr.push(milDate);
// 								milcount = (milcount - 0) + (1 - 0);

// 								pool.query("INSERT INTO milestone_proj_tbl(project_id,serial_number,milestone_name,capture_per,direct_amount,milestone_exp_date,del_flg,rcre_user_id,lchg_user_id,rcre_time,lchg_time,confirm_flg,paid_flg,status_flg) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)", [projectid, i, milname, caper, diramt, milDate, 'N', rcreuserid, lchguserid, rcretime, lchgtime, 'N', 'N', 'N'], function (err, done) {
// 									if (err) throw err;
// 								});

// 								pool.query("update project_master_tbl set chld_cnt=$1 where project_id=$2", [proj_count, parpid], function (err, result) {
// 								});

// 							}
// 						}


// 						pool.query("SELECT emp_name from  emp_master_tbl where emp_id=$1 ", [delmgr], function (err, result) {
// 							var delname = result.rows['0'].emp_name;
// 							console.log("delname:::", delname);

// 							pool.query("SELECT emp_name from  emp_master_tbl where emp_id=$1 ", [projectmgr], function (err, result) {
// 								var projmgrname = result.rows['0'].emp_name;
// 								console.log("project manager name:::", projmgrname);

// 								pool.query("SELECT emp_name from  emp_master_tbl where emp_id=$1 ", [rcreuserid], function (err, result) {
// 									var createdgrname = result.rows['0'].emp_name;
// 									console.log("created user name:::", createdgrname);

// 									pool.query("select project_mgr,delivery_mgr from project_master_tbl where project_id=$1", [projectid], function (err, result) {
// 										var projectmgr = result.rows['0'].project_mgr;
// 										var deliverymgr = result.rows['0'].delivery_mgr;
// 										console.log("projectmgr!!!", projectmgr);
// 										console.log("deliverymgr!!", deliverymgr);

// 										pool.query("SELECT emp_email from emp_master_tbl where emp_id =$1", [projectmgr], function (err, result) {
// 											var projectmgremail = result.rows['0'].emp_email;
// 											console.log("projectmgremail--", projectmgremail);

// 											pool.query("SELECT emp_email from emp_master_tbl where emp_id =$1", [deliverymgr], function (err, result) {
// 												var deliverymgremail = result.rows['0'].emp_email;
// 												console.log("deliverymgremail--", deliverymgremail);

// 												pool.query("SELECT reporting_mgr from emp_master_tbl where emp_id=$1", [delmgr], function (err, result) {
// 													var delrpt = result.rows['0'].reporting_mgr;
// 													console.log("delivery manager's manager");

// 													pool.query("SELECT emp_email from emp_master_tbl where emp_id=$1", [delrpt], function (err, result) {
// 														var delrptmail = result.rows['0'].emp_email;
// 														console.log("delivery manager's manager email");


// 														pool.query("SELECT comm_code_desc from common_code_tbl where code_id='FIN'", function (err, result) {
// 															var finemail = result.rows['0'].comm_code_desc;
// 															console.log("finance mail", finemail);

// 															var mailids = projectmgremail + "," + deliverymgremail;
// 															console.log("mailids", mailids);

// 															var cclist = finemail + "," + delrptmail;
// 															console.log("cclist", cclist);


// 															// var smtpTransport = nodemailer.createTransport('SMTP', {
// 															// 	service: 'gmail',
// 															// 	auth:
// 															// 	{
// 															// 		user: 'amber@nurture.co.in',
// 															// 		pass: 'nurture@123'
// 															// 	}
// 															// });

// 															// var mailOptions =
// 															// {
// 															// 	to: mailids,
// 															// 	cc: cclist,
// 															// 	from: 'amber@nurture.co.in',
// 															// 	subject: 'Project Creation Notification ',
// 															// 	text: 'Hi Team ,\n\n' +
// 															// 		' Child Project Creation Details.\n\n' +
// 															// 		' Parent Project ID   : ' + parpid + ' .\n' +
// 															// 		' Child Project ID    : ' + projectid + ' .\n' +
// 															// 		' Delivery manager    : ' + delmgr + '-' + delname + ' .\n' +
// 															// 		' Project manager     : ' + projectmgr + '-' + projmgrname + '\n' +
// 															// 		' Project created by  : ' + rcreuserid + '-' + createdgrname + '.\n\n\n\n' +
// 															// 		'- Regards,\n Amber'
// 															// };

// 															// smtpTransport.sendMail(mailOptions, function (err) {
// 															// });

// 															req.flash('success', "Child Project :" + projectid + " created sucessfully for Parent Project :" + parpid + ".")
// 															res.redirect('/projectModule/childproject/childproject');

// 														});
// 													});
// 												});
// 											});
// 										});
// 									});
// 								});
// 							});
// 						});
// 					});

// 				}
// 				else {
// 					req.flash('error', "Project Details Already Added")
// 					res.redirect(req.get('referer'));
// 				}

// 			});
// 		});
// 	});
// });



////////////////////////////////////add child project///////////////////////////////////////////////////////
// router.post('/addchildproject', (req, res)=> {
// 	console.log(req.body);

// 	var empId = req.body.user_id;
// 	var eid = req.body.user_id;
// 	var now = new Date();
// 	var rcreuserid = empId;
// 	var rcretime = now;
// 	var lchguserid = empId;
// 	var lchgtime = now;
// 	var parpid = req.body.parpid;
// 	var paymenttype = req.body.paymenttype;
// 	var projectsize = req.body.projectsize;
// 	var projectmgr = req.body.projmgr;
// 	var projcur = req.body.projcur;
// 	var projsdate = req.body.projsdate;
// 	var projcdate = req.body.projcdate;
// 	var Projbud = req.body.Projbud;
// 	var targmar = req.body.targmar;
// 	var Totalbud = req.body.Totalbud;
// 	var salary = req.body.salary;
// 	var perdium = req.body.perdium;
// 	var travel = req.body.travel;
// 	var other = req.body.other;
// 	var module = req.body.module;
// 	var nousers = req.body.nousers;
// 	var nobranch = req.body.nobranch;
// 	var fpexpdate = req.body.fpexpdate;
// 	var millength = req.body.millength;

// 	if (fpexpdate == "") {
// 		var fpexpdate = null;
// 	}

// 	var tenure = req.body.tenure;
// 	var projexpdate = req.body.projexpdate;

// 	if (projexpdate == "") {
// 		var projexpdate = null;
// 	}

// 	var subper = req.body.subper;
// 	var subamt = req.body.subamt;
// 	var povalue = req.body.povalue;
// 	var Noofppl = req.body.Noofppl;
// 	var perloc = req.body.perloc;
// 	var perdiumamt = req.body.perdiumamt;
// 	var percur = req.body.percur;
// 	var rateamt = req.body.rateamt;
// 	var ponumber = req.body.ponumber;
// 	var rmks = req.body.rmks;
// 	var perloc = req.body.perloc;
// 	var perdiumamt = req.body.perdiumamt;
// 	var perprocurr = req.body.perprocurr;
// 	var salarycurr = req.body.salarycurr;
// 	var perdiemamtcurr = req.body.perdiemamtcurr;
// 	var travelamtcurr = req.body.travelamtcurr;
// 	var otheramtcurr = req.body.otheramtcurr;
// 	var projectid = 0;
// 	var milcount = 0;
// 	var datetime = new Date();
// 	var salrate = req.body.salrate;
// 	var perrate = req.body.perrate;
// 	var travelrate = req.body.travelrate;
// 	var otherrate = req.body.otherrate;
// 	var salconamt = req.body.salconamt;
// 	var perconamt = req.body.perconamt;
// 	var traconamt = req.body.traconamt;
// 	var othconamt = req.body.othconamt;


// 	pool.query("select cid,delivery_mgr,customer_class,team_size,project_type,bill_addrline1,bill_addrline2,bill_country,bill_city,bill_pin_code from project_master_tbl where project_id=$1", [parpid], function (err, result) {
// 		if (err) {
// 			console.error('Error with table query', err);
// 		}
// 		else {
// 			var cid = result.rows['0'].cid
// 			var delmgr = result.rows['0'].delivery_mgr;
// 			var classid = result.rows['0'].customer_class;
// 			var projectsize = result.rows['0'].team_size;
// 			var projtype = result.rows['0'].project_type;
// 			var clientaddr1 = result.rows['0'].bill_addrline1;
// 			var clientaddr2 = result.rows['0'].bill_addrline2;
// 			var countryId = result.rows['0'].bill_country;
// 			var cityId = result.rows['0'].bill_city;
// 			var pincode = result.rows['0'].bill_pin_code;
// 		}

// 		pool.query("SELECT chld_cnt from project_master_tbl where project_id = $1", [parpid], function (err, result) {
// 			if (err) throw err;

// 			var proj_count = result.rows[0].chld_cnt;
// 			console.log("child count", proj_count);

// 			if (proj_count == 0) {
// 				proj_count = 1;
// 			}
// 			else {
// 				proj_count = (proj_count - 0) + (1 - 0);
// 			}

// 			projectid = classid + "-" + cid + "-" + projtype + "-" + "C" + "-" + proj_count;
// 			console.log("project id", projectid);

// 			pool.query("SELECT * from project_master_tbl where LOWER(project_id) = LOWER($1)", [projectid], function (err, resultset) {
// 				if (err) throw err;
// 				var rcount = resultset.rowCount;
// 				console.log("rcount", rcount);

// 				if (rcount == 0) {
// 					console.log("inside rcount");

// 					var milname_arr = [];
// 					var caper_arr = [];
// 					var diramt_arr = [];
// 					var milDate_arr = [];

// 					pool.query("INSERT INTO project_master_tbl(project_id,cid,project_loc,payment_type,customer_class,team_size,project_mgr,delivery_mgr,project_type,project_curr,project_budget,target_margin,tot_budget,salary,salarycurr,perdium,perdiumcurr,travel,travelcurr,other_exp,other_expcurr,fl_modules_included,fl_num_users,fl_num_of_branches,start_date,end_date,rcre_user_id,rcre_time,lchg_user_id,lchg_time,del_flg,perdium_amount_per_day,perdium_curr_per_day,bill_addrline1,bill_addrline2,bill_country,bill_city,bill_pin_code,rate,po_number,remarks,closure_flg,sow_upld,chld_flg,chld_parent_prj,salary_rate,perdiem_rate,travel_rate,other_rate,salary_converted_amt,travel_converted_amt,perdiem_converted_amt,other_converted_amt) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53)", [projectid, cid, perloc, paymenttype, classid, projectsize, projectmgr, delmgr, projtype, projcur, Projbud, targmar, Totalbud, salary, salarycurr, perdium, perdiemamtcurr, travel, travelamtcurr, other, otheramtcurr, module, nousers, nobranch, projsdate, projcdate, rcreuserid, rcretime, lchguserid, lchgtime, 'N', perdiumamt, perprocurr, clientaddr1, clientaddr2, countryId, cityId, pincode, rateamt, ponumber, rmks, 'N', 'N', 'Y', parpid, salrate, perrate, travelrate, otherrate, salconamt, perconamt, traconamt, othconamt], function (err, done) {
// 						if (err) throw err;
// 						//var millength1 = (millength - 0) - (1 - 0);

// 						for (i = 0; i < millength; i++) {
// 							var milname = req.body["milname_" + i];
// 							var caper = req.body["caper_" + i];
// 							var diramt = req.body["diramt_" + i];
// 							var milDate = req.body["milDate_" + i];
// 							console.log("name", milname);
// 							console.log("caper", caper);
// 							console.log("diramt", diramt);
// 							console.log("milDate", milDate);

// 							if (typeof milname === 'undefined') {

// 							}
// 							else {
// 								milname_arr.push(milname);
// 								caper_arr.push(caper);
// 								diramt_arr.push(diramt);
// 								milDate_arr.push(milDate);
// 								milcount = (milcount - 0) + (1 - 0);

// 								pool.query("INSERT INTO milestone_proj_tbl(project_id,serial_number,milestone_name,capture_per,direct_amount,milestone_exp_date,del_flg,rcre_user_id,lchg_user_id,rcre_time,lchg_time,confirm_flg,paid_flg,status_flg) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)", [projectid, i, milname, caper, diramt, milDate, 'N', rcreuserid, lchguserid, rcretime, lchgtime, 'N', 'N', 'N'], function (err, done) {
// 									if (err) throw err;
// 								});

// 								pool.query("update project_master_tbl set chld_cnt=$1 where project_id=$2", [proj_count, parpid], function (err, result) {
// 								});

// 							}
// 						}


// 						pool.query("SELECT emp_name from  emp_master_tbl where emp_id=$1 ", [delmgr], function (err, result) {
// 							var delname = result.rows['0'].emp_name;
// 							console.log("delname:::", delname);

// 							pool.query("SELECT emp_name from  emp_master_tbl where emp_id=$1 ", [projectmgr], function (err, result) {
// 								var projmgrname = result.rows['0'].emp_name;
// 								console.log("project manager name:::", projmgrname);

// 								pool.query("SELECT emp_name from  emp_master_tbl where emp_id=$1 ", [rcreuserid], function (err, result) {
// 									var createdgrname = result.rows['0'].emp_name;
// 									console.log("created user name:::", createdgrname);

// 									pool.query("select project_mgr,delivery_mgr from project_master_tbl where project_id=$1", [projectid], function (err, result) {
// 										var projectmgr = result.rows['0'].project_mgr;
// 										var deliverymgr = result.rows['0'].delivery_mgr;
// 										console.log("projectmgr!!!", projectmgr);
// 										console.log("deliverymgr!!", deliverymgr);

// 										pool.query("SELECT emp_email from emp_master_tbl where emp_id =$1", [projectmgr], function (err, result) {
// 											var projectmgremail = result.rows['0'].emp_email;
// 											console.log("projectmgremail--", projectmgremail);

// 											pool.query("SELECT emp_email from emp_master_tbl where emp_id =$1", [deliverymgr], function (err, result) {
// 												var deliverymgremail = result.rows['0'].emp_email;
// 												console.log("deliverymgremail--", deliverymgremail);

// 												pool.query("SELECT reporting_mgr from emp_master_tbl where emp_id=$1", [delmgr], function (err, result) {
// 													var delrpt = result.rows['0'].reporting_mgr;
// 													console.log("delivery manager's manager");

// 													pool.query("SELECT emp_email from emp_master_tbl where emp_id=$1", [delrpt], function (err, result) {
// 														var delrptmail = result.rows['0'].emp_email;
// 														console.log("delivery manager's manager email");


// 														pool.query("SELECT comm_code_desc from common_code_tbl where code_id='FIN'", function (err, result) {
// 															var finemail = result.rows['0'].comm_code_desc;
// 															console.log("finance mail", finemail);

// 															var mailids = projectmgremail + "," + deliverymgremail;
// 															console.log("mailids", mailids);

// 															var cclist = finemail + "," + delrptmail;
// 															console.log("cclist", cclist);


// 															// var smtpTransport = nodemailer.createTransport('SMTP', {
// 															// 	service: 'gmail',
// 															// 	auth:
// 															// 	{
// 															// 		user: 'amber@nurture.co.in',
// 															// 		pass: 'nurture@123'
// 															// 	}
// 															// });

// 															// var mailOptions =
// 															// {
// 															// 	to: mailids,
// 															// 	cc: cclist,
// 															// 	from: 'amber@nurture.co.in',
// 															// 	subject: 'Project Creation Notification ',
// 															// 	text: 'Hi Team ,\n\n' +
// 															// 		' Child Project Creation Details.\n\n' +
// 															// 		' Parent Project ID   : ' + parpid + ' .\n' +
// 															// 		' Child Project ID    : ' + projectid + ' .\n' +
// 															// 		' Delivery manager    : ' + delmgr + '-' + delname + ' .\n' +
// 															// 		' Project manager     : ' + projectmgr + '-' + projmgrname + '\n' +
// 															// 		' Project created by  : ' + rcreuserid + '-' + createdgrname + '.\n\n\n\n' +
// 															// 		'- Regards,\n Amber'
// 															// };

// 															// smtpTransport.sendMail(mailOptions, function (err) {
// 															// });
// 															res.json({
// 																notification: "Success child peoject created sucessfully for paret project",
// 																message: "redirect to childproject", 
// 																// Data: userDetails.emp_details
// 															});

// 															// req.flash('success', "Child Project :" + projectid + " created sucessfully for Parent Project :" + parpid + ".")
// 															// res.redirect('/projectModule/childproject/childproject');

// 														});
// 													});
// 												});
// 											});
// 										});
// 									});
// 								});
// 							});
// 						});
// 					});

// 				}
// 				else {
// 					res.json({
// 						notification: "'error', Project Details Already Added",
// 						message: "redirect to childproject", 
// 						// Data: userDetails.emp_details
// 					});
// 					// req.flash('error', "Project Details Already Added")
// 					// res.redirect(req.get('referer'));
// 				}

// 			});
// 		});
// 	});
// });



router.post('/projectAllocation', projectalloc);
function projectalloc(req, res) {

	var now = new Date();
	var rcreuserid = req.body.user_id;
	var rcretime = now;
	var lchguserid = req.body.user_id;
	var lchgtime = now;
	var empsel = req.body.empselected;
	var noofdays = req.body.noofworkingdays;
	var noofmonths = req.body.noofworkingmonths;
	var firstmonthdays = req.body.firstmonthdays;
	var lastmonthdays = req.body.lastmonthdays;
	var firstnoofdays = req.body.firstnoofdays;
	var lastnoofdays = req.body.lastnoofdays;
	var projid = req.body.projid;
	var projman = req.body.projMgr;
	var peralloc = req.body.peralloc;
	var padate = req.body.paDate;
	var pedate = req.body.peDate;
	var employeebillable = req.body.empbill;
	var employeeloc = req.body.emploctype;
	var homecur = req.body.homecur;
	var convRate = req.body.convRate;
	var totempsal = "";
	var ftxt1 = "";
	var ftxt2 = "";
	var ftxt3 = "";
	var errlength = 0;
	var error_flg = "N";
	if (convRate == "") {
		convRate = 1;
	}

	console.log('noofdays', noofdays);
	console.log('noofmonths', noofmonths);
	console.log('firstmonthdays', firstmonthdays);
	console.log('lastmonthdays', lastmonthdays);
	console.log('firstnoofdays', firstnoofdays);
	console.log('lastnoofdays', lastnoofdays);
	console.log("userid", rcreuserid);
	console.log("rtime", rcretime);
	console.log("luserid", lchguserid);
	console.log("ltime", lchgtime);
	console.log("selected", empsel);
	console.log("projectid", projid);
	console.log("projman", projman);
	console.log("%alloc", peralloc);
	console.log("padate", padate);
	console.log("pedate", pedate);
	console.log("homecur", homecur);
	console.log("employeebillable", employeebillable);
	console.log("emplocation", employeeloc);
	console.log("convertionrate", convRate);

	var emplist = empsel.slice(0, -1);
	var arr = emplist.split("-").map(function (val) { return +val + 0; });
	console.log("arrayemp", arr);
	var rArr = arr;
	var i = 0;
	var j = 0;
	emp = "";
	totperalloc = 0;
	perremalloc = 0;
	var totempcnt = 0;
	var totutilizedper = 0;
	var len = arr.length;
	var arraycnt = 0;
	console.log('arr len', len);

	if (len > 1) {
		peralloc = 100;
	}

	pool.query("SELECT sow_upld from project_master_tbl where project_id=$1", [projid], function (err, resultset) {
		if (err) throw err;
		var sow_upld_flg = resultset.rows[0].sow_upld;

		if (sow_upld_flg != "Y") {
			req.flash('error', "Project Allocation cannot be done , Since Project Sow Details have not been Uploaded")
			res.redirect('/projectModule/projectDetails/projectAllocation');
		}
		else {
			pool.query("SELECT  comm_code_desc from common_code_tbl where del_flg='N' and code_id ='MAIL' and comm_code_id = 'PROJ' ", function (err, resultset) {
				if (err) throw err;
				var mail1 = resultset.rows[0].comm_code_desc;
				console.log('mail1', mail1);


				pool.query("select emp_email from emp_master_tbl where emp_id =$1", [rcreuserid], function (err, resultset) {
					if (err) throw err;
					var mail = resultset.rows[0].emp_email;

					pool.query("SELECT  count(*) as cnt from project_master_tbl where closure_flg='N' and project_id =$1 and start_date<=$2", [projid, padate], function (err, resultset) {
						if (err) throw err;
						var count = resultset.rows[0].cnt;

						if (count == 0) {
							error_flg = "Y";
						}

						pool.query("SELECT  count(*) as cnt from project_master_tbl where closure_flg='N' and project_id =$1 and end_date>=$2", [projid, pedate], function (err, resultset) {
							if (err) throw err;
							var cnt = resultset.rows[0].cnt;

							if (cnt == 0) {
								error_flg = "Y";

							}

							pool.query("SELECT salary,project_curr,rate,salarycurr,perdiumcurr,perdium_curr_per_day from project_master_tbl where closure_flg='N' and project_id =$1", [projid], function (err, resultset) {
								if (err) throw err;
								var usablesalary = resultset.rows[0].salary;
								var projcurr = resultset.rows[0].project_curr;
								var rate = resultset.rows[0].rate;
								var salcurr = resultset.rows[0].salarycurr;
								var perdiumcurr = resultset.rows[0].perdiumcurr;
								var perdiumcurrperday = resultset.rows[0].perdium_curr_per_day;

								//	if ( (projcurr == "INR") && (salcurr == "USD") )
								/*		if ( (projcurr == homecur) && (salcurr != homecur) )
										{
											usablesalary = ( usablesalary - 0 ) * ( rate - 0 ); 
										}
										  
										if ( (projcurr != homecur) && (salcurr == homecur) )
										{
											usablesalary = ( usablesalary - 0 ) / ( rate - 0 ); 
										}
										if ( (projcurr == homecur) && (salcurr != homecur) )
										{
											usablesalary = ( usablesalary - 0 ) * ( rate - 0 ); 
										}
										  
										if ( (projcurr != homecur) && (salcurr == homecur) )
										{
											usablesalary = ( usablesalary - 0 ) / ( rate - 0 ); 
										}*/
								usablesalary = (usablesalary - 0) * (convRate - 0);
								console.log(usablesalary);

								pool.query("SELECT sum(salary_reserved) as allocsalary from project_alloc_tbl where project_id =$1 and emp_loc_type='ONSITE' and del_flg='N'", [projid], function (err, resultset) {
									if (err) throw err;
									var allocatedsalary = resultset.rows[0].allocsalary;

									arraycnt = 0;
									var totempsal = 0;

									arr.forEach(function (value) {

										console.log('noofmonths1', noofmonths);
										console.log('firstmonthdays1', firstmonthdays);
										console.log('lastmonthdays1', lastmonthdays);
										console.log('allocatedsalary1', allocatedsalary);
										console.log('firstnoofdays1', firstnoofdays);
										console.log('lastnoofdays1', lastnoofdays);
										console.log('usablesalary', usablesalary);

										//pool.query("select salary from emp_master_tbl where emp_id=$1 group by salary_curr",[value],function(err,resultset){
										pool.query("select salary from emp_master_tbl where emp_id=$1 ", [value], function (err, resultset) {
											if (err) throw err;
											var emp_sal = resultset.rows[0].salary;
											console.log('emp_sal', emp_sal);

											var firstsalperday = (emp_sal - 0) / (firstnoofdays - 0);
											var firstsal = (firstsalperday - 0) * (firstmonthdays - 0);
											console.log('firstsal', firstsal);

											var lastsalperday = (emp_sal - 0) / (lastnoofdays - 0);
											var lastsal = (lastsalperday - 0) * (lastmonthdays - 0);
											console.log('lastsal', lastsal);

											var monthsal = (emp_sal - 0) * (noofmonths - 0);
											console.log('monthsal', monthsal);

											if (noofmonths < 0) {
												lastsal = 0;
												monthsal = 0;
											}

											totempsal = (totempsal - 0) + (firstsal - 0) + (lastsal - 0) + (monthsal - 0);

											arraycnt = (arraycnt - 0) + (1 - 0);

											if ((arraycnt == len) && (error_flg != "Y")) {
												/*  if (projcurr != homecur)
												  {
												  totempsal = ( totempsal - 0 ) / ( rate - 0 ); 
												  }
						  
												  if (projcurr != homecur)
												  {
												  totempsal = ( totempsal - 0 ) / ( rate - 0 ); 
												  }*/
												totempsal = (totempsal - 0) * (convRate - 0);

												totsal = (totempsal - 0) + (allocatedsalary - 0);
												console.log('totsal', totsal);


												if (totsal > usablesalary) {
													var diff = (totsal - 0) - (usablesalary - 0);
													var Budjetdiff = roundTo(diff, 2);

													var smtpTransport = nodemailer.createTransport('SMTP', {
														service: 'gmail',
														auth:
														{
															user: 'amber@nurture.co.in',
															pass: 'nurture@123'
														}
													});

													var mailOptions =
													{
														to: mail1,
														cc: mail,
														from: 'amber@nurture.co.in',
														subject: 'Salary Budjet Exceeding',
														text: 'Hi Team,\n\n' +
															'You are receiving this mail because you (or someone else) has tried modifying employee allocation for:\n' +
															'Project ID' + projid + '\n' +
															'Salary Budget is Exceeding by ' + Budjetdiff + ' ' + projcurr + '\n\n\n\n' +
															'- Regards,\nAmber'
													};

													smtpTransport.sendMail(mailOptions, function (err) {
													});

												}


												if (employeeloc == "ONSITE") {
													pool.query("SELECT perdium,perdium_amount_per_day from project_master_tbl where closure_flg='N' and project_id =$1", [projid], function (err, resultset) {
														if (err) throw err;
														var usableperdium = resultset.rows[0].perdium;
														var locperdium = resultset.rows[0].perdium_amount_per_day;



														/*if ( (projcurr ==homecur ) && (perdiumcurr != homecur) )
														{
															usableperdium = ( usableperdium - 0 ) * ( rate - 0 ); 
														}
													  
														if ( (projcurr != homecur) && (perdiumcurr == homecur) )
														{
															usableperdium = ( usableperdium - 0 ) / ( rate - 0 ); 
														}
												
														if ( (projcurr == homecur) && (perdiumcurrperday != homecur) )
														{
															locperdium = ( locperdium - 0 ) * ( rate - 0 ); 
														}
													  
														if ( (projcurr != homecur) && (perdiumcurrperday ==homecur ) )
														{
															locperdium = ( locperdium - 0 ) / ( rate - 0 ); 
														}
												
												
														if ( (projcurr == homecur) && (perdiumcurr != homecur) )
														{
															usableperdium = ( usableperdium - 0 ) * ( rate - 0 ); 
														}
													  
														if ( (projcurr != homecur) && (perdiumcurr == homecur) )
														{
															usableperdium = ( usableperdium - 0 ) / ( rate - 0 ); 
														}
												
														if ( (projcurr == homecur) && (perdiumcurrperday != homecur) )
														{
															locperdium = ( locperdium - 0 ) * ( rate - 0 ); 
														}
													  
														if ( (projcurr != homecur) && (perdiumcurrperday == homecur) )
														{
															locperdium = ( locperdium - 0 ) / ( rate - 0 ); 
														}*/
														usableperdium = (usableperdium - 0) * (ConvRate - 0);
														locperdium = (locperdium - 0) * (convRate - 0);


														console.log('usableperdium', usableperdium);
														console.log('locperdium', locperdium);

														pool.query("SELECT sum(working_days) as totdays from project_alloc_tbl where project_id =$1 and emp_loc_type='ONSITE' and del_flg='N'", [projid], function (err, resultset) {
															if (err) throw err;
															var workdays = resultset.rows[0].totdays;

															var newworkdays = (len - 0) * (noofdays - 0);
															var totworkdays = (newworkdays - 0) + (workdays - 0);
															totutilizedper = (locperdium - 0) * (totworkdays - 0);

															var reservedperdium = (locperdium - 0) * (noofdays - 0);
															console.log('--------per reserved-----', reservedperdium);
															var empreservedperdium = roundTo(reservedperdium, 2);

															if (totutilizedper > usableperdium) {

																var diff = (totutilizedper - 0) - (usableperdium - 0);
																var Budjetdiff = roundTo(diff, 2);
																var smtpTransport = nodemailer.createTransport('SMTP', {
																	service: 'gmail',
																	auth:
																	{
																		user: 'amber@nurture.co.in',
																		pass: 'nurture@123'
																	}
																});

																var mailOptions = {
																	to: mail1,
																	cc: mail,
																	from: 'amber@nurture.co.in',
																	subject: 'Perdium Budjet Exceeding',
																	text: 'Hi Team,\n' +
																		'You are receiving this because you (or someone else) have tried modifying employee allocation for:\n' +
																		'Project ID' + projid + '\n' +
																		'Perdium Budget is exceeding by ' + Budjetdiff + ' ' + projcurr + '\n\n\n\n' +
																		'- Regards,\nAmber'
																};

																smtpTransport.sendMail(mailOptions, function (err) {
																});
															}


															if (error_flg != "Y") {
																arr.forEach(function (value) {


																	pool.query("select salary from emp_master_tbl where emp_id=$1", [value], function (err, resultset) {
																		if (err) throw err;
																		var emp_sal = resultset.rows[0].salary;
																		console.log('emp_sal', emp_sal);
																		var firstsalperday = (emp_sal - 0) / (firstnoofdays - 0);
																		var firstsal = (firstsalperday - 0) * (firstmonthdays - 0);
																		console.log('firstsal', firstsal);

																		var lastsalperday = (emp_sal - 0) / (lastnoofdays - 0);
																		var lastsal = (lastsalperday - 0) * (lastmonthdays - 0);
																		console.log('lastsal', lastsal);

																		var monthsal = (emp_sal - 0) * (noofmonths - 0);
																		console.log('monthsal', monthsal);

																		if (noofmonths < 0) {
																			lastsal = 0;
																			monthsal = 0;

																		}



																		var reservedsal = (firstsal - 0) + (lastsal - 0) + (monthsal - 0);

																		/*if (projcurr != homecur)
																		{
																			reservedsal = ( reservedsal - 0 ) / ( rate - 0 ); 
																		}*/
																		reservedsal = (resrevedsal - 0) * (convRate - 0);

																		/*if (projcurr == "GBP")
																		if (projcurr != homecur)
																		{
																			reservedsal = ( reservedsal - 0 ) / ( rate - 0 ); 
																		}*/
																		var empreservedsal = roundTo(reservedsal, 2);
																		console.log(' employee salary reserved', empreservedsal);

																		pool.query("SELECT  count(*) as cnt from project_alloc_tbl  where del_flg='N' and emp_id =$1 and project_id =$2", [value, projid], function (err, resultset) {
																			if (err) throw err;
																			var ecount = resultset.rows[0].cnt;
																			console.log('ecount', ecount);
																			if (ecount == 0) {
																				pool.query("SELECT  count(*) as cnt from project_alloc_tbl  where del_flg='N' and emp_id =$1", [value], function (err, resultset) {
																					if (err) throw err;
																					var rcount = resultset.rows[0].cnt;
																					if (rcount > 0) {
																						pool.query("select sum(percentage_alloc) as salloc from project_alloc_tbl WHERE del_flg='N' and emp_id=$1", [value], function (err, result) {
																							if (err) throw err;
																							var sAlloc = result.rows[0].salloc;
																							console.log('sumalloc', sAlloc);
																							totperalloc = (sAlloc - 0) + (peralloc - 0);
																							perremalloc = (100 - 0) - (sAlloc - 0)
																							if (totperalloc < 100) {
																								pool.query("INSERT INTO public.project_alloc_tbl(project_id, emp_id,emp_loc_type, emp_reporting_mgr, project_allocation_date, emp_billable_flg, emp_project_relieving_date, rcre_user_id, rcre_time, lchg_user_id, lchg_time, del_flg, free_text_1, free_text_2, free_text_3, percentage_alloc,working_days,salary_reserved,perdium_reserved,project_crncy,convertion_rate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)", [projid, value, employeeloc, projman, padate, employeebillable, pedate, rcreuserid, rcretime, lchguserid, lchgtime, 'N', ftxt1, ftxt2, ftxt3, peralloc, noofdays, empreservedsal, empreservedperdium, projcurr, convRate], function (err, result) {
																									if (err) throw err;
																									pool.query("update emp_master_tbl set reporting_mgr=$1,project_id=$2 where emp_id=$3", [projman, projid, value], function (err, done) {
																										if (err) throw err;
																									});
																								});

																							}
																							if (perremalloc > 0) {
																								pool.query("INSERT INTO public.project_alloc_tbl(project_id, emp_id,emp_loc_type, emp_reporting_mgr, project_allocation_date, emp_billable_flg, emp_project_relieving_date, rcre_user_id, rcre_time, lchg_user_id, lchg_time, del_flg, free_text_1, free_text_2, free_text_3, percentage_alloc,working_days,salary_reserved,perdium_reserved,project_crncy,convertion_rate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)", [projid, value, employeeloc, projman, padate, employeebillable, pedate, rcreuserid, rcretime, lchguserid, lchgtime, 'N', ftxt1, ftxt2, ftxt3, perremalloc, noofdays, empreservedsal, empreservedperdium, projcurr, convRate], function (err, result) {
																									if (err) throw err;
																									pool.query("update emp_master_tbl set reporting_mgr=$1,project_id=$2 where emp_id=$3", [projman, projid, value], function (err, done) {
																										if (err) throw err;
																									});
																								});
																							}

																						});
																					}
																					else {
																						pool.query("INSERT INTO public.project_alloc_tbl(project_id, emp_id,emp_loc_type, emp_reporting_mgr, project_allocation_date, emp_billable_flg, emp_project_relieving_date, rcre_user_id, rcre_time, lchg_user_id, lchg_time, del_flg, free_text_1, free_text_2, free_text_3, percentage_alloc,working_days,salary_reserved,perdium_reserved,project_crncy,conertio_rate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)", [projid, value, employeeloc, projman, padate, employeebillable, pedate, rcreuserid, rcretime, lchguserid, lchgtime, 'N', ftxt1, ftxt2, ftxt3, peralloc, noofdays, empreservedsal, empreservedperdium, projcurr, convRate], function (err, result) {
																							if (err) throw err;
																							pool.query("update emp_master_tbl set reporting_mgr=$1,project_id=$2 where emp_id=$3", [projman, projid, value], function (err, done) {
																								if (err) throw err;
																							});
																						});

																					}
																					req.flash('success', "Employees Allocated to " + projid + " successfully")
																					res.redirect(req.get('referer'));
																				});
																			}
																			else {
																				console.log("already allocated");

																			}

																		});

																	});/*salary query*/

																});



															}

														});

													});

												}

												/*For OFFSHORE Location*/
												else {

													var reservedperdium = 0;
													var empreservedperdium = roundTo(reservedperdium, 2);

													arr.forEach(function (value) {

														console.log('in OFFSHORE else');

														var empreservedsal = 0;
														pool.query("select salary from emp_master_tbl where emp_id=$1", [value], function (err, resultset) {
															if (err) throw err;
															var emp_sal = resultset.rows[0].salary;
															console.log('emp_sal', emp_sal);
															var firstsalperday = (emp_sal - 0) / (firstnoofdays - 0);
															var firstsal = (firstsalperday - 0) * (firstmonthdays - 0);
															console.log('firstsal', firstsal);

															var lastsalperday = (emp_sal - 0) / (lastnoofdays - 0);
															var lastsal = (lastsalperday - 0) * (lastmonthdays - 0);
															console.log('lastsal', lastsal);

															var monthsal = (emp_sal - 0) * (noofmonths - 0);
															console.log('monthsal', monthsal);

															if (noofmonths < 0) {
																lastsal = 0;
																monthsal = 0;

															}

															var reservedsal = (firstsal - 0) + (lastsal - 0) + (monthsal - 0);

															/*if (projcurr == "USD")
															{
																reservedsal = ( reservedsal - 0 ) / ( rate - 0 ); 
															}
												
															if (projcurr == "GBP")
															{
																reservedsal = ( reservedsal - 0 ) / ( rate - 0 ); 
															}*/
															reservedsal = (reservedsal - 0) * (convRate - 0);
															var empreservedsal = roundTo(reservedsal, 2);
															console.log(' employee salary reserved', empreservedsal);

															pool.query("SELECT  count(*) as cnt from project_alloc_tbl  where del_flg='N' and emp_id =$1 and project_id =$2", [value, projid], function (err, resultset) {
																if (err) throw err;
																var ecount = resultset.rows[0].cnt;
																console.log('ecount', ecount);
																if (ecount == 0) {
																	pool.query("SELECT  count(*) as cnt from project_alloc_tbl  where del_flg='N' and emp_id =$1", [value], function (err, resultset) {
																		if (err) throw err;
																		var rcount = resultset.rows[0].cnt;
																		if (rcount > 0) {
																			pool.query("select sum(percentage_alloc) as salloc from project_alloc_tbl WHERE del_flg='N' and emp_id=$1", [value], function (err, result) {
																				if (err) throw err;
																				var sAlloc = result.rows[0].salloc;
																				console.log('sumalloc', sAlloc);
																				totperalloc = (sAlloc - 0) + (peralloc - 0);
																				perremalloc = (100 - 0) - (sAlloc - 0)
																				if (totperalloc < 100) {
																					pool.query("INSERT INTO public.project_alloc_tbl(project_id, emp_id,emp_loc_type, emp_reporting_mgr, project_allocation_date, emp_billable_flg, emp_project_relieving_date, rcre_user_id, rcre_time, lchg_user_id, lchg_time, del_flg, free_text_1, free_text_2, free_text_3, percentage_alloc,working_days,salary_reserved,perdium_reserved,project_crncy,convertion_rate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)", [projid, value, employeeloc, projman, padate, employeebillable, pedate, rcreuserid, rcretime, lchguserid, lchgtime, 'N', ftxt1, ftxt2, ftxt3, peralloc, noofdays, empreservedsal, empreservedperdium, projcurr, convRate], function (err, result) {
																						if (err) throw err;
																						pool.query("update emp_master_tbl set reporting_mgr=$1,project_id=$2 where emp_id=$3", [projman, projid, value], function (err, done) {
																							if (err) throw err;
																						});
																					});

																				}
																				if (perremalloc > 0) {
																					pool.query("INSERT INTO public.project_alloc_tbl(project_id, emp_id,emp_loc_type, emp_reporting_mgr, project_allocation_date, emp_billable_flg, emp_project_relieving_date, rcre_user_id, rcre_time, lchg_user_id, lchg_time, del_flg, free_text_1, free_text_2, free_text_3, percentage_alloc,working_days,salary_reserved,perdium_reserved,project_crncy,convertion_rate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)", [projid, value, employeeloc, projman, padate, employeebillable, pedate, rcreuserid, rcretime, lchguserid, lchgtime, 'N', ftxt1, ftxt2, ftxt3, perremalloc, noofdays, empreservedsal, empreservedperdium, projcurr, convRate], function (err, result) {
																						if (err) throw err;
																						pool.query("update emp_master_tbl set reporting_mgr=$1,project_id=$2 where emp_id=$3", [projman, projid, value], function (err, done) {
																							if (err) throw err;
																						});
																					});
																				}

																			});
																		}
																		else {
																			pool.query("INSERT INTO public.project_alloc_tbl(project_id, emp_id,emp_loc_type, emp_reporting_mgr, project_allocation_date, emp_billable_flg, emp_project_relieving_date, rcre_user_id, rcre_time, lchg_user_id, lchg_time, del_flg, free_text_1, free_text_2, free_text_3, percentage_alloc,working_days,salary_reserved,perdium_reserved,project_crncy,convertion_rate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)", [projid, value, employeeloc, projman, padate, employeebillable, pedate, rcreuserid, rcretime, lchguserid, lchgtime, 'N', ftxt1, ftxt2, ftxt3, peralloc, noofdays, empreservedsal, empreservedperdium, projcurr, convRate], function (err, result) {
																				if (err) throw err;
																				pool.query("update emp_master_tbl set reporting_mgr=$1,project_id=$2 where emp_id=$3", [projman, projid, value], function (err, done) {
																					if (err) throw err;
																				});
																			});

																		}
																		req.flash('success', "Employees Allocated to " + projid + " successfully")
																		res.redirect(req.get('referer'));
																	});
																}
																else {
																	console.log("already allocated");

																}

															});
														});/*salary query*/

													});

												}  /*else end For OFFSHORE Location*/
												arraycnt = -1;
											}/*if for arrcnt and err_flg*/
										}); /*emp sal query*/
									}); /* first sal for loop */
								});/*reserved salary query*/
							});/*usable salary query*/

						});
					});
				});
			});
		}//close of sow 
	});
};
/////////////////////////////////////////viewprojectAllocation/////////////////////////////////////


router.post('/viewProjectalloc', viewprojalloc);
function viewprojalloc(req, res) {
	console.log(req.body);
	// var emp_access = req.user.user_type;
	var proj_id = req.body.pid;
	console.log(proj_id);

	pool.query("select  distinct a.project_id as project_id,c.customer_name from project_alloc_tbl a inner join project_master_tbl p on a.project_id=p.project_id inner join customer_master_tbl c on c.customer_id = p.cid where a.del_flg='N' order by a.project_id asc", function (err, result) {
		var project1 = result.rows;
		var projid_count1 = result.rowCount;

		pool.query("SELECT a.emp_id, e.emp_name, a.emp_reporting_mgr, mgr.emp_name AS ename, a.emp_loc_type, a.percentage_alloc, a.project_allocation_date, a.emp_project_relieving_date, a.emp_billable_flg FROM project_alloc_tbl a INNER JOIN emp_master_tbl e ON a.emp_id = e.emp_id LEFT JOIN emp_master_tbl mgr ON a.emp_reporting_mgr = mgr.emp_id INNER JOIN project_master_tbl p ON a.project_id = p.project_id INNER JOIN customer_master_tbl c ON p.cid = c.customer_id WHERE a.del_flg = 'N' AND p.closure_flg = 'N' AND a.project_id = $1 ORDER BY a.emp_id", [proj_id], function (err, result) {
			console.log(result.rows);
			alloc = result.rows;
			alloc_count = result.rowCount;

			pool.query("SELECT emp_id,emp_name from emp_master_tbl where emp_access in ('L1','L2') order by emp_id asc", function (err, result) {
				manager = result.rows;
				id_count = result.rowCount;
				console.log(proj_id);

				pool.query("SELECT project_mgr,delivery_mgr from project_master_tbl where project_id=$1", [proj_id], function (err, result) {
					console.log(result.rows);
					projectmgrid = result.rows['0'].project_mgr;
					deliverymgrid = result.rows['0'].delivery_mgr;
					console.log("projectmgrid", projectmgrid);
					console.log("deliverymgrid", deliverymgrid);

					pool.query("SELECT emp_name from emp_master_tbl where emp_id=$1", [projectmgrid], function (err, result) {
						projectmgrname = result.rows['0'].emp_name;
						console.log("projectmgrname", projectmgrname);

						pool.query("SELECT emp_name from emp_master_tbl where emp_id=$1", [deliverymgrid], function (err, result) {
							deliverymgrname = result.rows['0'].emp_name;
							console.log("deliverymgrname", deliverymgrname);


							res.json({
								message: 'redirect to project allocation view', data: {

									// emp_access: emp_access,
									ename: req.body.user_name,
									eid: req.user_id,
									manager: manager,
									manid_count: id_count,
									proj_id: proj_id,
									project1: project1,
									projid_count1: projid_count1,
									alloc: alloc,
									projectmgrid: projectmgrid,
									deliverymgrid: deliverymgrid,
									projectmgrname: projectmgrname,
									deliverymgrname: deliverymgrname,
									alloc_count: alloc_count
								}

							});

						});
					});
				});
			});
		});
	});
};
router.get('/viewAllocation', function (req, res) {
	var emp_access = req.body.user_type;
	console.log("empaccess", emp_access);

	if (emp_access != "L1" && emp_access != "L2") {
		res.redirect('/admin-dashboard/adminDashboard/admindashboard');
	}
	else {

		pool.query("select  distinct a.project_id as project_id,c.customer_name from project_alloc_tbl a inner join project_master_tbl p on a.project_id=p.project_id inner join customer_master_tbl c on c.customer_id = p.cid where a.del_flg='N' and p.closure_flg='N' order by a.project_id asc", function (err, result) {
			pool.query("select * from project_aaloc_tbl,", function (err, result) {

				console.log(result.rows);
				var project1 = result.rows;
				var projid_count1 = result.rowCount;
				var alloc = "";
				var alloc_count = "";
				var project_id1 = "";
				var customername1 = "";
				var rmgr1 = "";
				var peralloc1 = "";
				var eloctype1 = "";
				var ebilltype1 = "";
				var padate1 = "";
				var pedate1 = "";
				var rmgr_name1 = "";
				var eid = "";
				var pid = "";
				var proj_id = "";
				var manager = "";
				var id_count = "";
				var manname = "";
				var employee = "";
				var empid_count = "";
				var empname = "";
				var project = "";
				var projid_count = "";
				var projectname = "";
				var emp_id = "";
				var project_id = "";
				var rmgr = "";
				var peralloc = "";
				var padate = "";
				var pedate = "";
				var ebilltype = "";
				var eloctype = "";
				var emp_name1 = "";
				var projectmgrname = "";
				var deliverymgrname = "";
				var projectmgrid = "";
				var deliverymgrid = "";


				console.log("innnn");


				res.json({
					message: 'redirect to project allocation view', data: {

						emp_access: emp_access,
						ename: req.user_name,
						eid: req.user_id,
						alloc: alloc,
						alloc_count: alloc_count,
						proj_id: proj_id,
						pid: pid,
						emp_name1: emp_name1,
						project_id1: project_id1,
						customername1: customername1,
						rmgr1: rmgr1,
						rmgr_name1: rmgr_name1,
						peralloc1: peralloc1,
						eloctype1: eloctype1,
						ebilltype1: ebilltype1,
						padate1: padate1,
						pedate1: pedate1,
						project1: project1,
						projid_count1: projid_count1,
						manager: manager,
						manid_count: id_count,
						manname: manname,
						employee: employee,
						empid_count: empid_count,
						empname: empname,
						project: project,
						projid_count: projid_count,
						projectname: projectname,
						emp_id1: emp_id,
						projid: project_id,
						projMgr: rmgr,
						peralloc: peralloc,
						paDate: padate,
						peDate: pedate,
						empbill: ebilltype,
						projectmgrname: projectmgrname,
						deliverymgrname: deliverymgrname,
						projectmgrid: projectmgrid,
						deliverymgrid: deliverymgrid,
						emploctype: eloctype
					}
				});
			})


		});
	}
});










module.exports = router;
