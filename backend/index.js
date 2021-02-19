const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../dist")));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,"../dist/index.html"));
});

app.get('/html', (req, res) => {

    const sqlite3 = require('sqlite3').verbose();
    const dbPath = path.join(__dirname, "../backend/sqlite/database.dat");
    const db = new sqlite3.Database(dbPath);

    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'pug');

    db.all("SELECT * FROM peoples ORDER BY timestamp DESC LIMIT 1;", function (err, row) {

        if (err) {
            console.error(err.message);
            res.end(err.message)
        }

        res.render("index", {
            whom_name: row[0].whom_name,
            whom_position: row[0].whom_position,
            header: row[0].header,
        });

    });

    db.close();

});

app.post('/save-data', function (request, response) {

    let body = '';
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function() {
        let parsed = JSON.parse(body);

        const sqlite3 = require('sqlite3').verbose();
        const dbPath = path.join(__dirname, "../backend/sqlite/database.dat");
        const db = new sqlite3.Database(dbPath);

        console.log(parsed.email)

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

        const command = 'wkhtmltopdf http://localhost:3000/html ' + path.join(__dirname, 'files/offer.pdf')
        const { exec } = require('child_process');
        exec(command, (err) => {
            if (err) {
                console.error(err.message)
            }

            const nodemailer = require('nodemailer');
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: process.env.MAIL,
                    pass: process.env.WPD
                }
            });

            transporter.sendMail({
                from: process.env.MAIL,
                // to: process.env.MAIL_TO,
                to: parsed.email,
                subject: 'PDF auto generated',
                text: 'PDF file was generated, see attachment',
                attachments: [{
                    filename: 'offer.pdf',
                    path: path.join(__dirname, 'files/offer.pdf'),
                    contentType: 'application/pdf'
                }],
                function(err, info) {
                    if (err) {
                        console.info(err)
                        response.end(err);
                    } else {
                        console.info(info)
                        response.end(info);
                    }
                }
            });

        });

    })

});

app.listen(port, (err) => {
    if (err) {
        return console.error('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
