export interface ListEventsPayload {
	list: Event[]
}

export interface Event {
}

export interface ListEventSummariesPayload {
	list: EventSummary[]
}

export interface EventSummary {
	id: string,
	templateId: string,
	startTime: string,
	endTime: string,
	name: string,
	sold: number, 
	available: number,
	checkedIn: number,
	reserved: number,
	type: string,
	admissionType: string,

	fieldStatus: { [key: string]: { modified: boolean, locked: boolean } }[],
	originalFields: { startTime: string, endTime: string, flexPays: any },
	state: string,
	scheduleName: string,
	customFields: { name: string, value: string }[],

	offSchedule: boolean,
	colorCategory: { backgroundColor: string, textColor: string }
}