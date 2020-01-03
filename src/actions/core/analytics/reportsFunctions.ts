import { performRequest } from '../../acmeRequestor';
import { LIST_REPORTS, GET_REPORT, EXECUTE_REPORT } from '../../../utils/acmeEndpoints';
import { ListReportDefinitionsPayload, ReportDefinition } from '../../../interfaces/acmeAnalyticsPayloads';

/** Returns a list of all report JSON objects for this user */
async function listReports(): Promise<ListReportDefinitionsPayload> {

	const payload = await performRequest({ url: LIST_REPORTS, method: 'get' }) as ListReportDefinitionsPayload;
	return payload;
}

/** Returns the report JSON object for the specified id
 * @param id - The id of the report to retrieve
 */
async function getReport(id: string): Promise<ReportDefinition> {

	const url = `${GET_REPORT}/${id}`;

	const payload = await performRequest({ url, method: 'get' }) as ReportDefinition;
	return payload;
}

/** Executes a report */
async function executeReport() {

	const payload = await performRequest({ url: EXECUTE_REPORT, method: 'post', });
	return payload;
}

export { listReports, getReport };