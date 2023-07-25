console.log('cms module enterd');

const multer = require('multer');

const path = require('path');
var util = require('util');
const fs = require('fs');

const express = require('express');
var router = express.Router();
var pool = require('../Database/dbconfig');

var archiver = require('archiver'),
    archive = archiver('zip');

var moment = require('moment');
const formidable = require('formidable');

var bodyParser = require('body-parser');

var nodemailer = require('nodemailer');
const { log } = require('console');
// var invalidAccessRedirect = require('../../routes/invalidAccess');

var mailId = "";
var name = "";
var emp = "";
var newName = "";
var emp_name = "";
var oldPath = "";
var testFolder = "";
var cpath = [];
var docs = [];
var len = 0, len1 = 0, len2 = 0, plen = 0, rlen = 0, len3 = 0, totLen = 0, totYear = 0;
var govLen = 0, eduLen = 0, medLen = 0, expLen = 0, phLen = 0, resLen = 0, hrLen = 0, cerLen = 0, othrLen = 0, bgLen = 0, polLen = 0, policy_count = 0;
var govDocs = [], eduDocs = [], medDocs = [], expDocs = [], phDocs = [], resDocs = [], hrDocs = [], cerDocs = [], othrDocs = [], bgDocs = [], polDocs = [];
var policyTag = "";
var rdocs = [], pdocs = [];
var rpath = [], ppath = [];
var rreas = [];
var resAppr = [];
var empArray = [];
var empNameArray = [];
var magzYear = [], magzDoc = [], magzTot = [], magzQtr = [];
var i = 0, j = 0;
var empId = "";
var empFile = "";
var txtFile = "";
var doc = "";
var panFlg = "N", aadharFlg = "N", sslcFlg = "N", preunivFlg = "N", degreeFlg = "N";
var updQuery = "", selQuery = "";
var mailCommPath = '/home/portal/central/';


//////////////////// Mahesh /////////////////


////////////////////////////////////////////////get emp/////////////////////////////////////////
router.get('/cmsUploadEmployee', function (req, res) {
    var eid = req.query.user_id;
    var ename = req.query.user_name;
    var emp_access = req.query.user_type;
    if (emp_access != "A1") {
        res.json({
            cmsData: {
                ename: ename,
                eid: eid,
                emp_access: emp_access
            }
        });
    }
    else {
        // res.redirect('/admin-dashboard/adminDashboard/admindashboard');
        res.json({
            message: "redirect to admin-dashboard",
        })
    }
});


/////////////////////////////////////upload empolyeee/Admin////////////////////////////////////////////////////




// router.post('/cmsUploadPostEmployee', cmsUploadPostEmployee);
// function cmsUploadPostEmployee(req, res) {
//     console.log("Upload post Entered ");
//     // console.log(req);
//     // var emp_access = 'L1';
//     // var eid = 'MT001';
//     const form = new formidable.IncomingForm();

//     form.parse(req, function (err, fields, files) { 

//     var eid = req.body.user_id;
//     var emp_access = req.body.user_type;


//     console.log("eid before-->",eid);
//     console.log("emp_access before-->",emp_access);



//     if (emp_access != "A1") {
//         doc = "";


//             var empId = eid;
//             var empAccess= emp_access;
//             console.log(empId + " emp_id after");
//             console.log(empAccess+"empAccess afer");


//             var docCat = fields["docCat"];
//             var docType = fields["docType"];

//             console.log("docType--> " + docType);
//             console.log("1.docat--> " + docCat);


//             if (docCat == "1" || docCat == "2") {
//                 var docType = fields["docType"];
//                 console.log("2.docType--> " + docType);

//                 if (docCat == "2") {
//                     if (docType == "12") {
//                         var docTypeText = fields["docTypeText"];
//                         // var docTypeText = 'SSLC';     //Hard Coded here..
//                         console.log("3.docTypeText " + docTypeText);
//                         docTypeText = docTypeText.replace(/ /g, '_').toUpperCase();
//                     }
//                 }
//             }

//             if (docCat == "7" || docCat == "8" || docCat == "4") {
//                 var docCatText = fields["docCatText"];
//                 docCatText = docCatText.replace(/ /g, '_').toUpperCase();
//             }

//             if (docCat == "1") {
//                 if (docType == "1") {
//                     doc = "GOVT_PASSPORT";
//                 }
//                 if (docType == "2") {
//                     doc = "GOVT_PANCARD";
//                 }
//                 if (docType == "3") {
//                     doc = "GOVT_VOTERID";
//                 }
//                 if (docType == "4") {
//                     doc = "GOVT_DRIVLIC";
//                 }
//                 if (docType == "5") {
//                     doc = "GOVT_AADHAR";
//                 }
//             }
//             if (docCat == "2") {
//                 if (docType == "1") {
//                     doc = "EDUC_SSLC";
//                 }
//                 if (docType == "2") {
//                     doc = "EDUC_PRE_UNIV";
//                 }
//                 if (docType == "3") {
//                     doc = "EDUC_SEM1";
//                 }
//                 if (docType == "4") {
//                     doc = "EDUC_SEM2";
//                 }
//                 if (docType == "5") {
//                     doc = "EDUC_SEM3";
//                 }
//                 if (docType == "6") {
//                     doc = "EDUC_SEM4";
//                 }
//                 if (docType == "7") {
//                     doc = "EDUC_SEM5";
//                 }
//                 if (docType == "8") {
//                     doc = "EDUC_SEM6";
//                 }
//                 if (docType == "9") {
//                     doc = "EDUC_SEM7";
//                 }
//                 if (docType == "10") {
//                     doc = "EDUC_SEM8";
//                 }
//                 if (docType == "11") {
//                     doc = "EDUC_DEGREE";
//                 }
//                 if (docType == "12") {
//                     doc = "EDUC_OTHERS_" + docTypeText;
//                 }
//             }
//             if (docCat == "3") {
//                 doc = "MEDICAL";
//             }
//             if (docCat == "4") {
//                 doc = "EXPERIENCE_" + docCatText;
//             }
//             if (docCat == "5") {
//                 doc = "PHOTO";
//             }
//             if (docCat == "6") {
//                 doc = "RESUME";
//             }
//             if (docCat == "7") {
//                 doc = "CERT_" + docCatText;
//             }
//             if (docCat == "8") {
//                 doc = "OTHR_" + docCatText;
//             }

