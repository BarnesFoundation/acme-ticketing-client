import axios, { Method } from 'axios';
import { clientConfig } from '../../index';


interface RequestConfig {
	url: string,
	method: string,
	additionalHeaders?: {},
	data?: any,
	params?: {},
	throwRaw?: boolean,
}

export const performRequest = async (config: RequestConfig): Promise<any> => {

	// Setup request
	const baseURL = clientConfig.apiRootUrl;
	const defaultHeaders: {} = { 'x-acme-api-key': clientConfig.apiKey };

	let headers = { ...defaultHeaders };

	// Grab the params from the config and cast Method
	const {
		url,
		method: providedMethod,
		additionalHeaders,
		data,
		params,
		throwRaw = false,
	} = config;
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
		// If we are throwing the raw error, just throw the error object.
		if (throwRaw) {
			throw error;
		}
		// Otherwise, throw string.
		else {
			console.log(error);
			throw `An error occurred sending a ${method} request to endpoint ${url}. Error was: ${error}`;
		}
		
	}
}