import { performRequest } from './acmeRequestor';
import { LIST_EVENTS, LIST_EVENT_SUMMARIES, GET_EVENT } from '../utils/acmeEndpoints';
import { ListEventSummariesPayload, Event, ListEventsPayload } from '../interfaces/acmeEventPayloads';

/** Object for the Event input parameters to provide. Optional */
interface EventParameters {
	/** ISO8601 date of events you want after this time (optional) */
	startTime?: string,

	/** ISO8601 date of events you want before this time (optional) */
	endTime?: string,

	/** Limit events to those that support the specified sale channel */
	saleChannel?: string,

	/** The id of the event template you want the events for.Only used if there is a startTime(optional) */
	templateId?: string,

	/** One of private, standard or all. If left off or standard then will not return events that were made for private event templates (optional) */
	type?: string
}

/** Returns a list of events that match the applied filters
 @params input - Object containing the input parameters the events should match
 */
async function listEvents(input?: EventParameters): Promise<ListEventsPayload> {

	const payload = await performRequest(LIST_EVENTS, 'get', null, null, input) as ListEventsPayload;
	return payload;
}

/** Object for the Event Summary input parameters to provide. Optional */
interface EventSummaryParameters {
	/** ISO8601 date of events you want after this time (optional) */
	startTime?: string,

	/** ISO8601 date of events you want before this time (optional) */
	endTime?: string,

	/** Limit events to those that support the specified sale channel */
	saleChannel?: string,

	/** One of private, standard or all. If left off or standard then will not return events that were made for private event templates (optional) */
	type?: string
}

/** Returns a list of event summaries that match the applied filters
 * @param input - Object containing the input parameters the event summaries should match
 */
async function listEventSummaries(input?: EventSummaryParameters): Promise<any> {

	const payload = await performRequest(LIST_EVENT_SUMMARIES, 'get', null, null, input) as ListEventSummariesPayload;
	return payload;
}

/** Returns an event object for the specified event id 
 * @param eventId - The id of the event to retrieve
 */
async function getEvent(eventId: string): Promise<Event> {

	const url = `${GET_EVENT}/${eventId}`;

	const payload = await performRequest(url, 'get') as Event;
	return payload;
}

/** Module for the Event Management - Event Instances endpoints. */
export const EventFunctions = {
	listEvents,
	listEventSummaries,
	getEvent
}