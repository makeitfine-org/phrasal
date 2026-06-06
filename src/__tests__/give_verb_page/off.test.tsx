import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GiveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GiveVerbPage — "off" section definitions', () => {
  it('renders definition for producing/emitting something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To produce or emit something physical/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'off', 'giveOff_section_expanded', /To produce or emit something physical/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'giveOff', /To produce or emit something physical/i, /"The server room gives off a lot of heat/i, renderPage, getCard);
