import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "together" section definitions', () => {
  it('renders definition for considering as a whole', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To consider a group of things or facts as a whole/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'together', 'takeTogether_section_expanded', /To consider a group of things or facts as a whole/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'takeTogether', /To consider a group of things or facts as a whole/i, /"Taken together, these three software modules/i, renderPage, getCard);
