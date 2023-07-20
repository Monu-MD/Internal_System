// var multer = require('multer');
// var path = require('path');
// var util = require('util');
// var fs = require('fs');

// const express = require('express');
// var router = express.Router();
// var pool = require('../Database/dbconfig');

// var archiver = require('archiver'),
//     archive = archiver('zip');

// var moment = require('moment');
// var formidable = require("formidable");

// var bodyParser = require('body-parser');


// // Set up the body-parser middleware
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());



// //////////////////////////start uploading documnets//////////////////////////
// var upload = multer({ storage: storage });

// // Endpoint for document upload
// router.post('/cmsUploadPostEmployee', upload.single('uploadDoc'), (req, res) => {
//   console.log('check 111');

// var emp_access = req.body.user_type;
// var user_id =req.body.user_id;

// console.log("emp_acess",emp_access);
// console.log("user_id",user_id);

// if(emp_access != "A1"){
//   if (!req.file) {
//     return res.status(500).json({ error: 'Failed to upload document' });
//   }

//   var empId = user_id;
//   var docCat = req.body.docCat;
//   console.log(docCat, 'docCat1');

//   var doc;

//   var docTypeText = '';
//   if (docCat == "1" || docCat == "2") {
//     var docType = req.body.docType;
//     if (docCat == "2" && docType == "12") {
//       docTypeText = req.body.docTypeText || '';
//       docTypeText = docTypeText.replace(/ /g, '_').toUpperCase();
//     }
//   }


//   var docCatText = '';
//   if (docCat == "7" || docCat == "8" || docCat == "4") {
//     docCatText = req.body.docCatText || '';
//     docCatText = docCatText.replace(/ /g, '_').toUpperCase();
//   }


//   if (docCat == "1") {
//     console.log("check33333");
//     if (docType == "1") {
//       doc = "GOVT_PASSPORT";
//     }
//     if (docType == "2") {
//       doc = "GOVT_PANCARD";
//     }
//     if (docType == "3") {
//       doc = "GOVT_VOTERID";
//     }
//     if (docType == "4") {
//       doc = "GOVT_DRIVLIC";
//     }
//     if (docType == "5") {
//       doc = "GOVT_AADHAR";
//     }
//   }
//   if (docCat == "2") {
//               if (docType == "1") {
//               doc = "EDUC_SSLC";
//              }
//              if (docType == "2") {
//             doc = "EDUC_PRE_UNIV";
//                }
//              if (docType == "3") {
//              doc = "EDUC_SEM1";
//              }
//               if(docType == "4")
//     					{
//     						doc = "EDUC_SEM2";
//     					}
//     					if(docType == "5")
//     					{
//     						doc = "EDUC_SEM3";
//     					}
//     					if(docType == "6")
//     					{
//     						doc = "EDUC_SEM4";
//     					}
//     					if(docType == "7")
//     					{
//     						doc = "EDUC_SEM5";
//     					}
//     					if(docType == "8")
//     					{
//     						doc = "EDUC_SEM6";
//     					}
//     					if(docType == "9")
//     					{
//     						doc = "EDUC_SEM7";
//     					}
//     					if(docType == "10")
//     					{
//     						doc = "EDUC_SEM8";
//     					}
//     					if(docType == "11")
//     					{
//     						doc = "EDUC_DEGREE";
//     					}
//     					if(docType == "12")
//     					{
//     						doc = "EDUC_OTHERS_"+docTypeText;
//     					}
   
//   }
//         if(docCat == "3")
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


//   // Add more conditions for other document categories and types...

//   var dir2 = './data/CMS/employee/uploadDoc/' + empId + "/";
//   try {
//     fs.mkdirSync(dir2, { recursive: true });
//   } catch (err) {
//     console.error('Error creating directories:', err);
//   }


//   ////////////////////////////////////////////////////////start creating file /////////////
// // Multer configuration to handle file uploads
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     var dir = './data/CMS/employee/uploadDoc/' + req.body.user_id + '/';
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     cb(null, dir);
//   },

