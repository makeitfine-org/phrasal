import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PayVerbPage — "for" section definitions', () => {
  it('renders definition for giving money in exchange for goods or services', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To give money in exchange for goods or services/i)).toBeInTheDocument();
  });

  it('renders definition for suffering negative results of a mistake', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To suffer the negative results of a mistake or bad decision/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To give money in exchange for goods or services/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To give money in exchange for goods or services/i)).toHaveAttribute(
      'title',
      'To give money in exchange for goods or services.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'payFor_section_expanded', /To give money in exchange for goods or services/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'payFor', /To give money in exchange for goods or services/i, /The company will pay for your travel expenses\./i, renderPage, getCard);
