import { performRequest } from '../../acmeRequestor';
import { B2B_CHECKOUT } from '../../../utils/acmeEndpoints';
import { CheckoutInputObject } from '../../../interfaces/acmeCheckoutManagementPayloads';


/** Creates a new shopping cart. 
 * 
 * Returns the id of the newly created shopping cart
 * @params cart - Create an empty cart by passing in "{}" as the object or a populated shopping cart by passing in a Shopping Cart Object.
 */
export async function checkout(input: CheckoutInputObject): Promise<string> {
	const payload = await performRequest({ url: B2B_CHECKOUT, method: 'post', data: input }) as string;
	return payload;
};