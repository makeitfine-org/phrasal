import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "with" section toggle', () => {
  it('renders "with" section toggle', () => {
    renderPage();
    expect(screen.getByText('with')).toBeInTheDocument();
  });

  it('"with" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To tolerate or accept a difficult situation/i)).not.toBeInTheDocument();
  });

  it('clicking "with" expands meaning card', () => {
    renderPage();
    fireEvent.click(screen.getByText('with'));
    expect(screen.getByText(/To tolerate or accept a difficult situation/i)).toBeInTheDocument();
  });

  it('clicking "with" twice collapses meaning card', () => {
    renderPage();
    fireEvent.click(screen.getByText('with'));
    fireEvent.click(screen.getByText('with'));
    expect(screen.queryByText(/To tolerate or accept a difficult situation/i)).not.toBeInTheDocument();
  });

  it('saves "with" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('with'));
    expect(localStorage.getItem('putWith_section_expanded')).toBe('true');
  });
});

describe('PutVerbPage — "with" chevron and colour', () => {
  it('with chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('with'));
    const header = screen.getByText('with').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('with particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('with')).toHaveClass('text-blue-600');
  });

  it('with particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('with'));
    expect(screen.getByText('with')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "with" card view (default image)', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/"As a project manager, you have to put up with unexpected delays\."/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('with');
    expect(getCard(/To tolerate or accept a difficult situation/i)).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('with');
    fireEvent.click(getCard(/To tolerate or accept a difficult situation/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
