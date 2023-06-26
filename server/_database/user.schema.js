const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 12);

const user = new Schema({
		_id: {
			type: String,
			default: () => nanoid()
		},
		name: {
			type: String,
			required: true
		},
	},
	{
		timestamps: true
	});

user.set('toJSON', {
	versionKey: false,
});

module.exports = mongoose.model('User', user);
