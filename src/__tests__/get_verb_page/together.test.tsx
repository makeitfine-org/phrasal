import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — "together" section toggle', () => {
  it('renders "together" section toggle', () => {
    renderPage();
    expect(screen.getByText('together')).toBeInTheDocument();
  });

  it('"together" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To meet socially/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To organize your thoughts/i)).not.toBeInTheDocument();
  });

  it('clicking "together" expands all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('together'));
    expect(screen.getByText(/To meet socially/i)).toBeInTheDocument();
    expect(screen.getByText(/To organize your thoughts/i)).toBeInTheDocument();
  });

  it('clicking "together" twice collapses all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('together'));
    fireEvent.click(screen.getByText('together'));
    expect(screen.queryByText(/To meet socially/i)).not.toBeInTheDocument();
  });

  it('saves "together" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('together'));
    expect(localStorage.getItem('getTogether_section_expanded')).toBe('true');
  });

  it('restores "together" section collapsed state from localStorage', () => {
    localStorage.setItem('getTogether_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To meet socially/i)).not.toBeInTheDocument();
  });
});

describe('GetVerbPage — "together" chevron and colour', () => {
  it('together chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('together'));
    const header = screen.getByText('together').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('together chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const header = screen.getByText('together').closest('div')!;
    expect(within(header).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('together chevron is blue when collapsed', () => {
    renderPage();
    const header = screen.getByText('together').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('together chevron is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('together'));
    const header = screen.getByText('together').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-white');
  });

  it('together particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('together')).toHaveClass('text-blue-600');
  });

  it('together particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('together'));
    expect(screen.getByText('together')).toHaveClass('text-white');
  });
});

describe('GetVerbPage — "together" section definitions', () => {
  it('all 2 "together" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To meet socially/i)).toHaveClass('truncate');
    expect(screen.getByText(/To organize your thoughts/i)).toHaveClass('truncate');
  });

  it('all 2 "together" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To meet socially/i)).toHaveAttribute('title', 'To meet socially');
    expect(screen.getByText(/To organize your thoughts/i)).toHaveAttribute(
      'title',
      'To organize your thoughts, life, or things (often "get your act together")'
    );
  });
});

describe('GetVerbPage — "together" card expand / collapse', () => {
  it('"together" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"Let's get together for a coffee/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"If he wants a promotion/i)).not.toBeInTheDocument();
  });

  it('all 2 "together" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/"Let's get together for a coffee next week\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"If he wants a promotion, he needs to get his act together and work harder\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "together" non-expandable cards (default image)', () => {
  it('together card has cursor-default class', () => {
    renderPage();
    expandSection('together');
    const card = getCard(/To meet socially/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "together" card never renders an image', () => {
    renderPage();
    expandSection('together');
    fireEvent.click(getCard(/To meet socially/i));
    expect(within(getCard(/To meet socially/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('no "together" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('together');
    fireEvent.click(getCard(/To meet socially/i));
    fireEvent.click(getCard(/To organize your thoughts/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking "together" card does not remove truncate class', () => {
    renderPage();
    expandSection('together');
    fireEvent.click(getCard(/To meet socially/i));
    expect(within(getCard(/To meet socially/i)).getByText(/"Let's get together/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "together" localStorage persistence', () => {
  it('clicking "together" card does not save to localStorage', () => {
    renderPage();
    expandSection('together');
    fireEvent.click(getCard(/To meet socially/i));
    expect(localStorage.getItem('getTogether_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getTogether_section_expanded', 'true');
    localStorage.setItem('getTogether_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To meet socially/i)).getByText(/"Let's get together/i)).toHaveClass('truncate');
  });
});
