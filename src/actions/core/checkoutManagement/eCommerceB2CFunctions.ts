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
 * @param {CheckoutInputObject} checkoutInput - Checkout object containing items to be purchased and billing information.
 * @param {string} uuid - Unique uuid for this transaction to prevent duplicate transactions from taking place. Gets included into the "x-acme-request-uuid" header key
 * @param {{ throwRaw?: boolean }} options - option bag parameter.
 * @param {string} browserIpAddress - IP address of the requesting browser for the checkout action. 
 * @returns {Promise<Order>} An Order object
 * 
 * ACME B2C Checkout Documentation:
 * https://developers.acmeticketing.com/support/solutions/articles/33000250712-b2c-checkout-ecommerce-
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

	// Ensure that both contactEmail and email are included to maintain backwards compatibility
	const data = { ...checkoutInput, email: checkoutInput.email || checkoutInput.contactEmail, contactEmail: checkoutInput.contactEmail || checkoutInput.email }

	const payload = await performRequest({ url: B2C_CHECKOUT, method: 'post', data, additionalHeaders, throwRaw }) as Order;
	return payload;
}

/** Performs a Checkout request against the B2C endpoint with Recaptcha headers
 * 
 * Returns an Order object
 * @params checkoutInput - Checkout object containing items to be purchased and billing information.
 * @params uuid - Unique uuid for this transaction to prevent duplicate transactions from taking place. Gets included into the "x-acme-request-uuid" header key
 * @params token - Recaptcha token from the client side
 * @params options - option bag parameter.
 * @params browserIpAddress - IP address of the requesting browser for the checkout action. 
 */
export async function performRecaptchaCheckout(
	checkoutInput: CheckoutInputObject,
	uuid: string,
	token: string,
	options: { throwRaw?: boolean } = {},
	browserIpAddress?: string,
) {
	// Destructure optional parameters
	const { throwRaw = false } = options;

	const additionalHeaders = { 
		"x-acme-request-uuid": uuid, 
		"x-acme-browser-ip": browserIpAddress || await getUserIpAddress(),
		"x-acme-captcha-token": token,
	};

	const payload = await performRequest({ url: B2C_CHECKOUT, method: 'post', data: checkoutInput, additionalHeaders, throwRaw }) as Order;
	return payload;
}