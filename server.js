var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', function (req, res) {
    var data = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
})

app.get('/teammembers.html', function (req, res) {
    var data = fs.readFileSync('teammembers.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
})

app.get('/contact.html', function (req, res) {
    var data = fs.readFileSync('contact.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
})

app.use('/static',express.static(__dirname + '/static'));
var port = process.env.PORT || 8080;
//var port = 8081;

app.listen(port);


var nodemailer = require('nodemailer');

//var transporter = nodemailer.createTransport();
var transporter = nodemailer.createTransport("SMTP",{
    service: 'gmail',
    auth: {
      user: 'disha.gitamhyd@gmail.com',
      pass: 'disha2017'
    }
  });

app.post('/contact', (req, res) => {
    var data = fs.readFileSync('sucess.html');
    var mailOptions1 = {
        from: 'disha.gitamhyd@gmail.com',
        to: req.body.txtEmail,
        subject: 'Welcome To Disha',
        text: 'Thanks for approaching us we will get back to you as soon as possible'
    };
    var mess = 'name:-' + req.body.txtName + ',email:- ' + req.body.txtEmail + ',phone:-' + req.body.txtPhone + ',message:-' + req.body.txtMsg;
    console.log(mess);
    var mailOptions2 = {
        from : 'disha.gitamhyd@gmail.com',
        to : 'teamdisha@gitam.edu',
        subject : 'Questions',
        text: mess
    };
    transporter.sendMail(mailOptions1);
    transporter.sendMail(mailOptions2);
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write(data);
    res.end();
});


/*http.createServer(function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);*/