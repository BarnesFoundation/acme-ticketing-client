import { performRequest } from '../../acmeRequestor';
import { GET_MEMBERSHIP } from '../../../utils/acmeEndpoints';
import { GetMembershipPayload } from '../../../interfaces/acmeMembershipPayloads';

export interface ListMembershipsInput {

	/** Only return memberships updated after this start time. Optional */
	updatedStartTime?: string,

	/** Only return memberships updated after this time. Optional */
	updatedEndTime?: string,

	/** Only return memberships of this program type. Optional */
	program?: string,

	/** Only return memberships of this category. Optional */
	category?: string,

	/** Only return memberships of this sub category. Optional */
	subCategory?: string,

	/** Field by which results are sorted */
	sortField?: 'createdOn',

	/** Results sorting direction (“asc” or “desc”) */
	sortDirection?: 'asc' | 'desc',

	/** Page number of the displayed results */
	page?: number,

	/** Number of records included in each page. Recommended to 1000 or less */
	pageSize?: number,

	/** Total number of records returned by this call */
	count?: number
}

/** Returns a membership object belonging to the provided membership id. 
 *  Providing an invalid or non-existent membership id will return empty
 * @param membershipId - The id of the membership to retrieve
 */
const getMembership = async (membershipId: string): Promise<GetMembershipPayload> => {

	const url = `${GET_MEMBERSHIP}/${membershipId}`;
	const payload = await performRequest({ url, method: 'get' }) as GetMembershipPayload;

	return payload;
};

/** Returns a list of membership objects that meet the specified criteria 
 *  @param params - Object containing the input parameters for the memberships to be retrieved
*/
const listMemberships = async (params: ListMembershipsInput): Promise<GetMembershipPayload[]> => {

	const url = `${GET_MEMBERSHIP}/`;
	const payload = await performRequest({ url, method: 'get', params }) as GetMembershipPayload[];

	return payload;
};

/** Module for the Membership endpoints. */
export { getMembership, listMemberships }