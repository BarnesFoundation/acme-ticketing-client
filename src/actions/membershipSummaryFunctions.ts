import { performRequest } from './acmeRequestor';
import { GET_MEMBERSHIP_SUMMARIES } from '../utils/acmeEndpoints';
import { GetMembershipSummariesPayload } from '../interfaces/acmeMembershipSummariesPayloads';

interface MembershipSummaryInput {

	// Only return membership summaries updated after this start time (optional) 
	updatedStartTime?: string,

	// Only return membership summaries updated after this time (optional)
	updatedEndTime?: string,

	// Only return membership summaries of this program type (optional)
	program?: string,

	// Only return membership summaries of this category (optional)
	category?: string,

	// Only return membership summaries of this sub category (optional)
	subCategory?: string,

	// Only return the membership summaries that have barcode or acmeBarcodes that begin with this text.  Useful for auto complete (optional)
	barcode?: string,

	// nly return membership summaries that have membership ids that begin with this text. Useful for auto complete (optional)
	membershipId?: number,

	// Only return membership summaries that have first names that begin with this text. Useful for auto complete (optional)
	firstName?: string,

	// Only return membership summaries that have last names that begin with this text. Useful for auto complete (optional)
	lastName?: string,

	// Only return membership summaries that have cities that begin with this text. Useful for auto complete (optional)
	city?: string,

	// Only return membership summaries that have zip codes that begin with this text. Useful for auto complete (optional)
	zip?: string,

	// String.ISO8601 format. Returns only the memberships that expire after this date. (in sandbox) (optional)
	expiresAfter?: string,

	// String.ISO8601 format. Returns only the memberships that expired before this date. (in sandbox) (optional)
	expiresBefore?: string
}

/** Returns a list of membership summary objects matching the provided input criteria.
 *  If no input is provided, all membership summary objects available will be returned.
 * @param input - Object containing input criteria (optional)
 */
const getMembershipSummaries = async (input?: MembershipSummaryInput): Promise<GetMembershipSummariesPayload> => {

	const url = `${GET_MEMBERSHIP_SUMMARIES}`;
	const payload = await performRequest(url, 'get', null, null, input) as GetMembershipSummariesPayload;

	return payload;
}

export const MembershipSummaryFunctions = {
	getMembershipSummaries
}