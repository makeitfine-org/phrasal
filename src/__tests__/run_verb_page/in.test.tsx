import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "in" section definitions', () => {
  it('renders definition for using a new machine carefully', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To use a new machine carefully/i)).toBeInTheDocument();
  });

  it('renders definition for arresting someone', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrest someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To use a new machine carefully/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To use a new machine carefully/i)).toHaveAttribute(
      'title',
      'To use a new machine carefully until it is ready for normal use.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'runIn_section_expanded', /To use a new machine carefully/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'runIn', /To use a new machine carefully/i, /We need to run in the new servers before/i, renderPage, getCard);
