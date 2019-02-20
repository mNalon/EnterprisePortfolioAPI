var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ActionSchema = new Schema({
	'name' : { 
		type: String, 
		unique: true,
		required: true 
	},
	'slug' : { 
		type: String, 
		unique: true,
		required: true 
	}
});

module.exports = mongoose.model('Action', ActionSchema);
