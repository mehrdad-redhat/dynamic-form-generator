const Page = require('../_database').Page;

/**
 * New page for a user
 * @param bodyPage
 */
async function createPage(bodyPage) {
	const page = new Page(bodyPage);
	return page.save();
}

/**
 * Get all pages of a user
 */
async function getAllPages(userId) {
	return Page.find({owner: userId})
		
}

/**
 * Edit a single page by id
 */
async function editPage(pageId, userId, bodyPage) {
	return new Promise((resolve, reject) => {
		Page
			.findOneAndUpdate({
				owner: userId,
				_id: pageId,
			}, bodyPage, {new: true})
			.exec((err, updatedPage) => {
				if (err) return reject(err);

				if (!updatedPage)
					reject({
						name: 'customError',
						code: 404,
						message: 'page with id ' + pageId + ' not found',
					});
				return resolve(updatedPage);
			});
	});
}

module.exports = {
	createPage,
	getAllPages,
	editPage
};
