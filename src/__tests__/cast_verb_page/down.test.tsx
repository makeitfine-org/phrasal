import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CastVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CastVerbPage — "down" section definitions', () => {
  it('renders definition for making someone feel discouraged', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make someone feel sad, depressed, or discouraged/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'down', 'castDown_section_expanded', /To make someone feel sad, depressed, or discouraged/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'castDown', /To make someone feel sad, depressed, or discouraged/i, /"The engineering team was very cast down/i, renderPage, getCard);
