console.log("Message entered");

var express = require('express');
var router = express.Router();
var pool = require('../Database/dbconfig');


// /////////////// Message api's ////////////////////


//Post message to database
// router.post("/", (req, res) => {

//   const { to_user_id, message_content } = req.body;
//   const text = 'INSERT INTO messages(to_user_id, message_content) VALUES ($1, $2) RETURNING *';
//   const values = [to_user_id, message_content];

//   pool.query(text, values, (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error updating data');
//     }
//     else {
//       console.log(result.rows[0]);
//       const message = {
//         message: "Message successfully sent"
//       }
//       res.send(message);
//     }
//   });

// });


// birthday wishes post

router.post('/sendWishes', function (req,res){
  var emp_id =req.body.user_id;
  var emp_access =req.body.user_type;
  var my_name =req.body.user_name;
  
   var now = new Date();
  var lchgtime=now;
  console.log('req value' ,req.body);
  
  var message_content = req.body.message_content;
  var to_user_id = req.body.to_user_id;
  var subject = req.body.subject;
  
        pool.query("SELECT * from messages",function(err,done){
               if (err) {
                  console.error('Error with table query', err);
              } else {
                 msg_id_value = done.rowCount;
                console.log('msg_id_value',msg_id_value);
                 msg_id_value = msg_id_value +100;
                 console.log('msg_id_value1',msg_id_value);
                msg_id = msg_id_value+1;
                console.log('msg_id',msg_id);
              }
  
                pool.query("SELECT emp_name, emp_id FROM emp_master_tbl  where del_flg = $1  order by emp_name asc" ,['N'], function(err, empList) {
              if (err) {
                  console.error('Error with table query', err);
              } else {
                  usersCount = empList.rowCount;
                  // empData = empList.rows;
  
                  
                  }
      
  
   pool.query("INSERT INTO messages(to_user_id, from_user_id, message_content, read_flg, del_flg, rcre_user_id, rcre_time, lchg_user_id, lchg_time, subject, msg_id,del_flg_sent) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",[to_user_id,emp_id,message_content,'N','N',emp_id,now,emp_id,now,subject,msg_id,'N'],function(err,done){
               if(err) throw err;
                });
              
  
                res.json({succcess:200,message:"redirect to admindashboard"})
                //  res.status('sucessful')
          // res.redirect('/admin-dashboard/adminDashboard/admindashboard');
  });
  });
        });
  




// Get message api
router.get("/", (req, res) => {

  var sql = "SELECT * FROM messages";
  pool.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
      res.status(500).send("Error Connecting to DB");
    } else {
      res.send({ data: result.rows });
      // console.log(result.rows);
    }
  });
});


//delete message api
router.delete('/:folder/:id', (req, res) => {
  const folder = req.params.folder;
  const messageId = req.params.id;

  // Define the SQL statement based on the folder and messageId
  let sql = '';
  if (folder === 'inbox') {
    sql = `DELETE FROM messages WHERE id = ${messageId}`;
  } else if (folder === 'sent') {
    console.log(messageId);
    const userid = `select to_user_id from messages where `
    sql = `DELETE FROM messages WHERE to_user_id = "NNN" `;
  } else {
    return res.status(400).json({ error: 'Invalid folder' });
  }

  // Execute the SQL statement
  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Error deleting the message:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log('Message deleted successfully');
    res.sendStatus(204); // Send a success status code (204 No Content)
  });
});



// const folder = req.params.folder;
// const index = parseInt(req.params.index);

// // Assuming you have an array or database containing messages
// // Retrieve the messages from the appropriate folder
// let messages = [];
// if (folder === 'inbox') {
//   messages = inboxMessages;
// } else if (folder === 'sent') {
//   messages = sentMessages;
// }

// // Check if the index is within the valid range
// if (index >= 0 && index < messages.length) {
//   // Delete the message at the specified index
//   messages.splice(index, 1);
//   res.sendStatus(204); // Send a success status code (204 No Content)
// } else {
//   res.sendStatus(404); // Send a not found status code (404 Not Found)
// }

// router.delete('/:folder/:index', (req, res) => {
//   const folder = req.params.folder;
//   const index = parseInt(req.params.index);

//   // Check if the index is within the valid range
//   if (index >= 0 && index < messages.length) {
//     // Delete the message at the specified index
//     messages.splice(index, 1);
//     res.sendStatus(204); // Send a success status code (204 No Content)
//   } else {
//     res.sendStatus(404); // Send a not found status code (404 Not Found)
//   }
// });


// router.delete("/:code_id", (req, res) => {
//     const code_id = req.params.code_id;
//     const text = 'DELETE FROM common_code_tbl WHERE code_id = $1';
//     const values = [code_id];

//     pool.query(text, values, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error updating data');
//           } 
//           else {
//             const message = {
//                 message: "Data Deleted successfully"
//             }
//             res.send(message);
//           }
//     });
//   });



module.exports = router;