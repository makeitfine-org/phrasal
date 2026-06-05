import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "to" section toggle', () => {
  it('renders "to" section toggle', () => {
    renderPage();
    expect(screen.getByText('to')).toBeInTheDocument();
  });

  it('"to" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To suggest an idea or a question to someone directly/i)).not.toBeInTheDocument();
  });

  it('clicking "to" expands meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('to'));
    expect(screen.getByText(/To suggest an idea or a question to someone directly/i)).toBeInTheDocument();
    expect(screen.getByText(/To cause trouble or expense for someone/i)).toBeInTheDocument();
  });

  it('clicking "to" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('to'));
    fireEvent.click(screen.getByText('to'));
    expect(screen.queryByText(/To suggest an idea or a question to someone directly/i)).not.toBeInTheDocument();
  });

  it('saves "to" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('to'));
    expect(localStorage.getItem('putTo_section_expanded')).toBe('true');
  });
});

describe('PutVerbPage — "to" chevron and colour', () => {
  it('to chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('to'));
    const header = screen.getByText('to').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('to particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('to')).toHaveClass('text-blue-600');
  });

  it('to particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('to'));
    expect(screen.getByText('to')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "to" card view (default image)', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/"I put it to the board of directors, but they rejected the idea\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Moving the server room put us to a lot of trouble\."/i)).toBeInTheDocument();
  });

  it('cards have cursor-default class', () => {
    renderPage();
    expandSection('to');
    expect(getCard(/To suggest an idea or a question to someone directly/i)).toHaveClass('cursor-default');
    expect(getCard(/To cause trouble or expense for someone/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('to');
    fireEvent.click(getCard(/To suggest an idea or a question to someone directly/i));
    fireEvent.click(getCard(/To cause trouble or expense for someone/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
