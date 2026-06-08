import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "across" section definitions', () => {
  it('renders definition for taking a shortcut across an area', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To take a shortcut across an area/i)).toBeInTheDocument();
  });

  it('renders definition for affecting multiple groups', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To affect or apply to multiple different groups/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To take a shortcut across an area/i)).toHaveClass('truncate');
    expect(screen.getByText(/To affect or apply to multiple different groups/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To take a shortcut across an area/i)).toHaveAttribute(
      'title',
      'To take a shortcut across an area.'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'cutAcross_section_expanded', /To take a shortcut across an area/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'cutAcross', /To take a shortcut across an area/i, /We cut across the park/i, renderPage, getCard);
