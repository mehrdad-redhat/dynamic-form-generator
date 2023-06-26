const pageService = require('./page.service');

/**
 * New page for a user
 */
function createPage(req, res, next) {
	const page = {
		name: req.body.name,
		elements: req.body.elements,
		owner: req.userId,
	};
	pageService.createPage(page).then((data) => {
		return res.status(201).send({message: 'Page successfully created',data:{
				_id:data._id
			}});
	}).catch(next);
}

/**
 * Get all pages of a user
 */
function getAllPage(req, res, next) {
	pageService.getAllPages(req.userId).then(data => {
		return res.status(200).send({data});
	}).catch(next);
}

/**
 * Edit a single page by id
 */
function editPage(req, res, next) {
	let editedPage = {
		name: req.body.name,
		elements: req.body.elements
	};

	pageService.editPage(req.params.id, req.userId, editedPage).then(editedTool => {
		return res.status(200).send({message: 'Page successfully updated'});
	}).catch(next);
}

module.exports = {
	createPage,
	getAllPage,
	editPage,
};
