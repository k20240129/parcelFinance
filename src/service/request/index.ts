import { getServiceEnvConfig } from '~/.env-config';
import { createRequest } from './request';

const { url, urlPattern, secondUrl, secondUrlPattern } = getServiceEnvConfig(import.meta.env);

export const mockRequest = createRequest({ baseURL: url });