//   // filename: function (req, file, cb) {
//   //   var doc = 'UNKNOWN'; // Default document type
   
   
//   //    if (req.body.docCat == '1') {
//   //           // Government Documents
//   //           if (req.body.docType == '1') doc = 'GOVT_PASSPORT';
//   //           else if (req.body.docType == '2') doc = 'GOVT_PANCARD';
//   //           else if (req.body.docType == '3') doc = 'GOVT_VOTERID';
//   //           else if (req.body.docType == '4') doc = 'GOVT_DRIVLIC';
//   //           else if (req.body.docType == '5') doc = 'GOVT_AADHAR';
//   //   }
//   //    else if (req.body.docCat == '2') {
//   //     // Educational Documents
//   //           if (req.body.docType == '1') doc = 'EDUC_SSLC';
//   //           else if (req.body.docType == '2') doc = 'EDUC_PRE_UNIV';
//   //           else if (req.body.docType == '3') doc = 'EDUC_SEM1';
//   //           else if (req.body.docType == '4') doc = 'EDUC_SEM2';
//   //           else if (req.body.docType == '5') doc = 'EDUC_SEM3';
//   //           else if (req.body.docType == '6') doc = 'EDUC_SEM4';
//   //           else if (req.body.docType == '7') doc = 'EDUC_SEM5';
//   //           else if (req.body.docType == '8') doc = 'EDUC_SEM6';
//   //           else if (req.body.docType == '9') doc = 'EDUC_SEM7';
//   //           else if (req.body.docType == '10') doc = 'EDUC_SEM8';
//   //           else if (req.body.docType == '11') doc = 'EDUC_DEGREE';
//   //           else if (req.body.docType == '12') doc = 'EDUC_OTHERS_';  
//   //   }

//   //   else if(req.body.docCat =='3'){
//   //     //medical Documents    
//   //   }

//   //   else if(req.body.docCat == '4'){
//   //     //experience
//   //     if (req.body.CompanyName == '4') doc ='EXPERIENCE_';
//   //   }

//   //   else if(req.body.docCat =='5'){
//   //     //photo Documents    
//   //   }

//   //   else if(req.body.docCat =='6'){
//   //     //resume Documents    
//   //   }

//   //   else if(req.body.docCat =='7'){
//   //     //certification Documents   
//   //     if (req.body.documentDescription == '7') doc ='CERT_';
//   //   }

//   //   else if(req.body.docCat == '8'){
//   //      //others
//   //      if (req.body.documentDescription == '8') doc =' ';
//   //   }

//   // }

// });

// //////////////////////////end  creating file ////////////////

 
//   var originalExtension = path.extname(file.originalname);
//   var empId=req.body.user_id;
//   // Generate the new filename based on document type and original extension
//   var newFilename = empId + '_' + doc + '_uv' + originalExtension;

//   cb(null, newFilename);



//   //////reject file////////////////

//   var trejFoleder = './data/CMS/employee/rejectDoc/' + empId + "/";
//   var treasFoleder = './data/CMS/employee/rejectReason/' + empId + "/";

//   if (!fs.existsSync(trejFoleder)) {
//     console.log("No rejected documents");
//   } else {
//     fs.readdirSync(trejFoleder).forEach(function (name) {
//       var searchPattern = empId + "_" + doc;
//       var resValue = name.search(searchPattern);
//       if (resValue != -1) {
//         var rejFile, reasFile;
//         if (doc == "PHOTO") {
//           rejFile = trejFoleder + searchPattern + "_rj.jpg";
//         } else if (doc == "RESUME") {
//           rejFile = trejFoleder + searchPattern + "_rj.doc";
//         } else {
//           rejFile = trejFoleder + searchPattern + "_rj.pdf";
//         }
//         reasFile = treasFoleder + searchPattern + "_rj.txt";
//         fs.unlinkSync(rejFile);
//         fs.unlinkSync(reasFile);
//       }
//     });
//   }

