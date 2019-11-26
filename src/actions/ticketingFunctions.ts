import { performRequest } from './acmeRequestor';
import { WILLCALL_CHECKIN_EXTERNAL, ORDER_FOR_ORDER_ID, CHECK_IN_TICKETS } from '../utils/acmeEndpoints';
import { CheckInExternalPayload, OrderPayload, Ticket } from '../interfaces/acmeTicketingPayloads';

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

	const { orderId } = await performRequest(WILLCALL_CHECKIN_EXTERNAL, 'post', null, { ticketUUID }) as CheckInExternalPayload;

	// Retrieve the additional order information if requested
	if (getOrderInformation) {

		// Retrieve the entire order so that we have access to all tickets in it
		const orderUrl = `${ORDER_FOR_ORDER_ID}/${orderId}`;
		const order = await performRequest(orderUrl, 'get') as OrderPayload;

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

	const checkedInTickets = await performRequest(CHECK_IN_TICKETS, 'post', null, { ticketUUIDs }) as Ticket[];
	return checkedInTickets;
}


export const TicketingFunctions = {
	retrieveAssociatedOrderForTicket,
	checkInTickets
}