import {
	ACMETicketingClient, ReportFunctions,
	EventTemplateFunctionsB2C, ShoppingCartFunctionsB2C,
	CheckoutFunctionsB2B, EventImagesFunctions,
	MembershipLevelsFunctions,
	OrderFunctions, MembershipFunctions,
	ECommerceFunctionsB2C,
	EventFunctions,
	AddOnFunctions
} from '../index';
import { TicketingFunctions as tfc, MembershipSaleFunctions, } from '../convenience';
import * as dotenv from 'dotenv';
import { v4 as uuidV4 } from 'uuid';
import { CheckoutInputObject } from '../src/interfaces/acmeCheckoutManagementPayloads';

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
					resolve(null)
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
	const eventTemplates = await EventTemplateFunctionsB2C.listEventTemplates({ slim: true, saleChannel: 'online' });

	eventTemplates.forEach((et) => console.log(et.name));
};

const sendOrderEmailExample = async () => {

	const orderNumber = '100430719';
	const emailInput = {
		email: 'myemail@someEmail.org',
		sendEmail: true
	};

	const orderResponse = await CheckoutFunctionsB2B.sendOrderEmail(orderNumber, emailInput);
	console.log(`Sent order email for Order ID ${orderResponse.id}`);
};

const readEventTemplateImageExample = async () => {

	// The event template id I want the image for and size
	const templateId = '5ddd928961a3077e3b31734c';
	const size = 'TN';

	// Retrieve the image in the desired size
	const imageResponse = await EventImagesFunctions.readTemplateProfileImage({ templateId, size });
	console.log(imageResponse);
};

const membershipLevelsExample = async () => {

	// List all of the available membership levels per my filters
	const filteredMembershipLevels = await MembershipLevelsFunctions.listMembershipLevels({ isPublished: true, salesChannels: 'pointOfSale', summarize: true });
	console.log(filteredMembershipLevels);

	// Get a specific membership level, by id
	const specificLevel = await MembershipLevelsFunctions.getMembershipLevel('58b0a65c969c6d3155d6fe87');
	console.log(specificLevel);
};

const searchOrdersExample = async () => {

	const ordersSearchResponse = await OrderFunctions.searchOrders({
		sortField: 'createdOn',
		sortDirection: 'desc',
		email: 'xxxx@yyy.org',
		pageSize: 200,
	});

	console.log(ordersSearchResponse.list[188]);
};

const listMembershipsExample = async () => {

	const memberships = await MembershipFunctions.listMemberships({
		updatedStartTime: '2020-10-11T00:00:00-05:00',
		updatedEndTime: '2020-10-11T23:59:59-05:00',
		pageSize: 10,
		page: 1
	});

	console.log(memberships);
};

const listEventTemplateInstancesExample = async () => {

	const eventTemplateInstances = await EventTemplateFunctionsB2C.listEventTemplateInstances({
		id: '58b2fbdc58ccc44b172675f2',
		startTime: '2020-10-14T17:30:00+00:00',
		endTime: '2020-10-15T17:30:00+00:00'
	});

	console.log(eventTemplateInstances);
};

const placeAnOrder = async () => {
	try {
		const uuid = uuidV4();
		const billingInformationAndCart: CheckoutInputObject = {
			"billingFirstName": "Bill",
			"billingLastName": "Billiams",
			"billingEmail": "bill@bill.edu",
			"contactFirstName": "Bill",
			"contactLastName": "Billiams",
			"contactEmail": "bill@bill.edu",
			"country": "United States",
			"phoneNumber": "7776665555",
			"shoppingCart": {
				"items": [
					{
						"eventId": "5f77388c22149012b75f2860",
						"eventName": "Admission",
						"eventTime": "2020-11-13T11:15:00-05:00",
						"itemType": "Event",
						"ignoreEntitlements": false,
						"ticketingTypeName": "Adult",
						"ticketingTypeId": "58b0b704554bd44b356edeea",
						"quantity": 2,
						"unitPrice": "25.00"
					}
				]
			},
			"zipCode": "90210",
			"city": "Billadelphia",
			"address1": "123 Bill St.",
			"billingAddress1": "123 Bill St.",
			"notes": "#MemberPortal",
			"creditCardBrand": "Visa",
			"manualEntryCardNumber": "4242424242424242",
			"cvc": "123",
			"ccLastFourDigits": "4242",
			"expDate": "0923"
		};

		const purchase = await ECommerceFunctionsB2C.performCheckout(billingInformationAndCart, uuid);

		console.log(purchase);
	} catch (e) {
		console.log(e);
	}
}

