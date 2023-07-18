console.log('cms module enterd');
var multer = require('multer');
var path = require('path');
var util = require('util');
var fs = require('fs');

const express = require('express');
var router = express.Router();
var pool = require('../Database/dbconfig');

var archiver = require('archiver'),
    archive  = archiver('zip');

var moment = require('moment');
var formidable = require("formidable");

var bodyParser = require('body-parser');

var nodemailer = require('nodemailer');
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
var len = 0, len1 = 0,len2 = 0,plen = 0,rlen = 0,len3 = 0,totLen = 0, totYear = 0;
var govLen = 0, eduLen = 0, medLen = 0,expLen = 0, phLen = 0, resLen = 0, hrLen = 0,cerLen = 0, othrLen =0, bgLen = 0, polLen = 0, policy_count = 0;
var govDocs = [], eduDocs = [], medDocs = [],expDocs = [], phDocs = [], resDocs = [], hrDocs = [], cerDocs = [], othrDocs = [], bgDocs = [], polDocs = [];
var policyTag = "";
var rdocs = [],pdocs = [];
var rpath = [],ppath = [];
var rreas = [];
var resAppr = [];
var empArray = [];
var empNameArray = [];
var magzYear = [], magzDoc = [], magzTot = [],magzQtr = [];
var i=0,j=0;
var empId = "";
var empFile = "";
var txtFile = "";
var doc = "";
var panFlg = "N", aadharFlg = "N", sslcFlg = "N", preunivFlg = "N", degreeFlg = "N";
var updQuery = "", selQuery = "";
var mailCommPath = '/home/portal/central/';





// router.post('/magazineUploadPostAdmin',magazineUploadPostAdmin);

// router.get('/magazineViewAdmin',magazineViewAdmin);

// router.get('/magazineViewFilesAdmin',magazineViewFilesAdmin);

// router.get('/magazineViewEmployee',magazineViewEmployee);

// router.get('/cmsMailDoc',cmsMailDoc);

// router.post('/cmsUploadPostAdmin',cmsUploadPostAdmin);

// router.post('/cmsViewEmpIdAdmin',cmsViewEmpIdAdmin);

// router.get('/cmsApprAdmin',cmsApprAdmin);

// router.get('/cmsApprEmpIdAdmin',cmsApprEmpIdAdmin);

// router.get('/cmsViewFilesAdmin',cmsViewFilesAdmin);

// router.post('/cmsApprPostAdmin',cmsApprPostAdmin);

// router.get('/cmsApprRejectAdmin',cmsApprRejectAdmin);

// router.get('/cmsApprIndvAdmin',cmsApprIndvAdmin);

// router.all('/policyViewAdminPost',policyViewAdmin);

// router.get('/policyViewFilesAdmin',policyViewFilesAdmin);

// router.get('/policyDeleteDocs',policyDeleteDocs);

// router.get('/policyViewEmployee',policyViewEmployee);

// router.all('/policyViewEmployeePost',policyViewEmployee);

// router.post('/policyUploadPostAdmin',policyUploadPostAdmin);




// router.get('/cmsViewEmployee',cmsViewEmployee);

// router.get('/cmsViewStatusEmployee',cmsViewStatusEmployee);

// router.get('/cmsViewFilesEmployee',cmsViewFilesEmployee);

// router.get('/cmsViewFilesEmployeeReject',cmsViewFilesEmployeeReject);

// router.get('/cmsDeletePenDocEmployee',cmsDeletePenDocEmployee);

// router.get('/cmsDeleteRejDocEmployee',cmsDeleteRejDocEmployee);



router.get('/cms',function(req,res)
{
	var eid =req.body.user_id;
	var ename = req.body.user_name;
	var emp_access = req.body.user_type;
	if(emp_access == "A1")
	{
		cmsUploadAdmin(req,res);
	}
	else
	{

		res.json({
		    cmsData:{
		    ename:ename,
			eid:eid,
			emp_access:emp_access
		   }
		});
	}
});
// [ Admin Functions definition Start 19-07-2017 18:30



router.get('/cmsUploadAdmin',cmsUploadAdmin);

