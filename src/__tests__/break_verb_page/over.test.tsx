import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "over" section definitions', () => {
  it('renders definition for waves washing over something', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To wash or burst over something \(like waves\)/i)).toBeInTheDocument();
  });

  it('renders definition for weather happening suddenly in a location', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To happen suddenly and intensely in a specific location/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To wash or burst over something \(like waves\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To happen suddenly and intensely in a specific location/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To wash or burst over something \(like waves\)/i)).toHaveAttribute(
      'title',
      'To wash or burst over something (like waves).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'breakOver_section_expanded', /To wash or burst over something \(like waves\)/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'breakOver', /To wash or burst over something \(like waves\)/i, /The massive wave broke over the bow/i, renderPage, getCard);
