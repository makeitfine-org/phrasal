import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — "across" section toggle', () => {
  it('renders "across" section toggle', () => {
    renderPage();
    expect(screen.getByText('across')).toBeInTheDocument();
  });

  it('"across" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To communicate an idea successfully/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To physically cross a road/i)).not.toBeInTheDocument();
  });

  it('clicking "across" expands all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('across'));
    expect(screen.getByText(/To communicate an idea successfully/i)).toBeInTheDocument();
    expect(screen.getByText(/To physically cross a road/i)).toBeInTheDocument();
  });

  it('clicking "across" twice collapses all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('across'));
    fireEvent.click(screen.getByText('across'));
    expect(screen.queryByText(/To communicate an idea successfully/i)).not.toBeInTheDocument();
  });

  it('saves "across" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('across'));
    expect(localStorage.getItem('getAcross_section_expanded')).toBe('true');
  });

  it('restores "across" section collapsed state from localStorage', () => {
    localStorage.setItem('getAcross_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To communicate an idea successfully/i)).not.toBeInTheDocument();
  });
});

describe('GetVerbPage — "across" chevron and colour', () => {
  it('across chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('across'));
    const header = screen.getByText('across').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('across chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const header = screen.getByText('across').closest('div')!;
    expect(within(header).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('across chevron is blue when collapsed', () => {
    renderPage();
    const header = screen.getByText('across').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('across chevron is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('across'));
    const header = screen.getByText('across').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-white');
  });

  it('across particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('across')).toHaveClass('text-blue-600');
  });

  it('across particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('across'));
    expect(screen.getByText('across')).toHaveClass('text-white');
  });
});

describe('GetVerbPage — "across" section definitions', () => {
  it('all 2 "across" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To communicate an idea successfully/i)).toHaveClass('truncate');
    expect(screen.getByText(/To physically cross a road/i)).toHaveClass('truncate');
  });

  it('all 2 "across" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To communicate an idea successfully/i)).toHaveAttribute(
      'title',
      'To communicate an idea successfully so people understand it'
    );
    expect(screen.getByText(/To physically cross a road/i)).toHaveAttribute(
      'title',
      'To physically cross a road, river, or space'
    );
  });
});

describe('GetVerbPage — "across" card expand / collapse', () => {
  it('"across" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"The leader got her vision across/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We need to get across the street\."/i)).not.toBeInTheDocument();
  });

  it('all 2 "across" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/"The leader got her vision across perfectly during the presentation\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We need to get across the street\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "across" non-expandable cards (default image)', () => {
  it('across card has cursor-default class', () => {
    renderPage();
    expandSection('across');
    const card = getCard(/To communicate an idea successfully/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "across" card never renders an image', () => {
    renderPage();
    expandSection('across');
    fireEvent.click(getCard(/To communicate an idea successfully/i));
    expect(within(getCard(/To communicate an idea successfully/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('no "across" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('across');
    fireEvent.click(getCard(/To communicate an idea successfully/i));
    fireEvent.click(getCard(/To physically cross a road/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking "across" card does not remove truncate class', () => {
    renderPage();
    expandSection('across');
    fireEvent.click(getCard(/To communicate an idea successfully/i));
    expect(within(getCard(/To communicate an idea successfully/i)).getByText(/"The leader got her vision across/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "across" localStorage persistence', () => {
  it('clicking "across" card does not save to localStorage', () => {
    renderPage();
    expandSection('across');
    fireEvent.click(getCard(/To communicate an idea successfully/i));
    expect(localStorage.getItem('getAcross_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getAcross_section_expanded', 'true');
    localStorage.setItem('getAcross_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To communicate an idea successfully/i)).getByText(/"The leader got her vision across/i)).toHaveClass('truncate');
  });
});
