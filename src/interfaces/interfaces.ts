/** Interface for the ACME Configuration object
 * @param apiKey - Access Key to provide authentication to the ACME API
 * @param b2cTenantId - Tenant ID for accessing B2C APIs (optional)
 * @param apiRootUrl - Root URL of the ACME API. Override with sandbox API url if needed. Otherwise defaults to api.acmeticketing.com (optional)
 */
export interface ACMEConfig {
	apiKey: string,
	apiRootUrl?: string,
	b2cTenantId?: string | number,
}