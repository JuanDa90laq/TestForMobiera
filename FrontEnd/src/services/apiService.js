import axios from 'axios';
import { ServiceResponseEntity } from '@/./enviroment.js';

const baseURL = 'http://localhost:3000';

const ApiService = axios.create(
	{
		baseURL,
		headers: {
			"X-CSRF-Header": "-"

		}
	}
);

ApiService.interceptors.response.use(
	(response) => {
		var result = new ServiceResponseEntity(response, response?.data);
		return result;
	},
	(error) => {
		var result = new ServiceResponseEntity(error, error?.response?.data);
		return result;
	}
);

export { ApiService }