import { EventFunctions, MembershipCardFunctions, OrderFunctions, WillCallFunctions } from '../../../index';
import { OrderPayload } from '../../interfaces/acmeWillCallPayloads';
import { Order } from '../../interfaces/acmeOrderPayloads';


/** Retrieves the list of tickets for a provided membership card id within the provided date range
 * 
 * @param membershipId - The id of the membership to search tickets for
 * @param startDate - The starting date for the range. Defaults to previous midnight if no value is provided (optional)
 * @param endDate - The ending date for the range. Defaults to today's midnight if no value is provided (optional)
 */
const getTicketsForMembership = async (membershipId: string, startDate?: string, endDate?: string): Promise<OrderPayload[]> => {

	let startTime = startDate;
	let endTime = endDate;

	// If no provided start time
	if (!startTime) {
		// Get date for last midnight
		const s = new Date();
		s.setHours(0, 0, 0, 0);
		startTime = s.toISOString();
	}

	// If no provided end time
	if (!endTime) {
		// Get date for this midnight
		const e = new Date();
		e.setHours(24, 0, 0, 0);
		endTime = e.toISOString();
	}

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
		return orders.filter((order) => {
			if (order.membershipId) { return order.membershipId.toString() === membershipId }

		}).length > 0;
	});

	const orderPayloads = (await (ordersListsFilter(ordersForEventsForMember))).reduce((acc: OrderPayload[], op) => {
		acc.push(op);
		return acc;
	}, []);

	return orderPayloads;
}

const ordersListsFilter = async (oe: Order[][]) => {
	const orderPayloadRequests = oe.reduce((acc: Promise<any>[], orders) => {
		orders.map((order) => { acc.push(WillCallFunctions.retrieveOrderInformation(order.id)); });
		return acc;
	}, []);
	return await Promise.all<OrderPayload>(orderPayloadRequests);
}

export { getTicketsForMembership }