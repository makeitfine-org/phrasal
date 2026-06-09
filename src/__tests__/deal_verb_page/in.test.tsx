import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DealVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DealVerbPage — "in" section definitions', () => {
  it('renders definition for buying and selling products as a business', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To buy and sell specific products as a business\./i)).toBeInTheDocument();
  });

  it('renders definition for including someone in an activity', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include someone in an activity, especially a card game\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To buy and sell specific products as a business\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To buy and sell specific products as a business\./i)).toHaveAttribute(
      'title',
      'To buy and sell specific products as a business.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'dealIn_section_expanded', /To buy and sell specific products as a business\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'dealIn', /To buy and sell specific products as a business\./i, /His store deals in rare books and antique maps/i, renderPage, getCard);
