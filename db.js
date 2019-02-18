var mongoose = require('mongoose');

const config = require('./config');

mongoose.connect(config.DB_URL);

//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('error', console.error);

mongoose.connection.on('open', () => {console.log('Database connection established')})