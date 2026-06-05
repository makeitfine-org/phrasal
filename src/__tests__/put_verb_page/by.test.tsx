import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "by" section toggle', () => {
  it('renders "by" section toggle', () => {
    renderPage();
    expect(screen.getByText('by')).toBeInTheDocument();
  });

  it('"by" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To save money for the future/i)).not.toBeInTheDocument();
  });

  it('clicking "by" expands meaning card', () => {
    renderPage();
    fireEvent.click(screen.getByText('by'));
    expect(screen.getByText(/To save money for the future/i)).toBeInTheDocument();
  });

  it('clicking "by" twice collapses meaning card', () => {
    renderPage();
    fireEvent.click(screen.getByText('by'));
    fireEvent.click(screen.getByText('by'));
    expect(screen.queryByText(/To save money for the future/i)).not.toBeInTheDocument();
  });

  it('saves "by" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('by'));
    expect(localStorage.getItem('putBy_section_expanded')).toBe('true');
  });
});

describe('PutVerbPage — "by" chevron and colour', () => {
  it('by chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('by'));
    const header = screen.getByText('by').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
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

describe('PutVerbPage — "by" card view (default image)', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/"I try to put by some money each month for a new computer\."/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('by');
    expect(getCard(/To save money for the future/i)).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('by');
    fireEvent.click(getCard(/To save money for the future/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
