import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "about" section definitions', () => {
  it('renders definition for causing something to happen', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To cause something to happen/i)).toBeInTheDocument();
  });

  it('renders definition for causing a ship to change direction', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/\(Nautical\) To cause a ship to change direction/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To cause something to happen/i)).toHaveClass('truncate');
    expect(screen.getByText(/\(Nautical\) To cause a ship to change direction/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To cause something to happen/i)).toHaveAttribute(
      'title',
      'To cause something to happen.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'bringAbout_section_expanded', /To cause something to happen/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'bringAbout', /To cause something to happen/i, /The new management structure brought about/i, renderPage, getCard);
