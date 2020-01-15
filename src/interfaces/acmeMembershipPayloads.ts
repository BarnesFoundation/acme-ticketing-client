export interface GetMembershipPayload {
	id: number,
	importId: string,
	program: string,
	category: string,
	membershipTypeId: number,
	externalMembershipId: string,
	membershipJoinedDate: string,
	membershipStartDate: string,
	membershipExpirationDate: string,
	membershipStanding: string,

	cardholders: Cardholder[],

	entitlements: {
		id: number
		importId: string
		benefit: string
		memberId: number
		count: number,
		comment: string
	}[],
	membershipCategory: string,
	categoryId: string,
	orgImportId: string,
	acmeMembershipNumber: string,
	isGift: boolean,
	auxiliaryMembership: boolean,
	offeringName: string,
	offeringId: string
}

interface Cardholder {
	id: number,
	visitorId: number,
	membershipId: number,
	constituentImportId: string,
	constituentId: string,
	cardImportId: string,
	cardType: string,
	name: string,
	barcode: string,
	acmeBarcode: string,
	email: string,
	firstName: string,
	lastName: string,
	phoneNumber: string,
	streetAddress1: string,
	city: string,
	state: string,
	zipCode: string,
	country: string,
	deceased: string,
	primaryCard: string,
	solicitationCodes: string,
	startDate: string,
	expirationDate: string,
	cardStatus: string,
	printCount: number,
	printStatus: string,
	acmeCustomerNumber: string,
	addressId: number,
	excludeCardOnMemberCreation: boolean,
	customerId: number,
	ignoreUpdates: boolean
}