import { ACMEConfig } from './interfaces/interfaces';
export { TicketingFunctions } from './actions/convenience/ticketingFunctions';
export { EventFunctions } from './actions/core/eventManagement/eventFunctions';
export { MembershipFunctions } from './actions/core/membership/membershipFunctions';
export { MembershipSummaryFunctions } from './actions/core/membership/membershipSummaryFunctions';
export { OrderFunctions } from './actions/core/ordersManagement/orderFunctions';

export let clientConfig: ACMEConfig;

/** 
 * ACME Ticketing Client  
*/
export class ACMETicketingClient {
	
	constructor(config: ACMEConfig) {
		const configuration = { ...config };
		
		// If no root url for the API was provided, set the production API url
		if (configuration.apiRootUrl == undefined) {
			configuration.apiRootUrl = `https://api.acmeticketing.net`;
		}

		clientConfig = configuration;
	}
}
