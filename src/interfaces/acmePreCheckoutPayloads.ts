export interface IMembershipCheckoutValidationResult {
	expirationDate: "2017-07-06T20:13:29-07:00",
	startDate: "2016-07-06T20:13:29-07:00",
	transactionDate: "2016-07-06T20:13:29-07:00",
	retailPrice: number,
	price: number,
	now: string,
	externalMembership : boolean,
};

export type MembershipPurchaseAction = 'MembershipPurchase';
export type MembershipRenewalAction = 'MembershipRenewal' | 'MembershipRenewalUpgrade' | 'MembershipRenewalDowngrade';
export type MembershipUpgradeAction = 'MembershipUpgrade';
export type MembershipDowngradeAction = 'MembershipDowngrade';
export type MembershipPostTermAction = 'MembershipPostTermRenewal' | 'MembershipPostTermRenewalUpgrade' | 'MembershipPostTermRenewalDowngrade';
export type MembershipRejoinAction = 'MembershipRejoin' | 'MembershipRejoinUpgrade' | 'MembershipRejoinDowngrade';
