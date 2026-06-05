import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('MakeVerbPage — "up for" section toggle', () => {
  it('renders "up for" section toggle', () => {
    renderPage();
    expect(screen.getByText('up for')).toBeInTheDocument();
  });

  it('"up for" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To compensate for something bad, missing, or lost/i)).not.toBeInTheDocument();
  });

  it('clicking "up for" expands meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('up for'));
    expect(screen.getByText(/To compensate for something bad, missing, or lost/i)).toBeInTheDocument();
  });

  it('clicking "up for" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('up for'));
    fireEvent.click(screen.getByText('up for'));
    expect(screen.queryByText(/To compensate for something bad, missing, or lost/i)).not.toBeInTheDocument();
  });

  it('collapsing "up for" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('up for');
    fireEvent.click(screen.getByText('up for'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });

  it('saves "up for" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('up for'));
    expect(localStorage.getItem('makeUpFor_section_expanded')).toBe('true');
  });

  it('restores "up for" section collapsed state from localStorage', () => {
    localStorage.setItem('makeUpFor_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To compensate for something bad, missing, or lost/i)).not.toBeInTheDocument();
  });
});

describe('MakeVerbPage — "up for" chevron and colour', () => {
  it('up for chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('up for'));
    const header = screen.getByText('up for').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('up for particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('up for')).toHaveClass('text-blue-600');
  });

  it('up for particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('up for'));
    expect(screen.getByText('up for')).toHaveClass('text-white');
  });
});

describe('MakeVerbPage — "up for" card view (default image)', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('up for');
    expect(screen.getByText(/"We worked late on Friday to make up for the time lost/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('up for');
    const card = getCard(/To compensate for something bad, missing, or lost/i);
    expect(card).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('up for');
    fireEvent.click(getCard(/To compensate for something bad, missing, or lost/i));
    expect(within(getCard(/To compensate for something bad, missing, or lost/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('clicking card does not save to localStorage', () => {
    renderPage();
    expandSection('up for');
    fireEvent.click(getCard(/To compensate for something bad, missing, or lost/i));
    expect(localStorage.getItem('makeUpFor_meaning_1_collapsed')).toBeNull();
  });
});
