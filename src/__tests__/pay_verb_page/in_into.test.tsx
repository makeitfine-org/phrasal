import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PayVerbPage — "in / into" section definitions', () => {
  it('renders definition for putting money into a bank account', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To put money into a bank account, pension, or fund/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To put money into a bank account, pension, or fund/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To put money into a bank account, pension, or fund/i)).toHaveAttribute(
      'title',
      'To put money into a bank account, pension, or fund.'
    );
  });
});

describeSectionToggle(LABEL, 'in / into', 'payIn_section_expanded', /To put money into a bank account, pension, or fund/i, renderPage);

describeChevronAndColour(LABEL, 'in / into', renderPage);

describeDefaultImageCards(LABEL, 'in / into', 'payIn', /To put money into a bank account, pension, or fund/i, /I need to go to the bank to pay in these checks\./i, renderPage, getCard);
