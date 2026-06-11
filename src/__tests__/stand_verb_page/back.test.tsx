import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "back" section definitions', () => {
  it('renders definition for moving a short distance away', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To move a short distance away or backwards\./i)).toBeInTheDocument();
  });

  it('renders definition for viewing a situation objectively', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To view a situation objectively, from a wider perspective\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To move a short distance away or backwards\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To view a situation objectively, from a wider perspective\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To move a short distance away or backwards\./i)).toHaveAttribute(
      'title',
      'To move a short distance away or backwards.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'standBack_section_expanded', /To move a short distance away or backwards\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'standBack', /To move a short distance away or backwards\./i, /The firefighters told everyone to stand back\./i, renderPage, getCard);
