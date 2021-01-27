import { performRequest } from '../../acmeRequestor';
import { GET_ADD_ONS } from '../../../utils/acmeEndpoints';
import { IAddOn } from '../../../interfaces/acmePlatformPayloads';

/** Returns an add-on object for the specified add-on id
 * @param addOnId - The id of the add-on to retrieve
 */
async function getAddOn(addOnId: string | number): Promise<IAddOn> {

	const url = `${GET_ADD_ONS}/${addOnId}`;

	const payload = await performRequest({ url, method: 'get' }) as IAddOn;
	return payload;
}

export { getAddOn };