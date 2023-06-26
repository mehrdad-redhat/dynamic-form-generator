const db = require("../_database");
const User = db.User;


function verifyToken(req, res, next) {
	if (!req.headers["authorization"])
		return res.status(403).send({message: "No name provided in the header!"});

	let name = req.headers["authorization"];

	User.findOne({name})
		.exec((err, user) => {
			if (err || !user) return res.status(401).send({message: "UnauthorizedError"});
			req.userId = user._id;
			return next();
		});
}
