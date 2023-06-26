const router = require('express').Router();
const userController = require('../user/user.controller')
const {duplicateCheck} = require('../_middleware');

router.get('/test',(req, res, next) => {
	res.status(200).send({message: 'Realm of Users'});
});

router.post('/signup',duplicateCheck.checkDuplicateEmail,userController.signup)
router.post('/login',userController.login);

module.exports = router;
