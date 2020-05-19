import { performRequest } from '../../acmeRequestor';
import { B2B_CHECKOUT, B2B_SEND_ORDER_EMAIL } from '../../../utils/acmeEndpoints';
import { CheckoutInputObject } from '../../../interfaces/acmeCheckoutManagementPayloads';
import { Order } from '../../../interfaces/acmeOrderPayloads';


/** Creates a new shopping cart. 
 * 
 * Returns the id of the newly created shopping cart
 * @params cart - Create an empty cart by passing in "{}" as the object or a populated shopping cart by passing in a Shopping Cart Object.
 */
export async function checkout(input: CheckoutInputObject): Promise<string> {
	const payload = await performRequest({ url: B2B_CHECKOUT, method: 'post', data: input }) as string;
	return payload;
};


export interface EmailInputParams {

	/** The email address to send the order email to */
	email: string,

	/** Whether or not the order email should be sent */
	sendEmail: boolean
}

/** Send the order email to the specified email for the provided order number (not order id)
 * @params orderNumber - The order number for which to send the email for
 * @params emailInputParams - The input params for the email sending
 */
export async function sendOrderEmail(orderNumber: string, input: EmailInputParams) {

	const url = B2B_SEND_ORDER_EMAIL(orderNumber);
	const payload = await performRequest({ url, method: 'post', data: input }) as Order;
	return payload;
};