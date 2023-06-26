const db = require("../_database");
const User = db.User;

checkDuplicateEmail = (req, res, next) => {
	User.findOne({name: req.body.name})
		.exec((err, user) => {
			if (err)
				throw new Error(err)

			if (user) {
				res.status(400).send({message: "Failed! Name is already in use!"});
				return;
			}

			next();
		});
};

module.exports = {
	checkDuplicateEmail
};
