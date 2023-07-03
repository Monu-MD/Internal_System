console.log("Employee Details");

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var app = express();
var Promise = require('mpromise');
var pool = require('../Database/dbconfig');
var nodemailer = require('nodemailer');

var bcrypt = require('bcryptjs');
var generatePassword = require("password-generator");
// var dateFormat=require('dateformat')
router.use(express.json())


//////////////////////////////////// Employee Admin View starts Here ////////////////////////////////
router.get('/employeeDetails', function (req, res) {
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	var empId = req.query.user_id;

	pool.query("SELECT user_type from users where user_id = $1", [empId], function (err, result) {

		emp_access = result.rows['0'].user_type;

		if (emp_access != "A1") {
			res.json({ message: "redirect to admin dashboard" });
		}
		else {

			pool.query("SELECT comm_code_id from common_code_tbl where code_id = 'ACC' order by comm_code_id asc", function (err, result) {
				comm_code_id = result.rows;
				comm_code_id_count = result.rowCount;

				pool.query("SELECT comm_code_desc from common_code_tbl where code_id = 'ACC'  order by comm_code_id asc", function (err, result) {
					comm_code_desc = result.rows;
					comm_code_desc_count = result.rowCount;

					pool.query("SELECT comm_code_id from common_code_tbl where code_id = 'DSG' order by comm_code_id asc", function (err, result) {
						desig_code_id = result.rows;
						desig_code_id_count = result.rowCount;

						pool.query("SELECT comm_code_desc from common_code_tbl where code_id = 'DSG'  order by comm_code_id asc", function (err, result) {
							desig_code_desc = result.rows;
							desig_code_desc_count = result.rowCount;

							pool.query("SELECT comm_code_id,comm_code_desc from common_code_tbl where code_id = 'CURR' order by comm_code_id asc", function (err, result) {
								sal_curr = result.rows;
								sal_curr_count = result.rowCount;

								pool.query("SELECT emp_id from emp_master_tbl order by emp_id", function (err, result) {
									rptMan_id = result.rows;
									rptMan_count = result.rowCount;

									pool.query("SELECT emp_name from emp_master_tbl order by emp_id", function (err, result) {
										rpt_name = result.rows;
										rpt_name_count = result.rowCount;

										const data = {
											// emp_access: emp_access,
											// ename: req.query.user_name,
											eid: req.query.user_id,
											comm_code_id: comm_code_id,
											comm_code_id_count: comm_code_id_count,
											comm_code_desc: comm_code_desc,
											comm_code_desc_count: comm_code_desc_count,
											desig_code_id: desig_code_id,
											desig_code_id_count: desig_code_id_count,
											desig_code_desc: desig_code_desc,
											desig_code_desc_count: desig_code_desc_count,
											sal_curr: sal_curr,
											sal_curr_count: sal_curr_count,
											rptMan_id: rptMan_id,
											rptMan_count: rptMan_count,
											rpt_name: rpt_name,
											rpt_name_count: rpt_name_count
										}
										res.json({ message: "redirect to employee details", Data: data });
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

/////////////////////////// View other employee details /////////////////////////
//to view all employee detailslogged

router.get('/employeeDetailsView', function (req, res) {
	var empId = req.query.employeeId;
	console.log(empId);

	pool.query("SELECT user_type from users where user_id = $1", [empId], function (err, result) {
		const emp_access = result.rows['0'].user_type;

		// if (emp_access != "A1") {
		// 	res.json({ message: "redirect ot dashboard" });
		// }
		// else {

		var empid = "";
		var empName = "";
		var email = "";
		var empAccess = "";
		var jDate = "";
		var desig = "";
		var empClass = "";
		var salary = "";
		var salary_curr = "";
		var salary_curr_desc = "";
		var pid = "";
		var rptMan = "";
		var rptMan_desc = "";
		var probPeriod = "";
		var preem = "";
		var preExpyear = "";
		var preExpmonth = "";
		var preEmp = "";
		var preEmp2 = "";
		var preEmp3 = "";
		var preEmp4 = "";
		var preEmp5 = "";
		var gender = "";
		var dob = "";
		var bgroup = "";
		var shirt = "";
		var commAdd = "";
		var state = "";
		var city = "";
		var pincode = "";
		var resAdd = "";
		var state1 = "";
		var city1 = "";
		var pincode1 = "";
		var mobNum = "";
		var telNum = "";
		var econNum = "";
		var emerPer = "";
		var fathersName = "";
		var mothersName = "";
		var maritalstatus = "";
		var spouseName = "";
		var panNum = "";
		var passNum = "";
		var aadhaarNum = "";
		var dlNum = "";
		var uan = "";
		var nameinBank = "";
		var bankName = "";
		var branchName = "";
		var acctNum = "";
		var ifscCode = "";
		var enFlg = "";
		var cflag = "";

		pool.query("SELECT emp_id from emp_master_tbl order by emp_id asc", function (err, result) {
			employee = result.rows;
			emp_id_count = result.rowCount;

			pool.query("SELECT emp_name from emp_master_tbl order by emp_id asc", function (err, result) {
				empname = result.rows;
				empname_count = result.rowCount;

				res.json({
					message: "redirect to emp detailsview", data: {
						emp_access: emp_access,
						// ename: req.user.rows['0'].user_name,
						eid: req.query.user_id,
						employee: employee,
						emp_id_count: emp_id_count,
						empname: empname,
						empid: empid,
						empName: empName,
						email: email,
						empAccess: empAccess,
						jDate: jDate,
						desig: desig,
						empClass: empClass,
						salary: salary,
						salary_curr: salary_curr,
						salary_curr_desc: salary_curr_desc,
						pid: pid,
						rptMan: rptMan,
						rptMan_desc: rptMan_desc,
						probPeriod: probPeriod,
						preem: preem,
						preExpyear: preExpyear,
						preExpmonth: preExpmonth,
						preEmp: preEmp,
						preEmp2: preEmp2,
						preEmp3: preEmp3,
						preEmp4: preEmp4,
						preEmp5: preEmp5,
						gender: gender,
						dob: dob,
						bgroup: bgroup,
						shirt: shirt,
						commAdd: commAdd,
						state: state,
						city: city,
						pincode: pincode,
						resAdd: resAdd,
						state1: state1,
						city1: city1,
						pincode1: pincode1,
						mobNum: mobNum,
						telNum: telNum,
						econNum: econNum,
						emerPer: emerPer,
						fathersName: fathersName,
						mothersName: mothersName,
						maritalstatus: maritalstatus,
						spouseName: spouseName,
						panNum: panNum,
						passNum: passNum,
						aadhaarNum: aadhaarNum,
						dlNum: dlNum,
						uan: uan,
						nameinBank: nameinBank,
						bankName: bankName,
						branchName: branchName,
						acctNum: acctNum,
						ifscCode: ifscCode,
						enFlg: enFlg,
						cflag: cflag
						//closing bracket of render
					}
				});

			});
		});
		// }
	});
});

router.post('/viewempdet', (req, res) => {

	var user_id = req.body.userid;
	console.log(user_id);

	var empId = req.body.Item.employeeId;
	console.log(empId);

	pool.query("SELECT user_type from users where user_id = $1", [user_id], function (err, result) {
		const user_type = result.rows['0'].user_type;
		if (user_type == 'A1') {

			pool.query("SELECT user_type from users where user_id = $1", [empId], function (err, result) {

				emp_access = result.rows['0'].user_type;

				pool.query("SELECT * from emp_master_tbl where LOWER(emp_id)=LOWER($1)", [empId], function (err, check) {
					rcount_master = check.rowCount;

					pool.query("SELECT * from emp_info_tbl where LOWER(emp_id)=LOWER($1)", [empId], function (err, test) {
						rcount_info = test.rowCount;

						pool.query("SELECT * from emp_info_tbl_temp where LOWER(emp_id)=LOWER($1)", [empId], function (err, test) {
							var flag = test.rowCount;

							pool.query("SELECT * from emp_info_tbl where LOWER(emp_id)=LOWER($1)", [empId], function (err, main) {
								var mflag = main.rowCount;

								var cflag = "Y";

								if (flag == 1) {
									var enFlg = "N";
								}

								if (mflag == 1) {
									var enFlg = "Y";
								}

								if (flag == mflag) {
									var enFlg = "N";
								}

								if (rcount_master == rcount_info) {

									//query 1 to fetch professional details
									pool.query("select emp_id,emp_name,emp_email,emp_access,joining_date,designation,salary,reporting_mgr,prev_expr_year,prev_expr_month,prev_empr,prev_empr2,prev_empr3,prev_empr4,prev_empr5,emp_prob,pre_emp_flg,emp_classification,salary_curr from emp_master_tbl where LOWER(emp_id)=LOWER($1)", [empId], function (err, resultset) {
										if (err) throw err;
										var empid = resultset.rows['0'].emp_id;
										var empName = resultset.rows['0'].emp_name;
										var email = resultset.rows['0'].emp_email;
										var empAccess = resultset.rows['0'].emp_access;
										var jDate = resultset.rows['0'].joining_date;
										var jDate = jDate//dateFormat(jDate, "yyyy-mm-dd");
										var desig = resultset.rows['0'].designation;
										var empClass = resultset.rows['0'].emp_classification;
										var salary = resultset.rows['0'].salary;
										var salary_curr = resultset.rows['0'].salary_curr;
										var rptMan = resultset.rows['0'].reporting_mgr;
										var probPeriod = resultset.rows['0'].emp_prob;
										var preem = resultset.rows['0'].pre_emp_flg;
										var preExpyear = resultset.rows['0'].prev_expr_year;
										var preExpmonth = resultset.rows['0'].prev_expr_month;
										var preEmp = resultset.rows['0'].prev_empr;
										var preEmp2 = resultset.rows['0'].prev_empr2;
										var preEmp3 = resultset.rows['0'].prev_empr3;
										var preEmp4 = resultset.rows['0'].prev_empr4;
										var preEmp5 = resultset.rows['0'].prev_empr5;


										pool.query("select * from project_alloc_tbl where emp_id = $1", [empid], function (err, resultset) {
											if (err) throw err;
											pidcount = resultset.rowCount;

											if (pidcount > 1) {
												var pid = "MULTIPLE";

											}

											if (pidcount == 1) {
												pool.query("select project_id from project_alloc_tbl where emp_id = $1", [empid], function (err, resultset) {
													if (err) throw err;
													pid = resultset.rows['0'].project_id;
												});
											}

											if (pidcount == 0) {
												var pid = "Not Allocated";

											}

											//query 2 to fetch personal details
											pool.query("select gender,dob,comm_addr1,state,city,pincode,comm_addr2,state1,city1,pincode1,phone1,phone2,father_name,mother_name,martial_status,spouse_name,pan_number,passport_num,aadhaar_num,license_num,blood_group,shirt_size,emergency_num,emergency_con_person,uan_num,name_in_bank,bank_name,branch_name,account_num,ifsc_code from emp_info_tbl where LOWER(emp_id)=LOWER($1)", [empId], function (err, result) {
												if (err) throw err;
												var gender = result.rows['0'].gender;
												var dob = result.rows['0'].dob;
												var dob = jDate// dateFormat(dob, "yyyy-mm-dd");
												var bgroup = result.rows['0'].blood_group;
												var shirt = result.rows['0'].shirt_size;
												var commAdd = result.rows['0'].comm_addr1;
												var state = result.rows['0'].state;
												var city = result.rows['0'].city;
												var pincode = result.rows['0'].pincode;
												var resAdd = result.rows['0'].comm_addr2;
												var state1 = result.rows['0'].state1;
												var city1 = result.rows['0'].city1;
												var pincode1 = result.rows['0'].pincode1;
												var mobNum = result.rows['0'].phone1;
												var telNum = result.rows['0'].phone2;
												var econNum = result.rows['0'].emergency_num;
												var emerPer = result.rows['0'].emergency_con_person;
												var fathersName = result.rows['0'].father_name;
												var mothersName = result.rows['0'].mother_name;
												var maritalstatus = result.rows['0'].martial_status;
												var spouseName = result.rows['0'].spouse_name;
												var panNum = result.rows['0'].pan_number;
												var passNum = result.rows['0'].passport_num;
												var aadhaarNum = result.rows['0'].aadhaar_num;
												var dlNum = result.rows['0'].license_num;
												var uan = result.rows['0'].uan_num;
												var nameinBank = result.rows['0'].name_in_bank;
												var bankName = result.rows['0'].bank_name;
												var branchName = result.rows['0'].branch_name;
												var acctNum = result.rows['0'].account_num;
												var ifscCode = result.rows['0'].ifsc_code;

												//Setting Values for designation List

												pool.query("select comm_code_desc from common_code_tbl where code_id='ACC' and comm_code_id=$1", [empAccess], function (err, resultset) {
													empAccess = resultset.rows['0'].comm_code_desc;

													//Setting Values for designation List

													pool.query("select emp_name from emp_master_tbl where emp_id=$1", [rptMan], function (err, resultset) {
														rptMan_desc = resultset.rows['0'].emp_name;

														//Setting Values for designation List

														pool.query("select comm_code_desc from common_code_tbl where code_id='DSG' and comm_code_id=$1", [desig], function (err, resultset) {
															desig = resultset.rows['0'].comm_code_desc;

															//Setting Values for Marriage List

															pool.query("select comm_code_desc from common_code_tbl where code_id='MAR' and comm_code_id=$1", [maritalstatus], function (err, resultset) {
																maritalstatus = resultset.rows['0'].comm_code_desc;

																//Setting Values for Gender List

																if (gender == "M") { gender = "MALE"; }
																if (gender == "F") { gender = "FEMALE"; }

																//Setting Values for Gender List

																if (probPeriod == "Y") { probPeriod = "YES"; }
																if (probPeriod == "N") { probPeriod = "NO"; }

																// setting values for previous experience
																if (preem == "Y") { preem = "YES"; }
																if (preem == "N") { preem = "NO"; }

																//Setting Values for Shirt List

																pool.query("select comm_code_desc from common_code_tbl where code_id='BLG' and comm_code_id=$1", [bgroup], function (err, resultset) {
																	bgroup = resultset.rows['0'].comm_code_desc;

																	//Setting Values for Shirt List

																	pool.query("select comm_code_desc from common_code_tbl where code_id='SHR' and comm_code_id=$1", [shirt], function (err, resultset) {
																		shirt = resultset.rows['0'].comm_code_desc;

																		//Setting Values for State List

																		pool.query("select comm_code_desc from common_code_tbl where code_id='STA' and comm_code_id=$1", [state], function (err, resultset) {
																			state = resultset.rows['0'].comm_code_desc;

																			//Setting Values for State List

																			pool.query("select comm_code_desc from common_code_tbl where code_id='STA' and comm_code_id=$1", [state1], function (err, resultset) {
																				state1 = resultset.rows['0'].comm_code_desc;

																				pool.query("select comm_code_desc from common_code_tbl where code_id='CURR' and comm_code_id=$1", [salary_curr], function (err, resultset) {
																					salary_curr_desc = resultset.rows['0'].comm_code_desc;

																					res.json({
																						message: "redirect to employee details view", Data: {
																							enFlg: enFlg,
																							cflag: cflag,
																							emp_access: emp_access,
																							ename: req.user.rows['0'].user_name,
																							eid: req.user.rows['0'].user_id,
																							empid: empid,
																							empName: empName,
																							email: email,
																							empAccess: empAccess,
																							jDate: jDate,
																							desig: desig,
																							empClass: empClass,
																							salary: salary,
																							salary_curr: salary_curr,
																							salary_curr_desc: salary_curr_desc,
																							pid: pid,
																							rptMan: rptMan,
																							rptMan_desc: rptMan_desc,
																							preem: preem,
																							probPeriod: probPeriod,
																							preExpyear: preExpyear,
																							preExpmonth: preExpmonth,
																							preEmp: preEmp,
																							preEmp2: preEmp2,
																							preEmp3: preEmp3,
																							preEmp4: preEmp4,
																							preEmp5: preEmp5,
																							gender: gender,
																							dob: dob,
																							bgroup: bgroup,
																							shirt: shirt,
																							commAdd: commAdd,
																							state: state,
																							city: city,
																							pincode: pincode,
																							resAdd: resAdd,
																							state1: state1,
																							city1: city1,
																							pincode1: pincode1,
																							mobNum: mobNum,
																							telNum: telNum,
																							econNum: econNum,
																							emerPer: emerPer,
																							fathersName: fathersName,
																							mothersName: mothersName,
																							maritalstatus: maritalstatus,
																							spouseName: spouseName,
																							panNum: panNum,
																							passNum: passNum,
																							aadhaarNum: aadhaarNum,
																							dlNum: dlNum,
																							uan: uan,
																							nameinBank: nameinBank,
																							bankName: bankName,
																							branchName: branchName,
																							acctNum: acctNum,
																							ifscCode: ifscCode
																							//closing bracket of render
																						}
																					});
																					//closing bracket of query1
																				});
																				//closing bracket of query2
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
									//closing of if loop
								}
								else {

									var gender = "";
									var dob = "";
									var bgroup = "";
									var shirt = "";
									var commAdd = "";
									var state = "";
									var city = "";
									var pincode = "";
									var resAdd = "";
									var state1 = "";
									var city1 = "";
									var pincode1 = "";
									var mobNum = "";
									var telNum = "";
									var econNum = "";
									var emerPer = "";
									var fathersName = "";
									var mothersName = "";
									var maritalstatus = "";
									var spouseName = "";
									var panNum = "";
									var passNum = "";
									var aadhaarNum = "";
									var dlNum = "";
									var uan = "";
									var nameinBank = "";
									var bankName = "";
									var branchName = "";
									var acctNum = "";
									var ifscCode = "";

									//query 1 to fetch professional details
									pool.query("select emp_id,emp_name,emp_email,emp_access,joining_date,designation,salary,reporting_mgr,prev_expr_year,prev_expr_month,prev_empr,prev_empr2,prev_empr3,prev_empr4,prev_empr5,emp_prob,pre_emp_flg,emp_classification from emp_master_tbl where LOWER(emp_id)=LOWER($1)", [empId], function (err, resultset) {
										// ,salary_curr--> it is not present in db 
										
									
										if (err) throw err;
										var empid = resultset.rows['0'].emp_id;
										var empName = resultset.rows['0'].emp_name;
										var email = resultset.rows['0'].emp_email;
										var empAccess = resultset.rows['0'].emp_access;
										var jDate = resultset.rows['0'].joining_date;
										var jDate = jDate //dateFormat(jDate, "yyyy-mm-dd");
										var desig = resultset.rows['0'].designation;
										var empClass = resultset.rows['0'].emp_classification;
										var salary = resultset.rows['0'].salary;
										// var salary_curr = resultset.rows['0'].salary_curr;
										var rptMan = resultset.rows['0'].reporting_mgr;
										var probPeriod = resultset.rows['0'].emp_prob;
										var preem = resultset.rows['0'].pre_emp_flg;
										var preExpyear = resultset.rows['0'].prev_expr_year;
										var preExpmonth = resultset.rows['0'].prev_expr_month;
										var preEmp = resultset.rows['0'].prev_empr;
										var preEmp2 = resultset.rows['0'].prev_empr2;
										var preEmp3 = resultset.rows['0'].prev_empr3;
										var preEmp4 = resultset.rows['0'].prev_empr4;
										var preEmp5 = resultset.rows['0'].prev_empr5;

										pool.query("select * from project_alloc_tbl where emp_id = $1", [empid], function (err, resultset) {
											if (err) throw err;
											pidcount = resultset.rowCount;
											if (pidcount > 1) {
												var pid = "MULTIPLE";

											}

											if (pidcount == 1) {
												pool.query("select project_id from project_alloc_tbl where emp_id = $1", [empid], function (err, resultset) {
													if (err) throw err;
													pid = resultset.rows['0'].project_id;
												});
											}

											if (pidcount == 0) {
												var pid = "Not Allocated";
											}

											//Setting Values for designation List

											pool.query("select comm_code_desc from common_code_tbl where code_id='ACC' and comm_code_id=$1", [empAccess], function (err, resultset) {
												empAccess = resultset.rows['0'].comm_code_desc;
											
												pool.query("select emp_name from emp_master_tbl where emp_id=$1", [rptMan], function (err, resultset) {
													
													rptMan_desc = resultset.rows['0'].emp_name;

													//Setting Values for designation List

													pool.query("select comm_code_desc from common_code_tbl where code_id='DSG' and comm_code_id=$1", [desig], function (err, resultset) {
														desig = resultset.rows['0'].comm_code_desc;

														pool.query("select comm_code_desc from common_code_tbl where code_id='CURR' and comm_code_id=$1", [desig], function (err, resultset) {
															// salary_curr_desc = resultset.rows['0'].comm_code_desc;

															//Setting Values for Gender List

															if (gender == "M") { gender = "MALE"; }
															if (gender == "F") { gender = "FEMALE"; }

															//Setting Values for Gender List

															if (probPeriod == "Y") { probPeriod = "YES"; }
															if (probPeriod == "N") { probPeriod = "NO"; }

															// setting values for previous experience
															if (preem == "Y") { preem = "YES"; }
															if (preem == "N") { preem = "NO"; }

															res.json({
																message: 'redirect to employee detail view', data: {
																	enFlg: enFlg,
																	cflag: cflag,
																	emp_access: emp_access,
																	// ename: req.user.rows['0'].user_name,
																	// eid: req.user.rows['0'].user_id,
																	empid: empid,
																	emp_name: empName,
																	emp_email: email,
																	emp_access: empAccess,
																	joining_date: jDate,
																	designation: desig,
																	emp_classification: empClass,
																	salary: salary,
																	// salary_curr: salary_curr,
																	// salary_curr_desc: salary_curr_desc,
																	project_id: pid,
																	reporting_mgr: rptMan,
																	rptman_desc: rptMan_desc,
																	preem: preem,
																	emp_prob: probPeriod,
																	prev_expr_year: preExpyear,
																	prev_expr_month: preExpmonth,
																	prev_empr: preEmp,
																	prev_empr2: preEmp2,
																	prev_empr3: preEmp3,
																	prev_empr4: preEmp4,
																	prev_empr5: preEmp5,
																	gender: gender,
																	dob: dob,
																	blood_group: bgroup,
																	shirt_size: shirt,
																	com_addr1: commAdd,
																	state: state,
																	city: city,
																	pincode: pincode,
																	comm_addr2: resAdd,
																	state1: state1,
																	city1: city1,
																	pincode1: pincode1,
																	phone1: mobNum,
																	phone2: telNum,
																	emergency_num: econNum,
																	emergency_con_person: emerPer,
																	father_name: fathersName,
																	mother_name: mothersName,
																	martial_status: maritalstatus,
																	spouse_name: spouseName,
																	pan_number: panNum,
																	passport_num: passNum,
																	aadhaar_num: aadhaarNum,
																	license_num: dlNum,
																	uan_num: uan,
																	name_in_bank: nameinBank,
																	bank_name: bankName,
																	branch_name: branchName,
																	account_num: acctNum,
																	ifsc_code: ifscCode
																	//closing bracket of query1
																}
															});
														});
													});
												});
											});
										});
									});
									//closing of else loop
								}
								//closing of check
							});
						});
						//closing of test
					});
				});

			});
		}
		else {
			res.json({ message: "redirect to serchmodify", notification: "user Dont have access" })
		}
		//closing of function	
	});

});

//////////////////////////////////////////// Adding Employee Details ////////////////////////////////

router.get('/employeeAddpersonal', function (req, res) {
	var empId = req.user.rows['0'].user_id;

	pool.query("SELECT * from emp_info_tbl where emp_id = $1", [empId], function (err, result) {
		mtbl = result.rowCount;

		pool.query("SELECT * from emp_info_tbl_temp where emp_id = $1", [empId], function (err, result) {
			ttbl = result.rowCount;

			pool.query("SELECT * from data_emp_info_tbl_temp where emp_id = $1", [empId], function (err, result) {
				dtbl = result.rowCount;

				pool.query("SELECT user_type from users where user_id = $1", [empId], function (err, result) {
					emp_access = result.rows['0'].user_type;

					if (emp_access == "A1") {
						res.redirect('/admin-dashboard/adminDashboard/admindashboard');
					}
					else {

						pool.query("SELECT emp_id from emp_master_tbl where emp_id = $1", [empId], function (err, result) {
							empid = result.rows['0'].emp_id;

							pool.query("SELECT emp_name from emp_master_tbl where emp_id = $1", [empId], function (err, result) {
								empName = result.rows['0'].emp_name;

								// to fetch blood group
								pool.query("SELECT comm_code_id,comm_code_desc from common_code_tbl where code_id = 'BLG' order by comm_code_id asc", function (err, result) {
									comm_code_blood = result.rows;
									comm_code_blood_count = result.rowCount;

									// to fetch shirt size
									pool.query("SELECT comm_code_id,comm_code_desc from common_code_tbl where code_id = 'SHR' order by comm_code_id asc", function (err, result) {
										comm_code_shirt = result.rows;
										comm_code_shirt_count = result.rowCount;

										// to fetch state group
										pool.query("SELECT comm_code_id,comm_code_desc from common_code_tbl where code_id = 'STA' order by comm_code_id asc", function (err, result) {
											comm_code_state = result.rows;
											comm_code_state_count = result.rowCount;

											// to fetch maritial status
											pool.query("SELECT comm_code_id,comm_code_desc from common_code_tbl where code_id = 'MAR' order by comm_code_id asc", function (err, result) {
												comm_code_maritalstatus = result.rows;
												comm_code_maritalstatus_count = result.rowCount;

												res.render('employeeModule/employeeAddpersonal', {
													mtbl: mtbl,
													ttbl: ttbl,
													dtbl: dtbl,
													emp_access: emp_access,
													ename: req.user.rows['0'].user_name,
													eid: req.user.rows['0'].user_id,
													empid: empid,
													empName: empName,
													comm_code_blood: comm_code_blood,
													comm_code_blood_count: comm_code_blood_count,
													comm_code_shirt: comm_code_shirt,
													comm_code_shirt_count: comm_code_shirt_count,
													comm_code_state: comm_code_state,
													comm_code_state_count: comm_code_state_count

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
		});
	});
});



router.post('/addempper', (req, res) => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1;
	const day = currentDate.getDate();
	const now = year + '-' + month + '-' + day;


	var rcreuserid = "ADMIN";
	var rcretime = now;
	var lchguserid = "ADMIN";
	var lchgtime = now;
	var empid = req.body.employeeId;
	var empName = req.body.employeeName;
	var gender = req.body.gender;
	var dob = req.body.dateOfBirth;
	var bgroup = req.body.bloodGroup;
	var shirt = req.body.tShirtSize;
	var commAdd = req.body.communicationAddress;
	var state = req.body.state;
	var city = req.body.city;
	var pincode = req.body.pinCode;
	var resAdd = req.body.parmanentAddress;
	var state1 = req.body.state1;
	var city1 = req.body.city1;
	var pincode1 = req.body.pinCode1;
	var mobNum = req.body.mobileNumber;
	var telNum = req.body.telNum;
	var econNum = req.body.emergencyContactNumber;
	var emerPer = req.body.emergencyContactPerson;
	var fathersName = req.body.fatherName;
	var mothersName = req.body.motherName;
	var maritalstatus = req.body.maritalStatus;
	var spouseName = req.body.spouseName;
	var panNum = req.body.panNumber;
	var passNum = req.body.passportNumber;
	var aadhaarNum = req.body.adharCardNumber;
	var dlNum = req.body.drivingLicenceNumber;
	var uan = req.body.uanNumber;
	var nameinBank = "";
	var bankName = "";
	var branchName = "";
	var acctNum = "";
	var ifscCode = "";
	var entity_cre_flg = "N";

	pool.query("SELECT * from data_emp_master_tbl_temp e where LOWER(e.emp_id) = LOWER($1)", [empid], function (err, resultset) {
		if (err) throw err;
		var mcount = resultset.rowCount;

		pool.query("SELECT * from data_emp_info_tbl_temp e where LOWER(e.emp_id) = LOWER($1)", [empid], function (err, resultset) {
			if (err) throw err;
			var tcount = resultset.rowCount;

			pool.query("SELECT * from emp_info_tbl where emp_id = $1", [empid], function (err, result) {
				var main_count = result.rowCount;
				console.log("main_count", main_count);

				pool.query("SELECT * from emp_info_tbl_temp where emp_id = $1", [empid], function (err, result) {
					var maintmp_count = result.rowCount;
					console.log("main_counttmp", maintmp_count);

					if (main_count == 0) {
						if (maintmp_count == 0) {
							if (mcount == 0) {
								if (tcount == 0) {
									pool.query("INSERT INTO data_emp_info_tbl_temp(emp_id,emp_name,gender,dob,blood_group,shirt_size,comm_addr1,state,city,pincode,comm_addr2,state1,city1,pincode1,martial_status,phone1,phone2,emergency_num,emergency_con_person,father_name,mother_name,spouse_name,pan_number,passport_num,license_num,aadhaar_num,uan_num,name_in_bank,bank_name,branch_name,account_num,ifsc_code,del_flg,entity_cre_flg,rcre_user_id,rcre_time,lchg_user_id,lchg_time) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38)", [empid, empName, gender, dob, bgroup, shirt, commAdd, state, city, pincode, resAdd, state1, city1, pincode1, maritalstatus, mobNum, telNum, econNum, emerPer, fathersName, mothersName, spouseName, panNum, passNum, dlNum, aadhaarNum, uan, nameinBank, bankName, branchName, acctNum, ifscCode, 'N', entity_cre_flg, rcreuserid, rcretime, lchguserid, lchgtime], function (err, done) {
										if (err) throw err;
										
										res.json({
											notification: "Employee Details Captured successfully",
											message: "redirect to login page"
										});
									});
								} else {
									const message = {
										notification: "Record Pending for Verification",
										message: "redirect to login page"
									};
									res.send(message);
								}
							} else {
								if (tcount == 1) {
									const message = {
										notification: "Record Pending for Verification",
										message: "redirect to login page"
									};
									res.send(message);
								} else {
									pool.query("INSERT INTO data_emp_info_tbl_temp(emp_id,emp_name,gender,dob,blood_group,shirt_size,comm_addr1,state,city,pincode,comm_addr2,state1,city1,pincode1,martial_status,phone1,phone2,emergency_num,emergency_con_person,father_name,mother_name,spouse_name,pan_number,passport_num,license_num,aadhaar_num,uan_num,name_in_bank,bank_name,branch_name,account_num,ifsc_code,del_flg,entity_cre_flg,rcre_user_id,rcre_time,lchg_user_id,lchg_time) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38)", [empid, empName, gender, dob, bgroup, shirt, commAdd, state, city, pincode, resAdd, state1, city1, pincode1, maritalstatus, mobNum, telNum, econNum, emerPer, fathersName, mothersName, spouseName, panNum, passNum, dlNum, aadhaarNum, uan, nameinBank, bankName, branchName, acctNum, ifscCode, 'N', entity_cre_flg, rcreuserid, rcretime, lchguserid, lchgtime], function (err, done) {
										if (err) throw err;
										pool.query('SELECT * FROM data_emp_info_tbl_temp WHERE emp_id = $1', [empid], function (err, result) {
											if (err) {
												callback(err, null);
												return;

											}


											userDetails.emp_details = result.rows[0];

											res.json({
												notification: "Employee Details Captured successfully",
												message: "redirect to employee details view", Data: userDetails.emp_details
											});



										})
									});
								}
							}
						} else {
							const message = {
								notification: "Employee Details Already Present in Amber for verification",
								message: "redirect to login page"
							};
							res.send(message);
						}
					} else {
						const message = {
							notification: "Employee Details Already Present in Amber",
							message: "redirect to login page"
						};
						res.send(message);
					}
				});
			});
		});
	});

})

///////////////////////////////////////// admin add the details ////////////////////////////////////////////////////
router.post('/addempdet', addempdet);
function addempdet(req, res) {
	// var test = req.body.test;

	// if (test == "Add Profile") {





	console.log(req.body);
	var now = new Date();
	var rcreuserid = req.body.rcreusedid;
	var rcretime = now;
	var lchguserid = req.body.rcreusedid;
	var lchgtime = now;
	var empid = req.body.employeeId;
	var empname = req.body.employeeName;
	var email = req.body.email_ID;
	var empaccess = req.body.emp_acess;
	var jDate = req.body.joiningDate;
	var desig = req.body.designation;
	var empClass = req.body.empClass;
	var salary = req.body.Salary;
	var sal_curr = req.body.sal_curr;
	var rptman = req.body.rptMan;
	var probPeriod = req.body.probPeriod;
	var preem = req.body.preem;
	if (preem == "Y") {
		var preExpyear = req.body.preExpyear;
		var preExpmonth = req.body.preExpmonth;
		var preEmp = req.body.preEmp;
		var preEmp2 = req.body.preEmp2;
		var preEmp3 = req.body.preEmp3;
		var preEmp4 = req.body.preEmp4;
		var preEmp5 = req.body.preEmp5;
	}
	else {
		var preExpyear = "0";
		var preExpmonth = "0";
		var preEmp = "";
		var preEmp2 = "";
		var preEmp3 = "";
		var preEmp4 = "";
		var preEmp5 = "";
	}

	var entity_cre_flg = "Y";
	var reset_flg = "N";

	// added for e-docket
	var pan_flg = "N";
	var aadhar_flg = "N";
	var sslc_flg = "N";
	var preuniv_flg = "N";
	var degree_flg = "N";
	var del_flg = "N";

	pool.query("SELECT * from users u INNER JOIN emp_master_tbl e ON u.user_id=e.emp_id where LOWER(u.user_id) = LOWER($1)",
		[empid], function (err, resultset) {
			if (err) throw err;
			var rcount = resultset.rowCount;
			if (rcount == 0) {


				pool.query("SELECT * from emp_master_tbl where emp_email=$1", [email], function (err, test) {
					if (err) throw err;
					var emailcheck = test.rowCount;

					if (emailcheck >= 1) {
						res.json({ message: "This Email-Id :" + email + " is registered with Amber" })
						// res.redirect(req.get('referer'));
					}
					else {

						pool.query("INSERT INTO emp_master_tbl(emp_id,emp_name,emp_access,emp_email,joining_date,designation,salary,reporting_mgr,prev_expr_year,prev_expr_month,prev_empr,prev_empr2,prev_empr3,prev_empr4,prev_empr5,emp_prob,del_flg,rcre_user_id,rcre_time,lchg_user_id,lchg_time,entity_cre_flg,pre_emp_flg,emp_classification,salary_curr) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)", [empid, empname, empaccess, email, jDate, desig, salary, rptman, preExpyear, preExpmonth, preEmp, preEmp2, preEmp3, preEmp4, preEmp5, probPeriod, 'N', rcreuserid, rcretime, lchguserid, lchgtime, entity_cre_flg, preem, empClass, sal_curr], function (err, done) {
							if (err) throw err;

							var userid = empid;
							var ranpass = generatePassword(4, false);
							var finalpass = userid + "@" + ranpass;

							const transporter = nodemailer.createTransport({
								service: 'gmail',
								auth: {
									user: 'mohammadsab@minorks.com',
									pass: '9591788719'
								}
							});



							const mailOptions = {
								from: 'mohammadsab@minorks.com',
								to: email,
								// subject: 'Test Email',
								subject: 'One Time password for Password Reset',
								html: '<img src="http://www.confessionsofareviewer.com/wp-content/uploads/2017/05/welcome-on-board.jpg" height="85"><br><br>' +
									'<h3>Dear <b>' + empname + '</b>,<br><br>' +
									'You are receiving this mail because you (or someone else) has registered in <b>Amber</b>.<br>' +
									'Please follow the below Account Activation details : <br><br>' +
									'<table style="border: 10px solid black;"><tr style="border: 10px solid black;"><th style="border: 10px solid black;">User Id</th><th style="border: 10px solid black;">' + empid + '</th></tr><tr style="border: 10px solid black;"><td style="border: 10px solid black;"> Password </td><td style="border: 10px solid black;">' + finalpass + '</td></tr></table><br><br>' +
									'URL: http://amber.nurture.co.in <br><br>' +
									'Contact HR for any clarifications.<br>' +
									'Kindly do not share your password with anyone else.<br><br><br><br>' +
									'- Regards,<br><br>Amber</h3>'
							};
							console.log(mailOptions, "mailll");
							transporter.sendMail(mailOptions, function (error, info) {
								if (error) {
									console.error('Error sending email', error);
								} else {
									console.log('Email sent:', info.response);
								}


							});


							bcrypt.hash(finalpass, 10, function (err, hash) {

								hashpassword = finalpass;
								hashpassword = hash;
								console.log("bycript enterd");

								pool.query("INSERT INTO users(user_name,user_id,password,user_type,expiry_date,login_allowed,login_attempts,del_flag,login_check,reset_flg,session_id,client_ip) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)", [empname, empid, hash, empaccess, '01-01-2099', 'Y', '0', 'N', 'N', 'Y', '', ''], function (err, done) {
									if (err) { throw err; } else { console.log("inserted in user"); }

								});
							});

							pool.query("insert into e_docket_tbl(emp_id,pan_flg,aadhar_flg,sslc_flg,preuniv_flg,degree_flg,del_flg,rcre_user_id,rcre_time,lchg_user_id,lchg_time) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)", [empid, pan_flg, aadhar_flg, sslc_flg, preuniv_flg, degree_flg, del_flg, rcreuserid, rcretime, lchguserid, lchgtime], function (err, done) {
								// req.flash('success', "User successfully added and an E-mail has been sent to " + email + " with further instructions.")
								// res.redirect(req.get('referer'));
								console.log("edocket inserted");
								res.json({ message: "redirect to refer", notification: "User successfully added and an E-mail has been sent to " + email + " with further instructions." })


							});
						});
					}
				});
			}
			else {
				// req.flash('error', "Employee Details Already Added for this Employee:" + empname)
				// res.redirect(req.get('referer'));
				res.json({ message: "redirect to refer", notification: "Employee Details Already Added for this Employee:" + empname })
			}

		});
	//For fetching Which Value on click of submit(if loop)
	// }

};



module.exports = router;