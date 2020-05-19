import { ACMETicketingClient, ReportFunctions, EventTemplateFunctionsB2C, ShoppingCartFunctionsB2C } from '../index';
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

const eventTemplateTimesExample = async (params) => {

	const allEventsTimes = await EventTemplateFunctionsB2C.listTemplateTimes();
	const specifiedEventTimes = await EventTemplateFunctionsB2C.getTemplateTimes(params);

	console.log(allEventsTimes);
	console.log(specifiedEventTimes);

}

const shoppingCartB2CExample = async () => {

	const populatedShoppingCart = {
		"tenantId": "316",
		"membershipId": 3103365,
		"membershipIds": [
			3103365
		],
		"items": [
			{
				"eventId": "5eb1a7a44791d60d05d0cbed",
				"ticketingTypeId": "58b0b704554bd44b356edeea",
				"eventName": "Admission",
				"ticketingTypeName": "Adult",
				"quantity": 14,
				"unitPrice": "10.00",
				"amount": "140.00",
				"itemType": "Event",
				"admissionType": "standard",
				"ignoreEntitlements": false
			}
		]
	};

	const createdShoppingCartId = await ShoppingCartFunctionsB2C.createNewShoppingCart(populatedShoppingCart);
	console.log(`The id of the created shopping cart is ${createdShoppingCartId}`);

	const retrievedShoppingCart = await ShoppingCartFunctionsB2C.getExistingShoppingCart(createdShoppingCartId);
	console.log(`The shopping cart belonging to ${createdShoppingCartId} is`, retrievedShoppingCart);

	const shoppingCartValidation = await ShoppingCartFunctionsB2C.validateShoppingCart(populatedShoppingCart);
	console.log(`The validation of the on-the-fly shopping cart was`, shoppingCartValidation);

	const deletedShoppingCart = await ShoppingCartFunctionsB2C.deleteExistingShoppingCart(createdShoppingCartId);
	console.log(`The shopping cart with id ${createdShoppingCartId} was deleted and the response was`, deletedShoppingCart);
}

const listEventTemplatesB2CExample = async () => {

	// Get event templates starting since beginning of year
	const eventTemplates = await EventTemplateFunctionsB2C.listEventTemplates({ startTime: '2020-01-01T05:00:00.000Z' });
	console.log(eventTemplates);
};

main();
ordersForMembershipDateRangeExample('3103365');
eventTemplateSummariesExample();
eventActivityCalendarsExample({ id: '59288c7aca6afe2b653a4757', startTime: '2020-05-04T06:59:00-04:00', endTime: '2020-11-05T06:59:00-04:00' });
eventTemplateB2CExample({ id: '59288c7aca6afe2b653a4757' });
eventTemplateTimesExample({ id: '59288c7aca6afe2b653a4757' });
shoppingCartB2CExample();
listEventTemplatesB2CExample();