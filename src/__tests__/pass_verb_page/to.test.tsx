import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "to" section definitions', () => {
  it('renders definition for transferring ownership or responsibility', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To transfer ownership or responsibility to someone else/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To transfer ownership or responsibility to someone else/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To transfer ownership or responsibility to someone else/i)).toHaveAttribute(
      'title',
      'To transfer ownership or responsibility to someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'passTo_section_expanded', /To transfer ownership or responsibility to someone else/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'passTo', /To transfer ownership or responsibility to someone else/i, /When the CEO retired, leadership passed to her deputy\./i, renderPage, getCard);
