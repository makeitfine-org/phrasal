import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "through" section definitions', () => {
  it('renders definition for travelling through a place briefly', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To travel or stop in a place for a very short time/i)).toBeInTheDocument();
  });

  it('renders definition for experiencing a phase or situation', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To experience a phase or situation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To travel or stop in a place for a very short time/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To travel or stop in a place for a very short time/i)).toHaveAttribute(
      'title',
      'To travel or stop in a place for a very short time.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'passThrough_section_expanded', /To travel or stop in a place for a very short time/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'passThrough', /To travel or stop in a place for a very short time/i, /I am just passing through Warsaw, so I only have time for a quick lunch\./i, renderPage, getCard);
