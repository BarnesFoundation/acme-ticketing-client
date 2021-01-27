export interface IAddOn {
	id: number,
	tenantId: number,
	name: string,
	description: string,
	sku: string,
	price: string,
	quantity: number,
	type: string,
	displayOrder: number,
	active: boolean,
	createdOn: string,
	updatedOn: string,
	salesChannels: {
		name: string,
		channel: string,
		enabled: boolean
	}[],
	printTicket: boolean
}