console.log("Login entered");

const express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
const multer = require('multer');
var pool = require('../Database/dbconfig');
var bcrypt = require('bcryptjs')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var generatePassword = require("password-generator");
var fs = require('fs');
var moment = require('moment');







//////////////////////////////////////// LOGIN API  /////////////////////////////////////////////////////////////

const path = require('path');
const { request } = require('http');

//////////////////////////// /////////// FunctionS///////////////////////////////////////////////////////////////////////
const getUserByuser_id = function (user_id, callback) {


    var query = pool.query("SELECT u.user_name,u.password,u.user_id,u.user_type,u.client_ip,u.session_id FROM users u WHERE LOWER(u.user_id) = LOWER($1)", [user_id], function (err, result) {

        if (err) throw err;
        console.log('result user', result.rows);
        callback(null, result);
    });
}

const comparePasswordpwd = function (candidatePassword, hash, callback) {
    console.log("comparing password while login2 ")

    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
        // console.log("pwd checking3")
        //  console.log(isMatch);


    });
}
const comparePassword = function (candidatePassword, hash, callback) {
    console.log("comparing password while login")
    console.log("password");
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {

        if (err) throw err;
        isMatch = "true";
        callback(null, isMatch);
        console.log(isMatch);
        console.log("pwd checking3");
    });
}

passport.use(new LocalStrategy(

    function (user_id, password, done) {
        pool.query("SELECT login_attempts from users where LOWER(user_id) = LOWER($1)",
            [user_id], function (err, result) {
                console.log(user_id);

                if (err) throw err;
                console.log("userid -error")
                attempts = result.rows['0'].login_attempts;
            });

        getUserByuser_id(user_id, function (err, user) {
            if (err) throw err

            if (user.rows == "") {
                console.log("user doesnt existssss")
                return done(null, false, { message: 'user doesnt exist' });
            }

            comparePassword(password, user.rows[0].password, function (err, isMatch) {

                if (err) throw err;

                if (isMatch) {
                    return done(null, user);
                }
                else if (attempts < 4) {

                    attempts++;

                    pool.query("UPDATE users SET login_attempts=$1 WHERE LOWER(user_id)=LOWER($2)", [attempts, user_id]);


                    return done(null, false, { message: 'Wrong Passcode. Please try again. ' + (4 - attempts) + ' attempts remaining.' });
                }
                else if (attempts == 4) {

                    pool.query("UPDATE users SET login_allowed=$1,login_attempts=$2 WHERE LOWER(user_id)=LOWER($3)", ['N', attempts, user_id]);



                    return done(null, false, {
                        message: 'Your Account is locked. Please contact administrator.'
                    });
                }
            });
        });
    }));

passport.serializeUser(function (user, done) {
    console.log("checked");
    done(null, user.rows[0].user_id);
});

passport.deserializeUser(function (user_id, done) {
    User.getUserById(user_id, function (err, user) {
        done(err, user);
    });
    //console.log('checked1');
});


