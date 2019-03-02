var mongoose = require('mongoose');

let RoleModel = require('../src/models/role');
let ActionModel = require('../src/models/action');

const actionsUserView = require('./1551503225543-add-actions-user-view').actionsUserView;
const actions = actionsUserView.map(action => action.slug);
const ROLE_NAME = 'Administrador';

// tweak to enable the migration works
if (mongoose.connection.readyState != mongoose.STATE_OPEN) {
	require('../src/db');
}

const addActionsToAdminRole = (actions) => { 
	return RoleModel.findOne({name: ROLE_NAME})
		.then((role) => {
			if (!role) throw new Error(`Role ${ROLE_NAME} not found.`);
			role.actions = role.actions.concat(actions).map(action => action._id);
			return role.save();
		});
};

exports.up = function up (done) {
	ActionModel
		.find({
			slug: {
				$in: actions
			}
		})
		.then(addActionsToAdminRole)
		.then(() => done())
		.catch(done);
};

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
exports.down = function down (done) {
	RoleModel
		.findOne({name: ROLE_NAME})
		.populate({
			path: 'actions',
		})
		.then((role) => {
			if (!role) throw new Error(`Role ${ROLE_NAME} not found.`);
			role.actions = 
				role.actions.filter(action => (actions.indexOf(action.slug) < 0));
			return role.save();
		})
		.then(() => done())
		.catch(done);
};