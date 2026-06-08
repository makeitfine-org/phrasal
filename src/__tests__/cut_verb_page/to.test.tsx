import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "to" section definitions', () => {
  it('renders definition for skipping ahead to a specific point', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To skip ahead to a specific, more important point/i)).toBeInTheDocument();
  });

  it('renders definition for shifting to a new scene', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To shift to a new scene/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To skip ahead to a specific, more important point/i)).toHaveClass('truncate');
    expect(screen.getByText(/To shift to a new scene/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To skip ahead to a specific, more important point/i)).toHaveAttribute(
      'title',
      'To skip ahead to a specific, more important point.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'cutTo_section_expanded', /To skip ahead to a specific, more important point/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'cutTo', /To skip ahead to a specific, more important point/i, /Let's cut to the chase/i, renderPage, getCard);
