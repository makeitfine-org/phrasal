import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "off" section definitions', () => {
  it('renders definition for succeeding in something difficult', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something very difficult, often unexpectedly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something very difficult, often unexpectedly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something very difficult, often unexpectedly/i)).toHaveAttribute(
      'title',
      'To succeed in doing something very difficult, often unexpectedly.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'bringOff_section_expanded', /To succeed in doing something very difficult, often unexpectedly/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'bringOff', /To succeed in doing something very difficult, often unexpectedly/i, /Negotiating that salary package with a tight budget/i, renderPage, getCard);