//   var dir = './data/CMS/employee/uploadDoc/' + user_id + '/';
//   var oldPath = files.uploadDoc.path;
//   if (!fs.existsSync(dir)) {
//     try {
//       fs.mkdirSync(dir, { recursive: true });
//     } catch (err) {
//       console.error('Error creating directories:', err);
//       return res.status(500).json({ error: 'Failed to upload document' });
//     }
//   }

//   var newPath = dir + newName;

//   fs.rename(oldPath, newPath, function (err) {
//     conosle.log("enter rename");
//     if (err) {
//       console.error('Error renaming file:', err);
//       return res.status(500).json({ error:'Failed to upload document'});
//     }

//     res.json({
//       notification: 'Document Uploaded Successfully'
//     });
//   });
// }
// });

// module.exports = router;












































// // var multer = require('multer');
// // var path = require('path');
// // var util = require('util');
// // var fs = require('fs');

// // const express = require('express');
// // var router = express.Router();
// // var pool = require('../Database/dbconfig');

// // var archiver = require('archiver'),
// //     archive  = archiver('zip');

// // var moment = require('moment');
// // var formidable = require("formidable");

// // var bodyParser = require('body-parser');

// // var nodemailer = require('nodemailer');
// // const { Console } = require('console');
// // // var invalidAccessRedirect = require('../../routes/invalidAccess');

// // var mailId = "";
// // var name = "";
// // var emp = "";
// // var newName = "";
// // var emp_name = "";
// // var oldPath = "";
// // var testFolder = "";
// // var cpath = [];
// // var docs = [];
// // var len = 0, len1 = 0,len2 = 0,plen = 0,rlen = 0,len3 = 0,totLen = 0, totYear = 0;
// // var govLen = 0, eduLen = 0, medLen = 0,expLen = 0, phLen = 0, resLen = 0, hrLen = 0,cerLen = 0, othrLen =0, bgLen = 0, polLen = 0, policy_count = 0;
// // var govDocs = [], eduDocs = [], medDocs = [],expDocs = [], phDocs = [], resDocs = [], hrDocs = [], cerDocs = [], othrDocs = [], bgDocs = [], polDocs = [];
// // var policyTag = "";
// // var rdocs = [],pdocs = [];
// // var rpath = [],ppath = [];
// // var rreas = [];
// // var resAppr = [];
// // var empArray = [];
// // var empNameArray = [];
// // var magzYear = [], magzDoc = [], magzTot = [],magzQtr = [];
// // var i=0,j=0;
// // var empId = "";
// // var empFile = "";
// // var txtFile = "";
// // var doc = "";
// // var panFlg = "N", aadharFlg = "N", sslcFlg = "N", preunivFlg = "N", degreeFlg = "N";
// // var updQuery = "", selQuery = "";
// // var mailCommPath = '/home/portal/central/';




// // router.get('/cms',function(req,res)
// // {
// // 	var eid =req.body.user_id;
// // 	var ename = req.body.user_name;
// // 	var emp_access = req.body.user_type;
// // 	if(emp_access == "A1")
// // 	{
// // 		cmsUploadAdmin(req,res);
// // 	}
// // 	else
// // 	{

// // 		res.json({
// // 		    cmsData:{
// // 		    ename:ename,
// // 			eid:eid,
// // 			emp_access:emp_access
// // 		   }
// // 		});
// // 	}
// // });
// // // [ Admin Functions definition Start 19-07-2017 18:30


// // router.get('/cmsUploadAdmin',cmsUploadAdmin);

// // function cmsUploadAdmin(req,res)
// // {
// // 	var eid =req.body.user_id;
// // 	var ename = req.body.user_name;
// // 	var emp_access = req.body.user_type;

// // 	if(emp_access == "A1")
// // 	{
// // 		pool.query("SELECT emp_id,emp_name from emp_master_tbl where del_flg=$1 order by emp_id asc",['N'],
// // 			function(err,result){
// // 			employee=result.rows;
// // 			emp_id_count=result.rowCount;

