import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "together" section toggle', () => {
  it('renders "together" section toggle', () => {
    renderPage();
    expect(screen.getByText('together')).toBeInTheDocument();
  });

  it('"together" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To assemble the parts of something/i)).not.toBeInTheDocument();
  });

  it('clicking "together" expands meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('together'));
    expect(screen.getByText(/To assemble the parts of something/i)).toBeInTheDocument();
    expect(screen.getByText(/To organize or create a group or plan/i)).toBeInTheDocument();
  });

  it('clicking "together" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('together'));
    fireEvent.click(screen.getByText('together'));
    expect(screen.queryByText(/To assemble the parts of something/i)).not.toBeInTheDocument();
  });

  it('saves "together" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('together'));
    expect(localStorage.getItem('putTogether_section_expanded')).toBe('true');
  });
});

describe('PutVerbPage — "together" chevron and colour', () => {
  it('together chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('together'));
    const header = screen.getByText('together').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('together particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('together')).toHaveClass('text-blue-600');
  });

  it('together particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('together'));
    expect(screen.getByText('together')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "together" card view (default image)', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/"We need to put together the new office furniture\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The HR director put together an excellent leadership training program\."/i)).toBeInTheDocument();
  });

  it('cards have cursor-default class', () => {
    renderPage();
    expandSection('together');
    expect(getCard(/To assemble the parts of something/i)).toHaveClass('cursor-default');
    expect(getCard(/To organize or create a group or plan/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('together');
    fireEvent.click(getCard(/To assemble the parts of something/i));
    fireEvent.click(getCard(/To organize or create a group or plan/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
