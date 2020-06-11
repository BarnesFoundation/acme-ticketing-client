import { performRequest } from '../../acmeRequestor';
import { LIST_MEMBERSHIP_LEVELS, GET_MEMBERSHIP_LEVEL } from '../../../utils/acmeEndpoints';
import { MembershipLevelsList, MembershipLevelObject } from '../../../interfaces/acmeMembershipLevelsPayloads';

export interface ListMembershipLevelsInput {

	/** Required. boolean.
	 * When set to true, returns a list of published membership levels. All clients other than Acme B2B should set this to true. 
	 * */
	isPublished: boolean,

	/**  Required. 
	 * Possible values are online, pointOfSale, insideSalesIndividual, customerRep.
	 * To get memberships levels for multiple sales channels, add the values comma separated 
	 * */
	salesChannels: 'online' | 'pointOfSale' | 'insideSalesIndividual' | 'customerRep',

	/** Optional.The page that you want returned, default is 1. */
	page?: number,

	/** Optional. The number of items you want returned in a page. Default is 100. Setting this to - 1 will return everything. */
	pageSize?: number,

	/** Optional. The field that you want to sort by */
	sortField?: string,

	/** Optional. Can be asc or desc based on the required direction of sorting. */
	sortDirection?: 'asc' | 'desc',

	/**  Optional. boolean. 
	 * When set to true, it filters out all the meta data / configuration information tied to the membership level */
	summarize?: boolean,

	/** Optional. String.individualAndFamily or organization. */
	membershipLevelGroup?: 'individiualAndFamily' | 'organization',

	/** Optional.The lifecycle actions filter. Possible values are NEW_MEMBERSHIPS, CANCELLATION, UPGRADE, DOWNGRADE, RENEW, AFTER_TERM_RENEW, REJOIN */
	action?: 'NEW_MEMBERSHIPS' | 'CANCELLATION' | 'UPGRADE' | 'DOWNGRADE' | 'RENEW' | 'AFTER_TERM_RENEW' | 'REJOIN',

	/** Optional.
	 * Boolean.
	 * When set to true, returns all membership levels that are of type auxiliary. Otherwise, returns non auxiliary membership levels. (2017Q3.1 release) */
	auxiliary?: boolean,

	/**  Boolean. When set to true, returns membership levels that is not mapped to a collection. */
	excludeLevelsWithACollection?: boolean,

	/** String.The membership level collection ID. throws COMBINATION_NOT_SUPPORTED exception when both collection ID and excludeLevelsWithACollection are passed.
	*/
	collectionId?: string
}

/** Lists the membership levels
 * @params input - Object containing the input parameters for the membership levels to be retrieved
 */
export const listMembershipLevels = async (params: ListMembershipLevelsInput): Promise<MembershipLevelsList> => {

	const url = LIST_MEMBERSHIP_LEVELS;
	const payload = await performRequest({ url, method: 'get', params }) as MembershipLevelsList;

	return payload;
};

/** Retrieves a specified membership level by id
 * @params id - The id of the membership level you want to get.
 */
export const getMembershipLevel = async (id: string): Promise<MembershipLevelObject> => {

	const url = GET_MEMBERSHIP_LEVEL(id);
	const payload = await performRequest({ url, method: 'get' }) as MembershipLevelObject;

	return payload;
};
