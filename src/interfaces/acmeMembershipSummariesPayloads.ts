export interface GetMembershipSummariesPayload {
	list: MembershipSummary[]
}

interface MembershipSummary {
	id: number,
	membershipId: number,
	cardType: string,
	categoryId: string,
	offeringId: string,
	name: string,
	barcode: string,
	acmeBarcode: string,
	primaryCard: boolean,
	program: string,
	category: string,
	membershipTypeId: number,
	externalMembershipId: string,
	membershipJoinedDate: string,
	membershipStartDate: string,
	membershipExpirationDate: string,
	membershipStanding: string,
	membershipCategory: string,
	cardholderAttributes: any[],
	acmeMembershipNumber: string,
	cardStartDate: string,
	cardExpirationDate: string,
	cardStanding: string,
	auxiliary: boolean
}