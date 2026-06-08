import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "to" section definitions', () => {
  it('renders definition for gently telling someone bad news', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To tell someone bad or surprising news gently/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To tell someone bad or surprising news gently/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To tell someone bad or surprising news gently/i)).toHaveAttribute(
      'title',
      'To tell someone bad or surprising news gently (used as "break it to" or "break the news to").'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'breakTo_section_expanded', /To tell someone bad or surprising news gently/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'breakTo', /To tell someone bad or surprising news gently/i, /I hate to break it to you/i, renderPage, getCard);
