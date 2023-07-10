import {axiosInstance as customAxios} from './api.interceptor';

export class ApiGateway {
	static get(url: string, params?: any) {
		const options = {
			method: 'GET',
			url: url,
			params: params && new URLSearchParams(params),
		};

		return customAxios.request(options);
	}

	static post(url, data) {
		const options = {
			method: 'POST',
			url: url,
			data,
		};

		return customAxios.request(options);
	}

	static put(url, data) {
		const options = {
			method: 'PUT',
			url: url,
			data,
		};

		return customAxios.request(options);
	}

	static delete(url, params) {
		const options = {
			method: 'DELETE',
			url: url,
			params: params && new URLSearchParams(params),
		};

		return customAxios.request(options);
	}
}