//             var dir2 = './data/CMS/employee/uploadDoc/' + empId + "/";
//             if (!fs.existsSync(dir2)) {
//                 fs.mkdirSync(dir2);
//             }
//             if (docCat == "5") {
//                 var newName = empId + "_" + doc + "_uv.jpg";
//             }
//             else if (docCat == "6") {
//                 var newName = empId + "_" + doc + "_uv.doc";
//             }
//             else {
//                 console.log("creating the pdf file name...");
//                 var newName = empId + "_" + doc + "_uv.pdf";
//                 console.log("New file Name--> " + newName);
//             }

//             var trejFoleder = './data/CMS/employee/rejectDoc/' + empId + "/";
//             var treasFoleder = './data/CMS/employee/rejectReason/' + empId + "/";
//             if (!fs.existsSync(trejFoleder)) {
//                 console.log("No rejected documents");
//             }
//             else {
//                 fs.readdirSync(trejFoleder).forEach(
//                     function (name) {
//                         var searchPattern = empId + "_" + doc;
//                         var resValue = name.search(searchPattern);
//                         if (resValue != -1) {
//                             if (doc == "PHOTO") {
//                                 var rejFile = trejFoleder + searchPattern + "_rj.jpg";
//                             }
//                             else if (doc == "RESUME") {
//                                 var rejFile = trejFoleder + searchPattern + "_rj.doc";
//                             }
//                             else {
//                                 var rejFile = trejFoleder + searchPattern + "_rj.pdf";
//                             }
//                             var reasFile = treasFoleder + searchPattern + "_rj.txt";
//                             fs.unlinkSync(rejFile);
//                             fs.unlinkSync(reasFile);
//                         }
//                     });
//             }


//             var newPath = dir2 + newName;

//             fs.rename(oldPath, newPath, function (err) {
//                 if (err) throw err;
//                 res.json({ notification: "Document Uploaded Successfully" })
//                 // res.redirect(req.get('referer'));
//             });




//     }
//     else {
//         res.json('/admin-dashboard/adminDashboard/admindashboard');
//     }

//     // console.log(">>>> 3");
//     // var oldName = "doc.pdf";
//     // var dir1 = './data/CMS/employee/uploadDoc/' + eid + "/";
//     // var oldPath = dir1 + oldName;
//     // if (!fs.existsSync(dir1)) {
//     //     fs.mkdirSync(dir1);
//     // }
//     // var storage = multer.diskStorage({
//     //     destination: function (req, file, callback) {
//     //         console.log(file);
//     //         callback(null, dir1)
//     //     },
//     //     filename: function (req, file, callback) {
//     //         callback(null, oldName)
//     //     }
//     // })

//     // var upload = multer({ storage: storage }).single('uploadDoc')
//     // upload(req, res, function (err) {
//     //     if (err) {
//     //         return res.end("Something went wrong!");
//     //     }
//     // });

//     var oldName = "doc.pdf";
// 	var dir1 = './data/CMS/employee/uploadDoc/' + eid + "/";
// 	var oldPath = dir1 + oldName;

// 	if (!fs.existsSync(dir1)) {
// 		fs.mkdirSync(dir1, { recursive: true });
// 	}

// 	var storage = multer.diskStorage({
// 		destination: function (req, file, callback) {
// 			callback(null, dir1);
// 		},
// 		filename: function (req, file, callback) {
// 			callback(null, oldName);
// 		}
// 	});

// 	var upload = multer({ storage: storage }).single('uploadDoc');
// 	upload(req, res, function (err) {
// 		if (err) {
// 			return res.status(500).json({ error: "File upload failed" });
// 		}
// 	});

// })
// }





///////////////////////////////////////////////////upload admin/////////////////////////////////////////////


// router.post('/cmsUploadPostAdmin',cmsUploadPostAdmin);
// function cmsUploadPostAdmin(req,res)
// {
// 	var emp_access = req.user.rows[0].user_type;
// 	if(emp_access == "A1")
// 	{
// 		doc = "";
// 		updQuery = "",panFlg = "N", aadharFlg = "N", sslcFlg = "N", preunivFlg = "N", degreeFlg = "N";
// 		var form = new formidable.IncomingForm();

