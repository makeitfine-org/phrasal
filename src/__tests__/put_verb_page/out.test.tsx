import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "out" section toggle', () => {
  it('renders "out" section toggle', () => {
    renderPage();
    expect(screen.getByText('out')).toBeInTheDocument();
  });

  it('"out" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To extinguish a fire or a cigarette/i)).not.toBeInTheDocument();
  });

  it('clicking "out" expands all 4 "out" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('out'));
    expect(screen.getByText(/To extinguish a fire or a cigarette/i)).toBeInTheDocument();
    expect(screen.getByText(/To publish or release something/i)).toBeInTheDocument();
    expect(screen.getByText(/To inconvenience someone/i)).toBeInTheDocument();
    expect(screen.getByText(/To place something outside/i)).toBeInTheDocument();
  });

  it('clicking "out" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('out'));
    fireEvent.click(screen.getByText('out'));
    expect(screen.queryByText(/To extinguish a fire or a cigarette/i)).not.toBeInTheDocument();
  });

  it('saves "out" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('out'));
    expect(localStorage.getItem('putOut_section_expanded')).toBe('true');
  });

  it('restores "out" section collapsed state from localStorage', () => {
    localStorage.setItem('putOut_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To extinguish a fire or a cigarette/i)).not.toBeInTheDocument();
  });
});

describe('PutVerbPage — "out" chevron and colour', () => {
  it('out chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('out'));
    const header = screen.getByText('out').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('out particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('out')).toHaveClass('text-blue-600');
  });

  it('out particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('out'));
    expect(screen.getByText('out')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "out" card view (default image)', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/"The fire alarm rang, but they quickly put out the small fire\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The team put out a new version of the app last night\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I hope it doesn't put you out if we move the meeting to 5 PM\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Don't forget to put out the recycling bins\."/i)).toBeInTheDocument();
  });

  it('all cards have cursor-default class', () => {
    renderPage();
    expandSection('out');
    expect(getCard(/To extinguish a fire or a cigarette/i)).toHaveClass('cursor-default');
    expect(getCard(/To publish or release something/i)).toHaveClass('cursor-default');
    expect(getCard(/To inconvenience someone/i)).toHaveClass('cursor-default');
    expect(getCard(/To place something outside/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('out');
    fireEvent.click(getCard(/To extinguish a fire or a cigarette/i));
    fireEvent.click(getCard(/To publish or release something/i));
    fireEvent.click(getCard(/To inconvenience someone/i));
    fireEvent.click(getCard(/To place something outside/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