function forgotSendMail(empId) {
    return new Promise((resolve, reject) => {
        const userId = empId;
        console.log('userId', userId);

        const ranPass = generatePassword(4, false);
        console.log('ranPass', ranPass);

        const finalPass = `${userId}@${ranPass}`;
        console.log('finalPass', finalPass);

        pool.query('SELECT user_name, password, user_id, user_type FROM users WHERE user_id = $1', [userId], (err, result) => {
            if (err) {
                console.error('Error with table query', err);
                reject({ error: 'Internal Server Error' });
            } else {
                const rowCount = result.rowCount;
                console.log(result.rows[0]);
                const user_id = result.rows[0];

                if (rowCount === 0) {
                    resolve({ message: 'redirect to reset page', notification: 'Employee does not exist' });
                } else {
                    pool.query('SELECT emp_email, emp_name FROM emp_master_tbl WHERE LOWER(emp_id) = LOWER($1)', [userId], (err, resultset) => {
                        if (err) {
                            console.error('Error with table query', err);
                            reject({ error: 'Internal Server Error' });
                        } else {
                            const email = resultset.rows[0].emp_email;
                            const employeeName = resultset.rows[0].emp_name;
                            console.log('email', email);

                            pool.query('UPDATE users SET reset_flg = \'Y\' WHERE user_id = $1', [userId], (err, done) => {
                                if (err) {
                                    console.error('Error with table query', err);
                                    reject({ error: 'Internal Server Error' });
                                } else {
                                    bcrypt.hash(finalPass, 10, (err, hash) => {
                                        if (err) {
                                            console.error('Error with bcrypt hash', err);
                                            reject({ error: 'Internal Server Error' });
                                        } else {
                                            hashpassword = hash;
                                            console.log(hashpassword);

                                            pool.query('UPDATE users SET password = $1 WHERE user_id = $2', [hash, userId], (err, done) => {
                                                if (err) {
                                                    console.error('Error with table query', err);
                                                    reject({ error: 'Internal Server Error' });
                                                } else {
                                                    pool.query('UPDATE users SET otp = \'\' WHERE user_id = $1', [userId], (err, done) => {
                                                        console.log('posted');
                                                        if (err) {
                                                            console.error('Error with table query', err);
                                                            reject({ error: 'Internal Server Error' });
                                                        } else {
                                                            resolve({ message: 'redirect to reset page', notification: 'OTP verified, mail sent', id: userId });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    });
}

function getUserByuser_idpwd1(user_id, callback) {

    var query = pool.query("SELECT user_name,password,user_id,user_type FROM users WHERE user_id=$1", [user_id], function (err, result) {


        // ,client_ip,session_id ---> it is not present in db
        if (err) throw err;
        callback(null, result);
    });
}


/ /////////////////////////////////////////////////LOG IN API //////////////////////////////////////////////////////////////



router.post('/forgotpwd', (req, res) => {
    var userid = req.body.empid;
    console.log('userid', userid);
    var ranpass = generatePassword(4, false);
    console.log('ranpass', ranpass);
    finalpass = userid + "@" + ranpass;
    console.log('finalpass', finalpass);



    getUserByuser_idpwd1(userid, function (err, user) {


        if (err) throw err;
        if (user.rowCount == 0) {

            res.json({ notification: "Employee does not exist", message: "redirect to forget page" });
        }
        else {
            pool.query("select emp_email,emp_name from emp_master_tbl where LOWER(emp_id)=LOWER($1)", [userid], function (err, resultset) {
                if (err) throw err;
                var email = resultset.rows['0'].emp_email;
                var employee_name = resultset.rows['0'].emp_name;
                console.log('email', email);

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'mohammadsab@minorks.com',
                        pass: '9591788719'
                    }
                });

                pool.query("update users set reset_flg='Y' where user_id=$1 ", [userid], function (err, done) {
                    // ,client_ip='',session_id='' --> it is not present in db
                    if (err) throw err;
                });
                const mailOptions = {
                    from: 'mohammadsab@minorks.com',
                    to: email,
                    // subject: 'Test Email',

                    subject: 'Forgot Password',
                    html: '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyvnOH41NjMz_1n8KlR4I388BASwPfRMNx44Es9Ru17aen8HTLqQ" height="95"><br><br>' +
                        '<h3>Dear ' + employee_name + ',<br><br>' +
                        '<p>Please reset your Password with following details</p><br>' +
                        '<table style="border: 10px solid black;"> ' +
                        '<tr style="border: 10px solid black;"> ' +
                        '<th style="border: 10px solid black;">User Id</th> ' +
                        '<th style="border: 10px solid black;">' + userid + '</th>' +
                        '</tr>' +

                        '<tr style="border: 10px solid black;"> ' +
                        '<th style="border: 10px solid black;">New Password</td> ' +
                        '<th style="border: 10px solid black;">' + finalpass + '</td> ' +
                        '</tr>' +
                        '</table> ' +
                        '<br><br>' +
                        'Kindly do not share your password with anyone else.<br><br>' +
                        'URL: http://amber.nurture.co.in <br><br><br>' +
                        '- Regards,<br><br>Amber</h3>'
                    // text: 'This is a test email sent from Node.js using Nodemailer.'
                };

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

                    pool.query("update users set password=$1 where user_id=$2 ", [hash, userid], function (err, done) {
                        //  ,client_ip='',session_id='' ---> these column is not in db
                        if (err) throw err;

                        res.json({ notofication: 'New Password generated successfully and mailed to your registered mail id', message: "redirect to login" });

                    });
                });
            });


        }

    });


});

router.post('/login', (req, res) => {
    var user_id = req.body.userid;
    var password = req.body.password;
    console.log(user_id, "user ID");
    if (typeof (user_id) == undefined) {
        pool.query("SELECT * from users where user_id = $1", [user_id], function (err, result) {
            var row = result.rowCount;
            var user = result.rows[0];
            console.log(user);
            if (user.user_id == user_id && row > 0) {
                if (err) {
                    console.error('Error fetching photo:', err);
                    return res.status(500).json({ error: 'Error fetching photo' });
                }
                comparePasswordpwd(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        if (row > 0) {
                            // ----this is for send profile photo ----> its giving error
                            // pool.query("SELECT * from profiles where user_name=$1", [user.user_name], function (err, result) {
                            //     var prow = result.rowCount;

                            //     if (prow > 0) {
                            //         const photoData = result.rows[0].path;
                            //         const mimeType = result.rows[0].mimetype;
                            //         console.log(photoData);

                            //         // res.set('Content-Type', mimeType);
                            //         return res.json({ message: "redirect to dashboard", notification: "login Successful", Data: user, path: photoData });
                            //     }
                            //     return res.json({ message: "redirect to dashboard", notification: "login Successful", Data: user });

                            // });
                            return res.json({ message: "redirect to dashboard", notification: "login Successful", Data: user });
                        }
                        else {
                            return res.json({ message: "redirect to login", notification: "Invalid username or password" });
                        }

                    }
                    return res.json({ message: "redirect to login", notification: "Invalid username or password" });

                })
            } else {
                return res.json({ message: "redirect to login", notification: "Invalid username or password" });
            }

        });
    } else {
        return res.json({ message: "redirect to login", notification: "please Enter User ID and Password" });
    }


});










////////////////////////////////////////////// PROFILE PHOTO ///////////////////////////////////////////////
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// API endpoint for file upload
router.post('/upload-profile', upload.single('profile'), (req, res) => {
    const file = req.file;
    console.log(req.body.user_id);
    const user_id = req.body.user_id

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Store the file details in the database
    const query = 'INSERT INTO profiles (filename, mimetype, path,user_name) VALUES ($1, $2, $3,$4)';
    const values = [file.filename, file.mimetype, file.path, user_id];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error('Error storing profile:', err);
            res.status(500).json({ error: 'Failed to store profile' });
        } else {
            res.json({ message: 'Profile picture uploaded successfully' });
        }
    });
});


//////////////////// for password change / reset/forget /////////////////////////////////////////////////////

router.get('/generateOtp', (req, res) => {
    const empid = req.query.employeeId;
    console.log("emp_id", empid);

    pool.query("SELECT emp_email, emp_name FROM emp_master_tbl WHERE emp_id=$1", [empid], function (err, result) {
        if (err) {
            console.error('Error with table query', err);
        } else {
            var emp_cnt = result.rowCount;
            console.log("emp_cnt", emp_cnt);

            if (emp_cnt > 0) {
                var emp_email = result.rows[0].emp_email;
                console.log("emp_email", emp_email);
                var emp_name = result.rows[0].emp_name;
                console.log("emp_name", emp_name);
                var notification = "OTP SENT";
                console.log("err_display", notification);

                var ranpass = generatePassword(4, false);

                pool.query("UPDATE users SET otp=$2 WHERE user_id=$1", [empid, ranpass], function (err, result) {


                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'mohammadsab@minorks.com',
                            pass: '9591788719'
                        }
                    });



                    const mailOptions = {
                        from: 'mohammadsab@minorks.com',
                        to: emp_email,
                        // subject: 'Test Email',
                        subject: 'One Time password for Password Reset',
                        html: '<img src="http://www.smartvision.ae/portals/0/OTP-sms-service.jpg" height="85"><br><br>' +
                            '<h3>Dear <b>' + emp_name + '</b>,<br><br>' +
                            'You are receiving this mail because you (or someone else) has attempted to change your password in <b>Amber</b>.<br>' +
                            'Please go through the below details to change your password : <br><br>' +
                            '<table style="border: 10px solid black;"><tr style="border: 10px solid black;"><th style="border: 10px solid black;">User Id</th><th style="border: 10px solid black;">' + empid + '</th></tr><tr style="border: 10px solid black;"><td style="border: 10px solid black;"> Otp </td><td style="border: 10px solid black;">' + ranpass + '</td></tr></table><br><br>' +
                            'URL: http://localhost:4200/forgotPassword <br><br>' +
                            'Contact HR for any clarifications.<br>' +
                            'Kindly do not share your otp with anyone else.<br><br><br><br>' +
                            '- Regards,<br><br>Amber</h3>'
                        // text: 'This is a test email sent from Node.js using Nodemailer.'
                    };
                    console.log(mailOptions, "mailll");
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.error('Error sending email', error);
                        } else {
                            console.log('Email sent:', info.response);
                        }


                    });
                });
            } else {
                var notification = "Employee Id Does not Exist";
                console.log("err_display", notification);
                res.json({ key: notification });
            }
        }
    });
});



router.get('/validateOtp', (req, res) => {
    const empId = req.query.employeeId;
    console.log('emp_id', empId);

    const otp = req.query.otp;
    console.log('otp', otp);

    pool.query('SELECT otp FROM users WHERE user_id = $1', [empId], (err, result) => {
        if (err) {
            console.error('Error with table query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const empCount = result.rowCount;
            console.log('empCount', empCount);

            if (empCount > 0) {
                const tblOtp = result.rows[0].otp;
                console.log('tblOtp', tblOtp);

                if (tblOtp !== otp) {
                    const displayErr = 'Invalid Otp';
                    console.log('displayErr', displayErr);
                    res.json({ key: displayErr });
                } else {
                    console.log('OTP verified, sending email');
                    message = forgotSendMail(empId);
                    message.then((message) => {
                        console.log(message); // Handle the resolved value of the promise
                        res.json(message);
                    }).catch((error) => {
                        console.error('Error with forgotSendMail', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    });
                    // console.log(message);
                    // res.json(message);
                }
            } else {
                const displayErr = 'Employee Id Does not Exist';
                console.log('displayErr', displayErr);
                res.json({ message: 'redirect to forget page', notification: 'Employee Id Does not Exist' });
            }
        }
    });
});







/// update pwd//



router.post('/updatepwd', (req, res) => {
    var userid = req.body.empid;
    var oldpasscode = req.body.oldpass;
    var newpasscode = req.body.newpass;
    var conpasscode = req.body.conpass;
    var error1 = "";
    var pwdarr = [];

    pool.query("SELECT user_name,password,user_id,user_type FROM users WHERE user_id=$1", [userid], function (err, result) {
        rowCount = result.rowCount;
        console.log(rowCount);
        pwd = result.rows[0];
        console.log(pwd);
        if (err) throw err;
        if (rowCount == 0) {


            res.json({
                Notification: "Employee Id and Password doesn't match",
                message: "redirect to reset page"
            });
        }
        else {

            comparePassword(oldpasscode, pwd.password, function (err, isMatch) {

                if (err) {

                    res.json({
                        Notification: "Employee Id and Password doesn't match",
                        message: "redirect to reset page"
                    });
                }

                if (!isMatch) {

                    res.json({
                        Notification: 'Incorrect Old Password',
                        message: "redirect to reset page"
                    });

                }
                if (isMatch) {

                    comparePasswordpwd(newpasscode, pwd.password, function (err, isMatch) {

                        if (err) throw err;
                        if (isMatch) {
                            res.json({
                                notification: 'New Password cannot be same as Old Password',
                                message: "redirect to reset page"
                            });
                        }
                        else {
                            bcrypt.genSalt(10, function (err, salt) {
                                bcrypt.hash(newpasscode, salt, function (err, hash) {
                                    storepass = newpasscode;
                                    storepass = hash;
                                    pool.query("UPDATE users set password=$1 where user_id=$2 and login_allowed =$3", [storepass, userid, 'Y'], function (err, result1) {
                                        // ,client_ip,session_id --> these field not exist in table u need create


                                        res.json({
                                            message: "redierct to login",
                                            notification: "pasword updated successfully"
                                        })
                                    });
                                });
                            });
                        }
                    });
                }
            });
        }
    })
});


////////////////////////////////////////////////////////////////// login Check //////////////////////////////////////////////////////////////
router.post('/login', (req, res) => {
    var user_id = req.body.userid;
    var password = req.body.password;
    console.log(user_id, "user ID");
    console.log(password, "user ID");


    pool.query("SELECT * from users where user_id = $1", [user_id], function (err, result) {
        var row = result.rowCount;
        var user = result.rows[0];
        console.log(user);
        if (row > 0) {
            if (err) {
                console.error('Error fetching photo:', err);
                return res.status(500).json({ error: 'Error fetching photo' });
            }
            comparePasswordpwd(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    if (row > 0) {

                        return res.json({ message: "redirect to dashboard", notification: "login Successful", Data: user });
                    }
                    else {
                        return res.json({ message: "redirect to login", notification: "Invalid user_id or password" });
                    }

                }
                return res.json({ message: "redirect to login", notification: "Invalid user_id or password" });

            })
        } else {
            return res.json({ message: "redirect to login", notification: "Invalid user_id or password" });
        }

    });

});





// router.post('/logincheck', (req, res) => {

//     var user_id = req.body.userid;
//     var Password = req.body.password;

//     pool.query("SELECT user_name,password,user_id,user_type,client_ip,session_id FROM users WHERE user_id=$1", [user_id], function (err, result) {
//         if (err) throw err;
//         const user = result.rows[0]
//         console.log(user, "............");

//         // console.log('client ip', user.client_ip);
//         // console.log('session_id', user.session_id);

//         var emp_access = user.user_type;
//         // var eip = user.client_ip;
//         // console.log("eip-->", eip);
//         // var esid = user.session_id;
//         // console.log("esid-->", esid);
//         // var error1 = "";
//         // var clientIp = requestIp.getClientIp(req);
//         // console.log('clentip-->', clientIp);
//         // var sId = req.sessionID;

//         var hu = ['AU', 'RU'];
//         var queryres = "";
//         var ename = "";
//         var eid = "";
//         var email = "";
//         var desig = "";
//         var unReadCount = "";
//         var docPendingCount = 0;
//         var now = new Date();
//         module.exports.usertype = "";
//         module.exports.users = "";
//         module.exports.usercount = "";
//         module.exports.lastlogin = "";
//         module.exports.role = "";
//         module.exports.userid = "";
//         module.exports.reportcounts = "";
//         module.exports.downloadcounts = "";
//         module.exports.datecheck = "";
//         module.exports.sessiontimeout = "";
//         module.exports.activeuser = "";
//         module.exports.user_email = "";
//         module.exports.user_id = "";
//         module.exports.email = "";
//         module.exports.listofrecords = "";
//         module.exports.profilepic = "";
//         module.exports.reminderlist = "";
//         module.exports.reminderlist_count = "";
//         module.exports.reminderlist_past = "";
//         //profilepic=req.user.rows[0].img;
//         //console.log("use",req.user.rows[0].img)
//         //console.log("profilepic",profilepic);
//         // console.log("session:::::", req.sessionID);
//         // console.log("esid##", esid);
//         // console.log("sid##", sId);



//         // if (esid == sId) {
//         //   var error = "IP";
//         //   res.render('loginModule/login', {
//         //     error: error
//         //   });

//         // }
//         pool.query("SELECT * FROM users where del_flag=$1", ['N'], function (err, userscount) {
//             if (err) {
//                 console.error('Error with table query', err);
//             } else {
//                 usercount = userscount.rowCount;
//                 console.log('usercount', usercount);
//             }
//         });

//         pool.query("SELECT reset_flg FROM users where user_id=$1", [user_id], function (err, flg) {
//             var check = flg.rows['0'].reset_flg;
//             if (check == 'Y') {

//                 // var error1 = "Please Change The Default Password and Proceed";
//                 // res.render('changePassword/changePassword', {
//                 //     error1: error1
//                 // });

//                 res.json({
//                     message: "redirect to reset passwrod ",
//                     notification: "Please Change The Default Password and Proceed",
//                     data: user
//                 })
//             }
//             //pool.query("UPDATE users SET login_attempts=$1,login_check=$2,reset_flg='N' where LOWER(user_id)=LOWER($3)",[attempts,'Y',user_id]);
//             //          console.log("after update");



//             pool.query("SELECT del_flag FROM users where user_id=$1", [user_id], function (err, flg) {
//                 var check = flg.rows['0'].del_flag;
//                 if (check == 'Y') {
//                     // var success_msg = "Your Account has been Suspended";
//                     // res.render('loginModule/login', {
//                     //     success_msg: success_msg
//                     // });
//                     res.json({ message: 'redirect to login', notification: 'Your Account has been Suspended' })
//                 }
//                 //pool.query("UPDATE users SET login_attempts=$1,login_check=$2,reset_flg='N' where LOWER(user_id)=LOWER($3)",[attempts,'Y',user_id]);
//                 //          console.log("after update");

//                 pool.query("SELECT login_check,LOWER(user_id),user_type,expiry_date from users where LOWER(user_id) = LOWER($1) and (expiry_date>=$2 and login_allowed=$3) and(del_flag=$4)",
//                     [user_id, now, 'Y', 'N'], function (err, result) {
//                         if (err) throw err;
//                         console.log();

//                         if (result.rows['0'] != null) {
//                             console.log("within case check");
//                             logincheck = result.rows['0'].login_check;
//                             if (logincheck == "N") {
//                                 userid = result.rows['0'].user_id;
//                                 queryres = result.rows['0'].user_type;
//                                 datecheck = result.rows['0'].expiry_date;
//                                 console.log('user_type', queryres);
//                                 attempts = 0;



//                                 pool.query("UPDATE users SET login_attempts=$1,login_check=$2,reset_flg='N' where LOWER(user_id)=LOWER($3)", [attempts, 'Y', user_id]);
//                                 console.log("after update");
//                                 //to check the number of unread messages
//                                 pool.query("SELECT * FROM messages  where del_flg = $1 and to_user_id = $2 and read_flg= $3", ['N', user_id, 'N'], function (err, unreadCountList) {
//                                     if (err) {
//                                         console.error('Error with table query', err);
//                                     } else {
//                                         unReadCount = unreadCountList.rowCount;
//                                         //rowData = result.rows;

//                                         //     console.log('unReadCount in login ',unReadCount);
//                                     }

//                                     //to check the number of users online
//                                     pool.query("SELECT * FROM users  where login_check = $1 and user_id != $2", ['Y', user_id], function (err, onlinelist) {
//                                         if (err) {
//                                             console.error('Error with table query', err);
//                                         } else {
//                                             onlineCount = onlinelist.rowCount;
//                                             onlineData = onlinelist.rows;
//                                             //     console.log('onlineCount',onlineCount);


//                                         }

//                                         //to get phone numbers
//                                         pool.query("select empMaster.emp_email, empMaster.emp_name,empMaster.emp_id, phone1, phone2, emergency_num from emp_info_tbl empInfo,emp_master_tbl empMaster where  empMaster.emp_id = empInfo.emp_id and empInfo.del_flg = $1 and empMaster.del_flg= $2 order by empMaster.emp_name asc", ['N', 'N'], function (err, directoryList) {
//                                             if (err) {
//                                                 console.error('Error with table query', err);
//                                             } else {
//                                                 directoryCount = directoryList.rowCount;
//                                                 directoryData = directoryList.rows;
//                                                 //      console.log('directoryCount',directoryCount);
//                                                 //     console.log('directoryData', directoryData);


//                                             }

//                                             // to get the birthdays
//                                             //SELECT emp_name, dob,cast(dob + ((extract(year from age(dob)) + 1) * interval '1' year) as date) as next_birthday from emp_info_tbl where del_flg ='N' order by next_birthday asc
//                                             pool.query("SELECT emp_name, dob,cast(dob + ((extract(year from age(dob)) + 1) * interval '1' year) as date) as next_birthday from emp_info_tbl where del_flg =$1 order by next_birthday asc", ['N'], function (err, bdayList) {
//                                                 if (err) {
//                                                     console.error('Error with table query', err);
//                                                 } else {
//                                                     bdayCount = bdayList.rowCount;
//                                                     bdayData = bdayList.rows;
//                                                     //     console.log('onlineCount',bdayCount);
//                                                     //     console.log('onlineData', bdayData);


//                                                 }

//                                                 var emp_id = user_id;
//                                                 // to get the pending appraisal related counts

//                                                 pool.query("SELECT APPRAISAL_MONTH, APPRAISAL_YEAR FROM appraisal_master_table where emp_id =$1 and app_flg =$2 and app_conf =$3 and rej_flg=$4", [emp_id, 'N', 'N', 'N'], function (err, resultNotApproved) {
//                                                     if (err) {
//                                                         console.error('Error with table query', err);
//                                                     } else {

//                                                         app_notApproved = resultNotApproved.rowCount;
//                                                     }


//                                                     pool.query("SELECT APPRAISAL_MONTH, APPRAISAL_YEAR FROM appraisal_master_table where emp_id =$1 and app_flg =$2 and app_conf=$3 and rej_flg=$4", [emp_id, 'Y', 'N', 'N'], function (err, resultNotAccepted) {
//                                                         if (err) {
//                                                             console.error('Error with table query', err);
//                                                         } else {
//                                                             app_pendingAccep = resultNotAccepted.rowCount

//                                                         }

//                                                         //REJECTED APPRAISALS
//                                                         pool.query("SELECT APPRAISAL_MONTH, APPRAISAL_YEAR FROM appraisal_master_table where emp_id =$1 and app_flg =$2 and app_conf=$3 and rej_flg=$4", [emp_id, 'Y', 'N', 'Y'], function (err, resultRejected) {
//                                                             if (err) {
//                                                                 console.error('Error with table query', err);
//                                                             } else {
//                                                                 app_rejPendClosure = resultRejected.rowCount

//                                                             }

//                                                             var appraisal_main = parseInt(app_notApproved) + parseInt(app_pendingAccep) + parseInt(app_rejPendClosure);

//                                                             // added by srikanth 
//                                                             pool.query("SELECT * from emp_master_tbl_temp where entity_cre_flg='N'", function (err, getInfo) {
//                                                                 if (err) {
//                                                                     console.error('Error with table query', err);
//                                                                 } else {
//                                                                     pending_empProf = getInfo.rowCount
//                                                                     console.log("pending_empProf", pending_empProf);

//                                                                 }
//                                                                 console.log("pending_empProf", pending_empProf);



//                                                                 pool.query("SELECT * from emp_info_tbl_temp where entity_cre_flg='N'", function (err, getdata) {
//                                                                     if (err) {
//                                                                         console.error('Error with table query', err);
//                                                                     } else {
//                                                                         pending_empPer = getdata.rowCount

//                                                                     }

//                                                                     var emp_main = parseInt(pending_empProf) + parseInt(pending_empPer);

//                                                                     pool.query("SELECT * from emp_info_tbl_temp where entity_cre_flg='N' and emp_id=$1", [emp_id], function (err, getdet) {
//                                                                         if (err) {
//                                                                             console.error('Error with table query', err);
//                                                                         }
//                                                                         else {
//                                                                             showFlg = getdet.rowCount
//                                                                             var empCounter1 = getdet.rowCount;

//                                                                             if (showFlg == "0") {
//                                                                                 var showFlg = "No Records for Verification";
//                                                                                 var empCounter = "0";
//                                                                             }
//                                                                             else {
//                                                                                 var showFlg = "Awaiting Verification";
//                                                                                 var empCounter = "1";
//                                                                             }
//                                                                         }

//                                                                         pool.query("select * from project_master_tbl p,milestone_proj_tbl m,emp_master_tbl e,emp_master_tbl s where p.project_id = m.project_id and e.emp_id = p.delivery_mgr and s.emp_id = p.project_mgr and m.confirm_flg='N' and m.paid_flg='N' and m.del_flg='N' and p.del_flg='N' order by m.milestone_exp_date asc", function (err, getdata) {
//                                                                             if (err) {
//                                                                                 console.error('Error with table query', err);
//                                                                             }
//                                                                             else {
//                                                                                 pending_invoiceDue = getdata.rowCount
//                                                                             }

//                                                                             pool.query("select * from project_master_tbl p,milestone_proj_tbl m,emp_master_tbl e,emp_master_tbl s where p.project_id = m.project_id and e.emp_id = p.delivery_mgr and s.emp_id = p.project_mgr and m.confirm_flg='Y' and m.paid_flg='N' and m.del_flg='N' and p.del_flg='N' order by m.milestone_exp_date asc", function (err, getdata) {
//                                                                                 if (err) {
//                                                                                     console.error('Error with table query', err);
//                                                                                 }
//                                                                                 else {
//                                                                                     pending_invoiceRaise = getdata.rowCount
//                                                                                     console.log("invoice due", pending_invoiceRaise);
//                                                                                 }

//                                                                                 pool.query("SELECT * from invoice_mast_tbl where confirm_flg = 'Y' and paid_flg = 'N' and del_flg = 'N'", function (err, getdata) {
//                                                                                     if (err) {
//                                                                                         console.error('Error with table query', err);
//                                                                                     }
//                                                                                     else {
//                                                                                         pending_invoicePay = getdata.rowCount
//                                                                                         console.log("invoice due", pending_invoicePay);
//                                                                                     }


//                                                                                     var invoice_main = parseInt(pending_invoiceDue) + parseInt(pending_invoiceRaise) + parseInt(pending_invoicePay);



//                                                                                     // added by srikanth ends here //



//                                                                                     //Added by arun 27-01-2017 15:50
//                                                                                     if (emp_access != "A1") {
//                                                                                         var pFolder = './data/CMS/employee/uploadDoc/' + emp_id + "/";
//                                                                                         if (!fs.existsSync(pFolder)) {
//                                                                                             console.log('No records found for approval pending');
//                                                                                         }
//                                                                                         else {
//                                                                                             fs.readdirSync(pFolder).forEach(
//                                                                                                 function (name) {
//                                                                                                     var resValue = name.search("uv");
//                                                                                                     if (resValue != -1) {
//                                                                                                         docPendingCount = docPendingCount + 1;
//                                                                                                     }
//                                                                                                 });
//                                                                                         }
//                                                                                     }
//                                                                                     else {
//                                                                                         var len = 0, len1 = 0, len2 = 0;
//                                                                                         var cpath = [];
//                                                                                         var testFolder = './data/CMS/employee/uploadDoc/';
//                                                                                         if (!fs.existsSync(testFolder)) {
//                                                                                             console.log('No users found for approval pending');
//                                                                                         }
//                                                                                         else {
//                                                                                             fs.readdirSync(testFolder).forEach(
//                                                                                                 function (empId) {
//                                                                                                     len1 = 0;
//                                                                                                     cpath[len] = testFolder + empId + "/";
//                                                                                                     try {
//                                                                                                         fs.readdirSync(cpath[len]).forEach(
//                                                                                                             function (empFile) {
//                                                                                                                 var resValue = empFile.search("uv");
//                                                                                                                 if (resValue != -1) {
//                                                                                                                     docPendingCount = docPendingCount + 1;
//                                                                                                                     throw "done";
//                                                                                                                 }
//                                                                                                             });
//                                                                                                     }
//                                                                                                     catch (e) { if (e != "done") console.log(empId); }
//                                                                                                 });
//                                                                                         }
//                                                                                     }
//                                                                                     //End


//                                                                                     //added by Divya for pending details in Claims and Travel module strts
//                                                                                     console.log("BEFORE travel request CALL in dashboard:::");
//                                                                                     var trvlPendngRowData = 0;
//                                                                                     pool.query("SELECT req_id,emp_id FROM travel_master_tbl_temp where approver_id=$1 and appr_flg=$2 and del_flg=$3 order by req_id::integer desc", [emp_id, 'N', 'N'], function (err, trvlPendingData) {
//                                                                                         if (err) {
//                                                                                             console.error('Error with table query', err);
//                                                                                         } else {

//                                                                                             console.log("inside travel request query in dashboard:::");
//                                                                                             var rowData = trvlPendingData.rows;
//                                                                                             console.log("row in dashboard:::", rowData);
//                                                                                             var trvlPendngRowData = trvlPendingData.rowCount;

//                                                                                             console.log("empResult.rowcount :: INDASHBOARD::", trvlPendngRowData);



//                                                                                         }
//                                                                                         pool.query("SELECT req_id,emp_id FROM travel_master_tbl where appr_flg=$1 and confrm_flg=$2 and reject_flg=$3 and del_flg=$4 order by req_id::integer desc", ['Y', 'N', 'N', 'N'], function (err, pendingResult) {
//                                                                                             if (err) {
//                                                                                                 console.error('Error with table query', err);
//                                                                                             } else {


//                                                                                                 pendingStatusData = pendingResult.rows;
//                                                                                                 console.log("row", pendingStatusData);
//                                                                                                 var trvlPendngCount = pendingResult.rowCount;



//                                                                                             }
//                                                                                             pool.query("SELECT remb_id,emp_id,emp_name,repmgr_id,project_id ,hr_id, amt_payable, net_amt_payable, advance_amt, user_remarks, manager_remarks, hr_remarks, status, lodge_date, document_date FROM reimbursement_master_tbl where repmgr_id=$1 and status=$2 and del_flg=$3 order by remb_id::integer desc", [emp_id, 'pending', 'N'], function (err, claimResult) {
//                                                                                                 if (err) {
//                                                                                                     console.error('Error with table query', err);
//                                                                                                 } else {
//                                                                                                     var claimRowDataPending = claimResult.rows;
//                                                                                                     console.log("claimRowDataPending", claimRowDataPending);
//                                                                                                     var claimPendngCount = claimResult.rowCount;
//                                                                                                     console.log("empResult.rowcount", claimResult.rowCount);
//                                                                                                 }

//                                                                                                 pool.query("SELECT remb_id,emp_id,emp_name,repmgr_id,project_id ,hr_id, amt_payable, net_amt_payable, advance_amt, user_remarks, manager_remarks, hr_remarks, status, lodge_date, document_date FROM reimbursement_master_tbl where hr_id=$1 and status=$2 and hr_status=$3 and del_flg=$4 order by remb_id::integer desc", [emp_id, 'approved', 'pending', 'N'], function (err, claimResulthr) {
//                                                                                                     if (err) {
//                                                                                                         console.error('Error with table query', err);
//                                                                                                     } else {


//                                                                                                         var claimRowPending = claimResulthr.rows;
//                                                                                                         console.log("row", rowData);
//                                                                                                         var claimPendngHrCount = claimResulthr.rowCount;
//                                                                                                         console.log("claimResulthr.rowcount", claimResulthr.rowCount);



//                                                                                                     }

//                                                                                                     pool.query("SELECT remb_id,emp_id,emp_name,repmgr_id,project_id ,hr_id, amt_payable, net_amt_payable, advance_amt, user_remarks, manager_remarks, hr_remarks, status, lodge_date, document_date FROM reimbursement_master_tbl where hr_id=$1 and status=$2 and hr_status=$3 and del_flg=$4 and settlement_paid_flg=$5 order by remb_id::integer desc", [emp_id, 'approved', 'confirmed', 'N', 'N'], function (err, claimsettleStatus) {
//                                                                                                         if (err) {
//                                                                                                             console.error('Error with table query', err);
//                                                                                                         } else {


//                                                                                                             var claimStatusRowPending = claimsettleStatus.rows;
//                                                                                                             console.log("claimStatusRowPending", claimStatusRowPending);
//                                                                                                             var claimsettleStatusCount = claimsettleStatus.rowCount;
//                                                                                                             console.log("claimsettleStatusCount", claimsettleStatusCount);



//                                                                                                         }

//                                                                                                         pool.query("SELECT comm_code_desc cocd ,emp_name emp, * from leaves l,common_code_tbl cocd , emp_master_tbl emp where  emp.del_flg ='N' and  l.del_flg='N' and l.emp_id =$1 and l.approver_id = emp.emp_id and cocd.del_flg ='N'and cocd.comm_code_id = l.leave_type and cocd.code_id ='LTYP' and l.app_flg='N' and l.rej_flg='N'", [emp_id], function (err, resultleave) {
//                                                                                                             if (err) {
//                                                                                                                 console.error('Error with table query', err);
//                                                                                                             }
//                                                                                                             else {
//                                                                                                                 var leave_tobe_approved = resultleave.rowCount;
//                                                                                                             }

//                                                                                                             pool.query("SELECT  comm_code_desc cocd ,emp_name emp,* from leaves l, emp_master_tbl emp, common_code_tbl cocd  where l.del_flg= 'N' and l.approver_id =$1 and l.app_flg = 'N' and l.emp_id = emp.emp_id and rej_flg = 'N' and l.app_flg='N' and l.rej_flg='N' and cocd.del_flg ='N' and emp.del_flg ='N' and cocd.comm_code_id = l.leave_type and cocd.code_id ='LTYP'", [emp_id], function (err, resultleave) {
//                                                                                                                 if (err) {
//                                                                                                                     console.error('Error with table query', err);
//                                                                                                                 }
//                                                                                                                 else {
//                                                                                                                     var leave_to_approve = resultleave.rowCount;
//                                                                                                                 }

//                                                                                                                 var total_leave_count = parseInt(leave_tobe_approved) + parseInt(leave_to_approve);


//                                                                                                                 //added by srikanth for l3 project manager if any

//                                                                                                                 var userId = user_id;;
//                                                                                                                 console.log("sri user", userId);
//                                                                                                                 pool.query("SELECT * from project_master_tbl where project_mgr = $1 and closure_flg='N' and del_flg='N' order by project_id asc", [userId], function (err, result) {
//                                                                                                                     if (err) {
//                                                                                                                         console.error('Error with table query', err);
//                                                                                                                     }
//                                                                                                                     else {
//                                                                                                                         var markCount = result.rowCount;
//                                                                                                                         console.log("markcount", markCount);
//                                                                                                                     }




//                                                                                                                     //end

//                                                                                                                     // added to filter dashboard pending tasks 

//                                                                                                                     if (emp_access == "A1") {

//                                                                                                                         totalAppPending = parseInt(app_notApproved) + parseInt(app_pendingAccep) + parseInt(app_rejPendClosure) + parseInt(docPendingCount) + parseInt(pending_empProf) + parseInt(pending_empPer) + parseInt(total_leave_count);

//                                                                                                                     }
//                                                                                                                     else {
//                                                                                                                         // overides the total count only for finace
//                                                                                                                         if (emp_access == "F1") {

//                                                                                                                             totalAppPending = parseInt(app_notApproved) + parseInt(app_pendingAccep) + parseInt(app_rejPendClosure) + parseInt(docPendingCount) + parseInt(empCounter) + parseInt(pending_invoiceDue) + parseInt(pending_invoiceRaise) + parseInt(pending_invoicePay) + parseInt(trvlPendngCount) + parseInt(claimPendngHrCount) + parseInt(claimsettleStatusCount) + parseInt(total_leave_count);



//                                                                                                                         }
//                                                                                                                         else if (emp_access == "L1" || emp_access == "L2") {
//                                                                                                                             totalAppPending = parseInt(app_notApproved) + parseInt(app_pendingAccep) + parseInt(app_rejPendClosure) + parseInt(docPendingCount) + parseInt(empCounter) + parseInt(trvlPendngRowData) + parseInt(claimPendngCount) + parseInt(total_leave_count);
//                                                                                                                         }

//                                                                                                                         else {
//                                                                                                                             totalAppPending = parseInt(app_notApproved) + parseInt(app_pendingAccep) + parseInt(app_rejPendClosure) + parseInt(docPendingCount) + parseInt(empCounter) + parseInt(total_leave_count);
//                                                                                                                         }

//                                                                                                                     }

//                                                                                                                     var document_date = "";
//                                                                                                                     var nowDate = moment().format('YYYY-MM-DD');

//                                                                                                                     pool.query("SELECT document_date,remb_id FROM reimbursement_master_tbl where emp_id =$1 and status =$2 and hr_status=$3", [emp_id, 'approved', 'pending'], function (err, approvedResult) {
//                                                                                                                         if (err) {
//                                                                                                                             console.error('Error with table query', err);
//                                                                                                                         } else {
//                                                                                                                             approvedResultCount = approvedResult.rowCount
//                                                                                                                             var approvedDataResult = approvedResult.rows;
//                                                                                                                             //console.error('approvedResult', approvedResult.rows);
//                                                                                                                             console.log('approvedDataResult.length', approvedDataResult.length);
//                                                                                                                             for (var i = 0; i < approvedDataResult.length; i++) {
//                                                                                                                                 document_dateString = approvedDataResult[i].document_date;
//                                                                                                                                 remb_id = approvedDataResult[i].remb_id
//                                                                                                                                 //console.log('document_dateString',document_dateString) ;
//                                                                                                                                 //document_date = moment('document_dateString').format('YYYY-MM-DD')
//                                                                                                                                 //var dDate=moment(document_dateString).format('YYYY-MM-DD')
//                                                                                                                                 // var diff = moment(document_dateString).startOf('day').fromNow();

//                                                                                                                                 var duration = moment.duration(moment(document_dateString).diff(nowDate));
//                                                                                                                                 var days = duration.asDays();

//                                                                                                                                 //console.error('diff', diff);
//                                                                                                                                 //console.error('days', days);
//                                                                                                                                 console.error('nowDate', nowDate);
//                                                                                                                                 console.error('document_date', document_date);
//                                                                                                                                 if (days < 0) {
//                                                                                                                                     pool.query("UPDATE  reimbursement_master_tbl set  status = $1 where remb_id=$2", ['autoreject', remb_id], function (err, done) {
//                                                                                                                                         if (err)
//                                                                                                                                             console.error('Error with table query', err);
//                                                                                                                                         pool.query("UPDATE  reimbursement_master_tbl_hist set  status = $1 where remb_id=$2", ['autoreject', remb_id], function (err, done) {
//                                                                                                                                             if (err)
//                                                                                                                                                 console.error('Error with table query', err);
//                                                                                                                                         });
//                                                                                                                                     });

//                                                                                                                                     pool.query("select emp_name , emp_email from emp_master_tbl where emp_id=$1", [emp_id], function (err, empResult) {
//                                                                                                                                         if (err) {
//                                                                                                                                             console.error('Error with table query', err);
//                                                                                                                                         } else {
//                                                                                                                                             employee_name = empResult.rows['0'].emp_name;
//                                                                                                                                             employee_email = empResult.rows['0'].emp_email;
//                                                                                                                                             console.log('employee_name in confirm func', employee_name);
//                                                                                                                                             console.log('employee_email in confirm func', employee_email);
//                                                                                                                                         }
//                                                                                                                                     });
                                                                                                                                    



//                                                                                                                                     const transporter = nodemailer.createTransport({
//                                                                                                                                         service: 'gmail',
//                                                                                                                                         auth: {
//                                                                                                                                             user: 'mohammadsab@minorks.com',
//                                                                                                                                             pass: '9591788719'
//                                                                                                                                         }
//                                                                                                                                     });



//                                                                                                                                     const mailOptions = {
//                                                                                                                                         from: 'mohammadsab@minorks.com',
//                                                                                                                                         to: employee_email,
//                                                                                                                                         // subject: 'Test Email',
//                                                                                                                                         subject: 'IS:Reimbursement request autoreject',
//                                                                                                                                         html: ' The reimbursement request raised for' + remb_id + 'Id is autorejected since document submission date  exceeds the deadline.\n' + '\n' + ' -Reimbursement System'
//                                                                                                                                         // text: 'This is a test email sent from Node.js using Nodemailer.'
//                                                                                                                                     };
//                                                                                                                                     console.log(mailOptions, "mailll");
//                                                                                                                                     transporter.sendMail(mailOptions, function (error, info) {
//                                                                                                                                         if (error) {
//                                                                                                                                             console.error('Error sending email', error);
//                                                                                                                                         } else {
//                                                                                                                                             console.log('Email sent:', info.response);
//                                                                                                                                         }


//                                                                                                                                     });

//                                                                                                                                 }

//                                                                                                                             }




//                                                                                                                         }
//                                                                                                                     });
//                                                                                                                     pool.query("UPDATE users SET login_attempts=$1,login_check=$2,reset_flg='N' where LOWER(user_id)=LOWER($3)", [attempts, 'Y', user_id]);
//                                                                                                                     // , clientIp, sId ,client_ip=$4,session_id=$5  //-- these field are not in db
//                                                                                                                     console.log("after update");


//                                                                                                                     res.json({
//                                                                                                                         message: "redirect to admindashboard", Data: {
//                                                                                                                             ename: user.user_name,
//                                                                                                                             eid: user.user_id,
//                                                                                                                             emp_access: user.user_type,
//                                                                                                                             unReadCount: unReadCount,
//                                                                                                                             onlineCount: onlineCount,
//                                                                                                                             onlineData: onlineData,
//                                                                                                                             bdayData: bdayData,
//                                                                                                                             currentDate: now,
//                                                                                                                             totalAppPending: totalAppPending,
//                                                                                                                             app_notApproved: app_notApproved,
//                                                                                                                             app_pendingAccep: app_pendingAccep,
//                                                                                                                             app_rejPendClosure: app_rejPendClosure,
//                                                                                                                             docPendingCount: docPendingCount,
//                                                                                                                             pending_empProf: pending_empProf,
//                                                                                                                             pending_empPer: pending_empPer,
//                                                                                                                             showFlg: showFlg,
//                                                                                                                             pending_invoiceDue: pending_invoiceDue,
//                                                                                                                             pending_invoiceRaise: pending_invoiceRaise,
//                                                                                                                             pending_invoicePay: pending_invoicePay,
//                                                                                                                             emp_access: emp_access,
//                                                                                                                             trvlPendngRowData: trvlPendngRowData,
//                                                                                                                             trvlPendngCount: trvlPendngCount,
//                                                                                                                             claimPendngCount: claimPendngCount,
//                                                                                                                             claimPendngHrCount: claimPendngHrCount,
//                                                                                                                             claimsettleStatusCount: claimsettleStatusCount,
//                                                                                                                             markCount: markCount,
//                                                                                                                             appraisal_main: appraisal_main,
//                                                                                                                             emp_main: emp_main,
//                                                                                                                             empCounter1: empCounter1,
//                                                                                                                             invoice_main: invoice_main,
//                                                                                                                             leave_tobe_approved: leave_tobe_approved,
//                                                                                                                             leave_to_approve: leave_to_approve,
//                                                                                                                             total_leave_count: total_leave_count

//                                                                                                                         }
//                                                                                                                     });
//                                                                                                                 });
//                                                                                                             });
//                                                                                                         });
//                                                                                                     });
//                                                                                                 });
//                                                                                             });
//                                                                                         });
//                                                                                     });
//                                                                                 });
//                                                                             });
//                                                                         });
//                                                                     });
//                                                                 });
//                                                             });
//                                                         });
//                                                     });
//                                                 });
//                                             });
//                                         });
//                                     });
//                                 });
//                             }
//                             else {

//                                 // req.flash('error', 'LOGGED');
//                                 // res.redirect('/');
//                                 return res.json({
//                                     message: 'redirect to login',
//                                     notificetion: "logged"
//                                 })

//                             }

//                         }
//                         else {
//                             // req.flash('error', 'Your Account is locked. Please contact administrator');
//                             // res.redirect('/');
//                             return res.json({
//                                 message: "redirect to login",
//                                 notificetion: "Your Account is locked. Please contact administrator"
//                             })
//                         }
//                     });
//             });
//         });
//     });

// });



////////////////////////////////////////////////////////////////////////// log out//////////////////////////////////////////////////



router.get('/logout', (req, res) => {
    const user_id = req.query.user_id;
    // console.log('user_type',req.user.rows['0'].user_type)
    // console.log('emp_name',req.user.rows['0'].user_name)


    pool.query("UPDATE users SET login_check=$1,client_ip='',session_id='' where user_id=$2", ['N', user_id]);
    req.logout();
    // req.flash('success_msg', 'You are successfully Logged Out');
    // res.redirect('/');
    res.json({ message: "redirect to login", notification: "You are successfully Logged Out" })
});


module.exports = router;
