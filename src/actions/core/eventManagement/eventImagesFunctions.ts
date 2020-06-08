import { performRequest } from '../../acmeRequestor';
import { READ_EVENT_TEMPLATE_IMAGE } from '../../../utils/acmeEndpoints';


export interface ReadTemplateProfileImageParams {

	/** The id of the template you want the profile image for */
	templateId: string,

	/** Size you would like the template profile image in
	 * TN - Thumbnail 80x80 pixels
	 * PV - Preview 150x150 pixels
	 * HR - High Resolution 640x640 pixels
	 * SN - Screen Size 320x320 pixels
	 */
	size: 'TN' | 'PV' | 'HR' | 'SN'
}

/** Retrieves a template's profile image in binary format 
 * @params - Object containing the input parameters for the event template image to be received
*/
export const readTemplateProfileImage = async (params: ReadTemplateProfileImageParams) => {

	const url = READ_EVENT_TEMPLATE_IMAGE(params.templateId, params.size);
	const payload = await performRequest({ url, method: 'get' });

	return payload;
};