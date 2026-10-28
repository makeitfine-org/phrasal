import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';

const PROGRESS = '/api/v1/me/quiz-progress';
const OVERSIZED_PADDING = 70_000;

function range(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index + 1);
}

function document(excludedCount: number) {
    return {
        schemaVersion: 1,
        mastered: range(excludedCount),
        excluded: range(excludedCount),
        history: [],
        currentIndex: -1,
    };
}

function lastData(world: PhrasalWorld) {
    assert.ok(world.lastResponse, 'No response recorded');
    return world.lastResponse!.data;
}

When('I request my {string} quiz progress', async function (this: PhrasalWorld, key: string) {
    this.lastResponse = await this.apiClient.get(`${PROGRESS}/${key}`);
});

When('I save my {string} quiz progress with {int} excluded items', async function (
    this: PhrasalWorld, key: string, count: number) {
    this.lastResponse = await this.apiClient.put(`${PROGRESS}/${key}`, { state: document(count) });
});

When('I save a raw quiz progress body {string} for {string}', async function (
    this: PhrasalWorld, body: string, key: string) {
    this.lastResponse = await this.apiClient.put(`${PROGRESS}/${key}`, body);
});

When('I save an oversized {string} quiz progress', async function (this: PhrasalWorld, key: string) {
    const state = { ...document(1), padding: 'x'.repeat(OVERSIZED_PADDING) };
    this.lastResponse = await this.apiClient.put(`${PROGRESS}/${key}`, { state });
});

Then('the quiz progress should have {int} excluded items', function (this: PhrasalWorld, count: number) {
    assert.equal(lastData(this).state.excluded.length, count);
});

Then('the quiz progress version should be {int}', function (this: PhrasalWorld, version: number) {
    assert.equal(lastData(this).version, version);
});
