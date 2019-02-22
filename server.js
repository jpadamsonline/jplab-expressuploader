var express = require('express');
var multer = require('multer');


var app = express();
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, 'file-' + file.fieldname + '-' + Date.now() + '.pdf');
    }
});

var upload = multer({storage: storage}).single('pdf');

app.get('/', function(req, res) {
    console.log('here first')
    res.sendFile(__dirname + "/index.html");
});

app.post('/up/pdf', function(req, res) {
    console.log('here second')
    upload(req,res,function(err) {
        if(err) {
            res.end('failed');
        }
        console.log('Uploaded');
        res.redirect('/')
    });
});


app.listen(3000, function() {
    console.log('working on: http://localhost:3000/ ');
});

