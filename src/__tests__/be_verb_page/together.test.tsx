import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "together" section definitions', () => {
  it('renders definition for being unified', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To be unified or in a relationship\./i)).toBeInTheDocument();
  });

  it('renders definition for being organized', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To be organized \(have it together\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To be unified or in a relationship\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be organized \(have it together\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To be unified or in a relationship\./i)).toHaveAttribute(
      'title',
      'To be unified or in a relationship.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'beTogether_section_expanded', /To be unified or in a relationship\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'beTogether', /To be unified or in a relationship\./i, /The leadership team needs to be together on this decision/i, renderPage, getCard);
