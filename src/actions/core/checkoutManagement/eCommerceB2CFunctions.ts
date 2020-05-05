import { performRequest } from '../../acmeRequestor';
import { B2C_CHECKOUT } from '../../../utils/acmeEndpoints';

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
	reservationId: string
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

export async function performCheckout(params) {
	const payload = await performRequest({ url: B2C_CHECKOUT, method: 'post', data: params }) as any;
	return payload;
}