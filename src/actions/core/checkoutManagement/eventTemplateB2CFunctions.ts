import { performRequest } from '../../acmeRequestor';
import { LIST_TEMPLATE_TIMES, LIST_EVENT_TEMPLATES_SUMMARIES_B2C, GET_ACTIVITY_CALENDAR_FOR_TEMPLATE, GET_EVENT_TEMPLATE_B2C, LIST_EVENT_TEMPLATES_B2C } from '../../../utils/acmeEndpoints';
import { EventTemplateSummaryB2C, EventTimeObject, EventTemplateActivityCalendar, EventTemplateB2C, BucketedEventTimeObject } from '../../../interfaces/acmeCheckoutManagementPayloads';

type SaleChannels = 'online' | 'customerRep' | 'pointOfSale' | 'manualEntry' | 'kiosk';

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

	/** Determines if the event templates should be retrieved via the /v2/b2c/event/templates/slim endpoint rather than default /v2/b2c/event/templates. 
	 * This will quickly get you a list of all Events for sale on B2C - similar to what you'd see on your ACME Ticketing landing page
	*/
	slim?: boolean,

	/** Limits results to only templates available to a certain sale channel (optional) */
	salesChannel?: SaleChannels
}

/** Object for the Event Template Summaries input parameters to provide. Optional */
export interface EventTemplateSummariesParameters extends EventTemplateParameters {

	/** Limits results to only templates with schedules or items available to a certain sale channel (optional) */
	saleChannel?: SaleChannels
}

/** Returns the event template summaries matching the specified input params
 * @params params - Input params event template summaries should match (optional)
 */
export async function listEventTemplateSummaries(params?: EventTemplateSummariesParameters): Promise<EventTemplateSummaryB2C[]> {

	const payload = await performRequest({ url: LIST_EVENT_TEMPLATES_SUMMARIES_B2C, method: 'get', params }) as EventTemplateSummaryB2C[];

	return payload;
}

/** Object for the Event Templates input parameters to provide */
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

/** Object for the Event Template Activity Calendar input parameters to provide. */
export interface ActivityCalendarParameters {

	/** The id of the template. Required */
	id: string,

	/** ISO8601 date string. The time you want the events to be after. Defaults to current time if not passed in (optional) */
	startTime?: string,

	/** ISO8601 date string. The time you want your events to be before. End of the month if this isn't passed in (optional) */
	endTime?: string,

	/** The sale channel you are listing the times for. Any one of online, customerRep, pointOfSale and manualEntry (optional) */
	saleChannel?: SaleChannels,

	/** One of private, standard or all.  If left off or standard then will not return events that were made for private event templates (optional) */
	type?: 'private' | 'standard' | 'all',

	/** The current user's membership id. This allows for only showing days that a membership has events. 
	 * It's possible that there are events available only available to members on some days (optional) */
	membershipId?: string,

	/** The current user's membership category. This allows for only showing days that a membership has events. 
	 * It's possible that there are events available only available to members on some days (optional) */
	membershipCategoryId?: string
}


/** Returns a list of times for events of a specified event template.
 * @params params - Input params event template summaries should match (required as id is needed)
 */
export async function getActivityCalendarForTemplate(params: ActivityCalendarParameters): Promise<EventTemplateActivityCalendar> {

	const payload = await performRequest({ url: GET_ACTIVITY_CALENDAR_FOR_TEMPLATE(params.id), method: 'get', params }) as EventTemplateActivityCalendar;
	return payload;
}


/** Object for the Event Template Activity Calendar input parameters to provide. */
export interface GetEventTemplateParams {

	/** The id of the template. Required */
	id: string,

	/** The sale channel of the template. Any one of online, customerRep, pointOfSale and manualEntry (optional) */
	saleChannel?: SaleChannels,

	/** The current user's membership id. 
	 *  This allows for event templates that are only accessible to memberships to be returned, also allows for price list of the event to include membership discounts.*/
	membershipId?: string,

	/** This allows for event templates that are only accessible to memberships to be returned, also allows for price list of the event to include membership discounts.*/
	membershipCategoryId?: string
}

/** Returns the requested event template
 * @params params - Input params for the event template to be retrieved
 */
export async function getEventTemplate(params?: GetEventTemplateParams): Promise<EventTemplateB2C> {

	const payload = await performRequest({ url: GET_EVENT_TEMPLATE_B2C(params.id), method: 'get', params }) as EventTemplateB2C;
	return payload;
}


/** Object for the Event Template Times input parameters to provide. */
export interface ListTemplateTimesParams {

	/** ISO8601 time string, the time you want the events to be after. Defaults to now (optional) */
	startTime?: string,

	/** ISO8601 time string, the time you want the events to be befire. Defaults to 2 days (optional) */
	endTime?: string

	/** the sale channel you are listing the times for.. Any one of online, customerRep, pointOfSale and manualEntry (optional) */
	saleChannel?: SaleChannels,

	/** One of private, standard or all.  If left off or standard then will not return events that were made for private event templates (optional) */
	type?: 'private' | 'standard' | 'all',

	/** The current user's membership id. 
	 *  This allows for times for schedules that are only accessible to memberships to be returned. (optional) */
	membershipId?: string,

	/** The current user's membership category.  This allows for times for schedules that are only accessible to memberships to be returned. (optional) */
	membershipCategoryId?: string
}

/** List the times for events for the matching event template(s)
 * @params params - Input params for the event templates times to be retrieved (optional)
 */
export async function listTemplateTimes(params?: ListTemplateTimesParams): Promise<BucketedEventTimeObject[]> {

	const url = LIST_TEMPLATE_TIMES();

	const payload = await performRequest({ url, method: 'get', params }) as BucketedEventTimeObject[];
	return payload;
}


/** Object for the Specific Event Tempate Times input parameters to provide. */
export interface GetTemplateTimesParams extends ListTemplateTimesParams {

	/** The id of the template you want to list times for. If ommitted, times for events for all templates will be returned. (required) */
	id: string,

	/** The combo template Id contains a list of templates. (optional) */
	comboTemplateId?: string,
}

/** Get the times for events of a specified event template
 * @params params - Input params for the event template to be retrieved (optional)
 */
export async function getTemplateTimes(params: GetTemplateTimesParams): Promise<EventTimeObject[]> {

	const url = LIST_TEMPLATE_TIMES(params.id);

	const payload = await performRequest({ url, method: 'get', params }) as EventTimeObject[];
	return payload;
};


export async function listEventTemplates(params?: EventTemplateParameters): Promise<EventTemplateB2C[]> {

	const url = (params && params.slim) ? `${LIST_EVENT_TEMPLATES_B2C}/slim` : LIST_EVENT_TEMPLATES_B2C;

	const payload = await performRequest({ url, method: 'get', params }) as EventTemplateB2C[];
	return payload;
};