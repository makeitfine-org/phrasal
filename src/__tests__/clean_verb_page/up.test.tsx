import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CleanVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CleanVerbPage — "up" section definitions', () => {
  it('renders definition for making a place completely clean and tidy', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a place or a person completely clean and tidy\./i)).toBeInTheDocument();
  });

  it('renders definition for making a large profit quickly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a large profit or a lot of money quickly\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping crime or corruption', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop crime, corruption, or bad behavior in a specific organization or area\./i)).toBeInTheDocument();
  });

  it('first definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a place or a person completely clean and tidy\./i)).toHaveClass('truncate');
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a place or a person completely clean and tidy\./i)).toHaveAttribute(
      'title',
      'To make a place or a person completely clean and tidy.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'cleanUp_section_expanded', /To make a place or a person completely clean and tidy\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'cleanUp', /To make a place or a person completely clean and tidy\./i, /We need to clean up the living room/i, renderPage, getCard);
