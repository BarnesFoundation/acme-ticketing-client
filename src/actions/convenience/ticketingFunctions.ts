import { EventFunctions, MembershipCardFunctions, OrderFunctions, WillCallFunctions } from '../../index';
import { Item } from '../../interfaces/acmeWillCallPayloads';

/** Retrieves the list of todays tickets for a provided membership card id
 * 
 * @param cardId - The id of the membership card to search tickets for
 * @
 */
const getTicketsForMembershipCard = async (cardId: string): Promise<TicketingInformationForMembership[]> => {

	// Get date for last midnight
	const s = new Date();
	s.setHours(0, 0, 0, 0);
	const startTime = s.toISOString();

	// Get date for this midnight
	const e = new Date();
	e.setHours(24, 0, 0, 0);
	const endTime = e.toISOString();

	const ticketingInformation: TicketingInformationForMembership[] = [];

	// Find the email for that card id
	const { email, membershipId } = await MembershipCardFunctions.getMembershipCard(cardId);

	// Find the events going on today
	const events = (await EventFunctions.listEvents({ startTime, endTime })).list;

	for (let i = 0; i < events.length; i++) {

		// Get this event id and find orders for the event
		const { id: eventId } = events[i];
		const orders = await OrderFunctions.listOrdersForEvent(eventId);

		for (let j = 0; j < orders.length; j++) {

			const { email: oEmail, membershipId: oMembershipId, id: orderId, orderNumber } = orders[j];

			if (oEmail && oMembershipId) {

				// If the email listed in the order matches this one, and the membership id's match
				if (email.toLowerCase() === oEmail.toLowerCase() && membershipId === oMembershipId) {

					const { eventItems } = await WillCallFunctions.retrieveOrderInformation(orderId);

					// Have to iterate through the event items, since tickets for multiple different events could have been purchased
					for (let k = 0; k < eventItems.length; k++) {

						const { eventId: iEventId, eventName, eventDate, items } = eventItems[k];

						// If this is the event we want
						if (iEventId === eventId) {
							ticketingInformation.push({ orderId, orderNumber, eventName, eventDate, items });
						}
					}
				}
			}
		}
	}
	return ticketingInformation;
}

interface TicketingInformationForMembership {
	orderId: string,
	orderNumber: string, 
	eventName: string, 
	eventDate: string,
	items: Item[]
}


export const TicketingFunctions = {
	getTicketsForMembershipCard
}