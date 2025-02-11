import { DiscountObject, DiscountPriceList, ListDiscounts } from "../../../interfaces/acmeDiscountsPayloads";
import { GET_DISCOUNT, GET_DISCOUNT_PRICE_LIST, LIST_DISCOUNTS } from "../../../utils/acmeEndpoints";
import { performRequest } from "../../acmeRequestor";

/** Returns a list all discounts 
 * 
 * ACME documentation: https://developers.acmeticketing.com/support/solutions/articles/33000250680-discount
 * @returns {Promise<ListDiscounts>}
 */
export async function listDiscounts(): Promise<ListDiscounts> {
  const payload = await performRequest({ url: LIST_DISCOUNTS, method: "get" }) as ListDiscounts

  return payload;
}

/** Returns a discount object for the specified discount id
 * 
 * ACME documentation: https://developers.acmeticketing.com/support/solutions/articles/33000250680-discount
 * @param {string | number} discountId
 * @returns {Promise<ListDiscounts>}
 */
export async function getDiscount(
  discountId: string | number
): Promise<DiscountObject> {
  const payload = await performRequest(
    { url: GET_DISCOUNT(discountId), method: "get" }
  ) as DiscountObject

  return payload;
}

/** Returns a price list for a discount object for the specified price list and discount ids
 * 
 * ACME documentation: https://developers.acmeticketing.com/support/solutions/articles/33000250680-discount
 * @param {string | number} discountId
 * @param {string | number} priceListId
 * @returns {Promise<ListDiscounts>}
 */
export async function getDiscountPriceList(
  discountId: string | number, 
  priceListId: string | number
): Promise<DiscountPriceList> {
  const payload = await performRequest(
    { url: GET_DISCOUNT_PRICE_LIST(discountId, priceListId), method: "get" }
  ) as DiscountPriceList

  return payload;
}
