import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "for" section definitions', () => {
  it('renders definition for running toward safety or cover', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To suddenly run toward something \(usually safety or cover\)/i)).toBeInTheDocument();
  });

  it('renders definition for pausing an activity', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To pause an activity for a short period/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To suddenly run toward something \(usually safety or cover\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To pause an activity for a short period/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To suddenly run toward something \(usually safety or cover\)/i)).toHaveAttribute(
      'title',
      'To suddenly run toward something (usually safety or cover).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'breakFor_section_expanded', /To suddenly run toward something \(usually safety or cover\)/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'breakFor', /To suddenly run toward something \(usually safety or cover\)/i, /When the rain started pouring, we broke for the trees/i, renderPage, getCard);
