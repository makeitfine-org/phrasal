import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "about / around / round" section toggle', () => {
  it('renders "about / around / round" section toggle', () => {
    renderPage();
    expect(screen.getByText('about / around / round')).toBeInTheDocument();
  });

  it('"about / around / round" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To spread a rumour or false story/i)).not.toBeInTheDocument();
  });

  it('clicking "about / around / round" expands meaning card', () => {
    renderPage();
    fireEvent.click(screen.getByText('about / around / round'));
    expect(screen.getByText(/To spread a rumour or false story/i)).toBeInTheDocument();
  });

  it('clicking "about / around / round" twice collapses meaning card', () => {
    renderPage();
    fireEvent.click(screen.getByText('about / around / round'));
    fireEvent.click(screen.getByText('about / around / round'));
    expect(screen.queryByText(/To spread a rumour or false story/i)).not.toBeInTheDocument();
  });

  it('saves "about / around / round" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('about / around / round'));
    expect(localStorage.getItem('putAboutAroundRound_section_expanded')).toBe('true');
  });
});

describe('PutVerbPage — "about / around / round" chevron and colour', () => {
  it('about / around / round chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('about / around / round'));
    const header = screen.getByText('about / around / round').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('about / around / round particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('about / around / round')).toHaveClass('text-blue-600');
  });

  it('about / around / round particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('about / around / round'));
    expect(screen.getByText('about / around / round')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "about / around / round" card view (default image)', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/"Someone is putting it about that the company is going bankrupt\."/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(getCard(/To spread a rumour or false story/i)).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('about / around / round');
    fireEvent.click(getCard(/To spread a rumour or false story/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
