import { performRequest } from '../../acmeRequestor';
import { B2C_SHOPPING_CART, ENTITLEMENTS_VALIDATE } from '../../../utils/acmeEndpoints';
import { EntitlementValidationPayload } from '../../../interfaces/acmeCheckoutManagementPayloads';

/** Object for the Event Template Summaries input parameters to provide. Optional */
export interface ShoppingCartObject {
	id?: string,
	tempVisitorId?: string,
	tenantId?: string,
	membershipId?: number,
	membershipIds?: number[],
	items?: any[],
	forms?: any[],
	comboItems?: any[],
	verifyEntitlements?: boolean,
	reservationId?: string
}

/** Creates a new shopping cart. 
 * 
 * Returns the id of the newly created shopping cart
 * @params cart - Create an empty cart by passing in "{}" as the object or a populated shopping cart by passing in a Shopping Cart Object.
 */
export async function createNewShoppingCart(cart: {} | ShoppingCartObject): Promise<string> {
	console.log(cart);
	const payload = await performRequest({ url: B2C_SHOPPING_CART, method: 'post', data: cart }) as string;
	return payload;
};


/** Returns an existing shopping cart in the form of a ShoppingCartObject payload
 * 
 * @params id - The id of the shopping cart you want to retrieve
 */
export async function getExistingShoppingCart(id: string): Promise<ShoppingCartObject> {
	const url = `${B2C_SHOPPING_CART}/${id}`;

	const payload = await performRequest({ url, method: 'get' }) as ShoppingCartObject;
	return payload;
};

/** Updates an existing shopping cart. You MUST provide the id in the shopping cart object being passed in, and it must match the id parameter
 * 
 * @params id - The id of the shopping cart you want to update
 * @params cart - A Shopping Cart Object to update the existing shopping cart with. MUST include the "id" field within the object
 */
export async function updateExistingShoppingCart(id: string, cart: ShoppingCartObject): Promise<ShoppingCartObject> {
	const url = `${B2C_SHOPPING_CART}/${id}`;

	const payload = await performRequest({ url, method: 'put', params: cart }) as ShoppingCartObject;
	return payload;
};

/** Deletes an existing shopping cart.
 * @params id - The id of the shopping cart you want to delete
 */
export async function deleteExistingShoppingCart(id: string): Promise<ShoppingCartObject> {
	const url = `${B2C_SHOPPING_CART}/${id}`;

	const payload = await performRequest({ url, method: 'delete' }) as ShoppingCartObject;
	return payload;
};

/** Appears to validate the entitlement rules against an existing shopping cart. It seems you can pass in either an object containing the id of an existing cart or a new Shopping Cart Object itself (no id required within it)
 * 
 * You can provide the membershipId(s) within the shopping cart object to validate entitlements against a membership.
 * 
 * Returns results of the validation
 * 
 * @params object - An object that holds the id of the shopping cart to be validated in the form of { "id": "myExistingShoppingCartId" } or an on-the-fly Shopping Cart Object (no id needs to be specified)
 */

export async function validateShoppingCart(data: { id: string } | ShoppingCartObject): Promise<EntitlementValidationPayload> {
	const payload = await performRequest({ url: ENTITLEMENTS_VALIDATE, method: 'post', data }) as EntitlementValidationPayload;
	return payload;
};