// 		form.parse(req, 
// 			function (err, fields, files) 
// 			{
// 				var empId = fields["empId"];
// 				var docCat = fields["docCat"];
// 				if(docCat == "1" || docCat == "2" || docCat == "10")
// 				{
// 					var docType = fields["docType"];
// 					if(docCat == "2")
// 					{
// 						if(docType == "12")
// 						{
// 							var docTypeText = fields["docTypeText"];
// 							docTypeText = docTypeText.replace(/ /g,'_').toUpperCase();
// 						}
// 					}
// 				}
// 				if(docCat == "7" || docCat == "8" || docCat == "4")
// 				{
// 					var docCatText = fields["docCatText"];
// 					docCatText = docCatText.replace(/ /g,'_').toUpperCase();
// 				}
// 				if(docCat == "1")
// 				{
// 					if(docType == "1")
// 					{
// 						doc = "GOVT_PASSPORT";
// 					}
// 					if(docType == "2")
// 					{
// 						doc = "GOVT_PANCARD";
// 						panFlg = "Y";
// 					}
// 					if(docType == "3")
// 					{
// 						doc = "GOVT_VOTERID";
// 					}
// 					if(docType == "4")
// 					{
// 						doc = "GOVT_DRIVLIC";
// 					}
// 					if(docType == "5")
// 					{
// 						doc = "GOVT_AADHAR";
// 						aadharFlg = "Y";
// 					}
// 				}
// 				if(docCat == "2")
// 				{
// 					if(docType == "1")
// 					{
// 						doc = "EDUC_SSLC";
// 						sslcFlg = "Y";
// 					}
// 					if(docType == "2")
// 					{
// 						doc = "EDUC_PRE_UNIV";
// 						preunivFlg = "Y";
// 					}
// 					if(docType == "3")
// 					{
// 						doc = "EDUC_SEM1";
// 					}
// 					if(docType == "4")
// 					{
// 						doc = "EDUC_SEM2";
// 					}
// 					if(docType == "5")
// 					{
// 						doc = "EDUC_SEM3";
// 					}
// 					if(docType == "6")
// 					{
// 						doc = "EDUC_SEM4";
// 					}
// 					if(docType == "7")
// 					{
// 						doc = "EDUC_SEM5";
// 					}
// 					if(docType == "8")
// 					{
// 						doc = "EDUC_SEM6";
// 					}
// 					if(docType == "9")
// 					{
// 						doc = "EDUC_SEM7";
// 					}
// 					if(docType == "10")
// 					{
// 						doc = "EDUC_SEM8";
// 					}
// 					if(docType == "11")
// 					{
// 						doc = "EDUC_DEGREE";
// 						degreeFlg = "Y";
// 					}
// 					if(docType == "12")
// 					{
// 						doc = "EDUC_OTHERS_"+docTypeText;
// 					}
// 				}
// 				if(docCat == "3")
// 				{
// 					doc = "MEDICAL";
// 				}
// 				if(docCat == "4")
// 				{
// 					doc = "EXPERIENCE_"+docCatText;
// 				}
// 				if(docCat == "5")
// 				{
// 					doc = "PHOTO";
// 				}
// 				if(docCat == "6")
// 				{
// 					doc = "RESUME";
// 				}
// 				if(docCat == "7")
// 				{
// 					doc = "CERT_"+docCatText;
// 				}
// 				if(docCat == "8")
// 				{
// 					doc = "OTHR_"+docCatText;
// 				}
// 				if(docCat == "9")
// 				{
// 					doc = "BACKGROUND";
// 				}
// 				if(docCat == "10")
// 				{
// 					if(docType == "1")
// 					{
// 						doc = "HR_OFFER_LETTER";
// 					}
// 					if(docType == "2")
// 					{
// 						doc = "HR_BOND";
// 					}
// 					if(docType == "3")
// 					{
// 						doc = "HR_APPOINMENT_LETTER";
// 					}
// 					if(docType == "4")
// 					{
// 						doc = "HR_CONFIRMATION_LETTER";
// 					}
// 					if(docType == "5")
// 					{
// 						doc = "HR_ONSITE_DEPLOYMENT_DOCKET";
// 					}
// 					if(docType == "6")
// 					{
// 						var d = new Date();
// 						var n = d.getFullYear();
// 						doc = "HR_REVISION_LETTER_"+n;
// 					}
// 					if(docType == "7")
// 					{
// 						doc = "HR_COMPENSATION_LETTER";
// 					}
// 					if(docType == "8")
// 					{
// 						doc = "HR_EXIT_INTERVIEW_LETTER";
// 					}
// 					if(docType == "9")
// 					{
// 						doc = "HR_RELIEVING_LETTER";
// 					}
// 				}

// 				var dir2 = './data/CMS/employee/uploadDoc/'+empId+"/";
// 				if (!fs.existsSync(dir2))
// 				{
// 					fs.mkdirSync(dir2);
// 				}
// 				if(docCat == "5")
// 				{
// 					var newName = empId+".jpg";
// 					dir2 = './public/images/profile/';
// 				}
// 				else if(docCat == "6")
// 				{
// 					var newName = empId+"_"+doc+".doc";
// 					dir2 = './data/CMS/employee/uploadDoc/'+empId+"/";
// 				}
// 				else
// 				{
// 					var newName = empId+"_"+doc+".pdf";
// 					dir2 = './data/CMS/employee/uploadDoc/'+empId+"/";
// 				}

// 				var trejFoleder = './data/CMS/employee/rejectDoc/'+empId+"/";
// 				var treasFoleder = './data/CMS/employee/rejectReason/'+empId+"/";
// 				if (!fs.existsSync(trejFoleder))
// 				{
// 					console.log("No rejected documents");
// 				}
// 				else
// 				{
// 					fs.readdirSync(trejFoleder).forEach(
// 					function (name)
// 					{
// 						console.log("name",name);
// 						var searchPattern = empId+"_"+doc;
// 						var resValue = name.search(searchPattern);
// 						if(resValue != -1)
// 						{
// 							if(doc == "PHOTO")
// 							{
// 								var rejFile = trejFoleder + searchPattern+"_rj.jpg";
// 							}
// 							else if(doc == "RESUME")
// 							{
// 								var rejFile = trejFoleder + searchPattern+"_rj.doc";
// 							}
// 							else
// 							{
// 								var rejFile = trejFoleder + searchPattern+"_rj.pdf";
// 							}

// 							var reasFile = treasFoleder + searchPattern+"_rj.txt";
// 							fs.unlinkSync(rejFile);
// 							fs.unlinkSync(reasFile);
// 						}
// 					});
// 				}

// 				console.log(oldPath);
// 				var newPath = dir2 + newName;
// 				console.log(newPath);

// 				fs.rename(oldPath, newPath,
// 				function (err)
// 				{
// 					if (err) throw err;

