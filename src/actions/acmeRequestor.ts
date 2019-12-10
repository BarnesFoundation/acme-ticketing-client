import axios, { Method } from 'axios';
import { clientConfig } from '../index';


interface RequestConfig {
	url: string,
	method: string,
	additionalHeaders?: {},
	data?: any,
	params?: {},
}

const baseURL = clientConfig.apiRootUrl;
const defaultHeaders: {} = { 'x-acme-api-key': clientConfig.apiKey };

export const performRequest = async (config: RequestConfig): Promise<any> => {

	let headers = { ...defaultHeaders };

	// Grab the params from the config and cast Method
	const { url, method: providedMethod, additionalHeaders, data, params } = config;
	const method = providedMethod as Method;

	// If additional headers were provided, merge them
	if (additionalHeaders) { headers = { ...headers, ...additionalHeaders }; }

	// If the request is to a b2c endpoint
	if (url.includes('/b2c/')) { headers = { ...headers, 'x-b2c-tenant-id': clientConfig.b2cTenantId }; }

	try {
		const response = (await axios({ baseURL, headers, url, method, data, params })).data;
		return response;
	}

	catch (error) {
		console.log(`An error occurred sending a ${method} request to ${url}`, error);
	}
}