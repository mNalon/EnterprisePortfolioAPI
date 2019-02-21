var mongoose = require('mongoose');

let RoleModel = require('../src/models/role');
let ActionModel = require('../src/models/action');

const actionsProfileView = require('./1550628052821-add-actions-profile-view').actionsProfileView;
const actions = actionsProfileView.map(action => action.slug);
const ROLE_NAME = 'Administrador';

// tweak to enable the migration works
if (mongoose.connection.readyState != mongoose.STATE_OPEN) {
	require('../src/db');
}

exports.up = function up (done) {
	ActionModel
		.find({
			slug: {
				$in: actions
			}
		})
		.then((actions) => {
			RoleModel
				.create({
					name: ROLE_NAME,
					actions: actions.map(action => action._id)
				})
				.then(() => done())
				.catch(done);
		})
		.catch(done);
};

exports.down = function down (done) {
	RoleModel
		.remove({
			name: ROLE_NAME
		})
		.then(() => done())
		.catch(done);
};
