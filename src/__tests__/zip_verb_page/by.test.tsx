import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "by" section definitions', () => {
  it('renders definition for passing someone quickly', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To physically pass someone or something very quickly\./i)).toBeInTheDocument();
  });

  it('renders definition for time passing quickly', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/Of time: to pass very quickly\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('by');
    const defs = [
      screen.getByText(/To physically pass someone or something very quickly\./i),
      screen.getByText(/Of time: to pass very quickly\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To physically pass someone or something very quickly\./i)).toHaveAttribute(
      'title',
      'To physically pass someone or something very quickly.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/Of time: to pass very quickly\./i)).toHaveAttribute(
      'title',
      'Of time: to pass very quickly.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'zipBy_section_expanded', /To physically pass someone or something very quickly\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'zipBy', /To physically pass someone or something very quickly\./i, /A cyclist zipped by me on the trail and nearly startled me\./i, renderPage, getCard);
