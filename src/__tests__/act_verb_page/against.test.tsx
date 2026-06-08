import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ActVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ActVerbPage — "against" section definitions', () => {
  it('renders definition for opposing or violating', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To do something that opposes, harms, or violates/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To do something that opposes, harms, or violates/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To do something that opposes, harms, or violates/i)).toHaveAttribute(
      'title',
      'To do something that opposes, harms, or violates a person, rule, or interest.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'actAgainst_section_expanded', /To do something that opposes, harms, or violates/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'actAgainst', /To do something that opposes/i, /By sharing confidential data/i, renderPage, getCard);
