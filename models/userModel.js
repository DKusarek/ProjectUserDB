var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    userName: {type: String},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    dateOfBirth: {type: Date}
});

module.exports = mongoose.model('User', userModel);