import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "after" section definitions', () => {
  it('renders definition for shouting after someone walking away', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To shout to someone as they are walking away from you\./i)).toBeInTheDocument();
  });

  it('renders definition for naming a child', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To give a child the same name as someone else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To shout to someone as they are walking away from you\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To shout to someone as they are walking away from you\./i)).toHaveAttribute(
      'title',
      'To shout to someone as they are walking away from you.'
    );
  });
});

describeSectionToggle(LABEL, 'after', 'callAfter_section_expanded', /To shout to someone as they are walking away from you\./i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'callAfter', /To shout to someone as they are walking away from you\./i, /called after him, but he had already entered the elevator/i, renderPage, getCard);