const placeAnOrderAndThrowError = async () => {
	try {
		const uuid = uuidV4();
		const billingInformationAndCart: CheckoutInputObject = {
			"billingFirstName": "Bill",
			"billingLastName": "Billiams",
			"billingEmail": "bill@bill.edu",
			"contactFirstName": "Bill",
			"contactLastName": "Billiams",
			"contactEmail": "bill@bill.edu",
			"country": "United States",
			"phoneNumber": "7776665555",
			"shoppingCart": {
				"items": [
					{
						"eventId": "5f77388c22149012b75f2860",
						"eventName": "Admission",
						"eventTime": "2020-11-13T11:15:00-05:00",
						"itemType": "Event",
						"ignoreEntitlements": false,
						"ticketingTypeName": "Adult",
						"ticketingTypeId": "58b0b704554bd44b356edeea",
						"quantity": 2,
						"unitPrice": "25.00"
					}
				]
			},
			"zipCode": "90210",
			"city": "Billadelphia",
			"address1": "123 Bill St.",
			"billingAddress1": "123 Bill St.",
			"notes": "#MemberPortal",
			"creditCardBrand": "Visa",
			"manualEntryCardNumber": "4242424242424241", // <= this will trigger an error.
			"cvc": "123",
			"ccLastFourDigits": "4242",
			"expDate": "0923"
		};

		// This will throw as 4242424242424241 is not a valid cc#.
		await ECommerceFunctionsB2C.performCheckout(billingInformationAndCart, uuid, { throwRaw: true });
	} catch (e) {
		console.log(e);
	}
}

const updateEventCapacity = async () => {

	// Fetch the event definition from the API and make a change to the capacity
	const fetchedEvent = await EventFunctions.getEvent('600602634791d654027aa6d3');
	fetchedEvent.capacity = 37;

	// Update the event and ensure the capacity matches
	const updatedEvent = await EventFunctions.updateEvent(fetchedEvent);

	console.log(`Both events now have event capacity of 37: ${updatedEvent.capacity === fetchedEvent.capacity}`);
}

const getAddOn = async () => {

	// Fetch this add-on
	const fetchedAddOn = await AddOnFunctions.getAddOn(3982);
	console.log(fetchedAddOn);
}

const performMembershipPurchase = async () => {

	const membershipPurchaseInput = {
		membershipCategoryId: '58b0768879e71d16ee72f64a',
		membershipOfferingId: 'd9c15537d85e4872b0a198d0f9bd7124',
		pricePointId: '59038138554bd416f6f2de92',

		isGift: false,
	};

	const memberDetails = {
		city: 'Philadelphia',
		country: 'USA',
		email: 'Bill@bill.edu',
		firstName: 'Bill',
		lastName: 'Billington',
		phoneNumber: '5555555555',
		state: 'PA',
		streetAddress1: '123 Bill Street,',
		zipCode: '19130',
	};

	const paymentDetails: MembershipSaleFunctions.IPaymentDetails = {
		creditCardBrand: "Visa",
		manualEntryCardNumber: '4242424242424242',
		cvc: '123',
		ccLastFourDigits: '4242',
		expDate: '0923',
	};

	const newMembershipOrder = await MembershipSaleFunctions.purchaseNewMembership(membershipPurchaseInput, memberDetails, paymentDetails);
	console.log(newMembershipOrder);
};

