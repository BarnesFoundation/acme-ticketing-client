/** This file contains convenience functions for performing actions related to a membership sale
 * 
 * This is because performing actions related to a membership sale makes use of several already existing API functions
 * with specific input and in a specifc way.
 * 
 * You can also use this module as a guide for implementing these flows manually if you need more refined control over the process.
 * 
 *  For example
 * - Purchasing a new membership
 * - Renewing a membership
 */
import { v4 as uuidV4 } from 'uuid';

import {
	MembershipRenewalAction,
	MembershipUpgradeAction,
	MembershipDowngradeAction,
	MembershipPostTermAction,
	MembershipRejoinAction
} from '../../../index';
import {
	ShoppingCartFunctionsB2C,
	ECommerceFunctionsB2C,
	PreCheckoutFunctions,
	Order,
	MembershipCardFunctions,
} from '../../../index';


export interface IMembershipSelectionInput {

	/** When performing a new Membership Purchase action, this should be the Membership Category id.
	 * During any other membership action, it should be a Membership Level Id. */
	membershipCategoryId: string,

	membershipOfferingId: string,
	pricePointId: string,

	/** The membership action must be provided when performing an action other than a new membership purchase */
	membershipAction?: MembershipRenewalAction | MembershipUpgradeAction | MembershipDowngradeAction | MembershipPostTermAction | MembershipRejoinAction,

	/** The membership id must be provided when performing an action other than a new membership purchase */
	membershipId?: string,

	isGift?: boolean,
	gifterInfo?: {
		email: string,
		firstName: string,
		lastName: string,
		customerSource: string,
	},
};

export interface IMembershipMemberDetails {
	city: string,
	country: string,
	email: string,
	firstName: string,
	lastName: string,
	phoneNumber: string,
	state: string,
	streetAddress1: string,
	streetAddress2?: string,
	zipCode: string,
};

export interface IPaymentDetails {
	creditCardBrand: 'Visa' | 'MasterCard' | 'AmericanExpress' | 'Discover' | 'Jcb',
	manualEntryCardNumber: string,
	cvc: string,
	ccLastFourDigits: string,
	expDate: string,

	/** Uuid is optional. Provide your own to have yours used during the checkout instead */
	uuid?: string,

	/** IP address of the browser making the request */
	ipAddress?: string
};

/** Performs the actions necessary for completing the purchase of a new membership. 
 * Purchases it on behalf of the member and returns the order object
 * @params membershipPurchaseInput - Input related to the membership being purchased
 * @params memberDetails - Details for the member to be list on the primary card of the purchased membership
 */
export const purchaseNewMembership = async (membershipSelection: IMembershipSelectionInput, memberDetails: IMembershipMemberDetails,
	paymentDetails: IPaymentDetails): Promise<Order> => {

	// Setup the membership information for purchase
	const membershipInformation = {
		membershipCategoryId: membershipSelection.membershipCategoryId,
		membershipOfferingId: membershipSelection.membershipOfferingId,
		pricePointId: membershipSelection.pricePointId,
		membershipCards: [{
			...memberDetails,
			cardType: 'primary',
		}],
		isGift: membershipSelection.isGift,
	};

	// Add in the gifter details if needed
	if (membershipSelection.isGift && membershipSelection.gifterInfo) {
		membershipInformation['gifterInfo'] = membershipSelection.gifterInfo;
	}

	// Create the shopping cart and get the id for it
	const newShoppingCartId = await ShoppingCartFunctionsB2C.createNewShoppingCart({
		items: [
			{
				quantity: 1,
				itemType: 'MembershipPurchase',
				membershipInfo: membershipInformation,
			}
		],
	});

	// Now that we have the shopping cart id, let's perform the checkout
	const orderResponse = await ECommerceFunctionsB2C.performCheckout({
		shoppingCartId: newShoppingCartId,

		// For the billing details, we'll just copy the information from the member details
		billingAddress1: memberDetails.streetAddress1,
		billingCity: memberDetails.city,
		billingCountry: memberDetails.country,
		billingEmail: memberDetails.email,
		billingFirstName: memberDetails.firstName,
		billingLastName: memberDetails.lastName,
		billingPhoneNumber: memberDetails.phoneNumber,
		billingState: memberDetails.state,
		billingZipCode: memberDetails.zipCode,

		// Contact information is required, so just copy it again
		contactEmail: memberDetails.email,
		contactFirstName: memberDetails.firstName,
		contactLastName: memberDetails.lastName,

		// Add in the payment details
		creditCardBrand: paymentDetails.creditCardBrand,
		manualEntryCardNumber: paymentDetails.manualEntryCardNumber,
		cvc: paymentDetails.cvc,
		ccLastFourDigits: paymentDetails.ccLastFourDigits,
		expDate: paymentDetails.expDate,

	}, paymentDetails.uuid || uuidV4(), undefined, paymentDetails.ipAddress);

	return orderResponse;
};


