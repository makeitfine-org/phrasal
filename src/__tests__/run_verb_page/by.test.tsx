import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "by" section definitions', () => {
  it('renders definition for telling someone about an idea to get approval', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To tell someone about an idea to get their opinion/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To tell someone about an idea to get their opinion/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To tell someone about an idea to get their opinion/i)).toHaveAttribute(
      'title',
      'To tell someone about an idea to get their opinion or approval.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'runBy_section_expanded', /To tell someone about an idea to get their opinion/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'runBy', /To tell someone about an idea to get their opinion/i, /I need to run this new architecture design by the CTO/i, renderPage, getCard);
