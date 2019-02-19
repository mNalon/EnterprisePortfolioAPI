var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RoleSchema = new Schema({
	'name' : String,
	'actions' : [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Role', RoleSchema);
