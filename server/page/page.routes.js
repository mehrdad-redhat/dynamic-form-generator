const router = require('express').Router();
const pageController = require('page.controller')
const {authorization} = require('../_middleware');

router.get('/test',(req, res, next) => {
	res.status(200).send({message: 'Realm of Pages'});
});

router.post('/',authorization.verifyName,pageController.createPage)
router.get('/',authorization.verifyName,pageController.getAllPage);
router.put('/:id',authorization.verifyName,pageController.editPage);

module.exports = router;
