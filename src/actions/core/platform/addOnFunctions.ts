import { performRequest } from '../../acmeRequestor';
import { GET_ADD_ONS } from '../../../utils/acmeEndpoints';
import { IAddOn } from '../../../interfaces/acmePlatformPayloads';

/** Returns an add-on object for the specified add-on id
 * @param addOnId - The id of the add-on to retrieve
 * @returns {Promise<IAddOn>}
 */
async function getAddOn(addOnId: string | number): Promise<IAddOn> {

	const url = `${GET_ADD_ONS}/${addOnId}`;

	const payload = await performRequest({ url, method: 'get' }) as IAddOn;
	return payload;
}

/** Returns an array of add on objects for the specified query string
 * @param {string} query
 * @returns {Promise<{ list: IAddOn[] }>}
 */
async function queryAddOns(query: string): Promise<{ list: IAddon[]}> {

	const url = `${GET_ADD_ONS}?${query}`;

	const payload = await performRequest({ url, method: 'get' }) as {list: IAddOn[]};
	return payload;
}

export { getAddOn, queryAddOns };