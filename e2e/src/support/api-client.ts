import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const XSRF_COOKIE = 'XSRF-TOKEN';
const XSRF_HEADER = 'X-XSRF-TOKEN';
const CSRF_PRIMING_PATH = '/api/v1/phrasal-verbs?size=1';

export interface WriteOptions {
    /** Set to false to omit the X-XSRF-TOKEN header (negative CSRF scenarios). */
    csrf?: boolean;
}

/** HTTP client with a tiny cookie jar: axios in Node keeps no cookies, but session + CSRF need them. */
export class ApiClient {
    private client: AxiosInstance;
    private cookies = new Map<string, string>();

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            timeout: 10000,
            validateStatus: () => true,
        });
        this.client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            if (this.cookies.size > 0) {
                config.headers.set('Cookie', [...this.cookies].map(([name, value]) => `${name}=${value}`).join('; '));
            }
            return config;
        });
        this.client.interceptors.response.use((response: AxiosResponse) => {
            this.storeCookies(response.headers['set-cookie'] ?? []);
            return response;
        });
    }

    getCookie(name: string): string | undefined {
        return this.cookies.get(name);
    }

    clearCookies(): void {
        this.cookies.clear();
    }

    async get(path: string): Promise<AxiosResponse> {
        return this.client.get(path);
    }

    async post(path: string, data?: unknown, options: WriteOptions = {}): Promise<AxiosResponse> {
        return this.client.post(path, data, await this.writeConfig(options, data !== undefined));
    }

    async put(path: string, data: unknown, options: WriteOptions = {}): Promise<AxiosResponse> {
        return this.client.put(path, data, await this.writeConfig(options, true));
    }

    async delete(path: string, options: WriteOptions = {}): Promise<AxiosResponse> {
        return this.client.delete(path, await this.writeConfig(options, false));
    }

    /** Headers for a state-changing call: the server rejects writes without a matching XSRF cookie + header. */
    private async writeConfig(options: WriteOptions, hasBody: boolean) {
        const headers: Record<string, string> = {};
        if (hasBody) {
            headers['Content-Type'] = 'application/json';
        }
        if (options.csrf !== false) {
            headers[XSRF_HEADER] = await this.csrfToken();
        }
        return { headers };
    }

    private async csrfToken(): Promise<string> {
        if (!this.cookies.has(XSRF_COOKIE)) {
            await this.client.get(CSRF_PRIMING_PATH);
        }
        const token = this.cookies.get(XSRF_COOKIE);
        if (!token) {
            throw new Error('Server did not set the XSRF-TOKEN cookie');
        }
        return token;
    }

    private storeCookies(setCookies: string[]): void {
        for (const header of setCookies) {
            const [pair, ...attributes] = header.split(';').map((part) => part.trim());
            const separator = pair.indexOf('=');
            if (separator < 1) {
                continue;
            }
            const name = pair.substring(0, separator);
            const value = pair.substring(separator + 1);
            if (value === '' || this.isExpired(attributes)) {
                this.cookies.delete(name);
            } else {
                this.cookies.set(name, value);
            }
        }
    }

    private isExpired(attributes: string[]): boolean {
        return attributes.some((attribute) => {
            const [key, val] = attribute.split('=');
            const lowerKey = key.toLowerCase();
            if (lowerKey === 'max-age') {
                return Number(val) <= 0;
            }
            return lowerKey === 'expires' && Date.parse(val) <= Date.now();
        });
    }
}
