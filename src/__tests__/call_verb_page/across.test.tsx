import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "across" section definitions', () => {
  it('renders definition for shouting across a space', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To shout to someone on the other side of a room, street, or space\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To shout to someone on the other side of a room, street, or space\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To shout to someone on the other side of a room, street, or space\./i)).toHaveAttribute(
      'title',
      'To shout to someone on the other side of a room, street, or space.'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'callAcross_section_expanded', /To shout to someone on the other side of a room, street, or space\./i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'callAcross', /To shout to someone on the other side of a room, street, or space\./i, /called across the open-plan office/i, renderPage, getCard);
