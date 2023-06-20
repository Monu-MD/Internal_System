console.log("Login entered");

const express = require('express');
var nodemailer = require('nodemailer');
var router=express.Router();
const multer = require('multer');
var pool=require('../Database/dbconfig');




//////////////////////////////////////// LOGIN API  /////////////////////////////////////////////////////////////

const path = require('path');

router.post('/login', (req, res) => {
    var user_id = req.body.userid;
    console.log(user_id, "user ID");
    pool.query("SELECT * from users where user_id = $1", [user_id], function (err, result) {
        var row = result.rowCount;
        var user = result.rows[0];
        pool.query("SELECT * from profiles where user_name=$1", [user.user_name], function (err, result) {
            var prow = result.rowCount;
            console.log(result.rows);
            if (row > 0) {
                if (user.user_id == user_id) {
                    if (err) {
                        console.error('Error fetching photo:', err);
                        return res.status(500).json({ error: 'Error fetching photo' });
                    }
                    if (prow > 0) {
                        const photoData = result.rows[0].path;
                        const mimeType = result.rows[0].mimetype;
                        res.set('Content-Type', mimeType);
                    return res.json({ message: "redirect to dashboard", notification: "login Successful", Data: user,path:photoData });
                        
                    }
                    return res.json({ message: "redirect to dashboard", notification: "login Successful", Data: user });
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

module.exports=router;