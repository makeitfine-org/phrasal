import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('MakeVerbPage — "over" section toggle', () => {
  it('renders "over" section toggle', () => {
    renderPage();
    expect(screen.getByText('over')).toBeInTheDocument();
  });

  it('"over" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To change or improve the appearance/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To legally transfer ownership/i)).not.toBeInTheDocument();
  });

  it('clicking "over" expands all "over" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('over'));
    expect(screen.getByText(/To change or improve the appearance/i)).toBeInTheDocument();
    expect(screen.getByText(/To legally transfer ownership/i)).toBeInTheDocument();
  });

  it('clicking "over" twice collapses all "over" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('over'));
    fireEvent.click(screen.getByText('over'));
    expect(screen.queryByText(/To change or improve the appearance/i)).not.toBeInTheDocument();
  });

  it('collapsing "over" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('over');
    fireEvent.click(screen.getByText('over'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });

  it('saves "over" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('over'));
    expect(localStorage.getItem('makeOver_section_expanded')).toBe('true');
  });

  it('restores "over" section collapsed state from localStorage', () => {
    localStorage.setItem('makeOver_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To change or improve the appearance/i)).not.toBeInTheDocument();
  });
});

describe('MakeVerbPage — "over" chevron and colour', () => {
  it('over chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('over'));
    const header = screen.getByText('over').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('over particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('over')).toHaveClass('text-blue-600');
  });

  it('over particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('over'));
    expect(screen.getByText('over')).toHaveClass('text-white');
  });
});

describe('MakeVerbPage — "over" section definitions', () => {
  it('all 2 "over" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To change or improve the appearance/i)).toHaveClass('truncate');
    expect(screen.getByText(/To legally transfer ownership/i)).toHaveClass('truncate');
  });

  it('all 2 "over" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To change or improve the appearance/i))
      .toHaveAttribute('title', 'To change or improve the appearance of someone or something');
    expect(screen.getByText(/To legally transfer ownership/i))
      .toHaveAttribute('title', 'To legally transfer ownership of property or money to someone else');
  });
});

describe('MakeVerbPage — "over" card view (default image)', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/"We made over the entire office space/i)).toBeInTheDocument();
    expect(screen.getByText(/"The CEO made over his shares/i)).toBeInTheDocument();
  });

  it('cards have cursor-default class', () => {
    renderPage();
    expandSection('over');
    expect(getCard(/To change or improve the appearance/i)).toHaveClass('cursor-default');
    expect(getCard(/To legally transfer ownership/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('over');
    fireEvent.click(getCard(/To change or improve the appearance/i));
    fireEvent.click(getCard(/To legally transfer ownership/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