const renewMembership = async () => {

	const membershipActionResponse = await MembershipSaleFunctions.processMembershipAction({
		membershipId: '4501396',
		membershipAction: 'MembershipUpgrade',

		membershipCategoryId: '58b0c6eb79e71d16ee72ffb5',
		membershipOfferingId: '483c9434e2bd4a90a03337cbe12c3283',
		pricePointId: '58adfa2668d6097a9ca7b275',
	},
		{
			creditCardBrand: "Visa",
			manualEntryCardNumber: '4242424242424242',
			cvc: '123',
			ccLastFourDigits: '4242',
			expDate: '0923',

			city: 'Philadelphia',
			country: 'USA',
			email: 'bill@bill.edu',
			firstName: 'Bill',
			lastName: 'Billington',
			phoneNumber: '5555555555',
			state: 'PA',
			streetAddress1: '123 Bill Street,',
			zipCode: '19130',
		}, true);

	console.log(membershipActionResponse);
};

const checkoutOrderAndRefund = async () => {

	// Order id of a successfully placed order
	const orderId = '29564806';

	// Now we'll refund it in its entirety
	const refundResponse = await OrderFunctions.refundOrder({
		orderId: orderId,
		incidentReasonCode: 'Miscellaneous',
	});

	console.log(refundResponse);
};

const checkoutOrderAndUpdate = async () => {

	// First let's place the order
	const orderPayload = await ECommerceFunctionsB2C.performCheckout({
		"billingFirstName": "Bill",
		"billingLastName": "Billiams",
		"billingEmail": "bill@bill.edu",
		"contactFirstName": "Bill",
		"contactLastName": "Billiams",
		"contactEmail": "bill@bill.edu",
		"country": "United States",
		"phoneNumber": "7776665555",
		"shoppingCart": {
			"items": [
				{
					"eventId": "6065f72a4791d6362eda1a45",
					"eventName": "Admission",
					"eventTime": "2021-05-30T11:00:00-04:00",
					"itemType": "Event",
					"ignoreEntitlements": false,
					"ticketingTypeName": "Adult",
					"ticketingTypeId": "58b0b704554bd44b356edeea",
					"quantity": 2,
					"unitPrice": "25.00"
				}
			]
		},
		"zipCode": "90210",
		"city": "Billadelphia",
		"address1": "123 Bill St.",
		"billingAddress1": "123 Bill St.",
		"creditCardBrand": "Visa",
		"manualEntryCardNumber": "4242424242424242",
		"cvc": "123",
		"ccLastFourDigits": "4242",
		"expDate": "0923"
	}, uuidV4());

	const orderItemId = orderPayload.orderItems[0].itemId;

	// Now we'll update the order for a cancellation
	const orderUpdate = await OrderFunctions.updateOrder({
		orderId: orderPayload.id,
		orderItems: [{
			orderItemId: orderItemId,
			quantity: 0,
		}],
	});

	console.log(orderUpdate);
};

main();

/** Some example functions - uncomment any you want to test */

// ordersForMembershipDateRangeExample('3103365');
// eventTemplateSummariesExample();
// eventActivityCalendarsExample({ id: '59288c7aca6afe2b653a4757', startTime: '2020-05-04T06:59:00-04:00', endTime: '2020-11-05T06:59:00-04:00' });
// eventTemplateB2CExample({ id: '59288c7aca6afe2b653a4757' });
// eventTemplateTimesExample({ id: '59288c7aca6afe2b653a4757' });
// shoppingCartB2CExample();
// listEventTemplatesB2CExample();
// sendOrderEmailExample();
// readEventTemplateImageExample();
// membershipLevelsExample();
// searchOrdersExample();
// listMembershipsExample();
// listEventTemplateInstancesExample();
// placeAnOrder();
// placeAnOrderAndThrowError();
// updateEventCapacity();
// getAddOn();
// performMembershipPurchase();
// renewMembership();
checkoutOrderAndRefund();
// checkoutOrderAndUpdate();
// definedReportFetchExample();