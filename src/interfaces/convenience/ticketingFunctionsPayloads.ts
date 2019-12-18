import { Item,  } from '../acmeWillCallPayloads';

export interface TicketingInformation {
	orderId: string,
	orderNumber: string,
	eventName: string,
	eventId: string,
	eventDate: string,
	items: Item[]
}