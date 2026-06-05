import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "forward" section toggle', () => {
  it('renders "forward" section toggle', () => {
    renderPage();
    expect(screen.getByText('forward')).toBeInTheDocument();
  });

  it('"forward" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To suggest an idea, plan, or person for consideration/i)).not.toBeInTheDocument();
  });

  it('clicking "forward" expands meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('forward'));
    expect(screen.getByText(/To suggest an idea, plan, or person for consideration/i)).toBeInTheDocument();
    expect(screen.getByText(/To change a clock to a later time/i)).toBeInTheDocument();
  });

  it('clicking "forward" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('forward'));
    fireEvent.click(screen.getByText('forward'));
    expect(screen.queryByText(/To suggest an idea, plan, or person for consideration/i)).not.toBeInTheDocument();
  });

  it('saves "forward" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('forward'));
    expect(localStorage.getItem('putForward_section_expanded')).toBe('true');
  });
});

describe('PutVerbPage — "forward" chevron and colour', () => {
  it('forward chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('forward'));
    const header = screen.getByText('forward').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('forward particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('forward')).toHaveClass('text-blue-600');
  });

  it('forward particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('forward'));
    expect(screen.getByText('forward')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "forward" card view (default image)', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/"The manager put forward a new agile framework for the team\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Don't forget to put your clocks forward in the spring\."/i)).toBeInTheDocument();
  });

  it('cards have cursor-default class', () => {
    renderPage();
    expandSection('forward');
    expect(getCard(/To suggest an idea, plan, or person for consideration/i)).toHaveClass('cursor-default');
    expect(getCard(/To change a clock to a later time/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('forward');
    fireEvent.click(getCard(/To suggest an idea, plan, or person for consideration/i));
    fireEvent.click(getCard(/To change a clock to a later time/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
