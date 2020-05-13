import { performRequest } from '../../acmeRequestor';
import { B2C_CHECKOUT } from '../../../utils/acmeEndpoints';
import { CheckoutInputObject } from '../../../interfaces/acmeCheckoutManagementPayloads';

export interface CheckoutParams {
	shoppingCart: string | ShoppingCart,
	billingFirstName: string,
	billingLastName: string,
	billingAddress1: string,
	billingCity: string,
	billingState: string,
	billingCountry: string,
	billingZipCode: string,
	billingEmail: string,
	billingPhoneNumber: string,
	ticketDeliveryEmail: string,

	manualEntryCardNumber?: string,
	expDate?: string,
	ccLastFourDigits?: string,
	cvc?: string,
	acmeToken?: string,
	reservationId?: string
}

export interface ShoppingCart {
	items: {
		itemType: string,
		eventName: string,
		eventId: string,
		ticketingTypeName: string,
		ticketingTypeId: string,
		quantity: number,
		unitPrice: string,
		amount: string
	}[]
}

/** Performs a Checkout request against the B2C endpoint
 * 
 * Returns an Order object
 * @params checkoutInput - Checkout object containing items to be purchased and billing information.
 * @params uuid - Unique uuid for this transaction to prevent duplicate transactions from taking place. Gets included into the "x-acme-request-uuid" header key
 */
export async function performCheckout(checkoutInput: CheckoutInputObject, uuid: string) {
	const additionalHeaders = { "x-acme-request-uuid": uuid };
	const payload = await performRequest({ url: B2C_CHECKOUT, method: 'post', data: checkoutInput, additionalHeaders }) as any;
	return payload;
}