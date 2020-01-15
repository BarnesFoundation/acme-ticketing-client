import { ACMEConfig } from './src/interfaces/interfaces';

export let clientConfig: ACMEConfig;

/** 
 * ACME Ticketing Client  
*/
export class ACMETicketingClient {
	constructor(config: ACMEConfig) {
		const configuration = { ...config };

		// If no root url for the API was provided, set the production API url
		if (configuration.apiRootUrl == undefined) {
			configuration.apiRootUrl = `https://api.acmeticketing.com`;
		}

		clientConfig = configuration;
	}
}

// Import our core function modules
import * as ReportFunctions from './src/actions/core/analytics/reportsFunctions';
import * as EventFunctions from './src/actions/core/eventManagement/eventFunctions';
import * as EventTemplateFunctions from './src/actions/core/eventManagement/eventTemplateFunctions';import * as EventTemplateFunctionsB2C from './src/actions/core/checkoutManagement/eventTemplateB2CFunctions';
import * as OrderFunctions from './src/actions/core/ordersManagement/orderFunctions';
import * as MembershipCardFunctions from './src/actions/core/membership/membershipCardFunctions';
import * as MembershipSummaryFunctions from './src/actions/core/membership/membershipSummaryFunctions';
import * as MembershipFunctions from './src/actions/core/membership/membershipFunctions';
import * as WillCallFunctions from './src/actions/core/willCallFunctions';
import * as SessionFunctions from './src/actions/core/authentication/sessionFunctions';

// Export the core function modules
export { ReportFunctions, EventFunctions, MembershipSummaryFunctions, MembershipCardFunctions, MembershipFunctions, OrderFunctions, WillCallFunctions, SessionFunctions, EventTemplateFunctions, EventTemplateFunctionsB2C };

// Export our core payload types
export * from './src/interfaces/acmeEventPayloads';
export * from './src/interfaces/acmeCheckoutManagementPayloads';
export * from './src/interfaces/acmeMembershipCardPayloads';
export * from './src/interfaces/acmeMembershipPayloads';
export * from './src/interfaces/acmeMembershipSummariesPayloads';
export * from './src/interfaces/acmeOrderPayloads';
export * from './src/interfaces/acmeWillCallPayloads';
export * from './src/interfaces/acmeAnalyticsPayloads'
export * from './src/interfaces/interfaces';
