import { EventFunctions, MembershipCardFunctions, OrderFunctions, WillCallFunctions } from '../../../index';
import { OrderPayload } from '../../interfaces/acmeWillCallPayloads';
import { Order } from '../../interfaces/acmeOrderPayloads';
import { TicketingInformation } from '../../interfaces/convenience/ticketingFunctionsPayloads';


/** Retrieves the list of todays tickets for a provided membership card id
 * 
 * @param cardId - The id of the membership card to search tickets for
 * @
 */
const getTicketsForMembershipCard = async (cardId: string): Promise<TicketingInformation[]> => {

	// Get date for last midnight
	const s = new Date();
	s.setHours(0, 0, 0, 0);
	const startTime = s.toISOString();

	// Get date for this midnight
	const e = new Date();
	e.setHours(24, 0, 0, 0);
	const endTime = e.toISOString();

	// Find the email for that card id
	const { email, membershipId } = await MembershipCardFunctions.getMembershipCard(cardId);

	// Find the events going on today
	const events = (await EventFunctions.listEvents({ startTime, endTime })).list;

	// Orders for the events
	const ordersForEventsRequests = [];

	for (let i = 0; i < events.length; i++) {

		// Get this event id and add to promises list
		const { id: eventId } = events[i];
		ordersForEventsRequests.push(OrderFunctions.listOrdersForEvent(eventId));
	}

	// Get the orders for the events that are for this member
	const ordersForEventsForMember = (await Promise.all<Order[]>(ordersForEventsRequests)).filter((orders) => {
		return orders.filter((order) => { return order.membershipId === membershipId }).length > 0;
	});

	const ticketInformation = (await (ordersListsFilter(ordersForEventsForMember))).reduce((acc: TicketingInformation[] , op) => {

		const { orderId, orderNumber, eventItems } = op;
		eventItems.map((eventItem) => {
			const { eventId, eventName, eventDate, items } = eventItem;
			acc.push({ orderId, orderNumber, eventId, eventName, eventDate, items });
		});
		return acc;
	}, []);

	return ticketInformation;
}

const ordersListsFilter = async (oe: Order[][]) => {
	const orderPayloadRequests = oe.reduce((acc: Promise<any>[], orders) => {
		orders.map((order) => { acc.push(WillCallFunctions.retrieveOrderInformation(order.id)); });
		return acc;
	}, []);
	return await Promise.all<OrderPayload>(orderPayloadRequests);
}

export { getTicketsForMembershipCard }