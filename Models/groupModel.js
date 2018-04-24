var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var groupModel = new Schema({
    groupName: {type: String},
    usersList:  [{type: Schema.Types.ObjectId , ref : 'User'}]
});

module.exports = mongoose.model('Group', groupModel);