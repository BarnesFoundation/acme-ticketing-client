import { Images, Event } from './acmeEventPayloads';

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
				displayOrder:number
			},
			discountType: string,
			value: string
		}[]
	}
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