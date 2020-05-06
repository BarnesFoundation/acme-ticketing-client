import { performRequest } from '../../acmeRequestor';
import { B2C_SHOPPING_CART } from '../../../utils/acmeEndpoints';

/** Object for the Event Template Summaries input parameters to provide. Optional */
export interface ShoppingCartObject {
	id?: string,
	tempVisitorId?: string,
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