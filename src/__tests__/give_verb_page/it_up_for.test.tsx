import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GiveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GiveVerbPage — "(it) up for" section definitions', () => {
  it('renders definition for applauding someone', () => {
    renderPage();
    expandSection('(it) up for');
    expect(screen.getByText(/To applaud or clap for someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, '(it) up for', 'giveItUpFor_section_expanded', /To applaud or clap for someone/i, renderPage);

describeChevronAndColour(LABEL, '(it) up for', renderPage);

describeDefaultImageCards(LABEL, '(it) up for', 'giveItUpFor', /To applaud or clap for someone/i, /"Let's give it up for our keynote speaker/i, renderPage, getCard);
