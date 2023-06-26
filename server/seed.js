require('dotenv').config();
const dbConfig = require('./app.config.json').database;
const dbName = process.env.DBNAME;
const dbUserName = process.env.DBUSER;
const dbAuthDB = process.env.DBAUTHDB;
const mongoose = require('mongoose');
const User = require('./_database/user.schema');
const Page = require('./_database/page.schema');
mongoose.Promise = global.Promise;

const mongooseOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	// user:dbUserName,
	// authSource:dbAuthDB
};

let mongooseURI = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbName}`;

mongoose.connect(mongooseURI, mongooseOptions).then(
	() => {
		console.log('Successfully connected to MongoDB.');
		console.log('Seeding database started...💡');
	},
	err => {
		console.error('Connection error', err);
		process.exit();
	}
);

// user seed
const defaultUser = {
	_id:"t01",
	name:'Test'
}

const defaultPage = {
	name:"Employees",
	owner:"t01",
	elements:[
		{
			type:'text',
			name:"first-name",
		},
		{
			type:'text',
			name:"last-name",
		},
		{
			type:'checkbox',
			name:"married"
		},
		{
			type:'radio',
			name:"gender",
			choices:["male", "female"]
		},
		{
			type:'select',
			name:"city",
			choices:["London", "New York", "Paris"]
		}
	]
}

User.create(defaultUser).then(() => {
		console.log('- - - - - - - - - - - - - - - ');
		console.info(
			'Test user seeded and ready to use.👍🏻');
		Page.create(defaultPage).then(() => {
			console.log('- - - - - - - - - - - - - - - ');
			console.info(
				'Default page seeded and ready to use.👍🏻');
			process.exit();
		}).catch(err => {
			console.error(err);
			process.exit();
		});
	})
	.catch(err => {
		console.error(err);
		process.exit();
	});
