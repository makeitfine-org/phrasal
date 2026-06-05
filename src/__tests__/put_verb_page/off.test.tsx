import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "off" section toggle', () => {
  it('renders "off" section toggle', () => {
    renderPage();
    expect(screen.getByText('off')).toBeInTheDocument();
  });

  it('"off" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To delay or postpone something/i)).not.toBeInTheDocument();
  });

  it('clicking "off" expands meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    expect(screen.getByText(/To delay or postpone something/i)).toBeInTheDocument();
    expect(screen.getByText(/To make someone not want to do something/i)).toBeInTheDocument();
    expect(screen.getByText(/To distract someone/i)).toBeInTheDocument();
  });

  it('clicking "off" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    fireEvent.click(screen.getByText('off'));
    expect(screen.queryByText(/To delay or postpone something/i)).not.toBeInTheDocument();
  });

  it('saves "off" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    expect(localStorage.getItem('putOff_section_expanded')).toBe('true');
  });

  it('restores "off" section collapsed state from localStorage', () => {
    localStorage.setItem('putOff_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To delay or postpone something/i)).not.toBeInTheDocument();
  });
});

describe('PutVerbPage — "off" chevron and colour', () => {
  it('off chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    const header = screen.getByText('off').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('off particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('off')).toHaveClass('text-blue-600');
  });

  it('off particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    expect(screen.getByText('off')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "off" section definitions', () => {
  it('all 3 "off" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To delay or postpone something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make someone not want to do something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To distract someone/i)).toHaveClass('truncate');
  });
});

describe('PutVerbPage — "off" card view (default image)', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/"We have to put off the sprint planning meeting until tomorrow\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The complex code architecture put me off learning Java at first\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Please be quiet; your talking is putting me off my work\."/i)).toBeInTheDocument();
  });

  it('all cards have cursor-default class', () => {
    renderPage();
    expandSection('off');
    expect(getCard(/To delay or postpone something/i)).toHaveClass('cursor-default');
    expect(getCard(/To make someone not want to do something/i)).toHaveClass('cursor-default');
    expect(getCard(/To distract someone/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To delay or postpone something/i));
    fireEvent.click(getCard(/To make someone not want to do something/i));
    fireEvent.click(getCard(/To distract someone/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
