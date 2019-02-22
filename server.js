const express = require('express');
const multer = require('multer');


let app = express();
let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, 'file-' + file.fieldname + '-' + Date.now() + '.pdf');
    }
});

let upload = multer({ storage }).single('pdf');

app.get('/', function(req, res) {
    console.log('Home...')
    res.sendFile(__dirname + "/index.html");
});

app.post('/up/pdf', function(req, res) {
    console.log('Uploading...')
    upload(req, res, function(err) {
        if (err) {
            console.log('Failed');
            res.end('Failed!');
        }
        console.log('Uploaded');
        res.end('Success!');
        //res.redirect('/')
    });
});


app.listen(3000, function() {
    console.log('Listening: http://localhost:3000/ ');
});

