const dbConfig = require('../app.config.json').database;
const dbName = process.env.DBNAME;
const dbUserName = process.env.DBUSER;
const dbPass = process.env.DBPASS;
const dbAuthDB = process.env.DBAUTHDB;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongooseOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	// user: dbUserName,
	// pass: dbPass,
	// authSource: dbAuthDB,
};
let mongooseURI = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbName}`;

const db = {};

db.mongoose = mongoose;

db.mongoose.connect(mongooseURI, mongooseOptions).then(
	() => {
		console.log('Successfully connected to MongoDB.');
	},
	err => {
		console.error('Connection error', err);
		process.exit();
	},
);

// Schemas
db.User = require('./user.schema');
db.Page = require('./page.schema');

module.exports = db;
