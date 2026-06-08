import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "out" section definitions', () => {
  it('renders definition for removing by cutting', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove a shape or part by cutting/i)).toBeInTheDocument();
  });

  it('renders definition for stopping something completely', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop eating or doing something completely/i)).toBeInTheDocument();
  });

  it('renders definition for machines stopping working', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To suddenly stop working/i)).toBeInTheDocument();
  });

  it('renders definition for excluding someone', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To exclude someone/i)).toBeInTheDocument();
  });

  it('renders definition for being naturally suited', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be naturally suited for something/i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove a shape or part by cutting/i)).toHaveClass('truncate');
    expect(screen.getByText(/To stop eating or doing something completely/i)).toHaveClass('truncate');
    expect(screen.getByText(/To suddenly stop working/i)).toHaveClass('truncate');
    expect(screen.getByText(/To exclude someone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To be naturally suited for something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove a shape or part by cutting/i)).toHaveAttribute(
      'title',
      'To remove a shape or part by cutting.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'cutOut_section_expanded', /To remove a shape or part by cutting/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'cutOut', /To remove a shape or part by cutting/i, /She cut out an interesting article/i, renderPage, getCard);
