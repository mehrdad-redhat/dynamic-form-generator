const userService = require('./user.service');


function signup(req, res, next) {
	const user = {
		name: req.body.name
	};
	userService.signup(user).then(() => {
		return res.status(201).send({message: 'User created successfully.'});
	}).catch(next);

}


function login(req, res, next) {
	userService.login(req.body.name).then((loggedInUser) => {
		res.status(200).send({
			data: loggedInUser,
			message: 'User logged in successfully',
		});
	}).catch(next);
}

module.exports = {
	login, signup
};
