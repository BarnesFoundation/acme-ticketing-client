import { performRequest } from '../../acmeRequestor';
import { LIST_MEMBERSHIP_CARDS } from '../../../utils/acmeEndpoints';
import { MembershipCard } from '../../../interfaces/acmeMembershipCardPayloads';

/** Returns a list of membership card objects for the specified id, or all if none is provided. 
 * @param memberId - Only return membership cards of this memberId (optional)
 */
const listMembershipCards = async (memberId?: string): Promise<MembershipCard[]> => {
	
	const params = { memberId };
	const payload = await performRequest({ url: LIST_MEMBERSHIP_CARDS, method: 'get', params }) as MembershipCard[];

	return payload;
}

/** Returns the membership card object with the specified id. 
 * @param cardId - The id of the card to retrieve
 */
const getMembershipCard = async (cardId: string): Promise<MembershipCard> => {

	const url = `${LIST_MEMBERSHIP_CARDS}/${cardId}`;
	const payload = await performRequest({ url, method: 'get' }) as MembershipCard;

	return payload;
}

/** Module for the Membership endpoints. */
export { listMembershipCards, getMembershipCard }