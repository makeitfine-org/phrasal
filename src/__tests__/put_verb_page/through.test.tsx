import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "through" section toggle', () => {
  it('renders "through" section toggle', () => {
    renderPage();
    expect(screen.getByText('through')).toBeInTheDocument();
  });

  it('"through" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To connect someone on the telephone/i)).not.toBeInTheDocument();
  });

  it('clicking "through" expands all 3 "through" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('through'));
    expect(screen.getByText(/To connect someone on the telephone/i)).toBeInTheDocument();
    expect(screen.getByText(/To make someone experience something very difficult/i)).toBeInTheDocument();
    expect(screen.getByText(/To successfully complete a business transaction or proposal/i)).toBeInTheDocument();
  });

  it('clicking "through" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('through'));
    fireEvent.click(screen.getByText('through'));
    expect(screen.queryByText(/To connect someone on the telephone/i)).not.toBeInTheDocument();
  });

  it('saves "through" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('through'));
    expect(localStorage.getItem('putThrough_section_expanded')).toBe('true');
  });
});

describe('PutVerbPage — "through" chevron and colour', () => {
  it('through chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('through'));
    const header = screen.getByText('through').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('through particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('through')).toHaveClass('text-blue-600');
  });

  it('through particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('through'));
    expect(screen.getByText('through')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "through" card view (default image)', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/"Please hold the line, I will put you through to the IT department\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The tough interview process really put the candidates through a lot of stress\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We finally managed to put the deal through\."/i)).toBeInTheDocument();
  });

  it('all cards have cursor-default class', () => {
    renderPage();
    expandSection('through');
    expect(getCard(/To connect someone on the telephone/i)).toHaveClass('cursor-default');
    expect(getCard(/To make someone experience something very difficult/i)).toHaveClass('cursor-default');
    expect(getCard(/To successfully complete a business transaction or proposal/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('through');
    fireEvent.click(getCard(/To connect someone on the telephone/i));
    fireEvent.click(getCard(/To make someone experience something very difficult/i));
    fireEvent.click(getCard(/To successfully complete a business transaction or proposal/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