// 					if(panFlg == "Y")
// 					{
// 						pool.query("UPDATE E_DOCKET_TBL SET PAN_FLG = $1 WHERE EMP_ID = $2",[panFlg, empId],
// 						function(err,done)
// 						{
// 							if(err) throw err;
//                             res.json({ 
//                                 message: "Document Uploaded Successfully"
//                                      })
// 						});
// 					}
// 					else if(aadharFlg == "Y")
// 					{
// 						pool.query("UPDATE E_DOCKET_TBL SET AADHAR_FLG = $1 WHERE EMP_ID = $2",[aadharFlg, empId],
// 						function(err,done)
// 						{
// 							if(err) throw err;
//                             res.json({ 
//                                 message: "Document Uploaded Successfully"
//                                      })
// 						});
// 					}
// 					else if(sslcFlg == "Y")
// 					{
// 						pool.query("UPDATE E_DOCKET_TBL SET SSLC_FLG = $1 WHERE EMP_ID = $2",[sslcFlg, empId],
// 						function(err,done)
// 						{
// 							if(err) throw err;
//                             res.json({ 
//                                 message: "Document Uploaded Successfully"
//                                      })
// 						});
// 					}
// 					else if(preunivFlg == "Y")
// 					{
// 						pool.query("UPDATE E_DOCKET_TBL SET PREUNIV_FLG = $1 WHERE EMP_ID = $2",[preunivFlg, empId],
// 						function(err,done)
// 						{
// 							if(err) throw err;
// 							res.json({ 
//                                 message: "Document Uploaded Successfully"
//                                      })
// 						});
// 					}
// 					else if(degreeFlg  == "Y")
// 					{
// 						pool.query("UPDATE E_DOCKET_TBL SET DEGREE_FLG = $1 WHERE EMP_ID = $2",[degreeFlg, empId],
// 						function(err,done)
// 						{
// 							if(err) throw err;

// 							 res.json({ 
//                                  message: "Document Uploaded Successfully"
//                                       })
// 						});
// 					}
// 					else
// 					{
// 						res.json({ 
//                                  message: "Document Uploaded Successfully"
//                                       })
// 					}
// 				});
// 			});

// 		var oldName = "doc.pdf";
// 		var dir1 = './data/CMS/employee/temp/';
// 		var oldPath = dir1 + oldName;
// 		if (!fs.existsSync(dir1))
// 		{
// 			fs.mkdirSync(dir1);
// 		}
// 		var storage = multer.diskStorage({
// 			destination: function(req, file, callback) {
// 				console.log(file);
// 				callback(null, dir1)
// 			},
// 			filename: function(req, file, callback) {
// 				callback(null,oldName)
// 			}
// 		})

// 		var upload = multer({storage: storage}).single('uploadDoc')
// 		upload(req, res, function(err) {
// 			if (err) {
// 					return res.end("Something went wrong!");
// 				 }
// 			});
// 	}
// 	else
// 	{
// 		res.json({  
//                   message: "Document Uploaded Successfully"
//                                       })
// 	}
// }






//////////////////  Jadhav ////////////////////////

