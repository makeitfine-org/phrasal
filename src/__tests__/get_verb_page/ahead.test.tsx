import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — "ahead" section toggle', () => {
  it('renders "ahead" section toggle', () => {
    renderPage();
    expect(screen.getByText('ahead')).toBeInTheDocument();
  });

  it('"ahead" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To be successful and make progress/i)).not.toBeInTheDocument();
  });

  it('clicking "ahead" expands all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('ahead'));
    expect(screen.getByText(/To be successful and make progress/i)).toBeInTheDocument();
  });

  it('clicking "ahead" twice collapses all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('ahead'));
    fireEvent.click(screen.getByText('ahead'));
    expect(screen.queryByText(/To be successful and make progress/i)).not.toBeInTheDocument();
  });

  it('saves "ahead" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('ahead'));
    expect(localStorage.getItem('getAhead_section_expanded')).toBe('true');
  });

  it('restores "ahead" section collapsed state from localStorage', () => {
    localStorage.setItem('getAhead_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To be successful and make progress/i)).not.toBeInTheDocument();
  });
});

describe('GetVerbPage — "ahead" chevron and colour', () => {
  it('ahead chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('ahead'));
    const header = screen.getByText('ahead').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('ahead chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const header = screen.getByText('ahead').closest('div')!;
    expect(within(header).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('ahead chevron is blue when collapsed', () => {
    renderPage();
    const header = screen.getByText('ahead').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('ahead chevron is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('ahead'));
    const header = screen.getByText('ahead').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-white');
  });

  it('ahead particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('ahead')).toHaveClass('text-blue-600');
  });

  it('ahead particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('ahead'));
    expect(screen.getByText('ahead')).toHaveClass('text-white');
  });
});

describe('GetVerbPage — "ahead" section definitions', () => {
  it('"ahead" definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To be successful and make progress/i)).toHaveClass('truncate');
  });

  it('"ahead" title attribute contains the full definition text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To be successful and make progress/i)).toHaveAttribute(
      'title',
      'To be successful and make progress in your career or life'
    );
  });
});

describe('GetVerbPage — "ahead" non-expandable card (default image)', () => {
  it('"ahead" card starts collapsed (no example visible before expand)', () => {
    renderPage();
    expect(screen.queryByText(/"She reads a lot of business books/i)).not.toBeInTheDocument();
  });

  it('"ahead" example visible without expanding card', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/"She reads a lot of business books because she wants to get ahead in her career\."/i)).toBeInTheDocument();
  });

  it('ahead card has cursor-default class', () => {
    renderPage();
    expandSection('ahead');
    const card = getCard(/To be successful and make progress/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "ahead" card never renders an image', () => {
    renderPage();
    expandSection('ahead');
    fireEvent.click(getCard(/To be successful and make progress/i));
    expect(within(getCard(/To be successful and make progress/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('clicking "ahead" card does not remove truncate class', () => {
    renderPage();
    expandSection('ahead');
    fireEvent.click(getCard(/To be successful and make progress/i));
    expect(within(getCard(/To be successful and make progress/i)).getByText(/"She reads a lot of business books/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "ahead" localStorage persistence', () => {
  it('clicking "ahead" card does not save to localStorage', () => {
    renderPage();
    expandSection('ahead');
    fireEvent.click(getCard(/To be successful and make progress/i));
    expect(localStorage.getItem('getAhead_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getAhead_section_expanded', 'true');
    localStorage.setItem('getAhead_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To be successful and make progress/i)).getByText(/"She reads a lot of business books/i)).toHaveClass('truncate');
  });
});
