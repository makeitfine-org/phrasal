import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DoVerbPage — "by" section definitions', () => {
  it('renders definition for treating someone in a particular way', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To treat someone in a particular way/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To treat someone in a particular way/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To treat someone in a particular way/i)).toHaveAttribute(
      'title',
      'To treat someone in a particular way (almost always used in the phrase "do right by" or "do well by" someone).'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'doBy_section_expanded', /To treat someone in a particular way/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'doBy', /To treat someone in a particular way/i, /do right by your team members/i, renderPage, getCard);