// // 			res.json({
// // 		    cmsData:{
// // 			ename:ename,
// // 			eid:eid,
// // 			emp_id_count:emp_id_count,
// // 			employee:employee,
// // 			emp_access:emp_access
// // 		        }
// // 		});
// // 		});
// // 	}
// // 	else
// // 	{
// // 	// 	res.redirect('/admin-dashboard/adminDashboard/admindashboard');
// //     res.json({
// //         message: "redirect to admin-dashboard"
// //       }) 

// // 	 }
// // }


// // router.get('/cmsViewAdmin',function(req,res)
// // {
// // 	var eid =req.body.user_id;
// // 	var ename = req.body.user_name;
// // 	var emp_access = req.body.user_type;

// // 	if(emp_access == "A1")
// //         {
// // 		pool.query("SELECT emp_id,emp_name from emp_master_tbl where del_flg=$1 order by emp_id asc",['N'],
// // 			function(err,result){
// // 			employee=result.rows;
// // 			emp_id_count=result.rowCount;

// // 			res.json({
// // 		    cmsData:{
// // 				ename:ename,
// // 				eid:eid,
// // 				emp_id_count:emp_id_count,
// // 				employee:employee,
// // 				emp_access:emp_access
// // 		   }
// // 		});
// // 		});
// // 	}
// // 	else
// //         {
// //                 // res.redirect('/admin-dashboard/adminDashboard/admindashboard');
// //                 res.json({
// //                     message: "redirect to view page",
// //                   })
// //         }
// // });
// // // ] Admin Functions definition End 19-07-2017 18:30




// // // [ Employee Functions definition Start 15-07-2017 12:20
// // router.get('/cmsUploadEmployee',function(req,res)

// // {
// // 	var eid =req.query.user_id;
// // 	var ename = req.query.user_name;
// // 	var emp_access = req.query.user_type;
// // 	if(emp_access != "A1")
// //         {
// // 			res.json({
// // 				data:{
// // 					ename:ename,
// // 					eid:eid,
// // 					emp_access:emp_access
// // 			   }
// // 			});
// // 	}
// //         else
// //         {
// //                 // res.redirect('/admin-dashboard/adminDashboard/admindashboard');
// //                 res.json({
// //                     message: "redirect to admin-dashboard",
// //                   })
// //         }
// // });


// // router.post('/cmsUploadPostEmployee',cmsUploadPostEmployee);

// // function cmsUploadPostEmployee(req,res)
// // {
// // 	console.log("check 111");
// // 	// var emp_access = req.body.user_type;
// // 	// var eid =req.body.user_id;
// // 	var eid='1257';
// // 	var emp_access='L1';
// // 	console.log("emp_access",emp_access);
// // 	console.log("eid",eid);
    

// // 	if(emp_access != "A1")
// //         {
// // 			console.log("check")
// // 		     doc = "";

// // 		var form = new formidable.IncomingForm();
// // 		form.parse(req,function (err, fields, files) 
// // 			{
// // 				console.log("fileds",fields);
// // 				var empId = eid;
// // 				var docCat = fields["docCat"];
// // 				console.log(docCat,"docCat");

