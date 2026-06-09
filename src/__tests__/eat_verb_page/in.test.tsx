import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'EatVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('EatVerbPage — "in" section definitions', () => {
  it('renders definition for eating at home', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To eat a meal at home instead of going to a restaurant\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To eat a meal at home instead of going to a restaurant\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To eat a meal at home instead of going to a restaurant\./i)).toHaveAttribute(
      'title',
      'To eat a meal at home instead of going to a restaurant.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'eatIn_section_expanded', /To eat a meal at home instead of going to a restaurant\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'eatIn', /To eat a meal at home instead of going to a restaurant\./i, /We are trying to stick to a tight budget, so we plan to eat in this weekend\./i, renderPage, getCard);
