import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HandVerbPage — "around / round / about" section definitions', () => {
  it('renders definition for offering or passing something to each person in a group', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To offer or pass something to each person in a group\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To offer or pass something to each person in a group\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To offer or pass something to each person in a group\./i)).toHaveAttribute(
      'title',
      'To offer or pass something to each person in a group.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round / about', 'handAround_section_expanded', /To offer or pass something to each person in a group\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round / about', renderPage);

describeDefaultImageCards(LABEL, 'around / round / about', 'handAround', /To offer or pass something to each person in a group\./i, /They handed around the new smartphones so the development team could test them\./i, renderPage, getCard);
