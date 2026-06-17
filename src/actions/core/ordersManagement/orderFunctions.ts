import { performRequest } from '../../acmeRequestor';
import {
	GET_ORDER,
	SEARCH_ORDERS,
	GET_ORDERS_FOR_EVENT,
	REFUND_ORDER,
	UPDATE_ORDER,
	REBOOK_ORDER,
} from '../../../utils/acmeEndpoints';
import {
	Order,
	SearchOrdersPayload,
	IRefundResponse,
	IRebookResponse,
} from '../../../interfaces/acmeOrderPayloads';

/** The reason that the rebook is happening. 
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250660-order-rebooking 
 */
type RebookReasonCodes = "Payment" | "Cancelled Event" | "Rebook Event" | "Miscellaneous";

/** The reason for the refund.
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250661-order-refund
 */
type ReasonCodes = 'Cancelled Event' | 'Miscellaneous';

/** B2C Search Object input parameters
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250659-b2c-orders#List-/-Search-Orders
 */
export interface OrderParameters {
	/** The id of the visitor you want the list of orders for (optional) */
	visitorId?: string,
	/** The id of the visitor you want the list of orders for (optional) */
	tempVisitorId?: string,
	/** The email address of the visitor you want the orders for (optional) */
	email?: string,
	/** The phone number of the visitor you want the orders for (optional) */
	phoneNumber?: string
}

/** B2C Order Search parameters
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250659-b2c-orders#List-/-Search-Orders
 */
export interface SearchOrdersParams extends OrderParameters {
	/** Field by which results are sorted */
	sortField?: 'createdOn',
	/** Results sorting direction (“asc” or “desc”) */
	sortDirection?: 'asc' | 'desc',
	/** Page number of the displayed results */
	page?: number,
	/** Number of records included in each page. Recommended to 1000 or less */
	pageSize?: number,
	/** Total number of records returned by this call */
	count?: number
};

/** B2B Rebook order input object
 * https://developers.acmeticketing.com/support/solutions/articles/33000250660-order-rebooking
 */
export interface IOrderRebookParams {
	/** The id of the order being rebooked. */
	orderId: string,
	/** The reason that the rebook is happening. One of (Payment, Cancelled Event, Rebook Event, Miscellaneous). */
	incidentReasonCode?: RebookReasonCodes,
	/** Any notes about the rebooking. */
	notes?: string,
	/** Set to true if you don't want to email the customer about the rebooking. Default is true. */
	noEmail?: boolean,
	/** List of items being rebooked. */
	rebookItems: {
		/** The id of the item being rebooked. */
		orderItemId: string,
		/** The type of item being rebooked, one of (Event, Inventory, Combo, ComboInventory). */
		itemType?: 'Event' | 'Inventory' | 'Combo' | 'ComboInventory' | string,
		/** The id of the item being rebooked. */
		itemTypeId: string,
		/** The name of the item being rebooked. */
		itemTypeName?: string,
		/** The number of items being rebooked. */
		rebookQuantity: number,
		/** The reason that the rebook is happening for this item. One of (Payment, Cancelled Event, Rebook Event, Miscellaneous). */
		incidentReasonCode?: RebookReasonCodes,
		/** The id of the event you are moving these tickets to. */
		rebookToEventId: string,
	}[],
	/** Payment details if payment is due. */
	payment?: {
		/** Type of payment (e.g. CreditCard). Required if payment is due. */
		type?: string;
		/** Credit card number. Required for CC payment. */
		manualEntryCardNumber?: string,
		/** Expiration date of the credit card. Required for CC payment. */
		expDate?: string,
		/** CVC of the credit card. Required for CC payment. */
		cvc?: string,
		address?: {
			/** Street Address 1 for the billing contact. */
			streetAddress1?: string,
			/** Street Address 2 for the billing contact. */
			streetAddress2?: string,
			/** City for the billing contact. */
			city?: string,
			/** State for the billing contact. See Country and State List APIs for valid values. */
			state?: string,
			/** ZIP / Postal Code for the billing contact. */
			zipCode?: string,
			/** Country for the billing contact (e.g. United States). See Country and State List APIs for valid values. */
			country?: string,
		}
		/** Email of the billing contact. Required if sending an email confirmation. */
		contactEmail?: string,
		/** First name of the billing contact. */
		contactFirstName?: string,
		/** Last name of the billing contact. */
		contactLastname?: string,
	},
	billingAddress1?: string,
	billingAddress2?: string,
	billingCity?: string,
	billingState?: string,
	billingCountry?: string,
	billingZip?: string,
	email?: string,
	eventRebookFeeCounts?: {
		eventId: string,
		count: number,
	}[],
	sendEmailToAll?: boolean,
};

