const db = require("../_database");
const User = db.User;


function verifyName(req, res, next) {
	if (!req.headers["authorization"])
		return res.status(403).send({message: "No name provided in the header!"});

	let userId = req.headers["authorization"];

	User.findOne({_id:userId}).then(user=>{
		if (!user) return res.status(401).send({message: "UnauthorizedError"});
		req.userId = user._id;
		return next();
	});
}

module.exports = {
	verifyName
};
