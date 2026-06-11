import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TryVerbPage — "out" section definitions', () => {
  it('renders definition for testing something in a practical setting', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To test something/i)).toBeInTheDocument();
  });

  it('renders definition for testing an idea on someone', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To test an idea/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To test something/i),
      screen.getByText(/To test an idea/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To test something/i)).toHaveAttribute(
      'title',
      'To test something (such as a new system, tool, or method) in a practical setting to evaluate its effectiveness or performance.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To test an idea/i)).toHaveAttribute(
      'title',
      'To test an idea, pitch, or product on someone to get their reaction (try out on).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'tryOut_section_expanded', /To test something/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'tryOut', /To test something/i, /We decided to try out a new GitHub sourcing extension/i, renderPage, getCard);
