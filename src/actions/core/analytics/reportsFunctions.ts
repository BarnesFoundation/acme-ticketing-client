import { performRequest } from '../../acmeRequestor';
import { LIST_REPORTS, GET_REPORT, EXECUTE_REPORT, POLL_REPORT_STATUS } from '../../../utils/acmeEndpoints';
import { ListReportDefinitionsPayload, ReportDefinition, QueryExpression, ReportExecution, ReportRun } from '../../../interfaces/acmeAnalyticsPayloads';

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
 *  All ACME reports are run asynchronously and results are posted once the server has retrieved all of the data requested in the report. The process for running a predefined report follows these steps
 * 1. Execute the Report
 * 2. Poll for Report Instance Status
 * 3. Retrieve the Results 
 * @param reportParams - The parameters that the report should be run with
*/
async function executeReport(reportParams: ReportParameters): Promise<ReportExecution> {

	const payload = await performRequest({ url: EXECUTE_REPORT, method: 'post', data: reportParams }) as ReportExecution;
	return payload;
}

/** Should be called after a report execution. Returns the status of the report.
 *  Most reports are returned in as per ACME, but larger/more complex reports can take longer to prepare.
 *  When retrieving larger amounts of data, it is recommended to chunk requests into smaller date ranges
 *  @param id - The id for the report instance to check the status of. This id is from the ReportExecution response
 */
async function pollForReportStatus(id: number): Promise<ReportRun> {

	const url = `${POLL_REPORT_STATUS}/${id}`;

	const payload = await performRequest({ url, method: 'get', }) as ReportRun;
	return payload;
}


export { listReportDefinitions, getReportDefinition, executeReport, pollForReportStatus };