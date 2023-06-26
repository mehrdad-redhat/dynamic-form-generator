const db = require('../_database'),
	User = db.User;
const config = require('../app.config.json');

async function signup(bodyUser) {
	try{
		const user = new User(bodyUser);
		return user.save();
	}catch (err) {
		return err;
	}
	
}


async function login(name) {
	return new Promise((resolve, reject) => {
		User.findOne({name}).then(( user) => {
			if (!user) {
				return reject({
					name: 'customError',
					message: 'name is incorrect..',
					code: 400,
				});
			}
			
			resolve({
				_id: user._id,
				name: user.name
			});
		});
	});

}

module.exports = {
	signup,
	login,
};
