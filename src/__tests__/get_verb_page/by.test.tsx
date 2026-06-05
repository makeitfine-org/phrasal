import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — "by" section toggle', () => {
  it('renders "by" section toggle', () => {
    renderPage();
    expect(screen.getByText('by')).toBeInTheDocument();
  });

  it('"by" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To manage to survive or do something with limited/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To physically move past someone/i)).not.toBeInTheDocument();
  });

  it('clicking "by" expands all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('by'));
    expect(screen.getByText(/To manage to survive or do something with limited/i)).toBeInTheDocument();
    expect(screen.getByText(/To physically move past someone/i)).toBeInTheDocument();
  });

  it('clicking "by" twice collapses all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('by'));
    fireEvent.click(screen.getByText('by'));
    expect(screen.queryByText(/To manage to survive or do something with limited/i)).not.toBeInTheDocument();
  });

  it('saves "by" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('by'));
    expect(localStorage.getItem('getBy_section_expanded')).toBe('true');
  });

  it('restores "by" section collapsed state from localStorage', () => {
    localStorage.setItem('getBy_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To manage to survive or do something with limited/i)).not.toBeInTheDocument();
  });
});

describe('GetVerbPage — "by" chevron and colour', () => {
  it('by chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('by'));
    const header = screen.getByText('by').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('by chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const header = screen.getByText('by').closest('div')!;
    expect(within(header).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('by chevron is blue when collapsed', () => {
    renderPage();
    const header = screen.getByText('by').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('by chevron is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('by'));
    const header = screen.getByText('by').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-white');
  });

  it('by particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('by')).toHaveClass('text-blue-600');
  });

  it('by particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('by'));
    expect(screen.getByText('by')).toHaveClass('text-white');
  });
});

describe('GetVerbPage — "by" section definitions', () => {
  it('all 2 "by" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To manage to survive or do something with limited/i)).toHaveClass('truncate');
    expect(screen.getByText(/To physically move past someone/i)).toHaveClass('truncate');
  });

  it('all 2 "by" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To manage to survive or do something with limited/i)).toHaveAttribute(
      'title',
      'To manage to survive or do something with limited money, knowledge, or resources'
    );
    expect(screen.getByText(/To physically move past someone/i)).toHaveAttribute(
      'title',
      'To physically move past someone'
    );
  });
});

describe('GetVerbPage — "by" card expand / collapse', () => {
  it('"by" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"My Spanish isn't perfect/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Excuse me, could you move a little/i)).not.toBeInTheDocument();
  });

  it('all 2 "by" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/"My Spanish isn't perfect, but I know enough to get by\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Excuse me, could you move a little so I can get by\?"/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "by" non-expandable cards (default image)', () => {
  it('by card has cursor-default class', () => {
    renderPage();
    expandSection('by');
    const card = getCard(/To manage to survive or do something with limited/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "by" card never renders an image', () => {
    renderPage();
    expandSection('by');
    fireEvent.click(getCard(/To manage to survive or do something with limited/i));
    expect(within(getCard(/To manage to survive or do something with limited/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('no "by" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('by');
    fireEvent.click(getCard(/To manage to survive or do something with limited/i));
    fireEvent.click(getCard(/To physically move past someone/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking "by" card does not remove truncate class', () => {
    renderPage();
    expandSection('by');
    fireEvent.click(getCard(/To manage to survive or do something with limited/i));
    expect(within(getCard(/To manage to survive or do something with limited/i)).getByText(/"My Spanish isn't perfect/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "by" localStorage persistence', () => {
  it('clicking "by" card does not save to localStorage', () => {
    renderPage();
    expandSection('by');
    fireEvent.click(getCard(/To manage to survive or do something with limited/i));
    expect(localStorage.getItem('getBy_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getBy_section_expanded', 'true');
    localStorage.setItem('getBy_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To manage to survive or do something with limited/i)).getByText(/"My Spanish isn't perfect/i)).toHaveClass('truncate');
  });
});
