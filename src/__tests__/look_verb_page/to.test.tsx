import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "to" section definitions', () => {
  it('renders definition for relying on someone to provide something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To rely on someone to provide something/i)).toBeInTheDocument();
  });

  it('renders definition for directing attention to something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To direct your attention to something\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To rely on someone to provide something/i),
      screen.getByText(/To direct your attention to something\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To rely on someone to provide something/i)).toHaveAttribute(
      'title',
      'To rely on someone to provide something (like help or advice).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To direct your attention to something\./i)).toHaveAttribute(
      'title',
      'To direct your attention to something.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'lookTo_section_expanded', /To rely on someone to provide something/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'lookTo', /To rely on someone to provide something/i, /The board of directors looks to the CEO/i, renderPage, getCard);