router.post('/cmsUploadPost', cmsUploadPostEmployee);
function cmsUploadPostEmployee(req, res) {
    console.log("Upload post Entered ");
    // console.log(req);
    var emp_access = "";
    var eid = "";


    doc = "";

    const form = new formidable.IncomingForm();
    console.log("entred to emp post");
    form.parse(req, function (err, fields, files) {
        console.log("req", req);
        var eid = req.body.user_id;
        var emp_access = req.body.user_type;
        var docCat = req.body.docCat;
        var docType = req.body.docType;
        var docCatText=req.body.docCatText;
        var docTypeText=req.body.docTypeText;

        var empId = eid;
        console.log("EmpId--> " + empId);
        console.log("EmpAccess--> " + emp_access);
        console.log("docCat--> " + docCat);
        console.log("docType--> " + docType);
        console.log("docCatText--> " + docCatText);
        console.log("docTypeText--> " + docTypeText);

        if (emp_access != "A1") {

            console.log("1.docat--> " + docCat);
            if (docCat == "1" || docCat == "2") {

                console.log("2.docType--> " + docType);

                if (docCat == "2") {
                    if (docType == "12") {
                        var docTypeText = fields["docTypeText"];
                        // var docTypeText = 'SSLC';     //Hard Coded here..
                        console.log("3.docTypeText " + docTypeText);
                        docTypeText = docTypeText.replace(/ /g, '_').toUpperCase();
                    }
                }
            }

            if (docCat == "7" || docCat == "8" || docCat == "4") {
                var docCatText = fields["docCatText"];
                docCatText = docCatText.replace(/ /g, '_').toUpperCase();
            }

            if (docCat == "1") {
                if (docType == "1") {
                    doc = "GOVT_PASSPORT";
                }
                if (docType == "2") {
                    doc = "GOVT_PANCARD";
                }
                if (docType == "3") {
                    doc = "GOVT_VOTERID";
                }
                if (docType == "4") {
                    doc = "GOVT_DRIVLIC";
                }
                if (docType == "5") {
                    doc = "GOVT_AADHAR";
                }
            }
            if (docCat == "2") {
                if (docType == "1") {
                    doc = "EDUC_SSLC";
                }
                if (docType == "2") {
                    doc = "EDUC_PRE_UNIV";
                }
                if (docType == "3") {
                    doc = "EDUC_SEM1";
                }
                if (docType == "4") {
                    doc = "EDUC_SEM2";
                }
                if (docType == "5") {
                    doc = "EDUC_SEM3";
                }
                if (docType == "6") {
                    doc = "EDUC_SEM4";
                }
                if (docType == "7") {
                    doc = "EDUC_SEM5";
                }
                if (docType == "8") {
                    doc = "EDUC_SEM6";
                }
                if (docType == "9") {
                    doc = "EDUC_SEM7";
                }
                if (docType == "10") {
                    doc = "EDUC_SEM8";
                }
                if (docType == "11") {
                    doc = "EDUC_DEGREE";
                }
                if (docType == "12") {
                    doc = "EDUC_OTHERS_" + docTypeText;
                }
            }
            if (docCat == "3") {
                doc = "MEDICAL";
            }
            if (docCat == "4") {
                doc = "EXPERIENCE_" + docCatText;
            }
            if (docCat == "5") {
                doc = "PHOTO";
            }
            if (docCat == "6") {
                doc = "RESUME";
            }
            if (docCat == "7") {
                doc = "CERT_" + docCatText;
            }
            if (docCat == "8") {
                doc = "OTHR_" + docCatText;
            }

            var dir2 = './data/CMS/employee/uploadDoc/' + empId + "/";
            if (!fs.existsSync(dir2)) {
                fs.mkdirSync(dir2);
            }
            if (docCat == "5") {
                var newName = empId + "_" + doc + "_uv.jpg";
            }
            else if (docCat == "6") {
                var newName = empId + "_" + doc + "_uv.doc";
            }
            else {
                console.log("creating the pdf file name...");
                var newName = empId + "_" + doc + "_uv.pdf";
                console.log("New file Name--> " + newName);
            }

            var trejFoleder = './data/CMS/employee/rejectDoc/' + empId + "/";
            var treasFoleder = './data/CMS/employee/rejectReason/' + empId + "/";
            if (!fs.existsSync(trejFoleder)) {
                console.log("No rejected documents");
            }
            else {
                fs.readdirSync(trejFoleder).forEach(
                    function (name) {
                        var searchPattern = empId + "_" + doc;
                        var resValue = name.search(searchPattern);
                        if (resValue != -1) {
                            if (doc == "PHOTO") {
                                var rejFile = trejFoleder + searchPattern + "_rj.jpg";
                            }
                            else if (doc == "RESUME") {
                                var rejFile = trejFoleder + searchPattern + "_rj.doc";
                            }
                            else {
                                var rejFile = trejFoleder + searchPattern + "_rj.pdf";
                            }
                            var reasFile = treasFoleder + searchPattern + "_rj.txt";
                            fs.unlinkSync(rejFile);
                            fs.unlinkSync(reasFile);
                        }
                    });
            }


            var newPath = dir2 + newName;

            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err;
                res.json({ notification: "Document Uploaded Successfully" })
                // res.redirect(req.get('referer'));
            });



        }



        else {



            updQuery = "", panFlg = "N", aadharFlg = "N", sslcFlg = "N", preunivFlg = "N", degreeFlg = "N";



            if (docCat == "1" || docCat == "2" || docCat == "10") {



                if (docCat == "2") {
                    if (docType == "12") {
                        docTypeText = docTypeText.replace(/ /g, '_').toUpperCase();

                    }
                }
            }
            if (docCat == "7" || docCat == "8" || docCat == "4") {

                docCatText = docCatText.replace(/ /g, '_').toUpperCase();
            }
            if (docCat == "1") {
                if (docType == "1") {
                    doc = "GOVT_PASSPORT";
                }
                if (docType == "2") {
                    doc = "GOVT_PANCARD";
                    panFlg = "Y";
                }
                if (docType == "3") {
                    doc = "GOVT_VOTERID";
                }
                if (docType == "4") {
                    doc = "GOVT_DRIVLIC";
                }
                if (docType == "5") {
                    doc = "GOVT_AADHAR";
                    aadharFlg = "Y";
                }
            }
            if (docCat == "2") {
                if (docType == "1") {
                    doc = "EDUC_SSLC";
                    sslcFlg = "Y";
                }
                if (docType == "2") {
                    doc = "EDUC_PRE_UNIV";
                    preunivFlg = "Y";
                }
                if (docType == "3") {
                    doc = "EDUC_SEM1";
                }
                if (docType == "4") {
                    doc = "EDUC_SEM2";
                }
                if (docType == "5") {
                    doc = "EDUC_SEM3";
                }
                if (docType == "6") {
                    doc = "EDUC_SEM4";
                }
                if (docType == "7") {
                    doc = "EDUC_SEM5";
                }
                if (docType == "8") {
                    doc = "EDUC_SEM6";
                }
                if (docType == "9") {
                    doc = "EDUC_SEM7";
                }
                if (docType == "10") {
                    doc = "EDUC_SEM8";
                }
                if (docType == "11") {
                    doc = "EDUC_DEGREE";
                    degreeFlg = "Y";
                }
                if (docType == "12") {
                    doc = "EDUC_OTHERS_" + docTypeText;
                }
            }
            if (docCat == "3") {
                doc = "MEDICAL";
            }
            if (docCat == "4") {
                doc = "EXPERIENCE_" + docCatText;
            }
            if (docCat == "5") {
                doc = "PHOTO";
            }
            if (docCat == "6") {
                doc = "RESUME";
            }
            if (docCat == "7") {
                doc = "CERT_" + docCatText;
            }
            if (docCat == "8") {
                doc = "OTHR_" + docCatText;
            }
            if (docCat == "9") {
                doc = "BACKGROUND";
            }
            if (docCat == "10") {
                if (docType == "1") {
                    doc = "HR_OFFER_LETTER";
                }
                if (docType == "2") {
                    doc = "HR_BOND";
                }
                if (docType == "3") {
                    doc = "HR_APPOINMENT_LETTER";
                }
                if (docType == "4") {
                    doc = "HR_CONFIRMATION_LETTER";
                }
                if (docType == "5") {
                    doc = "HR_ONSITE_DEPLOYMENT_DOCKET";
                }
                if (docType == "6") {
                    var d = new Date();
                    var n = d.getFullYear();
                    doc = "HR_REVISION_LETTER_" + n;
                }
                if (docType == "7") {
                    doc = "HR_COMPENSATION_LETTER";
                }
                if (docType == "8") {
                    doc = "HR_EXIT_INTERVIEW_LETTER";
                }
                if (docType == "9") {
                    doc = "HR_RELIEVING_LETTER";
                }
            }

            var dir2 = './data/CMS/employee/uploadDoc/' + empId + "/";
            if (!fs.existsSync(dir2)) {
                fs.mkdirSync(dir2);
            }
            if (docCat == "5") {
                var newName = empId + ".jpg";
                dir2 = './public/images/profile/';
            }
            else if (docCat == "6") {
                var newName = empId + "_" + doc + ".doc";
                dir2 = './data/CMS/employee/uploadDoc/' + empId + "/";
            }
            else {
                var newName = empId + "_" + doc + ".pdf";
                dir2 = './data/CMS/employee/uploadDoc/' + empId + "/";
            }

            var trejFoleder = './data/CMS/employee/rejectDoc/' + empId + "/";
            var treasFoleder = './data/CMS/employee/rejectReason/' + empId + "/";
            if (!fs.existsSync(trejFoleder)) {
                console.log("No rejected documents");
            }
            else {
                fs.readdirSync(trejFoleder).forEach(
                    function (name) {
                        console.log("name", name);
                        var searchPattern = empId + "_" + doc;
                        var resValue = name.search(searchPattern);
                        if (resValue != -1) {
                            if (doc == "PHOTO") {
                                var rejFile = trejFoleder + searchPattern + "_rj.jpg";
                            }
                            else if (doc == "RESUME") {
                                var rejFile = trejFoleder + searchPattern + "_rj.doc";
                            }
                            else {
                                var rejFile = trejFoleder + searchPattern + "_rj.pdf";
                            }

                            var reasFile = treasFoleder + searchPattern + "_rj.txt";
                            fs.unlinkSync(rejFile);
                            fs.unlinkSync(reasFile);
                        }
                    });
            }

            console.log(oldPath);
            var newPath = dir2 + newName;
            console.log(newPath);

            fs.rename(oldPath, newPath,
                function (err) {
                    if (err) throw err;

                    if (panFlg == "Y") {
                        pool.query("UPDATE E_DOCKET_TBL SET PAN_FLG = $1 WHERE EMP_ID = $2", [panFlg, empId],
                            function (err, done) {
                                if (err) throw err;
                            
                                res.json({ notification: "Document Uploaded Successfully" });

                            });
                    }
                    else if (aadharFlg == "Y") {
                        pool.query("UPDATE E_DOCKET_TBL SET AADHAR_FLG = $1 WHERE EMP_ID = $2", [aadharFlg, empId],
                            function (err, done) {
                                if (err) throw err;
                               
                                res.json({ notification: "Document Uploaded Successfully" });

                            });
                    }
                    else if (sslcFlg == "Y") {
                        pool.query("UPDATE E_DOCKET_TBL SET SSLC_FLG = $1 WHERE EMP_ID = $2", [sslcFlg, empId],
                            function (err, done) {
                                if (err) throw err;
                
                                res.json({ notification: "Document Uploaded Successfully" });

                            });
                    }
                    else if (preunivFlg == "Y") {
                        pool.query("UPDATE E_DOCKET_TBL SET PREUNIV_FLG = $1 WHERE EMP_ID = $2", [preunivFlg, empId],
                            function (err, done) {
                                if (err) throw err;
                            
                                res.json({ notification: "Document Uploaded Successfully" });

                            });
                    }
                    else if (degreeFlg == "Y") {
                        pool.query("UPDATE E_DOCKET_TBL SET DEGREE_FLG = $1 WHERE EMP_ID = $2", [degreeFlg, empId],
                            function (err, done) {
                                if (err) throw err;
        
                                res.json({ notification: " Document Uploaded Successfully" });

                            });
                    }
                    else {

                        res.json({ notification: " Document Uploaded Successfully" });
                    }
                });
               
        }

        
    });

    console.log(">>>> 3");
    var oldName = "doc.pdf";
    var dir1 = './data/CMS/employee/uploadDoc/' + eid + "/";;
    var oldPath = dir1 + oldName;
    if (!fs.existsSync(dir1)) {
        fs.mkdirSync(dir1);
    }
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            console.log(file);
            callback(null, dir1)
        },
        filename: function (req, file, callback) {
            callback(null, oldName)
        }
    })

    var upload = multer({ storage: storage }).single('uploadDoc')
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
    });




}





