import axios from 'axios';
import {userService} from "../services/user.service";

const baseUrl = process.env.REACT_APP_BASE_URL || 'localhost:3001/api'

const axiosInstance = axios.create({});

// Base URL add
axiosInstance.defaults.baseURL = baseUrl;

// JWT Token Interceptor
axiosInstance.interceptors.request.use((config) => {
	config.headers['Authorization'] = userService.getUserFromLocalStorage()?._id;
	return config;
});

// Error Interceptor
axiosInstance.interceptors.response.use(
	(response) => {
		// Any status code that lie within the range of 2xx cause this function to trigger
		return response.data;
	},
	(error) => {
		// TODO: handle diffrent error states
		// Todo: Add Toaster for showing errors to user interface
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.error(error.response.data);
			console.error(error.response.status);
			console.error(error.response.headers);
		} else if (error.request) {
			console.error('Timeout: The request was made but no response was received');
			console.error(error.request);
		} else {
			console.error('Something happened in request setting up the request that triggered an Error');
			console.error('Error', error.message);
		}

		return Promise.reject(error);
	}
);




export { axiosInstance };
