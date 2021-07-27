export interface SearchOrdersPayload {
	list: Order[],
	pagination: {
		page: number,
		pageSize: number,
		sortDirection: 'asc' | 'desc',
		sortField: string,
		count: number
	}
};

export interface Order {
	id: string,
	tenantId: number,
	visitorId: string,
	email: string,
	billingEmail: string,
	contactFirstName: string,
	contactLastName: string,
	billingFirstName: string,
	billingLastName: string,
	billingAddress1: string,
	billingCountry: string,
	billingState: string,
	address1: string,
	country: string,
	state: string,
	phoneNumber: string,
	billingPhoneNumber: string,
	orderNumber: string,
	discountedTotalAmount: string,
	totalAmount: string,
	discountedOriginalTotalAmount: string,
	originalTotalAmount: string,
	paidAmount: string,
	balanceAmount: string,
	refundAmount: string,
	saleChannel: string,
	checkInStatus: string,
	creationDate: string,
	paymentDueDate: string,
	orderItems?: OrderItem[], // Appears to only be provided on retrieval of specific order, rather than the result list
	createdOn: string,
	createdBy: string,
	updatedOn: string,
	updatedBy: string,
	legacy: boolean,
	hideEventDate: boolean,
	invoiceAfter: boolean,
	customerId: number,
	obfuscated: boolean,

	membershipId?: number,
	ccLastFourDigits?: string,
	notes?: string,
	ticketDelivery?: string

};

interface OrderItem {
	parentItemId: string,
	comboTemplateType: string,
	eventId: string,
	ticketingTypeId: string,
	eventName: string,
	eventStartTime: number,
	ticketingTypeName: string,
	basicOriginalQuantity: number,
	originalQuantity: number,
	basicQuantity: number,
	quantity: number,
	unitPrice: string,
	discountedUnitPrice: string,
	discountedOriginalAmount: string,
	originalAmount: string,
	discountedAmount: string,
	amount: string,
	balanceAmount: string,
	checkInDate: string,
	checkInQuantity: number,
	itemType: string,
	itemTypeId: string,
	itemTypeName: string,
	conversionStatus: string,
	itemId: string,
	displayName: string
};

export interface IRefundResponse {

	/** A unique id representing this refund transaction. */
	incidentNumber: string | number,

	/** The amount that was refunded. */
	refundAmount: string,

	/** The resulting Order JSON Object after the refund. */
	order: Order,

	/** A list of events refunded. */
	refundedEvents: {

		/** The date that the event was to occur. */
		startDate: string,

		/** The start time of the event. */
		startTime: string,

		/** The name of the event. */
		eventName: string,

		/** The list of items being refunded for this event. */
		refundedItems: {

			/** The name of the ticket type being refunded. */
			ticketType: string,

			/** The price per ticket. */
			pricePerTicket: string,

			/** The number of tickets refunded. */
			refundedCount: number,

			/** The total amount refunded for this event, ticket type combination. */
			totalRefunded: string,
		}[],
	}[],
};

export interface IRebookResponse {

	/** A unique string to identify this rebooking. */
	incidentNumber: string,

	/** A complete order JSON object. */
	order: Order,
};