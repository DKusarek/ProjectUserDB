var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/userAPI');
var User = require('./models/userModel');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

usersRouter = require('./Routes/userRoutes')(User);

app.use('/api/users', usersRouter);


app.get('/', function (req, res) {
    res.send('welcome to my API1');
});

app.listen(port, function () {
    console.log('Gulp is runing on PORT: ' + port);
});