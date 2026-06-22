/** Object with a list of B2C Order Objects and pagination details
 * https://developers.acmeticketing.com/support/solutions/articles/33000250659-b2c-orders#List-/-Search-Orders
 */
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

/** B2C Order object
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250659-b2c-orders#Order-Object 
 */
export interface Order {
	/** The unique ID of the order object. Read only. */
	id: string,
	/** The id of the tenant the order was created for. */
	tenantId: number,
	/** @internal Internal ACME field — do not use. */
	visitorId: string,
	/** The email address of the customer. */
	email: string,
	billingEmail: string,
	/** The first name of the customer. */
	contactFirstName: string,
	/** The last name of the customer. */
	contactLastName: string,
	billingFirstName: string,
	billingLastName: string,
	billingAddress1: string,
	billingCountry: string,
	billingState: string,
	address1: string,
	country: string,
	state: string,
	/** The phone number of the customer. */
	phoneNumber: string,
	billingPhoneNumber: string,
	/** The order number of the order. */
	orderNumber: string,
	/** The total discounted amount for this order. */
	discountedTotalAmount: string,
	totalAmount: string,
	discountedOriginalTotalAmount: string,
	originalTotalAmount: string,
	paidAmount: string,
	balanceAmount: string,
	refundAmount: string,
	/** The sale channel used to place the order. One of: online, pointOfSale, reseller, customerRep, manualEntry, insideSalesIndividual. */
	saleChannel: string,
	/** The check-in status of the order. One of: NotCheckedIn, CheckedIn, PartiallyCheckedIn. */
	checkInStatus: string,
	creationDate: string,
	paymentDueDate: string,
	/** List of items in the order — the components that make up the order (e.g. tickets). Only provided on retrieval of a specific order, not in list results. */
	orderItems?: OrderItem[],
	/** The date the order was created. */
	createdOn: string,
	/** The id of the user that created the order. */
	createdBy: string,
	/** The date that the order was last modified. */
	updatedOn: string,
	/** The id of the user who last modified the order. */
	updatedBy: string,
	/** True for imported legacy orders from other systems, otherwise false. */
	legacy: boolean,
	/** Whether to hide dates on the tickets. Default is false. */
	hideEventDate: boolean,
	invoiceAfter: boolean,
	customerId: number,
	obfuscated: boolean,
	/** The membershipId used during order checkout. */
	membershipId?: number,
	/** The last four digits of the card used during checkout. */
	ccLastFourDigits?: string,
	/** Notes about the order. */
	notes?: string,
	/** How the tickets will be delivered. One of: print, willCall. */
	ticketDelivery?: string

};

/** B2C Order Item Object
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250659-b2c-orders#Order-Object 
 */
interface OrderItem {
	/** Unique id of the order item. Read only. */
	itemId: string,
	parentItemId: string,
	/** Type of combo that this item is part of. One of: fixedPrice, discountCode. */
	comboTemplateType: string,
	/** The id of the event that this order item is for. */
	eventId: string,
	/** The name of the event. */
	eventName: string,
	/** The time that the event starts. */
	eventStartTime: number,
	/** The id of the ticket type. */
	ticketingTypeId: string,
	/** The name of the ticket type (e.g. 'Child', 'Adult'). */
	ticketingTypeName: string,
	basicOriginalQuantity: number,
	/** The original number of items. */
	originalQuantity: number,
	basicQuantity: number,
	/** The current number of items. */
	quantity: number,
	/** The price for each item. */
	unitPrice: string,
	/** The discounted unit price. */
	discountedUnitPrice: string,
	discountedOriginalAmount: string,
	originalAmount: string,
	/** The amount of the discounted price of the items for the purchased quantity. */
	discountedAmount: string,
	/** The total amount (quantity × unit price). */
	amount: string,
	balanceAmount: string,
	/** The date that the visitors checked in. */
	checkInDate: string,
	/** The number of items that have checked in. */
	checkInQuantity: number,
	/** The type of order item. One of: event, inventory, comboEvent, comboInventory. */
	itemType: string,
	itemTypeId: string,
	itemTypeName: string,
	conversionStatus: string,
	displayName: string
};

/** B2B Oder Refund result object
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250661-order-refund
 */
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

/** B2B Rebook Order Response
 * 
 * https://developers.acmeticketing.com/support/solutions/articles/33000250660-order-rebooking
 */
export interface IRebookResponse {
	/** A unique string to identify this rebooking. */
	incidentNumber: string,
	/** A complete order JSON object. */
	order: Order,
};