import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "away" section toggle', () => {
  it('renders "away" section toggle', () => {
    renderPage();
    expect(screen.getByText('away')).toBeInTheDocument();
  });

  it('"away" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To store things in their correct place/i)).not.toBeInTheDocument();
  });

  it('clicking "away" expands all 4 "away" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('away'));
    expect(screen.getByText(/To store things in their correct place/i)).toBeInTheDocument();
    expect(screen.getByText(/To save money for the future/i)).toBeInTheDocument();
    expect(screen.getByText(/To send someone to prison or a mental hospital/i)).toBeInTheDocument();
    expect(screen.getByText(/To eat or drink a large amount/i)).toBeInTheDocument();
  });

  it('clicking "away" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('away'));
    fireEvent.click(screen.getByText('away'));
    expect(screen.queryByText(/To store things in their correct place/i)).not.toBeInTheDocument();
  });

  it('saves "away" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('away'));
    expect(localStorage.getItem('putAway_section_expanded')).toBe('true');
  });

  it('restores "away" section collapsed state from localStorage', () => {
    localStorage.setItem('putAway_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To store things in their correct place/i)).not.toBeInTheDocument();
  });
});

describe('PutVerbPage — "away" chevron and colour', () => {
  it('away chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('away'));
    const header = screen.getByText('away').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('away particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('away')).toHaveClass('text-blue-600');
  });

  it('away particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('away'));
    expect(screen.getByText('away')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "away" card view (default image)', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/"Please put away those files when you finish reading them\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"She puts away a portion of her salary every month for retirement\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The judge put him away for ten years for fraud\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He can really put away a lot of coffee during a coding session\."/i)).toBeInTheDocument();
  });

  it('all cards have cursor-default class', () => {
    renderPage();
    expandSection('away');
    expect(getCard(/To store things in their correct place/i)).toHaveClass('cursor-default');
    expect(getCard(/To save money for the future/i)).toHaveClass('cursor-default');
    expect(getCard(/To send someone to prison or a mental hospital/i)).toHaveClass('cursor-default');
    expect(getCard(/To eat or drink a large amount/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('away');
    fireEvent.click(getCard(/To store things in their correct place/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
