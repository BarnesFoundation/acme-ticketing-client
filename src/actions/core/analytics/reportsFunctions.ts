import { performRequest } from '../../acmeRequestor';
import { LIST_REPORTS } from '../../../utils/acmeEndpoints';


/** Returns a list of all report JSON objects for this user */
async function listReports() {

	const payload = await performRequest({ url: LIST_REPORTS, method: 'get' });
	return payload;
}