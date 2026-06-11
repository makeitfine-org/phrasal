import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "up" section definitions', () => {
  it('renders definition for finding information in a reference', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To try to find a piece of information/i)).toBeInTheDocument();
  });

  it('renders definition for improving or getting better', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To improve or get better/i)).toBeInTheDocument();
  });

  it('renders definition for contacting someone not seen for a long time', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To contact or visit someone you have not seen/i)).toBeInTheDocument();
  });

  it('renders definition for deeply respecting someone', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To deeply respect and admire someone/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To try to find a piece of information/i),
      screen.getByText(/To improve or get better/i),
      screen.getByText(/To contact or visit someone you have not seen/i),
      screen.getByText(/To deeply respect and admire someone/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To try to find a piece of information/i)).toHaveAttribute(
      'title',
      'To try to find a piece of information in a book, list, or on the internet.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To improve or get better/i)).toHaveAttribute(
      'title',
      'To improve or get better (usually referring to a situation or business).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To contact or visit someone you have not seen/i)).toHaveAttribute(
      'title',
      'To contact or visit someone you have not seen for a long time.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To deeply respect and admire someone/i)).toHaveAttribute(
      'title',
      'To deeply respect and admire someone (look up to).'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'lookUp_section_expanded', /To try to find a piece of information/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'lookUp', /To try to find a piece of information/i, /If you don't know the exact syntax/i, renderPage, getCard);
