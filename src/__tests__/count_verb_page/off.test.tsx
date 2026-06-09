import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CountVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CountVerbPage — "off" section definitions', () => {
  it('renders definition for saying numbers aloud to divide a group', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To say numbers aloud in order, usually to divide a group of people into smaller teams\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To say numbers aloud in order, usually to divide a group of people into smaller teams\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To say numbers aloud in order, usually to divide a group of people into smaller teams\./i)).toHaveAttribute(
      'title',
      'To say numbers aloud in order, usually to divide a group of people into smaller teams.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'countOff_section_expanded', /To say numbers aloud in order, usually to divide a group of people into smaller teams\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'countOff', /To say numbers aloud in order, usually to divide a group of people into smaller teams\./i, /The coach asked the players to count off by threes/i, renderPage, getCard);
