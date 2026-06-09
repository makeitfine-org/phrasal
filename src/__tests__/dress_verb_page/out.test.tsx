import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DressVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DressVerbPage — "out" section definitions', () => {
  it('renders definition for putting on a sports uniform', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To put on a sports uniform or equipment to get ready to play in a game\./i)).toBeInTheDocument();
  });

  it("renders definition for preparing an animal's body", () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To clean and prepare an animal's body so the meat can be eaten or sold\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To put on a sports uniform or equipment to get ready to play in a game\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To put on a sports uniform or equipment to get ready to play in a game\./i)).toHaveAttribute(
      'title',
      'To put on a sports uniform or equipment to get ready to play in a game.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'dressOut_section_expanded', /To put on a sports uniform or equipment to get ready to play in a game\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'dressOut', /To put on a sports uniform or equipment to get ready to play in a game\./i, /Only twenty players will dress out for the football game/i, renderPage, getCard);
