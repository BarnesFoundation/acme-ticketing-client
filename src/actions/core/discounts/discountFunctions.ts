import { ListDiscounts } from "../../../interfaces/acmeDiscountsPayloads";
import { LIST_DISCOUNTS } from "../../../utils/acmeEndpoints";
import { performRequest } from "../../acmeRequestor";

/** List all discounts
 * ACME documentation: https://developers.acmeticketing.com/support/solutions/articles/33000250680-discount
 * @returns {Promise<ListDiscounts>}
 */
export async function listDiscounts(): Promise<ListDiscounts> {
  const payload = await performRequest({ url: LIST_DISCOUNTS, method: "get" }) as ListDiscounts

  return payload;
}
