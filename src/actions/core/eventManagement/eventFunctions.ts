import { performRequest } from '../../acmeRequestor';
import { LIST_EVENTS, LIST_EVENT_SUMMARIES, GET_EVENT } from '../../../utils/acmeEndpoints';
import { ListEventSummariesPayload, Event, ListEventsPayload } from '../../../interfaces/acmeEventPayloads';

/** Object for the Event input parameters to provide. Optional */
export interface EventParameters {
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
 @params params - Object containing the input parameters the events should match
 */
async function listEvents(params?: EventParameters): Promise<ListEventsPayload> {

	const payload = await performRequest({ url: LIST_EVENTS, method: 'get', params }) as ListEventsPayload;
	return payload;
}

/** Object for the Event Summary input parameters to provide. Optional */
export interface EventSummaryParameters {
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
 * @param params - Object containing the input parameters the event summaries should match
 */
async function listEventSummaries(params?: EventSummaryParameters): Promise<ListEventSummariesPayload> {

	const payload = await performRequest({ url: LIST_EVENT_SUMMARIES, method: 'get', params }) as ListEventSummariesPayload;
	return payload;
}

/** Returns an event object for the specified event id 
 * @param eventId - The id of the event to retrieve
 */
async function getEvent(eventId: string): Promise<Event> {

	const url = `${GET_EVENT}/${eventId}`;

	const payload = await performRequest({ url, method: 'get' }) as Event;
	return payload;
}

/** Allows for updating the definition of an existing event 
 *  @param event - The event object containing the fields to write to the existing event
 **/
async function updateEvent(eventPayload: Event) {
	
	const payload = await performRequest({ url: GET_EVENT, data: eventPayload, method: 'post' }) as Event;
	return payload;
};

export { getEvent, listEvents, listEventSummaries, updateEvent };