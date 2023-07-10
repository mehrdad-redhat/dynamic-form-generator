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
				const newUser = new User({name})
				resolve(newUser.save())
			}else{
				resolve({
					_id: user._id,
					name: user.name
				});	
			}
		});
	});

}

module.exports = {
	signup,
	login,
};
