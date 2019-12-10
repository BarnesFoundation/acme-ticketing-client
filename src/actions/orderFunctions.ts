import { performRequest } from './acmeRequestor';
import { GET_ORDER, GET_ORDERS_FOR_EVENT } from '../utils/acmeEndpoints';
import { Order } from '../interfaces/acmeOrderPayloads';


/** Returns an order object for the specified order id 
 * @param orderId - The id of the order to retrieve
 */
async function getOrder(orderId: string): Promise<Order> {

	const url = `${GET_ORDER}/${orderId}`;

	const payload = await performRequest(url, 'get') as Order;
	return payload;
}

/** Object for the input parameters to provide. Optional */
interface InputParameters {
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
 * @param inputParameters - Object containing the input parameters the order should match
 */
async function listOrders(inputParameters?: InputParameters): Promise<Order[]> {

	const payload = await performRequest(GET_ORDER, 'get', null, null, inputParameters) as Order[];
	return payload;
}

/** Returns a list of orders object associated with the specified event. 
 * @param eventId - The id of the event you want the list of orders for
 */
async function listOrdersForEvent(eventId: string): Promise<Order[]> {

	const url = `${GET_ORDERS_FOR_EVENT}/${eventId}`;

	const payload = await performRequest(url, 'get') as Order[];
	return payload;
}

/** Module for the Orders Management - Orders endpoints. 
 * When utilizing this module, your ACME client config object **must** have the `b2cTenantId` value set. Otherwise, calls to methods belonging to this module will fail. */
export const OrderFunctions = {
	getOrder,
	listOrders,
	listOrdersForEvent
}