/////////////////////////////////////////admin Approve////////////////////////////////////////////////////////

////////////////////////////////////////EMP APPROVE//////////////////

router.get('/cmsApprAdmin',cmsApprAdmin);
function cmsApprAdmin(req,res)
{
	var eid =req.body.user_id;
	var ename = req.body.user_name;
	var emp_access = req.body.user_type;
    console.log("eid-->"+eid);
    console.log("ename-->"+ename);
    console.log("emp_access-->"+emp_access);
	if(emp_access == "A1")
	{
		len = 0;
		len2 = 0;
		i = 0;
		var empString = "";
		selQuery = "";
		var testFolder = './data/CMS/employee/uploadDoc/';
		fs.readdirSync(testFolder).forEach(function (empId) 
		{
			len1=0;
			cpath[len] = testFolder + empId + "/";
		
				try
				{
					fs.readdirSync(cpath[len]).forEach(
					function(empFile)
					{
						var resValue = empFile.search("uv");
						if(resValue != -1)
						{
							empArray[len2] = empId;
							len2 = len2 +1;
							throw "done";
						}	
					});
				}
				catch (e) {if (e != "done") console.log(empId);}			
				docs[len] = empFile;
				len =len+1;
		});
		for(i=0;i<len2;)
		{
			empString = empString + "'" +empArray[i]+"'";
			i = i + 1;
			if(i < len2)
			{
				empString = empString + ",";
			}	
		}
		if(len2 >0)
		{
			selQuery = "SELECT emp_id,emp_name from emp_master_tbl where emp_id in ("+empString+") order by emp_id"

			pool.query(selQuery,
				function(err,result)
				{
					employee=result.rows;
					emp_id_count=result.rowCount;

					res.json({
                        data:{

                        
						employee:employee,
						emp_id_count:emp_id_count,
						len2:len2,
						ename:ename,
						eid:eid,
						emp_access:emp_access
                        }
					});
				});
		}
		else
		{
			res.json({
                data:{
				len2:len2,
				ename:ename,
				eid:eid,
				emp_access:emp_access
                }
			});

		}
	}
	else
        {
                res.json(' redirect to admin');
        }
}

