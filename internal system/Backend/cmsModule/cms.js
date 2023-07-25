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


router.post('/cmsUploadPostEmployee', cmsUploadPostEmployee);
function cmsUploadPostEmployee(req, res) {
    console.log("Upload post Entered ");
    // console.log(req);
    var emp_access = 'L1';
    var eid = 'MT001';


    if (emp_access != "A1") {
        doc = "";
        const form = new formidable.IncomingForm();
        console.log(">>>> 1");
        form.parse(req, function (err, fields, files) {
            console.log("feilds value----> " + fields);
            console.log(">>>> 2");
            var empId = eid;
            console.log(empId + " Manny Id?");


            var docCat = fields["docCat"];
            var docType = fields["docType"];
            console.log("newww.docType--> " + docType);

            console.log("1.docat--> " + docCat);
            if (docCat == "1" || docCat == "2") {
                var docType = fields["docType"];
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
    else {
        res.json('/admin-dashboard/adminDashboard/admindashboard');
    }
}


















//////////////////  Jadhav ////////////////////////

///////////////// Modify Profile Photo ////////////////////

router.post('/cmsUploadPhotoEmployee', cmsUploadPhotoEmployee);
function cmsUploadPhotoEmployee(req, res) {
    console.log("Profile API Entry");

    doc = "";
    var eid = "";

    var form = new formidable.IncomingForm();
    form.parse(req,
        function (err, fields, files) {
            // console.log("Req----> ", req);
            var emp_id = req.body.user_id;
            console.log("2222222222222222:- " + emp_id);
            eid = emp_id;

            var dir2 = './cmsModule/public/images/profile/';
            newName = eid + ".jpg";
            var newPath = dir2 + newName;

            fs.rename(oldPath, newPath,
                function (err) {
                    if (err) throw err;
                    console.log("Profile Pic Renamed Successfully");
                    res.json({ notification: "Profile Photo Uploaded Successfully" })
                });
        });

    console.log("check", eid);

    var oldName = "doc.jpg";
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

    var upload = multer({ storage: storage }).single('file')
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
    });
}

//////////////  Profile photo Api..........

router.get('/profile-photo/:eid', (req, res) => {
    const eid = req.params.eid;
    const photoPath = path.join(__dirname, `./public/images/profile/${eid}.jpg`);
    res.sendFile(photoPath);
    console.log("Choosing the loc:---> " + photoPath);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////





//------------------------    Employee Doc View  ----------------------

router.get('/cmsViewEmployee', cmsViewEmployee);
function cmsViewEmployee(req, res) {

    var eid = req.query.user_id;
    console.log(eid);
    var emp_access = req.query.user_access;
    console.log(emp_access + "\n ");

    if (emp_access != "A1") {
        var resValue1;
        govLen = 0;
        eduLen = 0;
        medLen = 0;
        expLen = 0;
        phLen = 0;
        othrLen = 0;
        resLen = 0;
        hrLen = 0;
        cerLen = 0;
        bgLen = 0;

        var testFolder = './data/CMS/employee/uploadDoc/' + eid + "/";
        if (!fs.existsSync(testFolder)) {
            res.json({ notification: "No records found" })
        }
        else {
            fs.readdirSync(testFolder).forEach(
                function (name) {
                    console.log(name);
                    var resValue = name.search("uv");
                    // console.log("resValue sir: " + resValue);

                    // var resValue = '-1';
                    // console.log("resValue Mine: " + resValue);

                    if (resValue != -1) {

                        resValue1 = name.search("GOVT");
                        // console.log("GOVT resValue1 sir:- " + resValue1);
                        // resValue1 = '2';
                        // console.log("GOVT resValue1:- "+resValue1);
                        if (resValue1 != -1) {
                            govDocs[govLen] = name;
                            govLen = govLen + 1;
                        }


                        resValue1 = name.search("EDUC");
                        if (resValue1 != -1) {
                            eduDocs[eduLen] = name;
                            eduLen = eduLen + 1;
                        }


                        resValue1 = name.search("MEDICAL");
                        if (resValue1 != -1) {
                            medDocs[medLen] = name;
                            medLen = medLen + 1;
                        }

                        resValue1 = name.search("EXPERIENCE");
                        if (resValue1 != -1) {
                            expDocs[expLen] = name;
                            expLen = expLen + 1;
                        }

                        resValue1 = name.search("PHOTO");
                        if (resValue1 != -1) {
                            phDocs[phLen] = name;
                            phLen = phLen + 1;
                        }

                        resValue1 = name.search("RESUME");
                        if (resValue1 != -1) {
                            resDocs[resLen] = name;
                            resLen = resLen + 1;
                        }
                        resValue1 = name.search("_HR");
                        if (resValue1 != -1) {
                            hrDocs[hrLen] = name;
                            hrLen = hrLen + 1;
                        }
                        resValue1 = name.search("CERT");
                        if (resValue1 != -1) {
                            cerDocs[cerLen] = name;
                            cerLen = cerLen + 1;
                        }
                        resValue1 = name.search("BACKGROUND");
                        if (resValue1 != -1) {
                            bgDocs[bgLen] = name;
                            bgLen = bgLen + 1;
                        }
                        resValue1 = name.search("OTHR");
                        if (resValue1 != -1) {
                            othrDocs[othrLen] = name;
                            othrLen = othrLen + 1;
                        }
                    }

                });


            res.json({
                govDocs: govDocs, govLen: govLen,
                eduDocs: eduDocs, eduLen: eduLen,
                medDocs: medDocs, medLen: medLen,
                expDocs: expDocs, expLen: expLen,
                phDocs: phDocs, phLen: phLen,
                resDocs: resDocs, resLen: resLen,
                othrDocs: othrDocs, othrLen: othrLen,
                hrDocs: hrDocs, hrLen: hrLen,
                cerDocs: cerDocs, cerLen: cerLen,
                bgDocs: bgDocs, bgLen: bgLen,

                eid: eid,
                emp_access: emp_access
            });
        }
    }

    else {
        res.json({ notification: "Redirect to Admin Dashboard" });
    }
}


// -----------------------   Employee Doc Download  ----------------------

// Assuming your files are stored in the 'uploadDoc' directory
const uploadDir = path.join(__dirname, '..', 'data', 'CMS', 'employee', 'uploadDoc');
router.get('/downloadFile', (req, res) => {
    const docId = req.query.id;
    console.log(docId);
    const empId = req.query.empId;
    console.log(empId);

    // Check if the file exists
    const filePath = path.join(uploadDir, empId, docId);
    console.log(filePath);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    // Determine the content type based on the file extension
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream'; // Default content type for unknown file types
    if (ext === '.pdf') {
        contentType = 'application/pdf';
    } else if (ext === '.jpg' || ext === '.jpeg') {
        contentType = 'image/jpeg';
    } else if (ext === '.png') {
        contentType = 'image/png';
    } // Add more conditions for other file types if needed

    // Set the content disposition header to force the browser to download the file
    res.setHeader('Content-disposition', `attachment; filename=${docId}`);
    res.setHeader('Content-type', contentType);

    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

});



// -----------------------  Employee Email   -----------------------------
router.get('/cmsMailDoc', cmsMailDoc);
function cmsMailDoc(req, res) {
    var docmnt = req.query.id;
    console.log(docmnt);
    var empId = req.query.empId;
    console.log(empId);
    var emp_access = req.query.empAccess;
    console.log(emp_access);

    if (emp_access != "A1") {
        // var docPath = __dirname + 'data/CMS/employee/uploadDoc/' + empId + '/' + docmnt;
        var docPath = path.join(__dirname, '..', 'data', 'CMS', 'employee', 'uploadDoc', empId, docmnt);
    
        console.log("Entered Mail Api");
        pool.query("SELECT emp_email, emp_name FROM emp_master_tbl where emp_id = $1 ", [empId],
            function (err, maildata) {
                if (err) {
                    console.error('Error with table query', err);
                }
                else {
                    rowData = maildata.rows;
                    mailId = rowData[0].emp_email;
                    console.log("Employee email: " + mailId);
                    var ename = rowData[0].emp_name;
                    console.log("Employee Name: " + ename);
                }

                pool.query("SELECT comm_code_desc from common_code_tbl where code_id='EMAL' and comm_code_id='INFO'", function (err, cmpyMailList) {
                    if (err) {
                        console.error('Error with table query', err);
                    }
                    else {
                        console.log(" pick Company Email");
                        var cmpyEmail = cmpyMailList.rows['0'].comm_code_desc;
                        console.log('Company Email: ', cmpyEmail);
                    }



                    console.log("Ready to send mail");
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'mohammadsab@minorks.com',
                            pass: '9591788719'
                        }
                    });


                    var mailOptions = {
                        from: cmpyEmail,
                        to: mailId,
                        subject: 'Amber - E-Docket Employee Document',
                        html: '<img src="https://ddvqhbgjmdkmq.cloudfront.net/wp-content/uploads/sites/2/2016/02/12000453/document_version.png" height="85"><br><br>' +
                            '<h3>Dear ' + ename + '<br><br>' +
                            '<p>As requested, we are mailing your document available in E-Docket.</p>' +
                            '<table style="border: 10px solid black;"> ' +
                            '<tr style="border: 10px solid black;"> ' +
                            '<th style="border: 10px solid black;">Document Name</th> ' +
                            '<th style="border: 10px solid black;">' + docmnt + '</th>' +
                            '</tr>' +
                            '</table> ' +
                            '<br><br>' +
                            'If you have not requested for the document, Kindly contact admin for any concerns.<br><br>' +
                            'URL: http://amber.nurture.co.in <br><br><br>' +
                            '- Regards,<br><br>Amber</h3>',

                        // attachments: [
                        //     {
                        //         fileName: docmnt,
                        //         filePath: docPath
                        //     }
                        // ]
                        attachments: [
                            {
                              filename: docmnt,
                              content: fs.createReadStream(`./data/CMS/employee/uploadDoc/${empId}/${docmnt}`), // Path to the attachment
                            },
                          ]
                    };


                    console.log(mailOptions, "mailll");

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.error('Error sending email', error);
                        } else {
                            console.log('Email sent:', info.response);
                        }
                    });

                    res.json({ message: "Mail Sent Successfully" })
                });
            });

    }
    else {
        res.json({ notification: "Redirect to Admin Dashboard" });
    }
}




module.exports = router;