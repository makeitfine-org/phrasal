import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "back" section toggle', () => {
  it('renders "back" section toggle', () => {
    renderPage();
    expect(screen.getByText('back')).toBeInTheDocument();
  });

  it('"back" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To return something to its original place/i)).not.toBeInTheDocument();
  });

  it('clicking "back" expands all 3 "back" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('back'));
    expect(screen.getByText(/To return something to its original place/i)).toBeInTheDocument();
    expect(screen.getByText(/To delay an event or appointment/i)).toBeInTheDocument();
    expect(screen.getByText(/To change a clock to an earlier time/i)).toBeInTheDocument();
  });

  it('clicking "back" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('back'));
    fireEvent.click(screen.getByText('back'));
    expect(screen.queryByText(/To return something to its original place/i)).not.toBeInTheDocument();
  });

  it('saves "back" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('back'));
    expect(localStorage.getItem('putBack_section_expanded')).toBe('true');
  });
});

describe('PutVerbPage — "back" chevron and colour', () => {
  it('back chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('back'));
    const header = screen.getByText('back').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('back particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('back')).toHaveClass('text-blue-600');
  });

  it('back particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('back'));
    expect(screen.getByText('back')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "back" card view (default image)', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/"Please put the laptop back in the cabinet\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The product launch was put back to November\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We put the clocks back one hour in the autumn\."/i)).toBeInTheDocument();
  });

  it('all cards have cursor-default class', () => {
    renderPage();
    expandSection('back');
    expect(getCard(/To return something to its original place/i)).toHaveClass('cursor-default');
    expect(getCard(/To delay an event or appointment/i)).toHaveClass('cursor-default');
    expect(getCard(/To change a clock to an earlier time/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('back');
    fireEvent.click(getCard(/To return something to its original place/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
