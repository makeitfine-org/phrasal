import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "ahead" section toggle', () => {
  it('renders "ahead" section toggle', () => {
    renderPage();
    expect(screen.getByText('ahead')).toBeInTheDocument();
  });

  it('"ahead" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To give someone an advantage over others/i)).not.toBeInTheDocument();
  });

  it('clicking "ahead" expands meaning card', () => {
    renderPage();
    fireEvent.click(screen.getByText('ahead'));
    expect(screen.getByText(/To give someone an advantage over others/i)).toBeInTheDocument();
  });

  it('clicking "ahead" twice collapses meaning card', () => {
    renderPage();
    fireEvent.click(screen.getByText('ahead'));
    fireEvent.click(screen.getByText('ahead'));
    expect(screen.queryByText(/To give someone an advantage over others/i)).not.toBeInTheDocument();
  });

  it('saves "ahead" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('ahead'));
    expect(localStorage.getItem('putAhead_section_expanded')).toBe('true');
  });
});

describe('PutVerbPage — "ahead" chevron and colour', () => {
  it('ahead chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('ahead'));
    const header = screen.getByText('ahead').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
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

describe('PutVerbPage — "ahead" card view (default image)', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/"Learning Java will really put you ahead in the job market\."/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('ahead');
    expect(getCard(/To give someone an advantage over others/i)).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('ahead');
    fireEvent.click(getCard(/To give someone an advantage over others/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
