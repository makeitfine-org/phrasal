import { rawData } from '../data/phrasalVerbs.js';

describe('phrasalVerbs data snapshot', () => {
    test.each(rawData.map((entry, i) => [i, entry[0], entry]))(
        'entry %i: %s',
        (i, _verb, entry) => {
            const [verb, definition, sentences, wordsToHide] = entry;
            expect({
                verb,
                definition,
                sentences: Array.isArray(sentences) ? sentences : [sentences],
                wordsToHide,
            }).toMatchSnapshot();
        }
    );
});
