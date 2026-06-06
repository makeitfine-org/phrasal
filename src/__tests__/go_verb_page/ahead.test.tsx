import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "ahead" section definitions', () => {
  it('renders definition for starting or proceeding with an action', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To start or proceed with an action/i)).toBeInTheDocument();
  });

  it('renders definition for moving in front of someone', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To move in front of someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'ahead', 'goAhead_section_expanded', /To start or proceed with an action/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'goAhead', /To start or proceed with an action/i, /"We have the budget, so we can go ahead/i, renderPage, getCard);