function cmsUploadAdmin(req,res)
{
	var eid =req.body.user_id;
	var ename = req.body.user_name;
	var emp_access = req.body.user_type;

	if(emp_access == "A1")
	{
		pool.query("SELECT emp_id,emp_name from emp_master_tbl where del_flg=$1 order by emp_id asc",['N'],
			function(err,result){
			employee=result.rows;
			emp_id_count=result.rowCount;

			res.json({
		    cmsData:{
			ename:ename,
			eid:eid,
			emp_id_count:emp_id_count,
			employee:employee,
			emp_access:emp_access
		        }
		});
		});
	}
	else
	{
	// 	res.redirect('/admin-dashboard/adminDashboard/admindashboard');
    res.json({
        message: "redirect to admin-dashboard"
      }) 

	 }
}



router.get('/cmsViewAdmin',function(req,res)
{
	var eid =req.body.user_id;
	var ename = req.body.user_name;
	var emp_access = req.body.user_type;

	if(emp_access == "A1")
        {
		pool.query("SELECT emp_id,emp_name from emp_master_tbl where del_flg=$1 order by emp_id asc",['N'],
			function(err,result){
			employee=result.rows;
			emp_id_count=result.rowCount;

			res.json({
		    cmsData:{
				ename:ename,
				eid:eid,
				emp_id_count:emp_id_count,
				employee:employee,
				emp_access:emp_access
		   }
		});
		});
	}
	else
        {
                // res.redirect('/admin-dashboard/adminDashboard/admindashboard');
                res.json({
                    message: "redirect to view page",
          
                  })
        }
});
// ] Admin Functions definition End 19-07-2017 18:30




// [ Employee Functions definition Start 15-07-2017 12:20

router.get('/cmsUploadEmployee',function(req,res)
{
	var eid =req.query.user_id;
	var ename = req.query.user_name;
	var emp_access = req.query.user_type;
	if(emp_access != "A1")
        {
			res.json({
				cmsData:{
					ename:ename,
					eid:eid,
					emp_access:emp_access
			   }
			});
	}
        else
        {
                // res.redirect('/admin-dashboard/adminDashboard/admindashboard');
                res.json({
                    message: "redirect to admin-dashboard",
                  })
        }
});
// ] Employee Functions End 15-07-2017 12:20


// [ Employee Function operations Start 17-07-2017 09:00


router.post('/cmsUploadPostEmployee',cmsUploadPostEmployee);

