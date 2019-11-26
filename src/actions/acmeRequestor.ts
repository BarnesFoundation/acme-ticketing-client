import axios, { Method } from 'axios';
import { clientConfig } from '../index';


export const performRequest = async (url: string, method: Method, additionalHeaders?: {}, data?: any): Promise<any> => {

	const baseURL = clientConfig.apiRootUrl;
	const defaultHeaders = { 'x-acme-api-key': clientConfig.apiKey };

	let headers = { ...defaultHeaders };

	// If additional headers were provided, merge them
	if (additionalHeaders) {
		headers = { ...headers, ...additionalHeaders };
	}

	try {
		const response = (await axios({ baseURL, headers, url, method, data })).data;
		return response;
	}

	catch (error) {
		console.log(`An error occurred sending a ${method} request to ${url}`, error);
	}
}