// // 				if(docCat == "1" || docCat == "2")
// // 				{
// // 					var docType = fields["docType"];
// // 					if(docCat == "2")
// // 					{
// // 						console.log(docType,"doctype")
// // 						if(docType == "12")
// // 						{
// // 							var docTypeText = fields["docTypeText"];
// // 							docTypeText = docTypeText.replace(/ /g,'_').toUpperCase();
// // 						}
// // 					}
// // 				}
// // 				if(docCat == "7" || docCat == "8" || docCat == "4")
// // 				{
// // 					var docCatText = fields["docCatText"];
// // 					docCatText = docCatText.replace(/ /g,'_').toUpperCase();
// // 				}
// // 				if(docCat == "1")
// // 				{ 
// // 					if(docType == "1")
// // 					{
// // 						doc = "GOVT_PASSPORT";
// // 					}
// // 					if(docType == "2")
// // 					{
// // 						doc = "GOVT_PANCARD";
// // 					}
// // 					if(docType == "3")
// // 					{
// // 						doc = "GOVT_VOTERID";
// // 					}
// // 					if(docType == "4")
// // 					{
// // 						doc = "GOVT_DRIVLIC";
// // 					}
// // 					if(docType == "5")
// // 					{
// // 						doc = "GOVT_AADHAR";
// // 					}
// // 				}
// // 				if(docCat == "2")
// // 				{
// // 					if(docType == "1")
// // 					{
// // 						doc = "EDUC_SSLC";
// // 					}
// // 					if(docType == "2")
// // 					{
// // 						doc = "EDUC_PRE_UNIV";
// // 					}
// // 					if(docType == "3")
// // 					{
// // 						doc = "EDUC_SEM1";
// // 					}
// // 					if(docType == "4")
// // 					{
// // 						doc = "EDUC_SEM2";
// // 					}
// // 					if(docType == "5")
// // 					{
// // 						doc = "EDUC_SEM3";
// // 					}
// // 					if(docType == "6")
// // 					{
// // 						doc = "EDUC_SEM4";
// // 					}
// // 					if(docType == "7")
// // 					{
// // 						doc = "EDUC_SEM5";
// // 					}
// // 					if(docType == "8")
// // 					{
// // 						doc = "EDUC_SEM6";
// // 					}
// // 					if(docType == "9")
// // 					{
// // 						doc = "EDUC_SEM7";
// // 					}
// // 					if(docType == "10")
// // 					{
// // 						doc = "EDUC_SEM8";
// // 					}
// // 					if(docType == "11")
// // 					{
// // 						doc = "EDUC_DEGREE";
// // 					}
// // 					if(docType == "12")
// // 					{
// // 						doc = "EDUC_OTHERS_"+docTypeText;
// // 					}
// // 				}
// // 				if(docCat == "3")
// // 				{
// // 					doc = "MEDICAL";
// // 				}
// // 				if(docCat == "4")
// // 				{
// // 					doc = "EXPERIENCE_"+docCatText;
// // 				}
// // 				if(docCat == "5")
// // 				{
// // 					doc = "PHOTO";
// // 				}
// // 				if(docCat == "6")
// // 				{
// // 					doc = "RESUME";
// // 				}
// // 				if(docCat == "7")
// // 				{
// // 					doc = "CERT_"+docCatText;
// // 				}
// // 				if(docCat == "8")
// // 				{
// // 					doc = "OTHR_"+docCatText;
// // 				}

// // 				// var dir2 = './data/CMS/employee/uploadDoc/'+empId+"/";
// // 				// if (!fs.existsSync(dir2))
// // 				// {
// // 				// 	fs.mkdirSync(dir2);
// // 				// }
// // 				var dir2 = './data/CMS/employee/uploadDoc/' + empId + "/";
// // 				try {
// // 				  fs.mkdirSync(dir2, { recursive: true });
// // 				} catch (err) {
// // 				  console.error('Error creating directories:', err);
// // 				}
				

// // 				if(docCat == "5")
// // 				{
// // 					var newName = empId+"_"+doc+"_uv.jpg";
// // 				}
// // 				else if(docCat == "6")
// // 				{
// // 					var newName = empId+"_"+doc+"_uv.doc";
// // 				}
// // 				else
// // 				{
// // 					var newName = empId+"_"+doc+"_uv.pdf";
// // 				}

// // 				var trejFoleder = './data/CMS/employee/rejectDoc/'+empId+"/";
// // 				var treasFoleder = './data/CMS/employee/rejectReason/'+empId+"/";

