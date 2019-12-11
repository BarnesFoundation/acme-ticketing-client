export interface CheckInExternalPayload {
	checkInStatus: number,
	orderId: number,
	minutesBefore: number,
	minutesAfter: number
	checkInDate?: string
}

export interface OrderPayload {
	orderId: string,
	email: string,
	billingEmail: string,
	contactFirstName: string,
	contactLastName: string,
	billingFirstName: string,
	billingLastName: string,
	phoneNumber: string,
	billingPhoneNumber: string,
	orderNumber: string

	eventItems: EventItem[],

	createdOn: string,
	checkInStatus: string,
	legacy: boolean,
	saleChannel: string,
	membershipId: string,
	refundStatus: string,
	orderBalanace: string,
	invoiceAfter: boolean,
	customerId: number,
	paymentMethod: number
}

export interface EventItem {
	eventId: string,
	eventName: string,
	eventTemplateId: string,
	admissionType: string,
	eventDate: string,

	items: Item[],

	ticketDetails: EventTicketDetails,

	state: string,
	hasForm: boolean,
	hasResources: boolean
}

export interface Item {
	orderItemId: string,
	itemType: string,
	itemTypeId: string,
	itemTypeName: string,
	ticketTypeId: string,
	ticketTypeName: string,
	quantity: number,
	unitPrice: string,
	discountedUnitPrice: string,
	subtotal: string,
	discountedSubtotal: string,
	checkInDate: string,
	checkInQuantity: number,

	tickets: Ticket[],

	comboTemplateType: string,
	conversionStatus: string
}

export interface Ticket {
	id: string,
	tenantId: number,
	uuid: string,
	ticketTypeId: string,
	eventId: string,
	checkInDate?: string,
	firstName: string,
	lastName: string,
	email: string,
	phoneNumber: string,
	ticketStatus: string,
	printed: boolean,
	conversionStatus: string,
	ticketDetails?: TicketDetails[]
}

export interface TicketDetails {
	ticketId: string,
	orderId: string,
	eventId: string,
	orderItemId: string,
	quantity: number,
	tenantId: number
}

export interface EventTicketDetails {

}