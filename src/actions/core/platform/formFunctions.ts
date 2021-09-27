import { performRequest } from "../../acmeRequestor";
import { GET_FORMS_RESPONSES } from "../../../utils/acmeEndpoints";

/** Fetches a specified response for a form
 * @params id - the id of the form response
 *
 * Returns a JSON representation of FormResponseVo
 */
export async function fetchFormResponse(id: string) {
    const payload = await performRequest({
        url: `${GET_FORMS_RESPONSES}/${id}`,
        method: "GET",
    });
}

export async function fetchFormResponses() {
    const payload = await performRequest({
        url: `${GET_FORMS_RESPONSES}`,
        method: "GET",
    });
};
