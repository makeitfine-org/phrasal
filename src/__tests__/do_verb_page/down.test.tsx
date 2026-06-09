import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DoVerbPage — "down" section definitions', () => {
  it('renders definition for criticizing someone unfairly', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To criticize someone unfairly, making them or yourself seem less successful or important\./i)).toBeInTheDocument();
  });

  it('renders definition for cheating someone in a business deal', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To cheat someone, usually in a business deal\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To criticize someone unfairly, making them or yourself seem less successful or important\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To criticize someone unfairly, making them or yourself seem less successful or important\./i)).toHaveAttribute(
      'title',
      'To criticize someone unfairly, making them or yourself seem less successful or important.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'doDown_section_expanded', /To criticize someone unfairly, making them or yourself seem less successful or important\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'doDown', /To criticize someone unfairly, making them or yourself seem less successful or important\./i, /Stop doing yourself down/i, renderPage, getCard);
