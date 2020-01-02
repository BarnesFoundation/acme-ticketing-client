export interface ListReportsPayload {

	list: Report[],

	pagination: {
		page: number,
		pageSize: number,
		sortDirection: string,
		sortField: string,
		count: number
	}
}

export interface Report {

	id: string,
	name: string,
	description: string,
	displayCollectionName: string,

	queryExpression: QueryExpression,

	customReport: boolean,
	createdOn: string,
	createdBy: string,
	updatedOn: string,
	updatedBy: string,

	dateSettings: any,
	isCurrentUserReportOwner: boolean,
	lastRun: any,
	acmeDefault: boolean
}

export interface QueryExpression {

	collectionName: string,
	findQueries: FindQueries[],
	findFields: FindFields[],
	groupFields: GroupFields[],
	summaryFields: SummaryFields[],
	countFields: CountFields[],
	limit: number


}

export interface FindQueries {
	fieldName: string,
	fieldValue: string,
	operator: string,
}

export interface FindFields {
	fieldName: string,
	include: boolean
}