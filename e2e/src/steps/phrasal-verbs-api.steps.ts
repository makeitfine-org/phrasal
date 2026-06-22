import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';

Given('the API is available', async function (this: PhrasalWorld) {
    const response = await this.apiClient.get('/actuator/health');
    assert.equal(response.status, 200);
});

When('I request GET {string}', async function (this: PhrasalWorld, path: string) {
    this.lastResponse = await this.apiClient.get(path);
});

When(
    'I create a phrasal verb with verb {string} and definition {string}',
    async function (this: PhrasalWorld, verb: string, definition: string) {
        this.lastResponse = await this.apiClient.post('/api/phrasal-verbs', {
            verb,
            definition,
            sentences: ['Example sentence.'],
            wordsToHide: [verb.toLowerCase()],
            isLearned: false,
        });
    }
);

Then('the response status should be {int}', function (this: PhrasalWorld, status: number) {
    assert.ok(this.lastResponse, 'No response recorded');
    assert.equal(this.lastResponse!.status, status);
});

Then('the response should contain a paginated list', function (this: PhrasalWorld) {
    assert.ok(this.lastResponse, 'No response recorded');
    const data = this.lastResponse!.data;
    assert.ok(Array.isArray(data.content), 'Expected paginated content array');
    assert.ok(typeof data.totalElements === 'number', 'Expected totalElements');
});

Then('the response should contain {string}', function (this: PhrasalWorld, field: string) {
    assert.ok(this.lastResponse, 'No response recorded');
    assert.ok(field in this.lastResponse!.data, `Expected field "${field}" in response`);
});
