import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ActVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ActVerbPage — "for" section definitions', () => {
  it('renders definition for representing someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To represent someone else or do something on their behalf/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To represent someone else or do something on their behalf/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To represent someone else or do something on their behalf/i)).toHaveAttribute(
      'title',
      'To represent someone else or do something on their behalf (especially in legal or business situations).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'actFor_section_expanded', /To represent someone else or do something on their behalf/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'actFor', /To represent someone else/i, /The lawyer was hired to act for/i, renderPage, getCard);
