var mongoose = require('mongoose');

let ActionModel = require('../src/models/action');

const actionsProfileView = [
	{ name:'Visualizar tela de perfis', slug:'view_profiles' },
	{ name:'Visualizar tela de edição de perfis', slug:'edit_profiles' }
];

// tweak to enable the migration works
if (mongoose.connection.readyState != mongoose.STATE_OPEN) {
	require('../src/db');
}

exports.actionsProfileView = actionsProfileView;

exports.up = function up (done) {
	ActionModel.insertMany(actionsProfileView, (err, docs)=>{
		if(err) return done(err);
		console.dir(docs);
		done();
	});
};

exports.down = function down (done) {
	ActionModel
		.remove({
			slug: {
				$in: actionsProfileView.map(action => action.slug)
			}
		})
		.then(() => done())
		.catch(done);
};

