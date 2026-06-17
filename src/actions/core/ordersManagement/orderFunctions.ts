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
	orderId: string,
	incidentReasonCode?: RebookReasonCodes,
	notes?: string,
	noEmail?: boolean,
	rebookItems: {
		orderItemId: string,
		itemType?: 'Event' | 'Inventory' | 'Combo' | 'ComboInventory' | string,
		itemTypeId: string,
		itemTypeName?: string,
		rebookQuantity: number,
		incidentReasonCode?: RebookReasonCodes,
		rebookToEventId: string,
	}[],
	payment?: {
		type?: string;
		/** The credit card number as a string	 */
		manualEntryCardNumber?: string,
		/** The credit card cvc number as a string */
		cvc?: string,
		/** MMyy format of the expiration date of the credit card */
		expDate?: string,
		address?: {
			streetAddress1?: string,
			streetAddress2?: string,
			city?: string,
			state?: string,
			zipCode?: string,
			country?: string,
		}
		contactEmail?: string,
		contactFirstName?: string,
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

/** Returns an order object for the specified order id 
 * @param orderId - The id of the order to retrieve
 * @returns An order object
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250659-b2c-orders#Get-an-Order
 * @endpoint /v2/b2c/orders
 */
export async function getOrder(orderId: string): Promise<Order> {

	const url = `${GET_ORDER}/${orderId}`;

	const payload = await performRequest({ url, method: 'get' }) as Order;
	return payload;
}

/** Returns a list of order objects that match the specified input parameters. 
 * @param params - Object containing the input parameters the order should match
 * @returns List of orders
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250659-b2c-orders#List-/-Search-Orders
 * @endpoint GET /v2/b2c/orders
 */
export async function listOrders(params?: OrderParameters): Promise<Order[]> {

	const payload = await performRequest({ url: GET_ORDER, method: 'get', params }) as Order[];
	return payload;
}

/** Returns a list of orders object associated with the specified event. 
 * @param eventId - The id of the event you want the list of orders for
 * @returns List of orders
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250659-b2c-orders#List-Orders-for-an-Event
 * @endpoint GET /v2/b2c/orders/event/{eventId}
 */
export async function listOrdersForEvent(eventId: string): Promise<Order[]> {

	const url = `${GET_ORDERS_FOR_EVENT}/${eventId}`;

	const payload = await performRequest({ url, method: 'get' }) as Order[];
	return payload;
}

/** This is not a publicly available API endpoint for Orders. It allows for searching, sorting, and pagination on an orders request.
 * Functions similarly to OrderFunctions.listOrders, but accepts additional sort and pagination params and returns them in a paginated response
 * 
 * @param params - Object containing the search parameters. At least one is required.
 * @returns Object with a list of Order Objects and pagination details
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250659-b2c-orders#List-/-Search-Orders
 * @endpoint GET /v2/b2c/orders/search
 */
export async function searchOrders(params: SearchOrdersParams): Promise<SearchOrdersPayload> {

	const payload = await performRequest({ url: SEARCH_ORDERS, method: 'get', params }) as SearchOrdersPayload;
	return payload;
};


/** Performs a full or partial refund of the provided order id and/or order items.
 * 
 * @param params - Object containing the input parameters for the refund
 * @returns Response for the refund
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250661-order-refund
 * @endpoint POST /v1/b2b/b2b/refunds
 */
export async function refundOrder(params: IOrderRefundParams): Promise<IRefundResponse> {

	const payload = await performRequest({
		url: REFUND_ORDER,
		method: 'post',
		data: params
	}) as IRefundResponse;

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
 * @endpoint POST /v2/orders/update
 */
export async function updateOrder(params: IOrderUpdateParams): Promise<Order> {

	const payload = await performRequest({
		url: UPDATE_ORDER,
		method: 'post',
		data: params
	}) as Order;

	return payload;
};


/** Rebooks an order using the provided input.
 * 
 * @param  params - Object containing the input parameters for the order rebook
 * @param  throwRaw - Whether or not to include the raw error logs from ACME API. Defaults to false.
 * @returns Details including updated order and rebooking incident number
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250660-order-rebooking
 * @endpoint POST /v1/b2b/rebook/orders
 */
export async function rebookOrder(params: IOrderRebookParams, throwRaw = false): Promise<IRebookResponse> {

	const payload = await performRequest({
		url: REBOOK_ORDER,
		method: 'post',
		data: params,
		throwRaw,
	}) as IRebookResponse;

	return payload;
};
