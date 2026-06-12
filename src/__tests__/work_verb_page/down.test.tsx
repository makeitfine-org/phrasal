import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "down" section definitions', () => {
  it('renders definition for progressing downwards systematically through a list or pile', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To gradually reduce something or progress downwards systematically, often through a list or pile\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    const def = screen.getByText(/To gradually reduce something or progress downwards systematically, often through a list or pile\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To gradually reduce something or progress downwards systematically, often through a list or pile\./i)).toHaveAttribute(
      'title',
      'To gradually reduce something or progress downwards systematically, often through a list or pile.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'workDown_section_expanded', /To gradually reduce something or progress downwards systematically, often through a list or pile\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'workDown', /To gradually reduce something or progress downwards systematically, often through a list or pile\./i, /I have a huge stack of files; I'm just going to start at the top and work down\./i, renderPage, getCard);
