import {ApiGateway} from "../helpers/api.gateway";
import {Page} from "../models";

function createPage(newPage): Promise<Page> {
	return ApiGateway.post('/pages',newPage).then(res => res.data)
}
function getAllPages(): Promise<{ pages: Page[] }> {
	return ApiGateway.get('/pages').then(res => res.data)
}

function getSinglePage(id:string): Promise<Page> {
	return ApiGateway.get('/pages/'+id).then(res => res.data)
}

function editPage(id:string,edittedPage): Promise<Page> {
	return ApiGateway.put('/pages/'+id,edittedPage).then(res => res.data)
}


export const PageService = {
	getAllPages,
	createPage,
	getSinglePage,
	editPage,
}
