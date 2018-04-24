var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
var dbr = mongoose.connect('mongodb://localhost/userAPI');
var db = new sqlite3.Database('./appDb.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the appDb database.');
});
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
groupsRouter = require('./Routes/groupsRouter')(Group);

db.serialize(() => {
  db.each(`SELECT firstName as id,
                  lastName as name
           FROM Users`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name);
  });
});

app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);

app.get('/', function (req, res) {
      res.sendFile('index.html');
});

app.listen(port, function () {
    console.log('Gulp is runing on PORT: ' + port);
});
