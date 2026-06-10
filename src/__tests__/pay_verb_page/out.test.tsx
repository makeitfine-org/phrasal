import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PayVerbPage — "out" section definitions', () => {
  it('renders definition for disbursing a large amount of money', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To disburse or spend a large amount of money/i)).toBeInTheDocument();
  });

  it('renders definition for slowly releasing a rope', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To slowly release or let out a rope/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To disburse or spend a large amount of money/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To disburse or spend a large amount of money/i)).toHaveAttribute(
      'title',
      'To disburse or spend a large amount of money, often from a fund, insurance, or company profit (like dividends).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'payOut_section_expanded', /To disburse or spend a large amount of money/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'payOut', /To disburse or spend a large amount of money/i, /The insurance policy paid out \$50,000 after the office roof leaked\./i, renderPage, getCard);
