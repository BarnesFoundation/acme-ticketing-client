import { ACMETicketingClient, EventFunctions, MembershipSummaryFunctions, OrderFunctions, MembershipCardFunctions } from '../src/index';
import { TicketingFunctions as tfc } from '../src/convenience';
import * as dotenv from 'dotenv';

dotenv.config();

const main = async () => {

	// Get credentials from .env
	const b2cTenantId = process.env.B2C_TENANT_ID;
	const apiKey = process.env.API_KEY;
	// const apiRootUrl = process.env.API_ROOT_URL;

	// Setup client
	const ac = new ACMETicketingClient({ b2cTenantId, apiKey });

	const r = await tfc.getTicketsForMembershipCard('3320311');
	console.log(r);

}

main(); 