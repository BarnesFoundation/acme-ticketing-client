import { performRequest } from './acmeRequestor';
import { LIST_EVENTS, LIST_EVENT_SUMMARIES } from '../utils/acmeEndpoints';
import { ListEventSummariesPayload } from '../interfaces/acmeEventPayloads';

/** Returns a list of event instances that match the applied filters
 * @param startTime - ISO8601 date of events you want after this time (optional)
 * @param endTime - ISO8601 date of events you want before this time (optional)
 * @param saleChannel - Limit events to those that support the specified sale channel
 * @param templateId - The id of the event template you want the events for.  Only used if there is a startTime (optional)
 * @param type - One of private, standard or all.  If left off or standard then will not return events that were made for private event templates (optional)
 */
async function listEvents(startTime?: string, endTime?: string, saleChannel?: string, templateId?: string, type?: string): Promise<any> {

	let params = {};

	// Add params as necessary
	startTime && (params = { ...params, startTime });
	endTime && (params = { ...params, endTime });
	saleChannel && (params = { ...params, saleChannel });
	templateId && (params = { ...params, templateId });
	type && (params = { ...params, type });

	const events = await performRequest(LIST_EVENTS, 'get', null, null, params);
	return events;
}

/** Returns a list of event summaries that match the applied filters
 * @param startTime - ISO8601 date of events you want after this time (optional)
 * @param endTime - ISO8601 date of events you want before this time (optional)
 * @param saleChannel - Limit events to those that support the specified sale channel
 * @param type - One of private, standard or all.  If left off or standard then will not return events that were made for private event templates (optional)
 */
async function listEventSummaries(startTime?: string, endTime?: string, saleChannel?: string, type?: string): Promise<any> {

	let params = {};

	// Add params as necessary
	startTime && (params = { ...params, startTime });
	endTime && (params = { ...params, endTime });
	saleChannel && (params = { ...params, saleChannel });
	type && (params = { ...params, type });

	const events = await performRequest(LIST_EVENT_SUMMARIES, 'get', null, null, params) as ListEventSummariesPayload;
	return events;
}

export const EventFunctions = {
	listEvents,
	listEventSummaries
}