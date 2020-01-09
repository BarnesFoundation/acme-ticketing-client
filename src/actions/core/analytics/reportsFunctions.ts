import { performRequest } from '../../acmeRequestor';
import { LIST_REPORTS, GET_REPORT, EXECUTE_REPORT, POLL_REPORT_STATUS, EXECUTE_ADHOC_REPORT } from '../../../utils/acmeEndpoints';
import { ListReportDefinitionsPayload, ReportDefinition, QueryExpression, ReportExecution, ReportRun, ReportJSON, FindQuery, FindField, GroupField, SummaryField, CountField } from '../../../interfaces/acmeAnalyticsPayloads';

interface ReportParameters {
	endDate: string,
	startDate: string,
	endDateTime: string,
	startDateTime: string,
	dateRangeField: string,
}

interface DefinedReportParameters extends ReportParameters {
	/** Id of the report to be run */
	reportUuid: string,
	queryExpression: QueryExpression,
}

interface AdhocReportParameters extends ReportParameters {
	collectionName: string,
	findQueries?: FindQuery[],
	findFields?: FindField[],
	groupFields?: GroupField[],
	summaryFields?: SummaryField[],
	countFields?: CountField[],
	limit?: number
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
async function executeReport(reportParams: DefinedReportParameters): Promise<ReportExecution> {

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

/** Should be called once a report instance run's status is complete. The results can be retrieved in either JSON or CSV format
 * @param id - The id for the report instance to retrieve the results for
 * @param type - The format the results should be returned in 
 */
async function retrieveReportResults(id: number, type: "json"): Promise<ReportJSON>;
/** Should be called once a report instance run's status is complete. The results can be retrieved in either JSON or CSV format
 * @param id - The id for the report instance to retrieve the results for
 * @param type - The format the results should be returned in 
 */
async function retrieveReportResults(id: number, type: "csv"): Promise<string>;

/** Should be called once a report instance run's status is complete. The results can be retrieved in either JSON or CSV format
 * @param id - The id for the report instance to retrieve the results for
 * @param type - The format the results should be returned in 
 */
async function retrieveReportResults(id: number, type: "json" | "csv"): Promise<ReportJSON | string> {

	const url = `${EXECUTE_REPORT}/${type}/${id}`;

	const payload = await performRequest({ url, method: 'get' });
	return payload;
}

/** Executes an ad-hoc report (as in no prior definition for the report is required) and returns the JSON output of the results.
 * Not a publicy documented endpoint, and report doesn't have to be polled for. 
 * @param reportParams - The params with which to run the ad-hoc report 
 */
async function executeAdhocReport(reportParams: AdhocReportParameters): Promise<ReportJSON> {

	const payload = await performRequest({ url: EXECUTE_ADHOC_REPORT, method: 'post', data: reportParams }) as ReportJSON;
	return payload;
}

export { listReportDefinitions, getReportDefinition, executeReport, pollForReportStatus, retrieveReportResults, executeAdhocReport };