function cmsUploadPostEmployee(req,res)
{
	console.log("check 111");
	var emp_access = req.body.user_type;
	var eid =req.body.user_id;
	console.log("emp_access",emp_access);
	console.log("eid",eid);

	if(emp_access != "A1")
        {
		doc = "";
		var form = new formidable.IncomingForm();
		form.parse(req,function (err, fields, files) 
			{
				var empId = eid;
				var docCat = fields["docCat"];
				console.log(docCat,"docCat");

				if(docCat == "1" || docCat == "2")
				{
					var docType = fields["docType"];
					if(docCat == "2")
					{
						console.log(docType,"doctype")
						if(docType == "12")
						{
							var docTypeText = fields["docTypeText"];
							docTypeText = docTypeText.replace(/ /g,'_').toUpperCase();
						}
					}
				}
				if(docCat == "7" || docCat == "8" || docCat == "4")
				{
					var docCatText = fields["docCatText"];
					docCatText = docCatText.replace(/ /g,'_').toUpperCase();
				}
				if(docCat == "1")
				{ 
					if(docType == "1")
					{
						doc = "GOVT_PASSPORT";
					}
					if(docType == "2")
					{
						doc = "GOVT_PANCARD";
					}
					if(docType == "3")
					{
						doc = "GOVT_VOTERID";
					}
					if(docType == "4")
					{
						doc = "GOVT_DRIVLIC";
					}
					if(docType == "5")
					{
						doc = "GOVT_AADHAR";
					}
				}
				if(docCat == "2")
				{
					if(docType == "1")
					{
						doc = "EDUC_SSLC";
					}
					if(docType == "2")
					{
						doc = "EDUC_PRE_UNIV";
					}
					if(docType == "3")
					{
						doc = "EDUC_SEM1";
					}
					if(docType == "4")
					{
						doc = "EDUC_SEM2";
					}
					if(docType == "5")
					{
						doc = "EDUC_SEM3";
					}
					if(docType == "6")
					{
						doc = "EDUC_SEM4";
					}
					if(docType == "7")
					{
						doc = "EDUC_SEM5";
					}
					if(docType == "8")
					{
						doc = "EDUC_SEM6";
					}
					if(docType == "9")
					{
						doc = "EDUC_SEM7";
					}
					if(docType == "10")
					{
						doc = "EDUC_SEM8";
					}
					if(docType == "11")
					{
						doc = "EDUC_DEGREE";
					}
					if(docType == "12")
					{
						doc = "EDUC_OTHERS_"+docTypeText;
					}
				}
				if(docCat == "3")
				{
					doc = "MEDICAL";
				}
				if(docCat == "4")
				{
					doc = "EXPERIENCE_"+docCatText;
				}
				if(docCat == "5")
				{
					doc = "PHOTO";
				}
				if(docCat == "6")
				{
					doc = "RESUME";
				}
				if(docCat == "7")
				{
					doc = "CERT_"+docCatText;
				}
				if(docCat == "8")
				{
					doc = "OTHR_"+docCatText;
				}

				// var dir2 = './data/CMS/employee/uploadDoc/'+empId+"/";
				// if (!fs.existsSync(dir2))
				// {
				// 	fs.mkdirSync(dir2);
				// }
				var dir2 = './data/CMS/employee/uploadDoc/' + empId + "/";
				try {
				  fs.mkdirSync(dir2, { recursive: true });
				} catch (err) {
				  console.error('Error creating directories:', err);
				}
				

				if(docCat == "5")
				{
					var newName = empId+"_"+doc+"_uv.jpg";
				}
				else if(docCat == "6")
				{
					var newName = empId+"_"+doc+"_uv.doc";
				}
				else
				{
					var newName = empId+"_"+doc+"_uv.pdf";
				}

				var trejFoleder = './data/CMS/employee/rejectDoc/'+empId+"/";
				var treasFoleder = './data/CMS/employee/rejectReason/'+empId+"/";

				if (!fs.existsSync(trejFoleder))
				{
					console.log("No rejected documents");
				}
				else
				{
					fs.readdirSync(trejFoleder).forEach(
					function (name) 
					{
						var searchPattern = empId+"_"+doc;
						var resValue = name.search(searchPattern);
						if(resValue != -1)
						{
							if(doc == "PHOTO")
							{
								var rejFile = trejFoleder + searchPattern+"_rj.jpg";
							}
							else if(doc == "RESUME")
							{
								var rejFile = trejFoleder + searchPattern+"_rj.doc";
							}
							else
							{
								var rejFile = trejFoleder + searchPattern+"_rj.pdf";
							}
							var reasFile = treasFoleder + searchPattern+"_rj.txt";
							fs.unlinkSync(rejFile);
							fs.unlinkSync(reasFile);
						}
					});
				}
				
				
				var newPath = dir2 + newName;

				fs.rename(oldPath, newPath, function (err) 
					{
						if (err) throw err;
						// req.flash('success',"Document Uploaded Successfully")
						// res.redirect(req.get('referer'));
						res.json({
							notification: "Document Uploaded Successfully"
						  })
					});
			});

		var oldName = "doc.pdf";
		var dir1 = './data/CMS/employee/uploadDoc/'+eid+"/";;
		var oldPath = dir1 + oldName;
		if (!fs.existsSync(dir1))
		{
			fs.mkdirSync(dir1);
		}
		var storage = multer.diskStorage({
			destination: function(req, file, callback) {
				console.log(file);
				callback(null, dir1)
			},
			filename: function(req, file, callback) {
				callback(null,oldName)
			}
		})

		var upload = multer({storage: storage}).single('uploadDoc')
		upload(req, res, function(err) {
			if (err) {
					return res.end("Something went wrong!");
				 }
			});
	}
	else
        {
                // res.redirect('/admin-dashboard/adminDashboard/admindashboard');
                res.json({
                    message: "redirect to admin-dashbord",
                  })
        }
		
}


module.exports = router;

