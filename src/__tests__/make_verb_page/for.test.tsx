import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('MakeVerbPage — "for" section toggle', () => {
  it('renders "for" section toggle', () => {
    renderPage();
    expect(screen.getByText('for')).toBeInTheDocument();
  });

  it('"for" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To move directly towards a place/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To help make something possible/i)).not.toBeInTheDocument();
  });

  it('clicking "for" expands all "for" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('for'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
    expect(screen.getByText(/To help make something possible/i)).toBeInTheDocument();
  });

  it('clicking "for" twice collapses all "for" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('for'));
    fireEvent.click(screen.getByText('for'));
    expect(screen.queryByText(/To move directly towards a place/i)).not.toBeInTheDocument();
  });

  it('collapsing "for" section does not affect other sections', () => {
    renderPage();
    expandSection('after');
    expandSection('out');
    expandSection('for');
    fireEvent.click(screen.getByText('for'));
    expect(screen.getByText(/To chase someone or something/i)).toBeInTheDocument();
    expect(screen.getByText(/To manage to see, hear, or read something with difficulty/i)).toBeInTheDocument();
  });

  it('saves "for" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('for'));
    expect(localStorage.getItem('makeFor_section_expanded')).toBe('true');
  });

  it('restores "for" section collapsed state from localStorage', () => {
    localStorage.setItem('makeFor_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To move directly towards a place/i)).not.toBeInTheDocument();
  });
});

describe('MakeVerbPage — "for" chevron and colour', () => {
  it('for chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('for'));
    const header = screen.getByText('for').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('for chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const header = screen.getByText('for').closest('div')!;
    expect(within(header).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('for particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('for')).toHaveClass('text-blue-600');
  });

  it('for particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('for'));
    expect(screen.getByText('for')).toHaveClass('text-white');
  });
});

describe('MakeVerbPage — "for" section definitions', () => {
  it('all 2 "for" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To move directly towards a place/i)).toHaveClass('truncate');
    expect(screen.getByText(/To help make something possible/i)).toHaveClass('truncate');
  });

  it('all 2 "for" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To move directly towards a place/i))
      .toHaveAttribute('title', 'To move directly towards a place');
    expect(screen.getByText(/To help make something possible/i))
      .toHaveAttribute('title', 'To help make something possible or produce a specific result');
  });
});

describe('MakeVerbPage — "for" card view (default image)', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/"After the meeting ended, we made for the exit\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Clear communication makes for a highly effective management team\."/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('for');
    const card = getCard(/To move directly towards a place/i);
    expect(card).toHaveClass('cursor-default');
  });

  it('card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('for');
    const card = getCard(/To move directly towards a place/i);
    expect(within(card).getByText(/"After the meeting ended/i))
      .toHaveAttribute('title', '"After the meeting ended, we made for the exit."');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('for');
    fireEvent.click(getCard(/To move directly towards a place/i));
    expect(within(getCard(/To move directly towards a place/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('clicking card does not save to localStorage', () => {
    renderPage();
    expandSection('for');
    fireEvent.click(getCard(/To move directly towards a place/i));
    expect(localStorage.getItem('makeFor_meaning_1_collapsed')).toBeNull();
  });
});
