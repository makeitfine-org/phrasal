import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('MakeVerbPage — "up" section toggle', () => {
  it('renders "up" section toggle', () => {
    renderPage();
    expect(screen.getByText('up')).toBeInTheDocument();
  });

  it('"up" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To invent a story, excuse, or explanation/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To form the whole of something/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To become friendly again after an argument/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To prepare, build, or arrange something from parts/i)).not.toBeInTheDocument();
  });

  it('clicking "up" expands all 4 "up" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText(/To invent a story, excuse, or explanation/i)).toBeInTheDocument();
    expect(screen.getByText(/To form the whole of something/i)).toBeInTheDocument();
    expect(screen.getByText(/To become friendly again after an argument/i)).toBeInTheDocument();
    expect(screen.getByText(/To prepare, build, or arrange something from parts/i)).toBeInTheDocument();
  });

  it('clicking "up" twice collapses all "up" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    fireEvent.click(screen.getByText('up'));
    expect(screen.queryByText(/To invent a story, excuse, or explanation/i)).not.toBeInTheDocument();
  });

  it('collapsing "up" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('out');
    expandSection('up');
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
    expect(screen.getByText(/To manage to see, hear, or read something with difficulty/i)).toBeInTheDocument();
  });

  it('saves "up" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    expect(localStorage.getItem('makeUp_section_expanded')).toBe('true');
  });

  it('restores "up" section collapsed state from localStorage', () => {
    localStorage.setItem('makeUp_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To invent a story, excuse, or explanation/i)).not.toBeInTheDocument();
  });
});

describe('MakeVerbPage — "up" chevron and colour', () => {
  it('up chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    const header = screen.getByText('up').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('up chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const header = screen.getByText('up').closest('div')!;
    expect(within(header).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('up particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('up')).toHaveClass('text-blue-600');
  });

  it('up particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText('up')).toHaveClass('text-white');
  });
});

describe('MakeVerbPage — "up" section definitions', () => {
  it('all 4 "up" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To invent a story, excuse, or explanation/i)).toHaveClass('truncate');
    expect(screen.getByText(/To form the whole of something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To become friendly again after an argument/i)).toHaveClass('truncate');
    expect(screen.getByText(/To prepare, build, or arrange something from parts/i)).toHaveClass('truncate');
  });

  it('all 4 "up" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To invent a story, excuse, or explanation/i))
      .toHaveAttribute('title', 'To invent a story, excuse, or explanation');
    expect(screen.getByText(/To form the whole of something/i))
      .toHaveAttribute('title', 'To form the whole of something');
    expect(screen.getByText(/To become friendly again after an argument/i))
      .toHaveAttribute('title', 'To become friendly again after an argument');
    expect(screen.getByText(/To prepare, build, or arrange something from parts/i))
      .toHaveAttribute('title', 'To prepare, build, or arrange something from parts');
  });
});

describe('MakeVerbPage — "up" card view (default image)', () => {
  it('all 4 examples visible without expanding cards', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/"He made up an excuse for missing the daily stand-up meeting\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Senior developers make up 40% of our engineering department\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The co-founders argued over the budget, but they made up the next day\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Can you make up a list of requirements for the new software module\?"/i)).toBeInTheDocument();
  });

  it('all cards have cursor-default class', () => {
    renderPage();
    expandSection('up');
    expect(getCard(/To invent a story, excuse, or explanation/i)).toHaveClass('cursor-default');
    expect(getCard(/To form the whole of something/i)).toHaveClass('cursor-default');
    expect(getCard(/To become friendly again after an argument/i)).toHaveClass('cursor-default');
    expect(getCard(/To prepare, build, or arrange something from parts/i)).toHaveClass('cursor-default');
  });

  it('no "up" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To invent a story, excuse, or explanation/i));
    fireEvent.click(getCard(/To form the whole of something/i));
    fireEvent.click(getCard(/To become friendly again after an argument/i));
    fireEvent.click(getCard(/To prepare, build, or arrange something from parts/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking card does not save to localStorage', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To invent a story, excuse, or explanation/i));
    expect(localStorage.getItem('makeUp_meaning_1_collapsed')).toBeNull();
  });
});
