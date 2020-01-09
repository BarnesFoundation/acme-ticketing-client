import { performRequest } from '../../acmeRequestor';
import { LIST_REPORTS, GET_REPORT, EXECUTE_REPORT } from '../../../utils/acmeEndpoints';
import { ListReportDefinitionsPayload, ReportDefinition, QueryExpression, ReportExecution } from '../../../interfaces/acmeAnalyticsPayloads';

/** Returns a list of all report JSON objects for this user */
async function listReportDefinitions(): Promise<ListReportDefinitionsPayload> {

	const payload = await performRequest({ url: LIST_REPORTS, method: 'get' }) as ListReportDefinitionsPayload;
	return payload;
}

/** Returns the report JSON object for the specified id
 * @param id - The id of the report to retrieve
 */
async function getReportDefinition(id: string): Promise<ReportDefinition> {

	const url = `${GET_REPORT}/${id}`;

	const payload = await performRequest({ url, method: 'get' }) as ReportDefinition;
	return payload;
}

/** Executes a report with the specified input parameters
 * @param reportParams - The parameters that the report should be run with
*/
async function executeReport(reportParams: ReportParameters): Promise<ReportExecution> {

	const payload = await performRequest({ url: EXECUTE_REPORT, method: 'post', data: reportParams }) as ReportExecution;
	return payload;
}

/** Report parameters to be provided for a report execution */
interface ReportParameters {
	/** Id of the report to be run */
	reportUuid: string,
	endDate: string,
	startDate: string,
	endDateTime: string,
	startDateTime: string,
	dateRangeField: string,
	queryExpression: QueryExpression,
}


export { listReportDefinitions, getReportDefinition, executeReport };