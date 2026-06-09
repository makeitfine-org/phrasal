import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "to" section definitions', () => {
  it('renders definition for shouting to get attention', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To shout in order to get someone's attention\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To shout in order to get someone's attention\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To shout in order to get someone's attention\./i)).toHaveAttribute(
      'title',
      "To shout in order to get someone's attention."
    );
  });
});

describeSectionToggle(LABEL, 'to', 'callTo_section_expanded', /To shout in order to get someone's attention\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'callTo', /To shout in order to get someone's attention\./i, /called to the cab driver to stop/i, renderPage, getCard);
