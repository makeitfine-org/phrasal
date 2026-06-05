import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "down" section toggle', () => {
  it('renders "down" section toggle', () => {
    renderPage();
    expect(screen.getByText('down')).toBeInTheDocument();
  });

  it('"down" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To write something down/i)).not.toBeInTheDocument();
  });

  it('clicking "down" expands all 6 "down" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    expect(screen.getByText(/To write something down/i)).toBeInTheDocument();
    expect(screen.getByText(/To criticize or humiliate someone/i)).toBeInTheDocument();
    expect(screen.getByText(/To pay a deposit/i)).toBeInTheDocument();
    expect(screen.getByText(/To suppress a rebellion or protest by force/i)).toBeInTheDocument();
    expect(screen.getByText(/To euthanize an animal/i)).toBeInTheDocument();
    expect(screen.getByText(/To attribute a cause to something/i)).toBeInTheDocument();
  });

  it('clicking "down" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    fireEvent.click(screen.getByText('down'));
    expect(screen.queryByText(/To write something down/i)).not.toBeInTheDocument();
  });

  it('saves "down" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    expect(localStorage.getItem('putDown_section_expanded')).toBe('true');
  });

  it('restores "down" section collapsed state from localStorage', () => {
    localStorage.setItem('putDown_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To write something down/i)).not.toBeInTheDocument();
  });
});

describe('PutVerbPage — "down" chevron and colour', () => {
  it('down chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    const header = screen.getByText('down').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('down particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('down')).toHaveClass('text-blue-600');
  });

  it('down particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    expect(screen.getByText('down')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "down" section definitions', () => {
  it('all 6 "down" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write something down/i)).toHaveClass('truncate');
    expect(screen.getByText(/To criticize or humiliate someone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To pay a deposit/i)).toHaveClass('truncate');
    expect(screen.getByText(/To suppress a rebellion or protest by force/i)).toHaveClass('truncate');
    expect(screen.getByText(/To euthanize an animal/i)).toHaveClass('truncate');
    expect(screen.getByText(/To attribute a cause to something/i)).toHaveClass('truncate');
  });
});

describe('PutVerbPage — "down" card view (default image)', () => {
  it('all 6 examples visible without expanding cards', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/"Let me put down your contact details\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"A good leader never puts down their team members\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We put down a 10% deposit for the new office space\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The government quickly put down the protests\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The vet had to put down the sick dog\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I put the project's success down to excellent teamwork\."/i)).toBeInTheDocument();
  });

  it('all cards have cursor-default class', () => {
    renderPage();
    expandSection('down');
    expect(getCard(/To write something down/i)).toHaveClass('cursor-default');
    expect(getCard(/To criticize or humiliate someone/i)).toHaveClass('cursor-default');
    expect(getCard(/To pay a deposit/i)).toHaveClass('cursor-default');
    expect(getCard(/To suppress a rebellion or protest by force/i)).toHaveClass('cursor-default');
    expect(getCard(/To euthanize an animal/i)).toHaveClass('cursor-default');
    expect(getCard(/To attribute a cause to something/i)).toHaveClass('cursor-default');
  });

  it('no "down" card renders an image regardless of clicks', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To write something down/i));
    fireEvent.click(getCard(/To criticize or humiliate someone/i));
    fireEvent.click(getCard(/To pay a deposit/i));
    fireEvent.click(getCard(/To suppress a rebellion or protest by force/i));
    fireEvent.click(getCard(/To euthanize an animal/i));
    fireEvent.click(getCard(/To attribute a cause to something/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
