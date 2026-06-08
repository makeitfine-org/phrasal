import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "through" section definitions', () => {
  it('renders definition for taking a shortcut through an area', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To take a shortcut through an area/i)).toBeInTheDocument();
  });

  it('renders definition for bypassing obstacles and bureaucracy', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To quickly deal with or bypass obstacles and bureaucracy/i)).toBeInTheDocument();
  });

  it('renders definition for penetrating a barrier', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To penetrate a barrier such as sound, darkness, or confusion/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To take a shortcut through an area/i)).toHaveClass('truncate');
    expect(screen.getByText(/To quickly deal with or bypass obstacles and bureaucracy/i)).toHaveClass('truncate');
    expect(screen.getByText(/To penetrate a barrier such as sound, darkness, or confusion/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To take a shortcut through an area/i)).toHaveAttribute(
      'title',
      'To take a shortcut through an area.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'cutThrough_section_expanded', /To take a shortcut through an area/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'cutThrough', /To take a shortcut through an area/i, /Let's cut through the alley/i, renderPage, getCard);
