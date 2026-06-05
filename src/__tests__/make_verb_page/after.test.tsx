import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('MakeVerbPage — "after" section toggle', () => {
  it('renders "after" section toggle', () => {
    renderPage();
    expect(screen.getByText('after')).toBeInTheDocument();
  });

  it('"after" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To chase someone or something/i)).not.toBeInTheDocument();
  });

  it('clicking "after" expands "after" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('after'));
    expect(screen.getByText(/To chase someone or something/i)).toBeInTheDocument();
  });

  it('clicking "after" twice collapses "after" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('after'));
    fireEvent.click(screen.getByText('after'));
    expect(screen.queryByText(/To chase someone or something/i)).not.toBeInTheDocument();
  });

  it('collapsing "after" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('after');
    fireEvent.click(screen.getByText('after'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });

  it('saves "after" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('after'));
    expect(localStorage.getItem('makeAfter_section_expanded')).toBe('true');
  });

  it('restores "after" section collapsed state from localStorage', () => {
    localStorage.setItem('makeAfter_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To chase someone or something/i)).not.toBeInTheDocument();
  });
});

describe('MakeVerbPage — "after" chevron and colour', () => {
  it('after chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('after'));
    const header = screen.getByText('after').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('after chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const header = screen.getByText('after').closest('div')!;
    expect(within(header).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('after chevron is blue when collapsed', () => {
    renderPage();
    const header = screen.getByText('after').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('after chevron is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('after'));
    const header = screen.getByText('after').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-white');
  });

  it('after particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('after')).toHaveClass('text-blue-600');
  });

  it('after particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('after'));
    expect(screen.getByText('after')).toHaveClass('text-white');
  });
});

describe('MakeVerbPage — "after" section definitions', () => {
  it('"after" definition paragraph has truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To chase someone or something/i)).toHaveClass('truncate');
  });

  it('"after" title attribute contains full definition text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To chase someone or something/i))
      .toHaveAttribute('title', 'To chase someone or something');
  });
});

describe('MakeVerbPage — "after" card view (default image)', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/"The security guard made after the shoplifter\."/i)).toBeInTheDocument();
  });

  it('card example has truncate class', () => {
    renderPage();
    expandSection('after');
    const card = getCard(/To chase someone or something/i);
    expect(within(card).getByText(/"The security guard made after the shoplifter\."/i)).toHaveClass('truncate');
  });

  it('card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('after');
    const card = getCard(/To chase someone or something/i);
    expect(within(card).getByText(/"The security guard made after the shoplifter\."/i))
      .toHaveAttribute('title', '"The security guard made after the shoplifter."');
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('after');
    const card = getCard(/To chase someone or something/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('after');
    fireEvent.click(getCard(/To chase someone or something/i));
    expect(within(getCard(/To chase someone or something/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('clicking card does not save to localStorage', () => {
    renderPage();
    expandSection('after');
    fireEvent.click(getCard(/To chase someone or something/i));
    expect(localStorage.getItem('makeAfter_meaning_1_collapsed')).toBeNull();
  });
});
