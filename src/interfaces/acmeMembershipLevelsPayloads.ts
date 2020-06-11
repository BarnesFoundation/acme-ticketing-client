
export interface MembershipLevelsList {
	list: MembershipLevelObject[],

	pagination: {
		page: number,
		pageSize: number,
		sortDirection: string,
		sortField: string,
		count: number
	}
}

export interface MembershipLevelObject {
	id: string,
	name: string,
	description: string,
	rules: {
		numberOfCardHolders: number,
		canGift: boolean,
		startBeginningOfMonth: boolean,
		expireEndOfMonth: boolean
	},
	benefits: { description: string }[],
	offerings: MembershipOfferingObject[],
	salesChannels: { name: string, channel: string, enabled: boolean }[],
	state: string,
	membershipLevelGroup: 'individualAndFamily' | 'organization',
	displayOrder: number,
	subtitle: string,
	auxiliary: boolean
}

export interface MembershipOfferingObject {
	id: string,
	name: string,
	subtitle: string,
	description: string,
	duration: number,

	benefits: any[],
	rules: { numberOfCardHolders: number, canGift: boolean, startBeginningOfMonth: boolean, expireEndOfMonth: boolean }

	priceLists: any[],
	actions: any[],

	externalMembershipPriceRequired: boolean,
}