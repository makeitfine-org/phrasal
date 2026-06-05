import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('MakeVerbPage — "with" section toggle', () => {
  it('renders "with" section toggle', () => {
    renderPage();
    expect(screen.getByText('with')).toBeInTheDocument();
  });

  it('"with" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To produce, supply, or give something quickly/i)).not.toBeInTheDocument();
  });

  it('clicking "with" expands meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('with'));
    expect(screen.getByText(/To produce, supply, or give something quickly/i)).toBeInTheDocument();
  });

  it('clicking "with" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('with'));
    fireEvent.click(screen.getByText('with'));
    expect(screen.queryByText(/To produce, supply, or give something quickly/i)).not.toBeInTheDocument();
  });

  it('collapsing "with" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('with');
    fireEvent.click(screen.getByText('with'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });

  it('saves "with" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('with'));
    expect(localStorage.getItem('makeWith_section_expanded')).toBe('true');
  });

  it('restores "with" section collapsed state from localStorage', () => {
    localStorage.setItem('makeWith_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To produce, supply, or give something quickly/i)).not.toBeInTheDocument();
  });
});

describe('MakeVerbPage — "with" chevron and colour', () => {
  it('with chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('with'));
    const header = screen.getByText('with').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('with particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('with')).toHaveClass('text-blue-600');
  });

  it('with particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('with'));
    expect(screen.getByText('with')).toHaveClass('text-white');
  });
});

describe('MakeVerbPage — "with" card view (default image)', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/"Make with the financial reports, the board is waiting!"/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('with');
    const card = getCard(/To produce, supply, or give something quickly/i);
    expect(card).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('with');
    fireEvent.click(getCard(/To produce, supply, or give something quickly/i));
    expect(within(getCard(/To produce, supply, or give something quickly/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});
