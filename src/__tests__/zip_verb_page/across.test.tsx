import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "across" section definitions', () => {
  it('renders definition for travelling rapidly across a space', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To travel very rapidly from one side of a space, surface, or area to the other\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    const def = screen.getByText(/To travel very rapidly from one side of a space, surface, or area to the other\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To travel very rapidly from one side of a space, surface, or area to the other\./i)).toHaveAttribute(
      'title',
      'To travel very rapidly from one side of a space, surface, or area to the other.'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'zipAcross_section_expanded', /To travel very rapidly from one side of a space, surface, or area to the other\./i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'zipAcross', /To travel very rapidly from one side of a space, surface, or area to the other\./i, /The speedboat zipped across the lake in under a minute\./i, renderPage, getCard);
