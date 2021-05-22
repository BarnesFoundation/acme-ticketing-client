import {
	ShoppingCartFunctionsB2C,
	ECommerceFunctionsB2C,
	Order,
} from '../../../index';
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

export interface IPurchaseNewMembershipInput {
	membershipCategoryId: string,
	membershipOfferingId: string,
	pricePointId: string,

	isGift: boolean,
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
};

/** Performs the actions necessary for completing the purchase of a new membership. 
 * Purchases it on behalf of the member and returns the order object
 * @params membershipPurchaseInput - Input related to the membership being purchased
 * @params memberDetails - Details for the member to be list on the primary card of the purchased membership
 */
export const purchaseNewMembership = async (membershipPurchaseInput: IPurchaseNewMembershipInput, memberDetails: IMembershipMemberDetails,
	paymentDetails: IPaymentDetails, uuid: string): Promise<Order> => {

	// Setup the membership information object of the items to provide
	const membershipInformation = {
		membershipCategoryId: membershipPurchaseInput.membershipCategoryId,
		membershipOfferingId: membershipPurchaseInput.membershipOfferingId,
		pricePointId: membershipPurchaseInput.pricePointId,
		membershipCards: [{ ...memberDetails, cardType: 'primary', }],
		isGift: membershipPurchaseInput.isGift,
	};

	// Add in the gifter details if needed
	if (membershipPurchaseInput.isGift && membershipPurchaseInput.gifterInfo) {
		membershipInformation['gifterInfo'] = membershipPurchaseInput.gifterInfo;
	}

	// Create the shopping cart and get the id for it
	try {
		const newShoppingCartId = await ShoppingCartFunctionsB2C.createNewShoppingCart({
			items: [
				{
					quantity: 1,
					itemType: 'MembershipPurchase',
					membershipInfo: membershipInformation,
				}
			],
		});
		console.log(newShoppingCartId);
		// Now that we have the shopping cart id, let's perform the checkout
		try {
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
				...paymentDetails,
			} as any, uuid);

			return orderResponse;
		} catch (error) {
			console.log(`An error occurred checking out the membership purchase`, error);
			throw error;
		}

	} catch (error) {
		console.log(`An error occurred creating a shopping cart for the membership purchase`, error);
		throw error;
	}
};