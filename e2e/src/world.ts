import { World } from '@cucumber/cucumber';
import { ApiClient } from './support/api-client';
import { AxiosResponse } from 'axios';
import { Browser, Page } from 'playwright';

export interface PhrasalWorld extends World {
    apiClient: ApiClient;
    lastResponse: AxiosResponse | null;
    browser: Browser | null;
    page: Page | null;
    currentEmail: string | null;
    newEmail: string | null;
    verificationTokens: string[];
    resetTokens: string[];
    firstRegistrationResponse: AxiosResponse | null;
    twoFactorSecret: string | null;
    recoveryCodes: string[];
    previousRecoveryCodes: string[];
    lastTotpStep: number | null;
}
