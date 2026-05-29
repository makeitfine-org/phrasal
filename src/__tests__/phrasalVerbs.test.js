import { rawData } from '../data/phrasalVerbs.js';
import fixture from './__fixtures__/phrasalVerbs.json';

const normalize = ([verb, definition, sentences, wordsToHide]) => ({
    verb,
    definition,
    sentences: Array.isArray(sentences) ? sentences : [sentences],
    wordsToHide,
});

describe('phrasalVerbs data', () => {
    test('entry count', () => {
        expect(rawData.length).toBe(228);
    });

    test('all entries match fixture', async () => {
        await expect(
            JSON.stringify(rawData.map(normalize), null, 2)
        ).toMatchFileSnapshot('./__fixtures__/phrasalVerbs.json');
    });

    test('no uncovered phrasal verbs', () => {
        const uncovered = rawData.slice(fixture.length).map(e => e[0]);
        expect(uncovered).toEqual([]);
    });
});
