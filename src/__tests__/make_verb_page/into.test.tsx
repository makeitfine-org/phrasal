import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('MakeVerbPage — "into" section toggle', () => {
  it('renders "into" section toggle', () => {
    renderPage();
    expect(screen.getByText('into')).toBeInTheDocument();
  });

  it('"into" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To change or transform something into something else/i)).not.toBeInTheDocument();
  });

  it('clicking "into" expands meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    expect(screen.getByText(/To change or transform something into something else/i)).toBeInTheDocument();
  });

  it('clicking "into" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    fireEvent.click(screen.getByText('into'));
    expect(screen.queryByText(/To change or transform something into something else/i)).not.toBeInTheDocument();
  });

  it('collapsing "into" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('into');
    fireEvent.click(screen.getByText('into'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });

  it('saves "into" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    expect(localStorage.getItem('makeInto_section_expanded')).toBe('true');
  });

  it('restores "into" section collapsed state from localStorage', () => {
    localStorage.setItem('makeInto_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To change or transform something into something else/i)).not.toBeInTheDocument();
  });
});

describe('MakeVerbPage — "into" chevron and colour', () => {
  it('into chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    const header = screen.getByText('into').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('into chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const header = screen.getByText('into').closest('div')!;
    expect(within(header).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('into particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('into')).toHaveClass('text-blue-600');
  });

  it('into particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    expect(screen.getByText('into')).toHaveClass('text-white');
  });
});

describe('MakeVerbPage — "into" card view (default image)', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/"The developers made the old legacy system into a modern Java application\."/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('into');
    const card = getCard(/To change or transform something into something else/i);
    expect(card).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('into');
    fireEvent.click(getCard(/To change or transform something into something else/i));
    expect(within(getCard(/To change or transform something into something else/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});
