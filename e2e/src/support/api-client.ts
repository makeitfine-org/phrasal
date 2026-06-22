import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class ApiClient {
    private client: AxiosInstance;

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
        return this.client.post(path, data, {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    async put(path: string, data: unknown): Promise<AxiosResponse> {
        return this.client.put(path, data, {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    async delete(path: string): Promise<AxiosResponse> {
        return this.client.delete(path);
    }
}