/** B2B Order Refund input object
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250661-order-refund
 */
export interface IOrderRefundParams {
	/** The id of the order being refunded or partially refunded */
	orderId: string,
	/** The reason for the refund, one of (Cancelled Event or Miscellaneous). */
	incidentReasonCode: ReasonCodes,
	/** Any notes about the refund. */
	notes?: string,
	/** Set to true if you don't want to send the customer an email about the refund. 
	 * Default is to send the email */
	noEmail?: boolean,
	/** Array of items being refunded. */
	refundItems?: {
		/** Required. The order item id of the item being refunded (e.g. provide the 
		 * id of the ticket for a ticket refund)	 */
		orderItemId: string,
		/** Required. The number of items being refunded. */
		quantity: number,
		/** The reason for refunding this item, one of (Cancelled Event or Miscellaneous). */
		incidentReasonCode: ReasonCodes,
		/** Optional. Array of tickets to refund as comma separated strings. 
		 * Provide the full uuid value of the ticket. The uuid value must be 
		 * accurate in order to refund a specific ticket. If an invalid uuid is 
		 * provided, the system will still refund tickets based on the orderItemId 
		 * and quantity, but the ticket status will not update to Refunded. */
		ticketUUIDs: string[]
	}[],
};

/** B2B Order update parameters
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000253334-order-update#OrderUpdate-Object
 * */
export interface IOrderUpdateParams {
	orderId: string,
	orderItems: {
		orderItemId: string,
		quantity: number
	}[],
};

/** B2B Order Conversion request body
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000314763-convert-tickets-to-membership#Request-Body
 */
