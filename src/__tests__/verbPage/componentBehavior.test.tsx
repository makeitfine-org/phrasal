import { renderPage, getCard } from '../zip_verb_page/helpers';
import {
  describeSectionToggle,
  describeChevronAndColour,
  describeDefaultImageCards,
} from './sharedSectionTests';

const LABEL = 'ZipVerbPage';
const PARTICLE = 'up';
const FIRST_DEF = /To close a garment, bag, or tent completely by fastening its zipper\./i;
const FIRST_EXAMPLE = /Make sure you zip up your coat; it's freezing outside!/i;

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, PARTICLE, 'zipUp_section_expanded', FIRST_DEF, renderPage, true);

describeChevronAndColour(LABEL, PARTICLE, renderPage, true);

describeDefaultImageCards(LABEL, PARTICLE, 'zipUp', FIRST_DEF, FIRST_EXAMPLE, renderPage, getCard, true);
