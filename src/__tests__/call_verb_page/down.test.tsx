import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "down" section definitions', () => {
  it('renders definition for shouting to someone on a lower level', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To shout to someone who is on a lower level than you\./i)).toBeInTheDocument();
  });

  it('renders definition for requesting punishment', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To request negative consequences or punishment upon someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To shout to someone who is on a lower level than you\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To shout to someone who is on a lower level than you\./i)).toHaveAttribute(
      'title',
      'To shout to someone who is on a lower level than you.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'callDown_section_expanded', /To shout to someone who is on a lower level than you\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'callDown', /To shout to someone who is on a lower level than you\./i, /called down from the second floor/i, renderPage, getCard);
