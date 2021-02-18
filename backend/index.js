const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../dist")));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"../dist/index.html"));
});

app.post('/save-data', function (request, response) {

    let body = '';
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function() {
        let parsed = JSON.parse(body);

        // console.log(parsed);

        const sqlite3 = require('sqlite3').verbose();
        const dbPath = path.join(__dirname, "../backend/sqlite/database.dat");
        // console.log(dbPath);
        const db = new sqlite3.Database(dbPath);

        db.serialize(function () {
            let timestamp = +new Date();
            db.run('INSERT INTO peoples(whom_name, whom_position, header, email, timestamp' +
                ') VALUES(?, ?, ?, ?, ?)', [parsed.whomName, parsed.whomPosition, parsed.header,
                parsed.email, timestamp], (err) => {
                if (err) {
                    return console.log(err.message);
                }
            })
        });
        db.close();

//
//         const nodemailer = require('nodemailer');
//
//         nodemailer.createTestAccount(() => {
//             let transporter = nodemailer.createTransport({
//                 host: 'smtp.googlemail.com', // Gmail Host
//                 port: 465, // Port
//                 secure: true, // this is true as port is 465
//                 auth: {
//                     user: process.env.MAIL,
//                     pass: process.env.PWD
//                 }
//             });
//
//             let mailBody = `
// <!DOCTYPE html>
// <html><head><title>Appointment</title>
// </head><body><div>
//   <div>
//     <span>Order email: ${parsed.email}</span>
//   </div>
//   <div>
//     <span>Btc wallet: ${parsed.btc_wallet}</span>
//   </div>
//   <div>
//     <span>PayTM wallet: ${parsed.paytm_wallet}</span>
//   </div>
//   <div>
//     <span>Ecxchange BTC: ${parsed.btc} / ${parsed.inr}</span>
//   </div>
// </div></body></html>
// `;
//
//             let mailOptions = {
//                 from: `"Exchange order" <${process.env.MAIL}`,
//                 to: process.env.MAIL_TO,
//                 subject: 'Welcome Email',
//                 html: mailBody,
//             };
//
//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     return console.log(error);
//                 }
//                 console.log('Message sent: %s', info.messageId);
//             });
//         });
//
        response.end('post received')
    })



});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
