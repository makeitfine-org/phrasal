import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HangVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HangVerbPage — "up" section definitions', () => {
  it('renders definition for ending a telephone conversation', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To end a telephone conversation by breaking the connection\./i)).toBeInTheDocument();
  });

  it('renders definition for placing a piece of clothing on a hook or hanger', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To place a piece of clothing on a hook or a hanger\./i)).toBeInTheDocument();
  });

  it('renders definition for causing a delay or problem', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To cause a delay or problem/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To end a telephone conversation by breaking the connection\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To end a telephone conversation by breaking the connection\./i)).toHaveAttribute(
      'title',
      'To end a telephone conversation by breaking the connection.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'hangUp_section_expanded', /To end a telephone conversation by breaking the connection\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'hangUp', /To end a telephone conversation by breaking the connection\./i, /Please don't hang up on me, I haven't finished explaining the problem!/i, renderPage, getCard);
