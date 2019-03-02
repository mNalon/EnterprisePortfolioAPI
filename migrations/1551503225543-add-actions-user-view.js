var mongoose = require('mongoose');

let ActionModel = require('../src/models/action');

const actionsUserView = [
	{ name:'Visualizar tela de usuários', slug:'view_users' },
	{ name:'Visualizar tela de criação de usuários', slug:'create_users' },
	{ name:'Visualizar tela de edição de usuários', slug:'edit_users' }
];

// tweak to enable the migration works
if (mongoose.connection.readyState != mongoose.STATE_OPEN) {
	require('../src/db');
}

exports.actionsUserView = actionsUserView;

exports.up = function up (done) {
	ActionModel.insertMany(actionsUserView, (err, docs)=>{
		if(err) return done(err);
		console.dir(docs);
		done();
	});
};

exports.down = function down (done) {
	ActionModel
		.remove({
			slug: {
				$in: actionsUserView.map(action => action.slug)
			}
		})
		.then(() => done())
		.catch(done);
};
