import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { ApiClient } from './support/api-client';
import dotenv from 'dotenv';

dotenv.config();

setDefaultTimeout(30_000);

Before(function () {
    this.apiClient = new ApiClient(process.env.API_BASE_URL || 'http://localhost:8080');
    this.lastResponse = null;
});

After(function () {
    // cleanup if needed
});