//////////////////////SERACH BY EMP ID/////////////////////
router.get('/cmsApprEmpIdAdmin',cmsApprEmpIdAdmin);
function cmsApprEmpIdAdmin(req,res)
{
	len=0;
    var eid =req.body.user_id;
	var ename = req.body.user_name;
	var emp_access = req.body.user_type;
    console.log("eid-->"+eid);
    console.log("ename-->"+ename);
    console.log("emp_access-->"+emp_access);

	if(emp_access == "A1")
	{
		empId = req.body.user_id;
		var testFolder = './data/CMS/employee/uploadDoc/'+empId+"/";

		pool.query("SELECT emp_name from emp_master_tbl where emp_id =$1 ",[empId],
			function(err,result){
			employee=result.rows;
			emp_id_count=result.rowCount;

			fs.readdirSync(testFolder).forEach(
			function(name)
			{
				var resValue = name.search("uv");
				if(resValue != -1)
				{
					docs[len] = name;
					cpath[len] = testFolder + name;
					len = len +1;
				}
			});

			res.json({
            data: {
			docs:docs,
			cpath:cpath,
			len:len,
			empId:empId,
			ename:ename,
			eid:eid,
			employee:employee,
			emp_access:emp_access
            }
			});
		});
	}
	else
	{
		res.json('Redirect to  Admin');
	}
}






//////////////////////////////////////APPROVE POST///////////////////////////////
router.post('/cmsApprPostAdmin',cmsApprPostAdmin);

function cmsApprPostAdmin(req,res)
{
	var emp_access = req.body.user_type;
	if(emp_access == "A1")
        {
		updQuery = "", panFlg = "N", aadharFlg = "N", sslcFlg = "N", preunivFlg = "N", degreeFlg = "N";
		len = req.query.len;
		empId = req.query.empId;
		i=0;
		j=0;
		var caseInp = "";
		for(i = 0; i < len; i++) 
		{
			var caseInp = req.body['caseinput' + i];
			if(caseInp == 1)
			{
				docs[i];
				var caseInp1 = docs[i].length - 7;
				var dir1 = './data/CMS/employee/uploadDoc/'+empId+"/";
				var oldPath = dir1 + docs[i];
				var name = docs[i].substring(0,caseInp1);
				
				var resValue = name.search("PHOTO");
				if(resValue != -1)
				{
					var newName = empId +".jpg";
					var dir2 = './public/images/profile/';
				}	
				else
				{
					var resValue1 = name.search("RESUME");
					if(resValue1 != -1)
					{
						var newName = name +".doc";
					}
					else
					{
						var newName = name +".pdf";
						var apprPattern = name.search("GOVT_PANCARD");
						if(apprPattern != -1)
						{
							panFlg = "Y";
						}
						var apprPattern = name.search("GOVT_AADHAR");
						if(apprPattern != -1)
						{
							aadharFlg = "Y";
						}
						var apprPattern = name.search("EDUC_SSLC");
						if(apprPattern != -1)
						{
							sslcFlg = "Y";
						}
						var apprPattern = name.search("EDUC_PRE_UNIV");
						if(apprPattern != -1)
						{
							preunivFlg = "Y";
						}
						var apprPattern = name.search("EDUC_DEGREE");
						if(apprPattern != -1)
						{
							degreeFlg = "Y";
						}

					}
					var dir2 = './data/CMS/employee/uploadDoc/'+empId+"/";
				}		
				var newPath = dir2 + newName;
				fs.rename(oldPath, newPath, function (err) {
					if (err) throw err;

			      });
			}
		}
		
		if(panFlg == "Y" || aadharFlg == "Y" || sslcFlg == "Y" || preunivFlg == "Y" || degreeFlg == "Y")
		{
			if(panFlg == "Y")
			{
				updQuery = "PAN_FLG = 'Y'";
			}
			if(aadharFlg == "Y")
			{
				if(updQuery == "")
				{
					updQuery = "AADHAR_FLG = 'Y'";
				}
				else
				{
					updQuery = updQuery + ",AADHAR_FLG = 'Y'";
				}
			}
			if(sslcFlg == "Y")
			{
				if(updQuery == "")
				{
					updQuery = "SSLC_FLG = 'Y'";
				}
				else
				{
					updQuery = updQuery + ",SSLC_FLG = 'Y'";
				}
			}
			if(preunivFlg == "Y")
			{
				if(updQuery == "")
				{
					updQuery = "PREUNIV_FLG = 'Y'";
				}
				else
				{
					updQuery = updQuery + ",PREUNIV_FLG = 'Y'";
				}
			}
			if(degreeFlg == "Y")
			{
				if(updQuery == "")
				{
					updQuery = "DEGREE_FLG = 'Y'";
				}
				else
				{
					updQuery = updQuery + ",DEGREE_FLG = 'Y'";
				}
			}
			console.log("updQuery : ",updQuery);

			pool.query("UPDATE E_DOCKET_TBL SET " + updQuery + " WHERE EMP_ID = $1", [empId],
			function(err,done)
			{
				if(err) throw err;
                res.json({
                
                    notification: "Documents Approved Successfully"
                  })
				
			
			});
		}
		else
		{
            res.json({
                
                notification: "Documents Approved Successfully"
              })
		}
	}
	else
        {
            res.json({
                
                message: "redirect to admin "
              })

        }
}







///////////////////////////////////////INDULUAL APPPR///////////////////////////////


router.get('/cmsApprIndvAdmin',cmsApprIndvAdmin);

