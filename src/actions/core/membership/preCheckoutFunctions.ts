import { performRequest } from '../../acmeRequestor';
import { VALIDATE_MEMBERSHIP_CHECKOUT } from '../../../utils/acmeEndpoints';
import {
	IMembershipCheckoutValidationResult,
	MembershipRenewalAction,
	MembershipUpgradeAction,
	MembershipDowngradeAction,
	MembershipPostTermAction,
	MembershipRejoinAction,
	MembershipPurchaseAction,
} from '../../../interfaces/acmePreCheckoutPayloads';


export interface IMembershipActionValidationInput {
	action: MembershipPurchaseAction | MembershipRenewalAction | MembershipUpgradeAction | MembershipDowngradeAction | MembershipPostTermAction | MembershipRejoinAction;
	levelId?: string;
	offeringId?: string;
	pricePointId?: string;
	membershipId?: string | number;
};

export const validateMembershipAction = async (params: IMembershipActionValidationInput): Promise<IMembershipCheckoutValidationResult> => {

	// For all actions other than MembershipPurchase, the membership id is required
	if (params.action !== 'MembershipPurchase' && !params.membershipId) {
		throw Error('Membership id is required for actions that are not "MembershipPurchase"');
	}

	const payload = await performRequest({
		url: VALIDATE_MEMBERSHIP_CHECKOUT,
		method: 'get',
		params,
	}) as IMembershipCheckoutValidationResult;

	return payload;
};