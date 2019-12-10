import { performRequest } from '../../acmeRequestor';
import { GET_MEMBERSHIP } from '../../../utils/acmeEndpoints';
import { GetMembershipPayload } from '../../../interfaces/acmeMembershipPayloads';

/** Returns a membership object belonging to the provided membership id. 
 *  Providing an invalid or non-existent membership id will return empty
 * @param membershipId - The id of the membership to retrieve
 */
const getMembership = async (membershipId: string): Promise<GetMembershipPayload> => {
	
	const membershipUrl = `${GET_MEMBERSHIP}/${membershipId}`;
	const membership = await performRequest(membershipUrl, 'get') as GetMembershipPayload;

	return membership;
}

/** Module for the Membership endpoints. */
export const MembershipFunctions = {
	getMembership,
}