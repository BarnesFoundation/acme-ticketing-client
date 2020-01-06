import { performRequest } from '../../acmeRequestor';
import { CREATE_SESSION } from '../../../utils/acmeEndpoints';
import { CreateSessionPayload } from '../../../interfaces/acmeAuthenticationPayloads';

export interface EmailUser {
	"x-acme-email": string,
	"x-acme-password": string
}

export interface UsernameOnlyUser {
	"x-acme-user-name": string,
	"x-acme-password": string,
	"x-acme-tenantId": number
}

async function createSession(userParams: EmailUser | UsernameOnlyUser): Promise<CreateSessionPayload> {

	const additionalHeaders = { ...userParams };

	const payload = await performRequest({ url: CREATE_SESSION, method: 'get', additionalHeaders }) as CreateSessionPayload;
	return payload;
}

export { createSession };