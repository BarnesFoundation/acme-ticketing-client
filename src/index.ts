import { ACMEConfig } from './interfaces/interfaces';
export { TicketingFunctions } from './actions/ticketingFunctions';
export { EventFunctions } from './actions/eventFunctions';
export { MembershipFunctions } from './actions/membershipFunctions';
export { MembershipSummaryFunctions } from './actions/membershipSummaryFunctions';

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
