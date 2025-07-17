import axios, { AxiosRequestConfig } from "axios";
import { clientConfig } from "../../index";
import { getUserIpAddress } from "../utils/ipAddressUtil";

interface RequestConfig extends AxiosRequestConfig {
	/** Additional headers to be merged in the default heads sent in the ACME API request */
    additionalHeaders?: {};

	/** Whether or not the API request should throw the raw error from the request */
    throwRaw?: boolean;
}

export const performRequest = async <T>(config: RequestConfig): Promise<T> => {
    let headers: {} = {
        "x-acme-api-key": clientConfig.apiKey,
    };

    // If additional headers were provided, merge them
    const { additionalHeaders, throwRaw = false } = config;
    if (additionalHeaders) {
        headers = {
            ...headers,
            ...additionalHeaders,
        };
    }

    // If the request is to a B2C endpoint, we'll add the ACME Tenant ID
    if (config.url.includes("/b2c/")) {
        headers = {
            ...headers,
            "x-b2c-tenant-id": clientConfig.b2cTenantId,
        };
    }

    try {
        const response = await axios({
            baseURL: clientConfig.apiRootUrl,
            headers,
            method: config.method,
            url: config.url,
            data: config.data,
            params: config.params,
        });
        return response.data as unknown as T;
    } catch (error) {
        // If we are throwing the raw error, just throw the error object.
        if (throwRaw) {
            throw error;
        }
        // Otherwise, throw string.
        else {
            // If there's a data message for the error, it's more useful than the whole error stack
            const errorMessage = error.response?.data
                ? JSON.stringify(error.response.data)
                : error;

            throw new Error(`An error occurred sending a ${config.method} request to endpoint ${config.url}. 
				   Error was: ${errorMessage}`);
        }
    }
};
