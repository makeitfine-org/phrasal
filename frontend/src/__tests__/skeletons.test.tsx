import React from 'react';
import { render, screen } from '@testing-library/react';
import SkeletonBlock from '../components/skeletons/SkeletonBlock';
import QuizSkeleton from '../components/skeletons/QuizSkeleton';
import VerbDetailSkeleton from '../components/skeletons/VerbDetailSkeleton';
import VerbListSkeleton from '../components/skeletons/VerbListSkeleton';
import ListSearchSkeleton from '../components/skeletons/ListSearchSkeleton';

describe('SkeletonBlock', () => {
  it('renders with animate-pulse class', () => {
    const { container } = render(<SkeletonBlock />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('applies custom className', () => {
    const { container } = render(<SkeletonBlock className="h-8 w-48" />);
    expect(container.firstChild).toHaveClass('h-8', 'w-48', 'animate-pulse');
  });

  it('includes base bg classes for light and dark mode', () => {
    const { container } = render(<SkeletonBlock />);
    expect(container.firstChild).toHaveClass('bg-gray-200');
  });
});

describe('QuizSkeleton', () => {
  it('renders multiple animate-pulse blocks', () => {
    const { container } = render(<QuizSkeleton />);
    const pulseBlocks = container.querySelectorAll('.animate-pulse');
    expect(pulseBlocks.length).toBeGreaterThan(0);
  });

  it('renders the quiz card wrapper with shadow', () => {
    const { container } = render(<QuizSkeleton />);
    const card = container.querySelector('.shadow-xl');
    expect(card).toBeInTheDocument();
  });

  it('renders header placeholder with 4 circular button shapes', () => {
    const { container } = render(<QuizSkeleton />);
    const circles = container.querySelectorAll('.\\!rounded-full');
    expect(circles).toHaveLength(4);
  });

  it('renders the navigation footer bar', () => {
    const { container } = render(<QuizSkeleton />);
    const footer = container.querySelector('.bg-gray-100');
    expect(footer).toBeInTheDocument();
  });

  it('renders the color bar at the top of the card', () => {
    const { container } = render(<QuizSkeleton />);
    const colorBar = container.querySelector('.h-2.w-full');
    expect(colorBar).toBeInTheDocument();
  });

  it('renders input placeholder', () => {
    const { container } = render(<QuizSkeleton />);
    const input = container.querySelector('.h-14.w-full');
    expect(input).toBeInTheDocument();
  });

  it('does not render any visible text', () => {
    const { container } = render(<QuizSkeleton />);
    expect(container.textContent).toBe('');
  });
});

describe('VerbDetailSkeleton', () => {
  it('renders multiple animate-pulse blocks', () => {
    const { container } = render(<VerbDetailSkeleton />);
    const pulseBlocks = container.querySelectorAll('.animate-pulse');
    expect(pulseBlocks.length).toBeGreaterThan(0);
  });

  it('renders 3 section dividers (2 hr elements)', () => {
    const { container } = render(<VerbDetailSkeleton />);
    const hrs = container.querySelectorAll('hr');
    expect(hrs).toHaveLength(2);
  });

  it('renders meaning cards with circular number badges in first section', () => {
    const { container } = render(<VerbDetailSkeleton />);
    const badges = container.querySelectorAll('.\\!rounded-full');
    expect(badges).toHaveLength(2);
  });

  it('renders only meaning cards in the first section', () => {
    const { container } = render(<VerbDetailSkeleton />);
    const cards = container.querySelectorAll('.rounded-2xl');
    expect(cards.length).toBeGreaterThanOrEqual(2);
  });

  it('uses min-h-screen layout', () => {
    const { container } = render(<VerbDetailSkeleton />);
    expect(container.firstChild).toHaveClass('min-h-screen');
  });

  it('does not render any visible text', () => {
    const { container } = render(<VerbDetailSkeleton />);
    expect(container.textContent).toBe('');
  });
});

describe('VerbListSkeleton', () => {
  it('renders multiple animate-pulse blocks', () => {
    const { container } = render(<VerbListSkeleton />);
    const pulseBlocks = container.querySelectorAll('.animate-pulse');
    expect(pulseBlocks.length).toBeGreaterThan(0);
  });

  it('renders a search button placeholder (circular)', () => {
    const { container } = render(<VerbListSkeleton />);
    const circle = container.querySelector('.\\!rounded-full');
    expect(circle).toBeInTheDocument();
  });

  it('renders verb card placeholders with rounded-2xl borders', () => {
    const { container } = render(<VerbListSkeleton />);
    const cards = container.querySelectorAll('.rounded-2xl');
    expect(cards.length).toBeGreaterThanOrEqual(7);
  });

  it('renders a divider between particles card and verb cards', () => {
    const { container } = render(<VerbListSkeleton />);
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
  });

  it('uses min-h-screen layout', () => {
    const { container } = render(<VerbListSkeleton />);
    expect(container.firstChild).toHaveClass('min-h-screen');
  });

  it('does not render any visible text', () => {
    const { container } = render(<VerbListSkeleton />);
    expect(container.textContent).toBe('');
  });
});

describe('ListSearchSkeleton', () => {
  it('renders multiple animate-pulse blocks', () => {
    const { container } = render(<ListSearchSkeleton />);
    const pulseBlocks = container.querySelectorAll('.animate-pulse');
    expect(pulseBlocks.length).toBeGreaterThan(0);
  });

  it('renders 5 placeholder items', () => {
    const { container } = render(<ListSearchSkeleton />);
    const items = container.querySelectorAll('.px-4.py-3');
    expect(items).toHaveLength(5);
  });

  it('renders 3 lines per placeholder item', () => {
    const { container } = render(<ListSearchSkeleton />);
    const firstItem = container.querySelector('.px-4.py-3')!;
    const lines = firstItem.querySelectorAll('.animate-pulse');
    expect(lines).toHaveLength(3);
  });

  it('does not render any visible text', () => {
    const { container } = render(<ListSearchSkeleton />);
    expect(container.textContent).toBe('');
  });
});