/** Performs the actions necessary for processing a lifecycle action for a membership. 
 * This typically is a variation of the following general actions
 * - A membership renewal
 * - A membership upgrade
 * - A membership downgrade
 * - a membership rejoin
 * 
 * You'll want to keep track of the ACME Membership Number, if possible, prior to completing a membership action.
 * 
 * For example, during a membership upgrade, the povided `membershipId` will be retired (and that corresponding membership will be marked as expired)
 * and a new one will be created, with a new `membershipId`. However, the ACME Membership Number will carry over from the retired membership.
 * 
 * Note: This endpoint seems to take a non-trivial amount of time, around ~10-15 seconds.
 * 
 * @params membershipSelection - Input related to the membership being purchased
 * @params paymentDetails - Parameters for the payment information and the associated billing details
 * @params validate - Optional parameter. Indicates whether or not the lifecycle action should be validated (against the checkout validation endpoint)
 * 					  An error will be thrown if the checkout fails validation. See the `validateMembershipAction` of the `PreCheckoutFunctions` module
 */
export const processMembershipAction = async (membershipSelection: IMembershipSelectionInput, paymentDetails: IPaymentDetails & IMembershipMemberDetails, validate?: boolean): Promise<Order> => {

	// The action won't process correctly if we don't provide the `membershipCards` field
	// so let's look up the current cards for the membership
	const fetchedMemberCards = await MembershipCardFunctions.listMembershipCards(membershipSelection.membershipId);
	const membershipCards = fetchedMemberCards.map((card) => {
		return {
			city: card.city,
			country: card.country,
			email: card.email,
			firstName: card.firstName,
			lastName: card.lastName,
			phoneNumber: card.phoneNumber,
			state: card.state,
			streetAddress1: card.streetAddress1,
			zipCode: card.zipCode,
			cardType: card.cardType,
		};
	});

	// Create the shopping cart and get the id for it
	const newShoppingCartId = await ShoppingCartFunctionsB2C.createNewShoppingCart({
		items: [
			{
				quantity: 1,
				itemType: membershipSelection.membershipAction,
				membershipInfo: {
					membershipCategoryId: membershipSelection.membershipCategoryId,
					membershipOfferingId: membershipSelection.membershipOfferingId,
					pricePointId: membershipSelection.pricePointId,
					membershipId: membershipSelection.membershipId,

					membershipCards,
				},
			}
		],
	});

	// Perform validation against the shopping cart if necessary
	// This will raise an error if the membership action would result in a negative price
	if (validate) {
		const validationResponse = await PreCheckoutFunctions.validateMembershipAction({
			action: membershipSelection.membershipAction,
			offeringId: membershipSelection.membershipOfferingId,
			pricePointId: membershipSelection.pricePointId,
			levelId: membershipSelection.membershipCategoryId,

			membershipId: membershipSelection.membershipId,
		});

		if (validationResponse.price < 0) {
			throw Error('The membership action would result in a negative payment, which is not supported.');
		}
	}

	// Perform the checkout for the cart
	const orderResponse = await ECommerceFunctionsB2C.performCheckout({
		shoppingCartId: newShoppingCartId,

		// For the billing details, we'll just copy the information from the member details
		billingAddress1: paymentDetails.streetAddress1,
		billingCity: paymentDetails.city,
		billingCountry: paymentDetails.country,
		billingEmail: paymentDetails.email,
		billingFirstName: paymentDetails.firstName,
		billingLastName: paymentDetails.lastName,
		billingPhoneNumber: paymentDetails.phoneNumber,
		billingState: paymentDetails.state,
		billingZipCode: paymentDetails.zipCode,

		// Contact information is required, so just copy it again
		contactEmail: paymentDetails.email,
		contactFirstName: paymentDetails.firstName,
		contactLastName: paymentDetails.lastName,

		// Add in the payment details
		creditCardBrand: paymentDetails.creditCardBrand,
		manualEntryCardNumber: paymentDetails.manualEntryCardNumber,
		cvc: paymentDetails.cvc,
		ccLastFourDigits: paymentDetails.ccLastFourDigits,
		expDate: paymentDetails.expDate,

	}, paymentDetails.uuid || uuidV4(), undefined, paymentDetails.ipAddress);

	return orderResponse;
};