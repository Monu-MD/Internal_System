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















module.exports = router;