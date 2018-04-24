var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/userAPI');
var User = require('./models/userModel');
var Group = require('./models/groupModel');
var app = express();
app.use(express.static(__dirname + '/Views'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/node_modules/jquery'));
app.use(express.static(__dirname + '/node_modules/bootstrap'));
app.use(express.static(__dirname + '/js'));

var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

usersRouter = require('./Routes/userRoutes')(User);
groupsRouter = require('./Routes/groupsRouter')(User);

app.use('/api/users', usersRouter);


app.get('/', function (req, res) {
      res.sendFile('index.html');
});

app.listen(port, function () {
    console.log('Gulp is runing on PORT: ' + port);
});
