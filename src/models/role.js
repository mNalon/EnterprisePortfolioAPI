var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RoleSchema = new Schema({
	'name' : { 
		type: String, 
		unique: true,
		required: true 
	},
	'actions' : [{ type: Schema.Types.ObjectId, ref: 'Action' }]
});

module.exports = mongoose.model('Role', RoleSchema);
