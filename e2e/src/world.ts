import { World } from '@cucumber/cucumber';
import { ApiClient } from './support/api-client';
import { AxiosResponse } from 'axios';

export interface PhrasalWorld extends World {
    apiClient: ApiClient;
    lastResponse: AxiosResponse | null;
}
