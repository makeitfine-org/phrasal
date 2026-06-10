import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HangVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HangVerbPage — "down" section definitions', () => {
  it('renders definition for dropping or falling loosely downwards', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To drop or fall loosely downwards/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To drop or fall loosely downwards/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To drop or fall loosely downwards/i)).toHaveAttribute(
      'title',
      'To drop or fall loosely downwards (usually describing hair, clothing, or branches).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'hangDown_section_expanded', /To drop or fall loosely downwards/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'hangDown', /To drop or fall loosely downwards/i, /Her long coat hung down to her ankles\./i, renderPage, getCard);