// // 				if (!fs.existsSync(trejFoleder))
// // 				{
// // 					console.log("No rejected documents");
// // 				}
// // 				else
// // 				{
// // 					fs.readdirSync(trejFoleder).forEach(
// // 					function (name) 
// // 					{
// // 						var searchPattern = empId+"_"+doc;
// // 						var resValue = name.search(searchPattern);
// // 						if(resValue != -1)
// // 						{
// // 							if(doc == "PHOTO")
// // 							{
// // 								var rejFile = trejFoleder + searchPattern+"_rj.jpg";
// // 							}
// // 							else if(doc == "RESUME")
// // 							{
// // 								var rejFile = trejFoleder + searchPattern+"_rj.doc";
// // 							}
// // 							else
// // 							{
// // 								var rejFile = trejFoleder + searchPattern+"_rj.pdf";
// // 							}
// // 							var reasFile = treasFoleder + searchPattern+"_rj.txt";
// // 							fs.unlinkSync(rejFile);
// // 							fs.unlinkSync(reasFile);
// // 						}
// // 					});
// // 				}
				
				
// // 				var newPath = dir2 + newName;

// // 				fs.rename(oldPath, newPath, function (err) 
// // 					{
// // 						if (err) throw err;
// // 						// req.flash('success',"Document Uploaded Successfully")
// // 						// res.redirect(req.get('referer'));
// // 						res.json({
// // 							notification: "Document Uploaded Successfully"
// // 						  })
// // 					});
// // 			});

// // 			var oldName = files.uploadDoc.name;
// // 			var dir1 = './data/CMS/employee/uploadDoc/' + user_id + '/';
// // 			var oldPath = files.uploadDoc.path;
// // 			if (!fs.existsSync(dir1)) {
// // 			  try {
// // 				fs.mkdirSync(dir1, { recursive: true });
// // 			  } catch (err) {
// // 				console.error('Error creating directories:', err);
// // 				return res.status(500).json({ error: 'Failed to upload document' });
// // 			  }
// // 			}
// // 			var storage = multer.diskStorage({
// // 			  destination: function (req, file, callback) {
// // 				callback(null, dir1);
// // 			  },
// // 			  filename: function (req, file, callback) {
// // 				callback(null, oldName);
// // 			  }
// // 			});
	  
// // 			var upload = multer({ storage: storage }).single('uploadDoc');
// // 			upload(req, res, function (err) {
// // 			  if (err) {
// // 				return res.status(500).json({ error: 'Something went wrong!' });
// // 			  }
	  
// // 			  var newName = empId + '_' + doc + '_uv.pdf';
// // 			  var newPath = dir1 + newName;
	  
// // 			  fs.rename(oldPath, newPath, function (err) {
// // 				if (err) {
// // 				  console.error('Error renaming file:', err);
// // 				  return res.status(500).json({ error: 'Failed to upload document' });
// // 				}
	  
// // 				res.json({
// // 				  notification: 'Document Uploaded Successfully'
// // 				});
// // 			  });
// // 			});
		
// // 		} else {
// // 		  res.json({
// // 			message: 'redirect to admin-dashboard'
// // 		  });
// // 		}
// // }

	  
// // 	  module.exports = router;



// //////////////////////////upload admin/////////////////////////////////

//  // else if(req.body.docCat == '9'){
//     //   //Background
//     // }

//     // else if(req.body.docCat == '10'){
//     //   //HR Upload
//     //   if (req.body.docType == '1') doc = '_HR_OFF_LTR';
//     //   else if (req.body.docType == '2') doc = '_HR_BOND';
//     //   else if (req.body.docType == '3') doc = '_HR_APPOINT_LTR';
//     //   else if (req.body.docType == '4') doc = '_HR_CONFIRM_LTR';
//     //   else if (req.body.docType == '5') doc = '_HR_ONSITE_DOC';
//     //   else if (req.body.docType == '6') doc = '_HR_REVISION_LTR';
//     //   else if (req.body.docType == '7') doc = '_HR_COMPENSATION_LTR';
//     //   else if (req.body.docType == '8') doc = '_HR_EXIT_INTERVIEW_LTR';
//     //   else if (req.body.docType == '9') doc = '_HR_RELIEVING_LTR'; 
//     // }

//     ////////////////////////////upolad end///////////////////////////