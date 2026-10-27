import axios, { AxiosInstance, AxiosResponse } from 'axios';

const XSRF_COOKIE = 'XSRF-TOKEN';
const XSRF_HEADER = 'X-XSRF-TOKEN';
const CSRF_PRIMING_PATH = '/api/v1/phrasal-verbs?size=1';

export class ApiClient {
    private client: AxiosInstance;
    private xsrfToken?: string;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            timeout: 10000,
            validateStatus: () => true,
        });
    }

    async get(path: string): Promise<AxiosResponse> {
        return this.client.get(path);
    }

    async post(path: string, data: unknown): Promise<AxiosResponse> {
        return this.client.post(path, data, await this.writeConfig({ 'Content-Type': 'application/json' }));
    }

    async put(path: string, data: unknown): Promise<AxiosResponse> {
        return this.client.put(path, data, await this.writeConfig({ 'Content-Type': 'application/json' }));
    }

    async delete(path: string): Promise<AxiosResponse> {
        return this.client.delete(path, await this.writeConfig({}));
    }

    /** Headers for a state-changing call: the server rejects writes without a matching XSRF cookie + header. */
    private async writeConfig(headers: Record<string, string>) {
        const token = await this.csrfToken();
        return { headers: { ...headers, [XSRF_HEADER]: token, Cookie: `${XSRF_COOKIE}=${token}` } };
    }

    private async csrfToken(): Promise<string> {
        if (!this.xsrfToken) {
            const response = await this.client.get(CSRF_PRIMING_PATH);
            const cookies: string[] = response.headers['set-cookie'] ?? [];
            const entry = cookies.find((cookie) => cookie.startsWith(`${XSRF_COOKIE}=`));
            if (!entry) {
                throw new Error('Server did not set the XSRF-TOKEN cookie');
            }
            this.xsrfToken = entry.split(';')[0].substring(XSRF_COOKIE.length + 1);
        }
        return this.xsrfToken;
    }
}
