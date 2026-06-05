import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('MakeVerbPage — "away (with)" section toggle', () => {
  it('renders "away (with)" section toggle', () => {
    renderPage();
    expect(screen.getByText('away (with)')).toBeInTheDocument();
  });

  it('"away (with)" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To steal something and escape with it/i)).not.toBeInTheDocument();
  });

  it('clicking "away (with)" expands meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('away (with)'));
    expect(screen.getByText(/To steal something and escape with it/i)).toBeInTheDocument();
  });

  it('clicking "away (with)" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('away (with)'));
    fireEvent.click(screen.getByText('away (with)'));
    expect(screen.queryByText(/To steal something and escape with it/i)).not.toBeInTheDocument();
  });

  it('collapsing "away (with)" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('away (with)');
    fireEvent.click(screen.getByText('away (with)'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });

  it('saves "away (with)" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('away (with)'));
    expect(localStorage.getItem('makeAway_section_expanded')).toBe('true');
  });

  it('restores "away (with)" section collapsed state from localStorage', () => {
    localStorage.setItem('makeAway_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To steal something and escape with it/i)).not.toBeInTheDocument();
  });
});

describe('MakeVerbPage — "away (with)" chevron and colour', () => {
  it('away chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('away (with)'));
    const header = screen.getByText('away (with)').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('away chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const header = screen.getByText('away (with)').closest('div')!;
    expect(within(header).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('away particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('away (with)')).toHaveClass('text-blue-600');
  });

  it('away particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('away (with)'));
    expect(screen.getByText('away (with)')).toHaveClass('text-white');
  });
});

describe('MakeVerbPage — "away (with)" card view (default image)', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('away (with)');
    expect(screen.getByText(/"Hackers made away with thousands of encrypted passwords\."/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('away (with)');
    const card = getCard(/To steal something and escape with it/i);
    expect(card).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('away (with)');
    fireEvent.click(getCard(/To steal something and escape with it/i));
    expect(within(getCard(/To steal something and escape with it/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('clicking card does not save to localStorage', () => {
    renderPage();
    expandSection('away (with)');
    fireEvent.click(getCard(/To steal something and escape with it/i));
    expect(localStorage.getItem('makeAway_meaning_1_collapsed')).toBeNull();
  });
});
