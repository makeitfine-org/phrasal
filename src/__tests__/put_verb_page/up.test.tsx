import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "up" section toggle', () => {
  it('renders "up" section toggle', () => {
    renderPage();
    expect(screen.getByText('up')).toBeInTheDocument();
  });

  it('"up" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To build or erect something/i)).not.toBeInTheDocument();
  });

  it('clicking "up" expands all 4 "up" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText(/To build or erect something/i)).toBeInTheDocument();
    expect(screen.getByText(/To increase prices or rates/i)).toBeInTheDocument();
    expect(screen.getByText(/To provide accommodation for someone/i)).toBeInTheDocument();
    expect(screen.getByText(/To offer resistance or fight back/i)).toBeInTheDocument();
  });

  it('clicking "up" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    fireEvent.click(screen.getByText('up'));
    expect(screen.queryByText(/To build or erect something/i)).not.toBeInTheDocument();
  });

  it('saves "up" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    expect(localStorage.getItem('putUp_section_expanded')).toBe('true');
  });

  it('restores "up" section collapsed state from localStorage', () => {
    localStorage.setItem('putUp_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To build or erect something/i)).not.toBeInTheDocument();
  });
});

describe('PutVerbPage — "up" chevron and colour', () => {
  it('up chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    const header = screen.getByText('up').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('up particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('up')).toHaveClass('text-blue-600');
  });

  it('up particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText('up')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "up" card view (default image)', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/"They put up a new office building in Warsaw\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The software provider put up their subscription fees\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I can put you up at my apartment/i)).toBeInTheDocument();
    expect(screen.getByText(/"The competitor put up a strong fight for the market share\."/i)).toBeInTheDocument();
  });

  it('all cards have cursor-default class', () => {
    renderPage();
    expandSection('up');
    expect(getCard(/To build or erect something/i)).toHaveClass('cursor-default');
    expect(getCard(/To increase prices or rates/i)).toHaveClass('cursor-default');
    expect(getCard(/To provide accommodation for someone/i)).toHaveClass('cursor-default');
    expect(getCard(/To offer resistance or fight back/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To build or erect something/i));
    fireEvent.click(getCard(/To increase prices or rates/i));
    fireEvent.click(getCard(/To provide accommodation for someone/i));
    fireEvent.click(getCard(/To offer resistance or fight back/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
