import { performRequest } from "../../acmeRequestor";
import { GET_FORMS_RESPONSES } from "../../../utils/acmeEndpoints";
import {
    IPaginationRequestSettings,
    IPaginatedResponse,
} from "../../../interfaces/pagination";

export interface IFormResponse {
    customFields: any[];
    formId: string;
    id: string;
    name: string;
    number: string;
    publishedFormTemplate: {
        id: string;
        lastPublishedDate: string;
        lastUpdatedDate: string;
        name: string;
        oncePerCart: boolean;
        source: string;
        sourceFormDefinition: string;
        sourceFormEditUrl: string;
        sourceFormId: string;
        sourceFormUrl: string;
        state: string;
        type: string;
    };
    responseData: {};
    source: string;
    submissionDate: string;
    type: string;
}

/** Fetches a specified response for a form
 * @params id - the id of the form response
 *
 * Returns a JSON representation of FormResponseVo
 */
export async function fetchFormResponse(id: string): Promise<IFormResponse> {
    const payload = await performRequest<IFormResponse>({
        url: `${GET_FORMS_RESPONSES}/${id}`,
        method: "GET",
    });

    return payload;
}

export async function fetchFormResponses(
    params?: IPaginationRequestSettings
): Promise<IPaginatedResponse<IFormResponse>> {
    const payload = await performRequest<IPaginatedResponse<IFormResponse>>({
        url: `${GET_FORMS_RESPONSES}`,
        method: "GET",
        params,
    });

    return payload;
}
