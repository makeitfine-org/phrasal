import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SitVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SitVerbPage — "up" section definitions', () => {
  it('renders definition for moving to a sitting position or sitting straight', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move from a lying down position to a sitting position, or to sit straight\./i)).toBeInTheDocument();
  });

  it('renders definition for staying awake late', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stay awake late into the night\./i)).toBeInTheDocument();
  });

  it('renders definition for suddenly paying attention', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To suddenly pay attention to something because it is surprising or important/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move from a lying down position to a sitting position, or to sit straight\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To stay awake late into the night\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To suddenly pay attention to something because it is surprising or important/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move from a lying down position to a sitting position, or to sit straight\./i)).toHaveAttribute(
      'title',
      'To move from a lying down position to a sitting position, or to sit straight.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'sitUp_section_expanded', /To move from a lying down position to a sitting position, or to sit straight\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'sitUp', /To move from a lying down position to a sitting position, or to sit straight\./i, /You should sit up straight during your job interview\./i, renderPage, getCard);
