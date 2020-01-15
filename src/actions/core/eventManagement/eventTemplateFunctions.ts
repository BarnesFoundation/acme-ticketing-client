import { performRequest } from '../../acmeRequestor';
import { LIST_EVENT_TEMPLATES, LIST_EVENT_TEMPLATES_SUMMARIES, GET_EVENT_TEMPLATE } from '../../../utils/acmeEndpoints';
import { EventTemplateSummariesPayload } from '../../../interfaces/acmeEventPayloads';

/** Object for the Event input parameters to provide. Optional */
export interface EventTemplateParameters {

	/** ISO8601 date string. Only return templates that were running after this time period. Event Templates could have started before this time but ended after the start time. (optional) */
	startTime?: string,

	/** ISO8601 date string. Only returns template that that were running before this time period.  Event Templates could have ended after this time but started before this time. (optional) */
	endTime?: string,

	/** One of private, standard or all. If left off or not present then private templates will not be returned. (optional) */
	type?: string
}


/** List all event templates
 * @params params - Object containing the input parameters the event templates should match (optional)
 */
export async function listEventTemplates(params?: EventTemplateParameters) {

	const payload = await performRequest({ url: LIST_EVENT_TEMPLATES, method: 'get', params });
	return payload;
}

/** List all event template summaries 
 * @params params - Object containing the input parameters the event templates summaries should match (optional)
*/
export async function listEventTemplatesSummaries(params?: EventTemplateParameters): Promise<EventTemplateSummariesPayload> {
	const payload = await performRequest({ url: LIST_EVENT_TEMPLATES_SUMMARIES, method: 'get', params }) as EventTemplateSummariesPayload;

	return payload;
}
