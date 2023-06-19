const express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
const multer = require('multer');
var pool = require('../Database/dbconfig');
var bcrypt = require('bcryptjs')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var generatePassword = require("password-generator");





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// LOGIN API  /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const path = require('path');

//////////////////////////// /////////// FunctionS///////////////////////////////////////////////////////////////////////
const getUserByUsername = function (username, callback) {

    var query = pdbconnect.query("SELECT u.user_name,u.password,u.user_id,u.user_type,u.client_ip,u.session_id FROM users u WHERE LOWER(u.user_id) = LOWER($1)", [username], function (err, result) {
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
    function (username, password, done) {
        pdbconnect.query("SELECT login_attempts from users where LOWER(user_id) = LOWER($1)",
            [username], function (err, result) {
                console.log(username);
                if (err) throw err;
                console.log("userid -error")
                attempts = result.rows['0'].login_attempts;
            });

        getUserByUsername(username, function (err, user) {
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
                    pdbconnect.query("UPDATE users SET login_attempts=$1 WHERE LOWER(user_id)=LOWER($2)", [attempts, username]);
                    return done(null, false, { message: 'Wrong Passcode. Please try again. ' + (4 - attempts) + ' attempts remaining.' });
                }
                else if (attempts == 4) {

                    pdbconnect.query("UPDATE users SET login_allowed=$1,login_attempts=$2 WHERE LOWER(user_id)=LOWER($3)", ['N', attempts, username]);

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
                const username = result.rows[0];

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
                                                            resolve({ message: 'redirect to reset page', notification: 'OTP verified, mail sent',id:userId });
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


/ /////////////////////////////////////////////////LOG IN API //////////////////////////////////////////////////////////////

router.post('/login', (req, res) => {
    var user_id = req.body.userid;
    var password = req.body.password;
    console.log(user_id, "user ID");

    pool.query("SELECT * from users where user_id = $1", [user_id], function (err, result) {
        var row = result.rowCount;
        var user = result.rows[0];
        pool.query("SELECT * from profiles where user_name=$1", [user.user_name], function (err, result) {
            var prow = result.rowCount;
            if (row > 0) {
                if (user.user_id == user_id) {
                    if (err) {
                        console.error('Error fetching photo:', err);
                        return res.status(500).json({ error: 'Error fetching photo' });
                    }
                    comparePasswordpwd(password, user.password, function (err, isMatch) {
                        if (err) throw err;
                        if (isMatch) {
                            if (prow > 0) {
                                const photoData = result.rows[0].path;
                                const mimeType = result.rows[0].mimetype;
                                console.log(photoData);

                                // res.set('Content-Type', mimeType);
                                return res.json({ message: "redirect to dashboard", notification: "login Successful", Data: user, path: photoData });
                            }
                            return res.json({ message: "redirect to dashboard", notification: "login Successful", Data: user });
                        }
                        return res.json({ message: "redirect to login", notification: "Invalid username or password" });
                        
                    })
                } else {
                    return res.json({ message: "redirect to login", notification: "Invalid username or password" });
                }
            } else {
                return res.json({ message: "redirect to login", notification: "Invalid username or password" });
            }
        });
    });
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
    console.log(req.body.username);
    const username = req.body.username

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Store the file details in the database
    const query = 'INSERT INTO profiles (filename, mimetype, path,user_name) VALUES ($1, $2, $3,$4)';
    const values = [file.filename, file.mimetype, file.path, username];

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
    // 
    pool.query("select emp_email,emp_name from emp_master_tbl where emp_id=$1", [empid], function (err, result) {
        if (err) {
            console.error('Error with table query', err);
        }
        else {
            var emp_cnt = result.rowCount;
            // console.log("result",result);
            console.log("emp_cnt", emp_cnt);

            if (emp_cnt > 0) {
                var emp_email = result.rows['0'].emp_email;
                console.log("emp_email", emp_email);
                var emp_name = result.rows['0'].emp_name;
                console.log("emp_name", emp_name);
                var notification = "OTP SENT";
                console.log("err_display", notification);

                var ranpass = generatePassword(4, false);

                pool.query("update users set otp=$2 where user_id=$1", [empid, ranpass], function (err, result) {
                    // console.log(result);
                    // var smtpTransport = nodemailer.createTransport('SMTP', {
                    //         service: 'gmail',
                    //         auth:
                    //         {
                    //                 user: 'amber@nurture.co.in',
                    //                 pass: 'nurture@123'
                    //         }
                    // });

                    // var mailOptions = {
                    //         to: emp_email,
                    //         from: 'amber@nurture.co.in',
                    //         subject: 'One Time password for Password Reset',
                    //         html: '<img src="http://www.smartvision.ae/portals/0/OTP-sms-service.jpg" height="85"><br><br>' +
                    //                 '<h3>Dear <b>' + emp_name + '</b>,<br><br>' +
                    //                 'You are receiving this mail because you (or someone else) has attempted to change your password in <b>Amber</b>.<br>' +
                    //                 'Please go through the below details to change your password : <br><br>' +
                    //                 '<table style="border: 10px solid black;"><tr style="border: 10px solid black;"><th style="border: 10px solid black;">User Id</th><th style="border: 10px solid black;">' + empid + '</th></tr><tr style="border: 10px solid black;"><td style="border: 10px solid black;"> Otp </td><td style="border: 10px solid black;">' + ranpass + '</td></tr></table><br><br>' +
                    //                 'URL: http://amber.nurture.co.in <br><br>' +
                    //                 'Contact HR for any clarifications.<br>' +
                    //                 'Kindly do not share your otp with anyone else.<br><br><br><br>' +
                    //                 '- Regards,<br><br>Amber</h3>'
                    // };

                    // smtpTransport.sendMail(mailOptions, function (err) {
                    // });

                    res.json({ key: notification });
                });
            }
            else {
                var notification = "Employee Id Does not Exist";
                console.log("err_display", notification);
                res.json({ key: notification });
            }
        }
    });
})


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

















module.exports = router;

