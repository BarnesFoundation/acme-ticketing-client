import { performRequest } from '../../acmeRequestor';
import { GET_ORDER, SEARCH_ORDERS, GET_ORDERS_FOR_EVENT, REFUND_ORDER } from '../../../utils/acmeEndpoints';
import { Order, SearchOrdersPayload, IRefundResponse } from '../../../interfaces/acmeOrderPayloads';

/** Returns an order object for the specified order id 
 * @param orderId - The id of the order to retrieve
 */
export async function getOrder(orderId: string): Promise<Order> {

	const url = `${GET_ORDER}/${orderId}`;

	const payload = await performRequest({ url, method: 'get' }) as Order;
	return payload;
}

/** Object for the input parameters to provide. Optional */
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

/** Returns a list of order objects that match the specified input parameters. 
 * @param params - Object containing the input parameters the order should match
 */
export async function listOrders(params?: OrderParameters): Promise<Order[]> {

	const payload = await performRequest({ url: GET_ORDER, method: 'get', params }) as Order[];
	return payload;
}

/** Returns a list of orders object associated with the specified event. 
 * @param eventId - The id of the event you want the list of orders for
 */
export async function listOrdersForEvent(eventId: string): Promise<Order[]> {

	const url = `${GET_ORDERS_FOR_EVENT}/${eventId}`;

	const payload = await performRequest({ url, method: 'get' }) as Order[];
	return payload;
}

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

/** This is not a publicly available API endpoint for Orders. It allows for searching, sorting, and pagination on an orders request.
 * Functions similarly to OrderFunctions.listOrders, but accepts additional sort and pagination params and returns them in a paginated response
 */
export async function searchOrders(params: SearchOrdersParams): Promise<SearchOrdersPayload> {

	const payload = await performRequest({ url: SEARCH_ORDERS, method: 'get', params }) as SearchOrdersPayload;
	return payload;
};

type ReasonCodes = 'Cancelled Event' | 'Miscellaneous';

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

	refundItems?: {
		orderItemId: string,
		quantity: number,
		incidentReasonCode: ReasonCodes,
	}[],
};

/** Performs a full or partial refund of the provided order id and/or order items.
 * 
 * Returns the response for the refund
 * 
 * @param params - Object containing the input parameters the order should match
 */
export async function refundOrder(params: IOrderRefundParams): Promise<IRefundResponse> {

	const payload = await performRequest({
		url: REFUND_ORDER,
		method: 'post',
		params
	}) as IRefundResponse;

	return payload;
};