export interface ConvertMembershipReqBody {
	/** ID of the existing order containing the tickets to convert. */
	orderId: number,
	/** The ticket order items being converted. */
	orderItems: {
		/** ID of the existing order item (ticket line) being converted. */
		orderItemId: number,
		/** Number of tickets to convert. Must not exceed the available quantity on the order item. */
		quantity: number,
		/** The UUIDs of the specific tickets being converted. Must belong to the specified order item. */
		ticketUUIDs: string[],
	}[],
	/** Payment information for any balance due after the ticket credit is applied. */
	payment: {
		/** Payment method type. Supported values: CREDIT_CARD, POSCreditCard, CASH, CHECK, VOUCHER, OTHER. */
		type: 'CREDIT_CARD' | 'POSCreditCard' | 'CASH' | 'CHECK' | 'VOUCHER' | 'OTHER' | string,
		/** Tokenized card from the ACME payment SDK. Required for CREDIT_CARD. */
		acmeToken?: string,
		/** Token from the payment processor. Required for CREDIT_CARD if acmeToken is not provided. */
		paymentProcessorToken?: string,
		/** Last 4 digits of the card. Required for CREDIT_CARD. */
		ccLastFourDigits?: string,
		/** Card brand. Required for CREDIT_CARD. Supported values: VISA, MASTERCARD, AMEX, DISCOVER, DINERS, JCB, UNIONPAY. */
		creditCardBrand?: 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER' | 'DINERS' | 'JCB' | 'UNIONPAY' | string,
		/** Amount to charge, e.g. {"amount": 5000, "currencyCode": "USD"}. Amount is in cents. */
		chargeAmount?: { amount: number, currencyCode: string },
		/** Cardholder/payer first name. */
		firstName?: string,
		/** Cardholder/payer last name. */
		lastName?: string,
		/** Payer email address. */
		contactEmail?: string,
		/** Payer phone number. */
		phoneNumber?: string,
		/** Check number. Required when type is CHECK. */
		checkNumber?: string,
		/** Check date. Required when type is CHECK. */
		checkDate?: string,
		/** Voucher number. Required when type is VOUCHER. */
		voucherNumber?: string,
		/** Gift card number. Required when type is GIFT_CARD. */
		giftCardNumber?: string,
		/** Encrypted track 1 data. Required for POS swipe/dip (POSCreditCard). */
		encTrack1?: string,
		/** Encrypted track 2 data. Required for POS swipe/dip (POSCreditCard). */
		encTrack2?: string,
		/** Key serial number for POS encryption. Required for POS swipe/dip. */
		ksn?: string,
	},
	/** The target membership level, offering, price point, and cardholder details. */
	membershipInfo: {
		/** Membership level/category ID. */
		membershipCategoryId: string,
		/** Offering ID within the membership category. */
		membershipOfferingId: string,
		/** Price point (person type) ID. */
		pricePointId: string,
		/** Cardholder details. At least one card must have primaryCard: true. */
		membershipCards: {
			/** Full cardholder name. */
			name: string,
			/** First name. */
			firstName: string,
			/** Last name. */
			lastName: string,
			/** Email address. */
			email: string,
			/** Set to true for the primary cardholder. Exactly one card in the array must be primary. */
			primaryCard: boolean,
			/** If sent, the card will be tied to that existing customer. If any other customer details differ from the original, the original customer will be updated. */
			constituentImportId?: string,
			/** Phone number. */
			phoneNumber?: string,
			/** Address line 1. */
			streetAddress1?: string,
			/** Address line 2. */
			streetAddress2?: string,
			/** City. */
			city?: string,
			/** State or province. */
			state?: string,
			/** Postal code. */
			zipCode?: string,
			/** Country code. */
			country?: string,
			/** Supported values: PRIMARY or SECONDARY. */
			cardType?: 'PRIMARY' | 'SECONDARY',
			/** Barcode value. */
			barcode?: string,
			/** Card validity start date (ISO 8601). */
			startDate?: string,
			/** Card expiration date (ISO 8601). */
			expirationDate?: string,
		}[],
		/** Display name of the membership category. */
		membershipCategoryName?: string,
		/** Display name of the membership offering. */
		membershipOfferingName?: string,
		/** Display name of the price point. */
		pricePointName?: string,
		/** Existing membership ID. Leave null for new membership conversions. */
		membershipId?: string | null,
		/** Waive member benefits. Default: false. */
		waiveBenefits?: boolean,
		/** Set to true for a gift membership. Default: false. */
		isGift?: boolean,
		/** Gift giver information. Required when isGift is true. */
		gifterInfo?: unknown,
		/** Notify the gift recipient by email. Default: false. */
		notifyGiftRecipient?: boolean,
		/** Custom gift message. */
		giftMessage?: string,
		/** Optional donation bundled with the membership, e.g. {"amount": 1000, "currencyCode": "USD"}. */
		donationAmount?: { amount: number, currencyCode: string },
		/** Mark the donation as anonymous. Default: false. */
		markDonationAsAnonymous?: boolean,
		/** Auto-renewal setting. Supported values: REQUIRED, OPTIONAL, NONE. */
		autorenewalType?: 'REQUIRED' | 'OPTIONAL' | 'NONE',
		/** Opt the member in to auto-renewal. Only valid when autorenewalType is not NONE. */
		isAutorenew?: boolean,
		/** External membership reference ID. */
		externalMembershipId?: string,
		/** External system reference ID. */
		externalId?: string,
	},
	/** POS terminal ID. Falls back to payment.terminalId if not provided. */
	terminalId?: string,
	/** Responses to any checkout forms associated with the membership offering. */
	checkoutForms?: unknown[],
}
/** Returns an order object for the specified order id 
 * @param orderId - The id of the order to retrieve
 * @returns An order object
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250659-b2c-orders#Get-an-Order
 * @route GET /v2/b2c/orders
 */
export async function getOrder(orderId: string): Promise<Order> {

	const url = `${GET_ORDER}/${orderId}`;

	const payload = await performRequest<Order>({ url, method: 'get' });
	return payload;
}

