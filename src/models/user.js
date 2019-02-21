var mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');

var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	'name' : {
		type: String,
		required: true
	},
	'userName' : {
		type: String,
		required: true,
		unique: true
	},
	'role' : {
		type: Schema.Types.ObjectId,
		ref: 'Role',
		required: true
	},
	'email' : { 
		type: String, 
		unique: true,
		required: true 
	},
	'password': {
		type: String,
		required: true,
		select: false // If you want to include this field on your result just use something like this: User.findOne({_id: id}).select("+password")
	}
});

UserSchema.plugin(bcrypt);

module.exports = mongoose.model('User', UserSchema);
