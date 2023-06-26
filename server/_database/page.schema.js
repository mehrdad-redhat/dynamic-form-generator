const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {customAlphabet} = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 12);

const page = new Schema({
	_id: {
		type: String,
		default: () => nanoid()
	},
	name: {
		type: String,
		required: true,
	},
	owner: {
		type: String,
		ref: 'User',
	},
	elements:{
		type: Schema.Types.Mixed,
		default:[]
	}
}, {
	timestamps: true,
});

page.set('toJSON', {
	versionKey: false,
	transform: function(doc, ret) {
		// remove these props when object is serialized
		delete ret.id;
	},
});

module.exports = mongoose.model('Page', page);
