var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ActionSchema = new Schema({
	'name' : String,
	'slug' : String
});

module.exports = mongoose.model('Action', ActionSchema);
