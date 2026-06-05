import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — "forward" section toggle', () => {
  it('renders "forward" section toggle', () => {
    renderPage();
    expect(screen.getByText('forward')).toBeInTheDocument();
  });

  it('"forward" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To move to the front/i)).not.toBeInTheDocument();
  });

  it('clicking "forward" expands all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('forward'));
    expect(screen.getByText(/To move to the front/i)).toBeInTheDocument();
  });

  it('clicking "forward" twice collapses all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('forward'));
    fireEvent.click(screen.getByText('forward'));
    expect(screen.queryByText(/To move to the front/i)).not.toBeInTheDocument();
  });

  it('saves "forward" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('forward'));
    expect(localStorage.getItem('getForward_section_expanded')).toBe('true');
  });

  it('restores "forward" section collapsed state from localStorage', () => {
    localStorage.setItem('getForward_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To move to the front/i)).not.toBeInTheDocument();
  });
});

describe('GetVerbPage — "forward" chevron and colour', () => {
  it('forward chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('forward'));
    const header = screen.getByText('forward').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('forward chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const header = screen.getByText('forward').closest('div')!;
    expect(within(header).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('forward chevron is blue when collapsed', () => {
    renderPage();
    const header = screen.getByText('forward').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('forward chevron is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('forward'));
    const header = screen.getByText('forward').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-white');
  });

  it('forward particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('forward')).toHaveClass('text-blue-600');
  });

  it('forward particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('forward'));
    expect(screen.getByText('forward')).toHaveClass('text-white');
  });
});

describe('GetVerbPage — "forward" section definitions', () => {
  it('"forward" definition paragraph has truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move to the front/i)).toHaveClass('truncate');
  });

  it('"forward" title attribute contains the full definition text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move to the front/i)).toHaveAttribute(
      'title',
      'To move to the front (often used in sports to describe attacking)'
    );
  });
});

describe('GetVerbPage — "forward" non-expandable card (default image)', () => {
  it('"forward" card starts collapsed (no example visible before expand)', () => {
    renderPage();
    expect(screen.queryByText(/"The team's defenders need to get forward/i)).not.toBeInTheDocument();
  });

  it('"forward" example visible without expanding card', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/"The team's defenders need to get forward to help score a goal\."/i)).toBeInTheDocument();
  });

  it('forward card has cursor-default class', () => {
    renderPage();
    expandSection('forward');
    const card = getCard(/To move to the front/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "forward" card never renders an image', () => {
    renderPage();
    expandSection('forward');
    fireEvent.click(getCard(/To move to the front/i));
    expect(within(getCard(/To move to the front/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('clicking "forward" card does not remove truncate class', () => {
    renderPage();
    expandSection('forward');
    fireEvent.click(getCard(/To move to the front/i));
    expect(within(getCard(/To move to the front/i)).getByText(/"The team's defenders/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "forward" localStorage persistence', () => {
  it('clicking "forward" card does not save to localStorage', () => {
    renderPage();
    expandSection('forward');
    fireEvent.click(getCard(/To move to the front/i));
    expect(localStorage.getItem('getForward_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getForward_section_expanded', 'true');
    localStorage.setItem('getForward_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To move to the front/i)).getByText(/"The team's defenders/i)).toHaveClass('truncate');
  });
});
