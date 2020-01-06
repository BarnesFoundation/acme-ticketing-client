export interface CreateSessionPayload {
	roles: string[],
	session: string,
	expireMs: number,
	email: string,
	userName: string,
	tenantId: number,
	firstName: string,
	lastName: string,
	id: number,
	confirmed: boolean,
	onBoarded: boolean,
	title: string,
	tenantTimeZone: string,
	companyName: string
}