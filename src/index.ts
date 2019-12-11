import { ACMEConfig } from './interfaces/interfaces';
export { TicketingFunctions } from './actions/convenience/ticketingFunctions';

import * as EventFunctions from './actions/core/eventManagement/eventFunctions';
import * as OrderFunctions from './actions/core/ordersManagement/orderFunctions';
import * as MembershipCardFunctions from './actions/core/membership/membershipCardFunctions';
import * as MembershipSummaryFunctions from './actions/core/membership/membershipSummaryFunctions';
import * as MembershipFunctions from './actions/core/membership/membershipFunctions';
import * as WillCallFunctions from './actions/core/willCallFunctions';


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

export {
	EventFunctions,
	MembershipSummaryFunctions,
	MembershipCardFunctions,
	MembershipFunctions,
	OrderFunctions,
	WillCallFunctions
};