import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BackVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BackVerbPage — "down" section definitions', () => {
  it('renders definition for admitting you were wrong', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To admit that you were wrong, or to stop demanding something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To admit that you were wrong, or to stop demanding something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To admit that you were wrong, or to stop demanding something/i)).toHaveAttribute(
      'title',
      'To admit that you were wrong, or to stop demanding something because of opposition.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'backDown_section_expanded', /To admit that you were wrong, or to stop demanding something/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'backDown', /To admit that you were wrong, or to stop demanding something/i, /A good manager knows when to back down/i, renderPage, getCard);
