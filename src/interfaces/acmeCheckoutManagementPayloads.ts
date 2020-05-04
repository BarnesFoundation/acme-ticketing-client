import { Images, Event, } from './acmeEventPayloads';

export interface EventTemplateSummaryB2C {
	id: string,
	name: string,
	description: string,
	shortDescription: string,
	/** Compare with lowercase if using */
	admissionType: 'generalAdmission' | 'standard'
	startTime: number,
	endTime: number,
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
        ruleSetIds:  string[]
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