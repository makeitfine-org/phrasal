import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('AskVerbPage — "into" section definitions', () => {
  it('renders definition for inviting someone into a specific room', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/Similar to "ask in," but used when specifying the exact room/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/Similar to "ask in," but used when specifying the exact room/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/Similar to "ask in," but used when specifying the exact room/i)).toHaveAttribute(
      'title',
      'Similar to "ask in," but used when specifying the exact room someone is invited into.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'askInto_section_expanded', /Similar to "ask in," but used when specifying the exact room/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'askInto', /Similar to "ask in," but used when specifying the exact room/i, /The manager asked me into his office/i, renderPage, getCard);
