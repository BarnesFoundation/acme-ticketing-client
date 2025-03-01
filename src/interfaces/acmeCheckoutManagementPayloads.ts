import { Images, Event, } from './acmeEventPayloads';

export interface EventTemplateSummaryB2C {
	id: string,
	name: string,
	description: string,
	shortDescription: string,
	/** Compare with lowercase if using */
	admissionType: 'generalAdmission' | 'standard'
	startTime: string,
	endTime: string,
	priceLists: any,
	soldQuantity: number,
	ratings: number,
	stars: number,
	/** Compare with lowercase if using */
	type: 'standard' | 'private',
	emailConfirmationMessage: string,
	summary: string,
	images: Images[],
	membership: {
		discounts: Discounts
		restrictions: any
	},
	thirdPartyEvent: boolean,
	lastPublished: number,
	lastUpdated: number,
	displayOrder: number,
	schedules: { id: string, name: string }[],
	available: boolean,
	discountAvailable: boolean
}

interface Discounts {
	category: {
		id: string,
		name: string
	},
	maxTickets: number,
	discount: {
		id: string,
		code: string,
		name: string,
		description: string,
		values: {
			personTypeId: string,
			personType: {
				id: string,
				name: string,
				description: string,
				active: boolean,
				displayOrder: number
			},
			discountType: string,
			value: string
		}[]
	}
}

export interface BucketedEventTimeObject {
	eventTemplateId: string,
	times: EventTimeObject[]
}

export interface EventTimeObject {
	id: string,
	date: string,
	time: string,
	availableSeats: number,
	startTime: string,
	addOns: any,
	event: Event
}

export interface EventTemplateActivityCalendar {
	days: {
		date: string,
		name: string,
		active: boolean
	}[]
}

export interface EventTemplateB2C {
	id: string,
	type: string,
	admissionType: string,
	name: string,
	description: string,
	shortDescription: string,
	emailConfirmationMessage: string,
	startTime: string,
	endTime: string,
	priceList: Event["priceList"],
	images: Event["images"]
	reviewState: string,
	ticketDetails: Event["ticketDetails"]
	addOns: any,
	soldQuantity: number,
	membership: {
		restrictions: any[],
		discounts: any[]
	},
	rebookingFee: string,
	customFields: Event["customFields"],
	thirdPartyEvent: boolean,
	thirdPartyPercentage: string,
	emailCancellationMessage: string,
	ruleSets: {
		associated: boolean,
		ruleSetIds: string[]
	},
	colorCategory: Event["colorCategory"],
	entitlementConfiguration: {
		id: string,
		eventTemplateId: string,
		salesRuleSetId: string,
		name: string,
		entitlementConfig: any[],
		salesRuleConfig: any[]
	},
	memberOnlyEvent: boolean,
	allMembersCanPurchase: boolean,
	displayOrder: number,
	stars: number,
	ratings: number,
	lastPublished: string,
	lastUpdated: string,
	scheuldes: any[],
	available: boolean,
	discountAvailable: boolean
}

export interface EntitlementValidationPayload {
	valid: boolean,
	messages: string[],
	results: {
		allowedQuantity: number,
		purchasedQuantity: number,
		requestedQuantity: number,
		valid: boolean,
		ruleSetId: string,
		rulesApplied: {
			id: string,
			valid: boolean,
			message: string,
			messageCode: string
		}[],
		items: any[],
		membershipId: number,
		membershipLevelId: string,
		timeFrame: string,
		pricepointIds: string[],
		ruleType: string,
		validatedPricePointIds: any[],
		reason: string
	}[
	],
	violations: {
		eventId: string,
		pricePointId: string,
		allowedQuantity: number,
		purchasedQuantity: number,
		requestedQuantity: number,
		timeFrame: string,
		pricePoints: string[],
		ruleType: string,
		validatedPricePointIds: string[],
		validatedPricePoints: string[],
		reason: string,
		pricePointIds: string[]
	}[],
	passed: any[]
}

export interface ShoppingCartObject {
	id?: string,
	tempVisitorId?: string,
	tenantId?: string | number,
	membershipId?: number | string,
	membershipIds?: number[] | string[],
	items?: any[],
	forms?: any[],
	comboItems?: any[],
	verifyEntitlements?: boolean,
	reservationId?: string,
	salesChannel?: 'online' | 'pointOfSale' | 'insideSalesIndividual' | 'customerRep'
}

type PaymentMethod = 'Cash' | 'Credit Card' | 'Voucher' | 'Check';

export interface CheckoutInputObject {
	/** Id of the shopping cart. Provide this or `shoppingCart`. Do not provide both */
	shoppingCartId?: string,

	shoppingCart?: ShoppingCartObject,
	/** Email address of the customer.	 */
	contactEmail?: string,
	email?: string,
	/** Phone number of the customer. */
	phoneNumber?: string,
	/** First name of the customer. */
	contactFirstName: string,
	/** Last name of the customer. */
	contactLastName: string,
	address1?: string,
	address2?: string,
	city?: string,
	state?: string,
	country?: string,
	/** Zip code of the customer. */
	zipCode?: string
	/** Last four digits of the credit card */
	ccLastFourDigits?: string
	/** Type of credit card. One of Visa, MasterCard, AmericanExpress, Discover or Jcb */
	creditCardBrand?: 'Visa' | 'MasterCard' | 'AmericanExpress' | 'Discover' | 'Jcb',
	/** The credit card number as a string	 */
	manualEntryCardNumber?: string,
	/** The credit card cvc number as a string */
	cvc?: string,
	/** MMyy format of the expiration date of the credit card */
	expDate?: string,
	/** Id of the payment such as Check # or Voucher # */
	paymentId?: string,
	/** Notes about the order */
	notes?: string
	billingFirstName?: string
	billingLastName?: string,
	billingEmail?: string,
	billingPhoneNumber?: string,
	billingAddress1?: string,
	billingAddress2?: string,
	billingCountry?: string,
	billingCity?: string,
	billingZipCode?: string,
	billingState?: string,
	memberships?: {
		/** Type of membership operation such as MembershipPurchase, MembershipRenewal, MembershipUpgrade, MembershipDowngrade, MembershipCancel, MembershipPostTermRenewal, MembershipRejoin, MembershipRenewalUpgrade, MembershipPostTermRenewalUpgrade, MembershipRejoinUpgrade, MembershipPostTermRenewalDowngrade MembershipRejoinDowngrade, MembershipRenewalDowngrade, MembershipPurchaseConversion, MembershipReplacement */
		itemType: string,
		/** Membership Info object */
		membershipInfo?: any
	}[],
	/** The coupon code used for this order. */
	couponCode?: string,
	paymentMethod?: PaymentMethod,
	chargeAmount?: string
}

/** Seems to differ a bit from the stand Checkout Input. In the future, this may be consolidated with CheckoutInputObject
 * See https://developers.acmeticketing.com/support/solutions/articles/33000250715-kiosk-checkout
 */
export interface KioskCheckoutInputObject {
	email: string;
	contactFirstName: string;
	contactLastName: string;
	phoneNumber: string;
	zipCode: string;
	subscribeToNewsletter: boolean;
	shoppingCart: {
	  items: {
		ticketingTypeId: string;
		eventName: string,
		eventId: string,
		quantity: number,
		itemType: string,
	}[];
	  verifyEntitlements: boolean;
	};
  
	terminalId: string;
	chargeAmount: string;
};