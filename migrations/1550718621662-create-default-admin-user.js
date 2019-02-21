var mongoose = require('mongoose');

let RoleModel = require('../src/models/role');
let UserModel = require('../src/models/user');

const ROLE_NAME = 'Administrador';
const USER_NAME = 'nalon';

// tweak to enable the migration works
if (mongoose.connection.readyState != mongoose.STATE_OPEN) {
	require('../src/db');
}

// WARN: If you have not runned this migration yet change these info to yours.
exports.up = function up (done) {
	RoleModel.findOne({name: ROLE_NAME})
		.then((role) => {
			UserModel
				.create({
					name:'Marcelo Nalon',
					userName: USER_NAME,
					role:role._id,
					email: 'marcelo.nalon@engenharia.ufjf.br',
					password: 'admin'
				})
				.then(() => done())
				.catch(done);
		})
		.catch(done);
};

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
exports.down = function down (done) {
	UserModel
		.remove({
			userName: USER_NAME
		})
		.then(() => done())
		.catch(done);
};
