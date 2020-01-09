export interface ListReportDefinitionsPayload {

	list: ReportDefinition[],

	pagination: {
		page: number,
		pageSize: number,
		sortDirection: string,
		sortField: string,
		count: number
	}
}

export interface ReportDefinition {

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

	dateSettings: DateSettings,
	isCurrentUserReportOwner: boolean,
	lastRun: LastRun,
	acmeDefault: boolean
}

export interface QueryExpression {

	collectionName: string,
	findQueries?: FindQuery[],
	findFields?: FindField[],
	groupFields?: GroupField[],
	summaryFields?: SummaryField[],
	countFields?: CountField[],
	limit: number
}

export interface FindQuery {
	fieldName: string,
	fieldValue: string,
	operator: "equals" |"less than" | "greater than" | "contains",
}

export interface FindField {
	fieldName: string,
	include: boolean
}

export interface GroupField {
	fieldName: string,
	groupFunction: "day" | "week" | "month" | "year"
}

export interface SummaryField {
	fieldName: string,
	summaryFunction: "sum" | "average" | "maximum" | "minimum"
}

export interface CountField {
	fieldName: string,
	countFunction: string
}

interface DateSettings {
	dateRangeField: string,
	datePreset: string
}

interface LastRun {
	id: number,
	tenantId: number,
	reportUuid: string,
	status: string,
	queryExpression: QueryExpression,
	dateRangeField: string,
	startDate: string,
	endDate: string,
	filterByOwner: boolean,
	createdOn: number,
	createdBy: string,
	updatedOn: number,
	reportName: string,
}

export interface ReportExecution {
	id: number,
    tenantId: number,
    reportUuid: string,
	status: "Pending" | "Completed",
	queryExpression: QueryExpression,
	dateRangeField: string,
    startDate: string,
    endDate: string,
    filterByOwner: boolean,
    createdOn: number,
    createdBy: string,
    updatedOn: number,
    reportName: string
}
