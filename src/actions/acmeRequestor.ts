import axios, { Method } from "axios";
import { clientConfig } from "../../index";

interface RequestConfig {
    url: string;
    method: string;
    additionalHeaders?: {};
    data?: any;
    params?: {};
    throwRaw?: boolean;
}

export const performRequest = async <T>(config: RequestConfig): Promise<T> => {
    // Setup request
    const baseURL = clientConfig.apiRootUrl;
    let headers: {} = {
        "x-acme-api-key": clientConfig.apiKey,
    };

    // Grab the params from the config and cast Method
    const { additionalHeaders, throwRaw = false } = config;

    // If additional headers were provided, merge them
    if (additionalHeaders) {
        headers = {
            ...headers,
            ...additionalHeaders,
        };
    }

    // If the request is to a b2c endpoint
    // we'll add the tenant id
    if (config.url.includes("/b2c/")) {
        headers = {
            ...headers,
            "x-b2c-tenant-id": clientConfig.b2cTenantId,
        };
    }

    try {
        const response = await axios({
            baseURL,
            headers,
            method: config.method as Method,
            url: config.url,
            data: config.data,
            params: config.params,
        });
        return response.data;
    } catch (error) {
        // If we are throwing the raw error, just throw the error object.
        if (throwRaw) {
            throw error;
        }
        // Otherwise, throw string.
        else {
            // If there's a data message for the error, it's more useful than the whole error stack
            const errorMessage = error.response.data
                ? JSON.stringify(error.response.data)
                : error;

            throw `An error occurred sending a ${config.method} request to endpoint ${config.url}. 
				   Error was: ${errorMessage}`;
        }
    }
};
