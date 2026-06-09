import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CleanVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CleanVerbPage — "out" section definitions', () => {
  it('renders definition for emptying and cleaning the inside of a space', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To empty and clean the inside of a space/i)).toBeInTheDocument();
  });

  it('renders definition for using all of someone\'s money', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To use or take all of someone's money\./i)).toBeInTheDocument();
  });

  it('renders definition for stealing everything of value from a place', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To steal everything of value from a place\./i)).toBeInTheDocument();
  });

  it('first definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To empty and clean the inside of a space/i)).toHaveClass('truncate');
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To empty and clean the inside of a space/i)).toHaveAttribute(
      'title',
      'To empty and clean the inside of a space (like a room, cupboard, or box), usually by throwing away unwanted items.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'cleanOut_section_expanded', /To empty and clean the inside of a space/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'cleanOut', /To empty and clean the inside of a space/i, /I spent my Saturday cleaning out the garage/i, renderPage, getCard);
