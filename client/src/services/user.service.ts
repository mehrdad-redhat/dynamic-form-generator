import {ApiGateway} from '../helpers/api.gateway';
import {User} from "../models";

export const userService = {
	login,
	getUserFromLocalStorage
};

function login({name}): Promise<User> {
	return ApiGateway.post(`/users/login`, {name}).then(response => response.data);
}

function getUserFromLocalStorage() {
	if (typeof window !== 'undefined') {
		return JSON.parse(localStorage.getItem('user'));
	}
	return null;
}
