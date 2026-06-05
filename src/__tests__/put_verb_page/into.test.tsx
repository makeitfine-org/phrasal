import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "into" section toggle', () => {
  it('renders "into" section toggle', () => {
    renderPage();
    expect(screen.getByText('into')).toBeInTheDocument();
  });

  it('"into" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To invest time, money, or effort into a project/i)).not.toBeInTheDocument();
  });

  it('clicking "into" expands meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    expect(screen.getByText(/To invest time, money, or effort into a project/i)).toBeInTheDocument();
    expect(screen.getByText(/To express something in words/i)).toBeInTheDocument();
  });

  it('clicking "into" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    fireEvent.click(screen.getByText('into'));
    expect(screen.queryByText(/To invest time, money, or effort into a project/i)).not.toBeInTheDocument();
  });

  it('saves "into" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    expect(localStorage.getItem('putInto_section_expanded')).toBe('true');
  });

  it('restores "into" section collapsed state from localStorage', () => {
    localStorage.setItem('putInto_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To invest time, money, or effort into a project/i)).not.toBeInTheDocument();
  });
});

describe('PutVerbPage — "into" chevron and colour', () => {
  it('into chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('into'));
    const header = screen.getByText('into').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
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

describe('PutVerbPage — "into" card view (default image)', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/"The company put a lot of money into research and development\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"It is hard to put this complex business strategy into simple words\."/i)).toBeInTheDocument();
  });

  it('cards have cursor-default class', () => {
    renderPage();
    expandSection('into');
    expect(getCard(/To invest time, money, or effort into a project/i)).toHaveClass('cursor-default');
    expect(getCard(/To express something in words/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('into');
    fireEvent.click(getCard(/To invest time, money, or effort into a project/i));
    fireEvent.click(getCard(/To express something in words/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
