import { performRequest } from '../../acmeRequestor';
import { LIST_EVENT_TEMPLATES, LIST_TEMPLATE_TIMES, GET_EVENT_TEMPLATE } from '../../../utils/acmeEndpoints';

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

async function listEventTemplates() {

}