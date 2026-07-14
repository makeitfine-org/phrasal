import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const mockUseGrammarEntries = vi.fn();
const mockUseVerbList = vi.fn();

vi.mock('../hooks/useGrammarEntries', () => ({
  useGrammarEntries: (...args: unknown[]) => mockUseGrammarEntries(...args),
}));

vi.mock('../hooks/useVerbList', () => ({
  useVerbList: () => mockUseVerbList(),
}));

vi.mock('../utils/renderSentence', () => ({
  renderSentenceWithMask: vi.fn((sentence: string) => <span>{sentence}</span>),
}));

import IWishPage from '../pages/IWishPage';
import PhrasalVerbsListPage from '../pages/PhrasalVerbsListPage';
import ListSearchModal from '../components/ListSearchModal';

let portalDiv: HTMLDivElement;

beforeAll(() => {
  portalDiv = document.createElement('div');
  portalDiv.id = 'verb-page-actions';
  document.body.appendChild(portalDiv);
});

afterAll(() => {
  portalDiv.remove();
});

beforeEach(() => {
  localStorage.clear();
  mockUseGrammarEntries.mockReset();
  mockUseVerbList.mockReset();
});

describe('IWishPage — loading state', () => {
  it('shows QuizSkeleton with animate-pulse blocks while loading', () => {
    mockUseGrammarEntries.mockReturnValue({
      entries: [], loading: true, error: null,
    });
    const { container } = render(<IWishPage />);
    const pulseBlocks = container.querySelectorAll('.animate-pulse');
    expect(pulseBlocks.length).toBeGreaterThan(0);
  });

  it('does not show any loading text while loading', () => {
    mockUseGrammarEntries.mockReturnValue({
      entries: [], loading: true, error: null,
    });
    render(<IWishPage />);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('passes category to useGrammarEntries', () => {
    mockUseGrammarEntries.mockReturnValue({
      entries: [], loading: true, error: null,
    });
    render(<IWishPage />);
    expect(mockUseGrammarEntries).toHaveBeenCalledWith('i-wish-if-only');
  });

  it('renders quiz content after loading completes', () => {
    mockUseGrammarEntries.mockReturnValue({
      entries: [
        { sentence: 'Test sentence', correctAnswers: ['Test answer'] },
      ],
      loading: false,
      error: null,
    });
    vi.spyOn(Math, 'random').mockReturnValue(0);
    render(<IWishPage />);
    expect(screen.getByText('I wish / If only')).toBeInTheDocument();
    vi.restoreAllMocks();
  });
});

describe('PhrasalVerbsListPage — loading state', () => {
  it('shows VerbListSkeleton with animate-pulse blocks while loading', () => {
    mockUseVerbList.mockReturnValue({
      verbs: [], loading: true, error: null,
    });
    const { container } = render(
      <MemoryRouter><PhrasalVerbsListPage /></MemoryRouter>,
    );
    const pulseBlocks = container.querySelectorAll('.animate-pulse');
    expect(pulseBlocks.length).toBeGreaterThan(0);
  });

  it('does not show any loading text while loading', () => {
    mockUseVerbList.mockReturnValue({
      verbs: [], loading: true, error: null,
    });
    render(<MemoryRouter><PhrasalVerbsListPage /></MemoryRouter>);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('renders verb card skeleton shapes while loading', () => {
    mockUseVerbList.mockReturnValue({
      verbs: [], loading: true, error: null,
    });
    const { container } = render(
      <MemoryRouter><PhrasalVerbsListPage /></MemoryRouter>,
    );
    const cards = container.querySelectorAll('.rounded-2xl');
    expect(cards.length).toBeGreaterThanOrEqual(7);
  });

  it('renders list content after loading completes', () => {
    mockUseVerbList.mockReturnValue({
      verbs: [{ verb: 'get', label: 'Get', particles: ['off', 'on'] }],
      loading: false,
      error: null,
    });
    render(<MemoryRouter><PhrasalVerbsListPage /></MemoryRouter>);
    expect(screen.getByText('Phrasal Verbs List')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Get' })).toBeInTheDocument();
  });
});

describe('ListSearchModal — loading state', () => {
  it('shows ListSearchSkeleton with animate-pulse blocks when entries not provided', () => {
    const { container } = render(
      <ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />,
    );
    const pulseBlocks = container.querySelectorAll('.animate-pulse');
    expect(pulseBlocks.length).toBeGreaterThan(0);
  });

  it('does not show any loading text when entries not provided', () => {
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('renders skeleton items inside the modal panel', () => {
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    const dialog = screen.getByRole('dialog');
    const skeletonItems = dialog.querySelectorAll('.animate-pulse');
    expect(skeletonItems.length).toBeGreaterThan(0);
  });

  it('shows search input alongside skeleton', () => {
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search phrasal verbs...')).toBeInTheDocument();
  });
});
