import { ACMETicketingClient, EventFunctions, MembershipSummaryFunctions, ReportFunctions, EventTemplateFunctionsB2C } from '../index';
import { TicketingFunctions as tfc } from '../convenience';
import * as dotenv from 'dotenv';

dotenv.config();

const main = async () => {

	// Get credentials from .env
	const b2cTenantId = process.env.B2C_TENANT_ID;
	const apiKey = process.env.API_KEY;
	const apiRootUrl = process.env.API_ROOT_URL;

	// Setup client
	const ac = new ACMETicketingClient({ b2cTenantId, apiKey, apiRootUrl });
}

const definedReportFetchExample = async () => {

	const uuid = '5b89701d5eeba30c5662e791';

	const { queryExpression, dateSettings } = await ReportFunctions.getReportDefinition(uuid);
	const { endDate, startDate, endDateTime, startDateTime, dateRangeField } = dateSettings;
	const reportExecution = await ReportFunctions.executeReport({ reportUuid: uuid, queryExpression, endDate: '2019-12-03T00:00:00-05:00', endDateTime: '2019-12-03T00:00:00-05:00', startDate: '2019-12-01T00:00:00-05:00', startDateTime: '2019-12-01T00:00:00-05:00', dateRangeField });

	let status = reportExecution.status;
	const id = reportExecution.id;

	console.log(`Report status: ${status}. Id: ${id}`);

	// Poll until report status is complete
	const pollUntilComplete = () => {
		return new Promise((resolve) => {
			const interval = setInterval(async () => {
				if (status !== 'Completed') {
					[{ status } = (await ReportFunctions.pollForReportStatus(id))];
					console.log(`New status: ${status}`);
					resolve()
				}
				else {
					console.log(`Report status is ${status}. Ending polling`);
					clearInterval(interval);
				}
			}, 1000);
		})
	}

	await pollUntilComplete();

	const reportResult = await ReportFunctions.retrieveReportResults(id, "json");
	console.log(reportResult);
}

const ordersForMembershipDateRangeExample = async (membershipId: string) => {

	const orderPayloads = await tfc.getOrdersForMembershipDateRange(membershipId, "2020-01-15T00:00:00.000-05:00", "2020-01-16T00:00:00.000-05:00");
	console.log(JSON.stringify(orderPayloads));
}

const eventTemplateSummariesExample = async () => {

	const payload = await EventTemplateFunctionsB2C.listEventTemplateSummaries({ saleChannel: 'online' });
	console.log(`There are ${payload.length} event template summaries`);
}

const eventActivityCalendarsExample = async (params) => {

	const payload = await EventTemplateFunctionsB2C.getActivityCalendarForTemplate(params);
	console.log(payload);
}

const eventTemplateB2CExample = async (params) => {
	const payload = await EventTemplateFunctionsB2C.getEventTemplate(params);
	console.log(payload);
}

main();
ordersForMembershipDateRangeExample('3103365');
eventTemplateSummariesExample();
eventActivityCalendarsExample({ id: '59288c7aca6afe2b653a4757', startTime: '2020-05-04T06:59:00-04:00', endTime: '2020-11-05T06:59:00-04:00' });
eventTemplateB2CExample({ id: '59288c7aca6afe2b653a4757' });