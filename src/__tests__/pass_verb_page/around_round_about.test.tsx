import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "around / round / about" section definitions', () => {
  it('renders definition for offering something to every person in a group', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To offer or give something to every person in a group/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To offer or give something to every person in a group/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To offer or give something to every person in a group/i)).toHaveAttribute(
      'title',
      'To offer or give something to every person in a group.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round / about', 'passAround_section_expanded', /To offer or give something to every person in a group/i, renderPage);

describeChevronAndColour(LABEL, 'around / round / about', renderPage);

describeDefaultImageCards(LABEL, 'around / round / about', 'passAround', /To offer or give something to every person in a group/i, /They passed around the tablet so everyone could see the new app design\./i, renderPage, getCard);