function cmsApprIndvAdmin(req,res)
{
	var emp_access = req.body.user_type;

	if(emp_access == "A1")
        {
		panFlg = "N", aadharFlg = "N", sslcFlg = "N", preunivFlg = "N", degreeFlg = "N";
		empId = req.query.empId;
		var doc = req.query.doc;
	    var caseInp1 = doc.length - 7;
		var name = doc.substring(0,caseInp1);	
		var dir1 = './data/CMS/employee/uploadDoc/'+empId+"/";
		var oldPath = dir1 + doc;
		var resValue = doc.search("PHOTO");
		if(resValue != -1)
		{
			var newName = empId +".jpg";
			var dir2 = './public/images/profile/';
		}	
		else
		{
			var resValue1 = name.search("RESUME");
			if(resValue1 != -1)
			{
				var newName = name +".doc";
			}
			else
			{
				var newName = name +".pdf";
				var apprPattern = name.search("GOVT_PANCARD");
				if(apprPattern != -1)
				{
					panFlg = "Y";
				}
				var apprPattern = name.search("GOVT_AADHAR");
				if(apprPattern != -1)
				{
					aadharFlg = "Y";
				}
				var apprPattern = name.search("EDUC_SSLC");
				if(apprPattern != -1)
				{
					sslcFlg = "Y";
				}
				var apprPattern = name.search("EDUC_PRE_UNIV");
				if(apprPattern != -1)
				{
					preunivFlg = "Y";
				}
				var apprPattern = name.search("EDUC_DEGREE");
				if(apprPattern != -1)
				{
					degreeFlg = "Y";
				}
			}
			var dir2 = './data/CMS/employee/uploadDoc/'+empId+"/";
		}		

		var newPath = dir2 + newName;
		fs.rename(oldPath, newPath, 
		function (err) 
		{
			if (err) throw err;
			if(panFlg == "Y")
			{
				pool.query("UPDATE E_DOCKET_TBL SET PAN_FLG = $1 WHERE EMP_ID = $2",[panFlg, empId],
				function(err,done)
				{
					if(err) throw err;
                    res.json({
                        notification: "Documents Approved Successfully"
                      })
				});
			}
			else if(aadharFlg == "Y")
			{
				pool.query("UPDATE E_DOCKET_TBL SET AADHAR_FLG = $1 WHERE EMP_ID = $2",[aadharFlg, empId],
				function(err,done)
				{
					if(err) throw err;
					res.json({
                        notification: "Documents Approved Successfully"
                      })
				});

			}
			else if(sslcFlg == "Y")
			{
				pool.query("UPDATE E_DOCKET_TBL SET SSLC_FLG = $1 WHERE EMP_ID = $2",[sslcFlg, empId],
				function(err,done)
				{
					if(err) throw err;
                    res.json({
                        notification: "Documents Approved Successfully"
                      })
				});

			}
			else if(preunivFlg == "Y")
			{
				pool.query("UPDATE E_DOCKET_TBL SET PREUNIV_FLG = $1 WHERE EMP_ID = $2",[preunivFlg, empId],
				function(err,done)
				{
					if(err) throw err;
                    res.json({
                        notification: "Documents Approved Successfully"
                      })
				});

			}
			else if(degreeFlg  == "Y")
			{
				pool.query("UPDATE E_DOCKET_TBL SET DEGREE_FLG = $1 WHERE EMP_ID = $2",[degreeFlg, empId],
				function(err,done)
				{
					if(err) throw err;
                    res.json({
                        notification: "Documents Approved Successfully"
                      })
				});

			}
			else
			{
				res.json({
                    notification: "Documents Approved Successfully"
                  })
			}
		});
	}
	else
        {
            res.json({
                message: "redirect to admin "
              })
        }
}


////////////////////////////////////////////////////////// APPPR RJECT //////////////////////////////
router.get('/cmsApprRejectAdmin',cmsApprRejectAdmin);
function cmsApprRejectAdmin(req,res)
{
	var eid =req.body.user_id;
        var ename = req.body.user_name;
	var emp_access = req.body.user_type;

    console.log("empAccess-->",emp_access);
    console.log("empid-->"+eid);
    console.log("ename-->"+ename);


	if(emp_access == "A1")
	{
		var empId = eid;
		var doc = req.query.doc;
		var reas = req.query.reas;

        console.log("empid-->"+empId);
        console.log("doc-->"+doc);
        console.log("reas-->"+reas);

		var dirRej = './data/CMS/employee/rejectDoc/'+empId+"/";
		if (!fs.existsSync(dirRej))
		{
			fs.mkdirSync(dirRej);
		}
		var caseInp1 = doc.length - 7;
        console.log("caseInp1",caseInp1);
		var name = doc.substring(0,caseInp1);

		var resValue = name.search("PHOTO");
		if(resValue != -1)
		{
			var newName = name +"_rj.jpg";
		}
		else
		{
			var resValue1 = name.search("RESUME");
			if(resValue1 != -1)
			{
				var newName = name +"_rj.doc";
			}
			else
			{
				var newName = name +"_rj.pdf";
			}
		}

		var newPath = dirRej+newName;

		var dirReas = './data/CMS/employee/rejectReason/'+empId+"/";
		if (!fs.existsSync(dirReas))
		{
			fs.mkdirSync(dirReas);
		}
		var reastxt = name +"_rj.txt";
		var reasNewfile = dirReas+reastxt;

		var dirOld = './data/CMS/employee/uploadDoc/'+empId+"/";
		var oldPath = dirOld + doc;

		fs.rename(oldPath, newPath, 
			function (err) 
			{
				if (err) throw err;

				fs.writeFile(reasNewfile, reas, function (err) 
				{
				    if (err) 
					return console.log(err);
					len=0;
					var testFolder = './data/CMS/employee/uploadDoc/'+empId+"/";
					fs.readdirSync(testFolder).forEach(
					function(name)
					{
						var resValue = name.search("uv");
						if(resValue != -1)
						{
							docs[len] = name;
							cpath[len] = testFolder + name;
							len = len +1;
						}
					});
                    
                    res.json({
                        notification: "Document Rejected Successfully"
                      })
				});
			}
		);	
	}
	else
	{
        res.json({
            message: "redirect to admin "
          })
	}
}


/////////////////////////////////////////////////
module.exports = router;


