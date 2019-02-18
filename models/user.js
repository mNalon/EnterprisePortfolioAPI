var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	'name' : {
		type: String,
		required: true
	},
	'userName' : {
		type: String,
		required: true
	},
	'role' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'Role'
	},
	'email' : String,
	'password': {
		type: String,
		required: true,
    select: false // If you want to include this field on your result just use something like this: User.findOne({_id: id}).select("+password")
	}
});

module.exports = mongoose.model('User', UserSchema);
