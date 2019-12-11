import { performRequest } from '../acmeRequestor';
import { WILLCALL_CHECKIN_EXTERNAL, ORDER_FOR_ORDER_ID, CHECK_IN_TICKETS } from '../../utils/acmeEndpoints';
import { CheckInExternalPayload, OrderPayload, Ticket } from '../../interfaces/acmeWillCallPayloads';


/** Retrieves the order information, including ticketing information for an order id
 * 
 * @param orderId - The id of the order to retrieve
 */
const retrieveOrderInformation = async (orderId: number | string): Promise<OrderPayload> => {

	// Retrieve the entire order so that we have access to all tickets in it
	const url = `${ORDER_FOR_ORDER_ID}/${orderId}`;
	const order = await performRequest({ url, method: 'get' }) as OrderPayload;

	return order;
}

/** Retrieves the id of the order associated with a ticket. Can also return the entire order information for the ticket
 * @param ticketUUID - The UUID of the ticket to grab the order for
*/
async function retrieveAssociatedOrderForTicket(ticketUUID: string): Promise<number>;

/** Retrieves the id of the order associated with a ticket. Optionally, returns the entire order information for the ticket
 * @param ticketUUID - The UUID of the ticket to grab the order for
 * @param getOrderInformation - Whether or not the entire order information should be returned (optional)
 */
async function retrieveAssociatedOrderForTicket(ticketUUID: string, getOrderInformation: true): Promise<OrderPayload>;
async function retrieveAssociatedOrderForTicket(ticketUUID: string, getOrderInformation?: true) {

	const { orderId } = await performRequest({ url: WILLCALL_CHECKIN_EXTERNAL, method: 'post', data: { ticketUUID } }) as CheckInExternalPayload;

	// Retrieve the additional order information if requested
	if (getOrderInformation) {
		const order = await retrieveOrderInformation(orderId); 
		return order;
	}

	return orderId;
}

/** Checks in a list of tickets and returns a list of ticket payloads. 
 * 
 * Checking-in an already checked-in ticket will result in an empty payload returned for that ticket check-in
 * @param ticketUUIDs - A list of ticket UUIDs to check in
 */
const checkInTickets = async (ticketUUIDs: string[]): Promise<Ticket[]> => {

	const checkedInTickets = await performRequest({ url: CHECK_IN_TICKETS, method: 'post', data: { ticketUUIDs } }) as Ticket[];
	return checkedInTickets;
}

export { checkInTickets, retrieveAssociatedOrderForTicket, retrieveOrderInformation }