/** Returns a list of order objects that match the specified input parameters. 
 * @param params - Object containing the input parameters the order should match
 * @returns List of orders
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250659-b2c-orders#List-/-Search-Orders
 * @route GET /v2/b2c/orders
 */
export async function listOrders(params?: OrderParameters): Promise<Order[]> {

	const payload = await performRequest<Order[]>({ url: GET_ORDER, method: 'get', params });
	return payload;
}

/** Returns a list of orders object associated with the specified event. 
 * @param eventId - The id of the event you want the list of orders for
 * @returns List of orders
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250659-b2c-orders#List-Orders-for-an-Event
 * @route GET /v2/b2c/orders/event/{eventId}
 */
export async function listOrdersForEvent(eventId: string): Promise<Order[]> {

	const url = `${GET_ORDERS_FOR_EVENT}/${eventId}`;

	const payload = await performRequest<Order[]>({ url, method: 'get' });
	return payload;
}

/** This is not a publicly available API endpoint for Orders. It allows for searching, sorting, and pagination on an orders request.
 * Functions similarly to OrderFunctions.listOrders, but accepts additional sort and pagination params and returns them in a paginated response
 * 
 * @param params - Object containing the search parameters. At least one is required.
 * @returns Object with a list of Order Objects and pagination details
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250659-b2c-orders#List-/-Search-Orders
 * @route GET /v2/b2c/orders/search
 */
export async function searchOrders(params: SearchOrdersParams): Promise<SearchOrdersPayload> {

	const payload = await performRequest<SearchOrdersPayload>({ url: SEARCH_ORDERS, method: 'get', params });
	return payload;
};


/** Performs a full or partial refund of the provided order id and/or order items.
 * 
 * @param params - Object containing the input parameters for the refund
 * @returns Response for the refund
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250661-order-refund
 * @route POST /v1/b2b/b2b/refunds
 */
export async function refundOrder(params: IOrderRefundParams): Promise<IRefundResponse> {

	const payload = await performRequest<IRefundResponse>({
		url: REFUND_ORDER,
		method: 'post',
		data: params
	});

	return payload;
};

/** Performs an update for the order using the provided input.
 * 
 * Refund:
 * - You can perform a refund by sending a request with the order item(s) to refund to a quantity less than the actual ordered quantity. 
 *   This will result in a refund
 * 
 * Cancellation:
 * - You can perform a cancellation by sending a request with the order item(s) to a quantity of 0.
 *   This will result in an order cancellation
 * 
 * @param params - Object containing the input parameters for the order update
 * @returns Updated order
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000253334-order-update
 * @route POST /v2/orders/update
 */
export async function updateOrder(params: IOrderUpdateParams): Promise<Order> {

	const payload = await performRequest<Order>({
		url: UPDATE_ORDER,
		method: 'post',
		data: params
	});

	return payload;
};


/** Rebooks an order using the provided input.
 * 
 * @param  params - Object containing the input parameters for the order rebook
 * @param  throwRaw - Whether or not to include the raw error logs from ACME API. Defaults to false.
 * @returns Details including updated order and rebooking incident number
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250660-order-rebooking
 * @route POST /v1/b2b/rebook/orders
 */
export async function rebookOrder(params: IOrderRebookParams, throwRaw = false): Promise<IRebookResponse> {

	const payload = await performRequest<IRebookResponse>({
		url: REBOOK_ORDER,
		method: 'post',
		data: params,
		throwRaw,
	});

	return payload;
};



/** Converts existing event ticket order items into a new membership purchase.
 * It allows customers to apply the monetary value of previously purchased tickets
 * toward a new membership, charging only the difference via the provided payment method.
 *
 * @param body - Request body object with the original order details and new 
 * membership selected
 * @returns Updated order
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000314763-convert-tickets-to-membership
 * @route POST /v2/b2b/orders/membership/convert
 */
export async function convertToMembership(body: ConvertMembershipReqBody): Promise<Order> {
	const payload = await performRequest<Order>({
		url: "/v2/b2b/orders/membership/convert",
		method: "post",
		data: body
	})

	return payload;
}
