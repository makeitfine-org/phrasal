import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "across / over" section toggle', () => {
  it('renders "across / over" section toggle', () => {
    renderPage();
    expect(screen.getByText('across / over')).toBeInTheDocument();
  });

  it('"across / over" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To explain an idea clearly so people understand it/i)).not.toBeInTheDocument();
  });

  it('clicking "across / over" expands meaning card', () => {
    renderPage();
    fireEvent.click(screen.getByText('across / over'));
    expect(screen.getByText(/To explain an idea clearly so people understand it/i)).toBeInTheDocument();
  });

  it('clicking "across / over" twice collapses meaning card', () => {
    renderPage();
    fireEvent.click(screen.getByText('across / over'));
    fireEvent.click(screen.getByText('across / over'));
    expect(screen.queryByText(/To explain an idea clearly so people understand it/i)).not.toBeInTheDocument();
  });

  it('saves "across / over" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('across / over'));
    expect(localStorage.getItem('putAcrossOver_section_expanded')).toBe('true');
  });

  it('restores "across / over" section collapsed state from localStorage', () => {
    localStorage.setItem('putAcrossOver_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To explain an idea clearly so people understand it/i)).not.toBeInTheDocument();
  });
});

describe('PutVerbPage — "across / over" chevron and colour', () => {
  it('across / over chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('across / over'));
    const header = screen.getByText('across / over').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('across / over particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('across / over')).toHaveClass('text-blue-600');
  });

  it('across / over particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('across / over'));
    expect(screen.getByText('across / over')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "across / over" card view (default image)', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('across / over');
    expect(screen.getByText(/"The CEO put his vision across very well during the meeting\."/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('across / over');
    expect(getCard(/To explain an idea clearly so people understand it/i)).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('across / over');
    fireEvent.click(getCard(/To explain an idea clearly so people understand it/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
