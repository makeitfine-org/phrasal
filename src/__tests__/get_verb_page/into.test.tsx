import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — "into" section toggle', () => {
  it('renders "into" section toggle', () => {
    renderPage();
    expect(screen.getByText('into')).toBeInTheDocument();
  });

  it('"into" section starts expanded showing all 3 definitions', () => {
    renderPage();
    expect(screen.getByText(/To become interested or involved in something/i)).toBeInTheDocument();
    expect(screen.getByText(/To enter a specific state or situation/i)).toBeInTheDocument();
    expect(screen.getByText(/To start a habit/i)).toBeInTheDocument();
  });

  it('clicking "into" collapses all "into" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    expect(screen.queryByText(/To become interested or involved in something/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To enter a specific state or situation/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To start a habit/i)).not.toBeInTheDocument();
  });

  it('clicking "into" twice restores all "into" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    fireEvent.click(screen.getByText('into'));
    expect(screen.getByText(/To become interested or involved in something/i)).toBeInTheDocument();
  });

  it('collapsing "into" section does not affect other sections', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To enter a car, room, or building/i)).toBeInTheDocument();
  });

  it('saves "into" section state to localStorage when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    expect(localStorage.getItem('getInto_section_expanded')).toBe('false');
  });

  it('restores "into" section collapsed state from localStorage', () => {
    localStorage.setItem('getInto_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To become interested or involved in something/i)).not.toBeInTheDocument();
  });
});

describe('GetVerbPage — "into" chevron and colour', () => {
  it('into chevron has rotate-90 class when expanded', () => {
    renderPage();
    const intoHeader = screen.getByText('into').closest('div')!;
    expect(within(intoHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  it('into chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    const intoHeader = screen.getByText('into').closest('div')!;
    expect(within(intoHeader).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('into chevron is blue when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    const intoHeader = screen.getByText('into').closest('div')!;
    expect(within(intoHeader).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('into chevron is white when expanded', () => {
    renderPage();
    const intoHeader = screen.getByText('into').closest('div')!;
    expect(within(intoHeader).getByText('▶')).toHaveClass('text-white');
  });

  it('into particle text is blue when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    expect(screen.getByText('into')).toHaveClass('text-blue-600');
  });

  it('into particle text is white when expanded', () => {
    renderPage();
    expect(screen.getByText('into')).toHaveClass('text-white');
  });
});

describe('GetVerbPage — "into" section definitions', () => {
  it('all 3 "into" definition paragraphs have truncate class', () => {
    renderPage();
    expect(screen.getByText(/To become interested or involved in something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To enter a specific state or situation/i)).toHaveClass('truncate');
    expect(screen.getByText(/To start a habit/i)).toHaveClass('truncate');
  });

  it('all 3 "into" title attributes contain the full definition text', () => {
    renderPage();
    expect(screen.getByText(/To become interested or involved in something/i)).toHaveAttribute('title', 'To become interested or involved in something');
    expect(screen.getByText(/To enter a specific state or situation/i)).toHaveAttribute('title', 'To enter a specific state or situation');
    expect(screen.getByText(/To start a habit/i)).toHaveAttribute('title', 'To start a habit');
  });
});

describe('GetVerbPage — "into" card expand / collapse', () => {
  it('"into" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I recently got into software development\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The company got into financial trouble last year\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I've got into the habit of checking my emails before breakfast\."/i)).not.toBeInTheDocument();
  });

  it('expands an "into" card when clicked', () => {
    renderPage();
    fireEvent.click(getCard(/To become interested or involved in something/i));
    expect(screen.getByText(/"I recently got into software development\."/i)).toBeInTheDocument();
  });

  it('renders all 3 "into" example sentences when all cards are expanded', () => {
    renderPage();
    fireEvent.click(getCard(/To become interested or involved in something/i));
    fireEvent.click(getCard(/To enter a specific state or situation/i));
    fireEvent.click(getCard(/To start a habit/i));
    expect(screen.getByText(/"I recently got into software development\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The company got into financial trouble last year\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I've got into the habit of checking my emails before breakfast\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "into" localStorage persistence', () => {
  it('saves "into" card expanded state to localStorage', () => {
    renderPage();
    fireEvent.click(getCard(/To become interested or involved in something/i));
    expect(localStorage.getItem('getInto_meaning_1_collapsed')).toBe('false');
  });

  it('restores "into" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getInto_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"I recently got into software development\."/i)).toBeInTheDocument();
  });
});
