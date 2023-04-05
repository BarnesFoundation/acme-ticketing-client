import { performRequest } from '../../acmeRequestor';
import { B2C_CHECKOUT } from '../../../utils/acmeEndpoints';
import { CheckoutInputObject } from '../../../interfaces/acmeCheckoutManagementPayloads';
import { Order } from '../../../interfaces/acmeOrderPayloads';
import { getUserIpAddress } from '../../../utils/ipAddressUtil';

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
 * @params options - option bag parameter.
 * @params browserIpAddress - IP address of the requesting browser for the checkout action. 
 */
export async function performCheckout(
	checkoutInput: CheckoutInputObject,
	uuid: string,
	options: { throwRaw?: boolean } = {},
	browserIpAddress?: string,
) {
	// Destructure optional parameters
	const { throwRaw = false } = options;

	const additionalHeaders = { 
		"x-acme-request-uuid": uuid, 
		"x-acme-browser-ip": browserIpAddress || await getUserIpAddress(),
	};

	const payload = await performRequest({ url: B2C_CHECKOUT, method: 'post', data: checkoutInput, additionalHeaders, throwRaw }) as Order;
	return payload;
}