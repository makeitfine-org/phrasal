import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "in" section toggle', () => {
  it('renders "in" section toggle', () => {
    renderPage();
    expect(screen.getByText('in')).toBeInTheDocument();
  });

  it('"in" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To spend time or effort on something/i)).not.toBeInTheDocument();
  });

  it('clicking "in" expands all 4 "in" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    expect(screen.getByText(/To spend time or effort on something/i)).toBeInTheDocument();
    expect(screen.getByText(/To install an appliance or system/i)).toBeInTheDocument();
    expect(screen.getByText(/To officially submit a request or document/i)).toBeInTheDocument();
    expect(screen.getByText(/To interrupt a conversation with a remark/i)).toBeInTheDocument();
  });

  it('clicking "in" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    fireEvent.click(screen.getByText('in'));
    expect(screen.queryByText(/To spend time or effort on something/i)).not.toBeInTheDocument();
  });

  it('saves "in" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    expect(localStorage.getItem('putIn_section_expanded')).toBe('true');
  });

  it('restores "in" section collapsed state from localStorage', () => {
    localStorage.setItem('putIn_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To spend time or effort on something/i)).not.toBeInTheDocument();
  });
});

describe('PutVerbPage — "in" chevron and colour', () => {
  it('in chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    const header = screen.getByText('in').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('in particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('in')).toHaveClass('text-blue-600');
  });

  it('in particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    expect(screen.getByText('in')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "in" card view (default image)', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/"The development team put in 50 hours a week/i)).toBeInTheDocument();
    expect(screen.getByText(/"We are putting in a new server system today\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I put in a request for more holiday time\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I think we should test the code first," the junior developer put in\./i)).toBeInTheDocument();
  });

  it('all cards have cursor-default class', () => {
    renderPage();
    expandSection('in');
    expect(getCard(/To spend time or effort on something/i)).toHaveClass('cursor-default');
    expect(getCard(/To install an appliance or system/i)).toHaveClass('cursor-default');
    expect(getCard(/To officially submit a request or document/i)).toHaveClass('cursor-default');
    expect(getCard(/To interrupt a conversation with a remark/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To spend time or effort on something/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
