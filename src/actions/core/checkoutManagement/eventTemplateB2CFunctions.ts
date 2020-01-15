import { performRequest } from '../../acmeRequestor';
import { LIST_EVENT_TEMPLATES, LIST_TEMPLATE_TIMES, GET_EVENT_TEMPLATE, LIST_EVENT_TEMPLATES_SUMMARIES_B2C } from '../../../utils/acmeEndpoints';
import { EventTemplateSummaryB2C } from '../../../interfaces/acmeCheckoutManagementPayloads';

/** Object for the Event Templates input parameters to provide. Optional */
export interface EventTemplateParameters {

	/** ISO8601 of start time for event templates to retrieve (optional) */
	startTime?: string,

	/** ISO8601 of end time for events templates to retrieve (optional) */
	endTime?: string,

	/** One of private, standard or all.  If left off or standard then will not return events that were made for private event templates (optional) */
	type?: 'private' | 'standard' | 'all',

	/** The current user's membership id.  This allows for event templates that are only accessible to memberships to be returned, also allows for price list of the event to include membership discounts (optional) */
	membershipId?: string | number,

	/** The current user's membership category.  This allows for event templates that are only accessible to memberships to be returned, also allows for price list of the event to include membership discounts */
	membershipCategoryId?: string | number
}

/** Object for the Event Template Summaries input parameters to provide. Optional */
export interface EventTemplateSummariesParameters extends EventTemplateParameters {

	/** Limits results to only templates with schedules or items available to a certain sale channel  */
	saleChannel: 'online' | 'customerRep' | 'pointOfSale' | 'manualEntry'
}

/** Returns the event template summaries matching the specified input params
 * @params params - Input params event template summaries should match (optional)
 */
export async function listEventTemplateSummaries(params?: EventTemplateSummariesParameters): Promise<EventTemplateSummaryB2C[]> {

	const payload = await performRequest({ url: LIST_EVENT_TEMPLATES_SUMMARIES_B2C, method: 'get', params }) as EventTemplateSummaryB2C[];

	return payload;
}

/** Object for the Event Templates input parameters to provide. Optional */
export interface TemplateTimesParameters {

	/** The template id you want to list the times for. Required */
	id: string,

	/** ISO8601 date string. The time you want the events to be after (optional) */
	startTime?: string,

	/** ISO8601 date string. The time you want your events to be before (optional) */
	endTime?: string,

	/** One of private, standard or all.  If left off or standard then will not return events that were made for private event templates (optional) */
	type?: 'private' | 'standard' | 'all',

	/** The current user's membership id. This allows for times for schedules that are only accessible to memberships to be returned. (optional) */
	membershipId?: string,

	/** The current user's membership category. This allows for times for schedules that are only accessible to memberships to be returned */
	membershipCategoryId?: string

	 /** The combo template Id contains a list of templates (optional) */
	 comboTemplateId?: string
}


/** Returns a list of times for events of a specified event template
 * @params paramrs - Input params event template summaries should match (optional)
 */
export async function listTemplateTimes(params?: TemplateTimesParameters): Promise<any[]> {

	const payload = await performRequest({ url: LIST_TEMPLATE_TIMES(params.id), method: 'get', params });
	return payload;
}