import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('MakeVerbPage — "off (with)" section toggle', () => {
  it('renders "off (with)" section toggle', () => {
    renderPage();
    expect(screen.getByText('off (with)')).toBeInTheDocument();
  });

  it('"off (with)" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To leave quickly, especially to escape/i)).not.toBeInTheDocument();
  });

  it('clicking "off (with)" expands meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('off (with)'));
    expect(screen.getByText(/To leave quickly, especially to escape/i)).toBeInTheDocument();
  });

  it('clicking "off (with)" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('off (with)'));
    fireEvent.click(screen.getByText('off (with)'));
    expect(screen.queryByText(/To leave quickly, especially to escape/i)).not.toBeInTheDocument();
  });

  it('collapsing "off (with)" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('off (with)');
    fireEvent.click(screen.getByText('off (with)'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });

  it('saves "off (with)" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('off (with)'));
    expect(localStorage.getItem('makeOff_section_expanded')).toBe('true');
  });

  it('restores "off (with)" section collapsed state from localStorage', () => {
    localStorage.setItem('makeOff_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To leave quickly, especially to escape/i)).not.toBeInTheDocument();
  });
});

describe('MakeVerbPage — "off (with)" chevron and colour', () => {
  it('off chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('off (with)'));
    const header = screen.getByText('off (with)').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('off chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const header = screen.getByText('off (with)').closest('div')!;
    expect(within(header).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('off particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('off (with)')).toHaveClass('text-blue-600');
  });

  it('off particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('off (with)'));
    expect(screen.getByText('off (with)')).toHaveClass('text-white');
  });
});

describe('MakeVerbPage — "off (with)" card view (default image)', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('off (with)');
    expect(screen.getByText(/"The thieves made off before the police arrived\."/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('off (with)');
    const card = getCard(/To leave quickly, especially to escape/i);
    expect(card).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('off (with)');
    fireEvent.click(getCard(/To leave quickly, especially to escape/i));
    expect(within(getCard(/To leave quickly, especially to escape/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('clicking card does not save to localStorage', () => {
    renderPage();
    expandSection('off (with)');
    fireEvent.click(getCard(/To leave quickly, especially to escape/i));
    expect(localStorage.getItem('makeOff_meaning_1_collapsed')).toBeNull();
  });
});
