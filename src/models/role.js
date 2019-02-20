var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RoleSchema = new Schema({
	'name' : { 
		type: String, 
		unique: true,
		required: true 
	},
	'actions' : [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Role', RoleSchema);
