import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "through" section definitions', () => {
  it('renders definition for explaining a process step by step', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To explain a process or idea to someone step by step\./i)).toBeInTheDocument();
  });

  it('renders definition for discussing a problem in detail', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To discuss a problem in detail to find a solution\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    const defs = [
      screen.getByText(/To explain a process or idea to someone step by step\./i),
      screen.getByText(/To discuss a problem in detail to find a solution\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To explain a process or idea to someone step by step\./i)).toHaveAttribute(
      'title',
      'To explain a process or idea to someone step by step.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To discuss a problem in detail to find a solution\./i)).toHaveAttribute(
      'title',
      'To discuss a problem in detail to find a solution.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'talkThrough_section_expanded', /To explain a process or idea to someone step by step\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'talkThrough', /To explain a process or idea to someone step by step\./i, /Can you talk me through how to use this Java framework\?/i, renderPage, getCard);
