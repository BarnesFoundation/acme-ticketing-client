import { ACMETicketingClient, TicketingFunctions } from '../src/index';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env '});

const main = async () => {

	// Get credentials from .env
	const b2cTenantId = process.env.B2C_TENANT_ID;
	const apiKey = process.env.API_KEY;
	const apiRootUrl = process.env.API_ROOT_URL;

	// Setup client
	const ac = new ACMETicketingClient({ b2cTenantId, apiKey, apiRootUrl });


}

main(); 