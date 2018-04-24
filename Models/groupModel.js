var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var groupModel = new Schema({
    groupName: {type: String},
    usersList: {type: Array}
});

module.exports = mongoose.model('Group', groupModel);