import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AllVerbsModal from '../components/AllVerbsModal';
import type { BrowseVerbEntry } from '../types';

const verbs: BrowseVerbEntry[] = [
  { verb: 'Act out', definition: 'To perform a role', sentences: ['The students acted out a scene.'], wordsToHide: ['acted out'], quizIndex: 0 },
  { verb: 'Break down', definition: 'To stop working', sentences: ['My car broke down.', 'She broke down and cried.'], wordsToHide: ['broke down'], quizIndex: 1 },
  { verb: 'Call up', definition: 'To make a phone call', sentences: ['I will call up the restaurant.'], wordsToHide: ['call up'], quizIndex: 2 },
];

function renderModal(excluded = new Set<number>(), onClose = vi.fn()) {
  return render(<AllVerbsModal verbs={verbs} excluded={excluded} onClose={onClose} />);
}

describe('AllVerbsModal', () => {
  it('renders the modal title with verb count', () => {
    renderModal();
    expect(screen.getByText('All Verbs (3)')).toBeInTheDocument();
  });

  it('renders all verb names', () => {
    renderModal();
    expect(screen.getByText('Act out')).toBeInTheDocument();
    expect(screen.getByText('Break down')).toBeInTheDocument();
    expect(screen.getByText('Call up')).toBeInTheDocument();
  });

  it('renders the definition for each verb', () => {
    renderModal();
    expect(screen.getByText('To perform a role')).toBeInTheDocument();
    expect(screen.getByText('To stop working')).toBeInTheDocument();
    expect(screen.getByText('To make a phone call')).toBeInTheDocument();
  });

  it('renders all sentences for each verb', () => {
    renderModal();
    expect(screen.getByText(/The students acted out a scene/)).toBeInTheDocument();
    expect(screen.getByText(/My car broke down/)).toBeInTheDocument();
    expect(screen.getByText(/She broke down and cried/)).toBeInTheDocument();
    expect(screen.getByText(/I will call up the restaurant/)).toBeInTheDocument();
  });

  it('renders multiple sentences per entry', () => {
    renderModal();
    const breakDownItems = screen.getAllByText(/broke down/);
    expect(breakDownItems).toHaveLength(2);
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<AllVerbsModal verbs={verbs} excluded={new Set()} onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<AllVerbsModal verbs={verbs} excluded={new Set()} onClose={onClose} />);
    await user.click(container.firstChild as Element);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not close when clicking inside the modal panel', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<AllVerbsModal verbs={verbs} excluded={new Set()} onClose={onClose} />);
    await user.click(screen.getByText('Act out'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<AllVerbsModal verbs={verbs} excluded={new Set()} onClose={onClose} />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('renders a search input with autoFocus', () => {
    renderModal();
    const input = screen.getByPlaceholderText('Search verbs...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it('filters list by verb name', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.type(screen.getByPlaceholderText('Search verbs...'), 'call');
    expect(screen.getByText('Call up')).toBeInTheDocument();
    expect(screen.queryByText('Act out')).not.toBeInTheDocument();
    expect(screen.queryByText('Break down')).not.toBeInTheDocument();
  });

  it('filters list by definition (case-insensitive)', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.type(screen.getByPlaceholderText('Search verbs...'), 'phone');
    expect(screen.getByText('Call up')).toBeInTheDocument();
    expect(screen.queryByText('Act out')).not.toBeInTheDocument();
  });

  it('shows No matches found when query matches nothing', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.type(screen.getByPlaceholderText('Search verbs...'), 'zzznomatch');
    expect(screen.getByText('No matches found')).toBeInTheDocument();
  });

  it('renders list sorted alphabetically', () => {
    const unordered: BrowseVerbEntry[] = [
      { verb: 'Zoom in', definition: 'To zoom', sentences: [], wordsToHide: [], quizIndex: 0 },
      { verb: 'Act out', definition: 'To act', sentences: [], wordsToHide: [], quizIndex: 1 },
      { verb: 'Mark up', definition: 'To mark', sentences: [], wordsToHide: [], quizIndex: 2 },
    ];
    render(<AllVerbsModal verbs={unordered} excluded={new Set()} onClose={vi.fn()} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Act out');
    expect(items[1]).toHaveTextContent('Mark up');
    expect(items[2]).toHaveTextContent('Zoom in');
  });

  it('renders Excluded checkbox unchecked by default', () => {
    renderModal();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('hides excluded verbs when checkbox is unchecked', () => {
    renderModal(new Set([1])); // Break down excluded
    expect(screen.queryByText('Break down')).not.toBeInTheDocument();
    expect(screen.getByText('Act out')).toBeInTheDocument();
    expect(screen.getByText('Call up')).toBeInTheDocument();
  });

  it('shows excluded verbs with badge when checkbox is checked', async () => {
    const user = userEvent.setup();
    renderModal(new Set([1])); // Break down excluded
    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByText('Break down')).toBeInTheDocument();
    expect(screen.getByText('excluded')).toBeInTheDocument();
  });

  it('excluded badge has orange styling', async () => {
    const user = userEvent.setup();
    renderModal(new Set([0])); // Act out excluded
    await user.click(screen.getByRole('checkbox'));
    const badge = screen.getByText('excluded');
    expect(badge).toHaveClass('text-orange-600');
  });

  it('isLearned entry (quizIndex undefined) is never hidden by excluded checkbox', () => {
    const withLearned: BrowseVerbEntry[] = [
      ...verbs,
      { verb: 'Zero in', definition: 'To focus', sentences: [], wordsToHide: [], quizIndex: undefined },
    ];
    render(<AllVerbsModal verbs={withLearned} excluded={new Set([0, 1, 2])} onClose={vi.fn()} />);
    // All quiz verbs are excluded and checkbox is unchecked, but isLearned entry must still appear
    expect(screen.getByText('Zero in')).toBeInTheDocument();
  });

  it('has role="dialog" on the panel', () => {
    renderModal();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    renderModal();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('has aria-labelledby pointing to the title', () => {
    renderModal();
    const dialog = screen.getByRole('dialog');
    const titleId = dialog.getAttribute('aria-labelledby');
    expect(titleId).toBeTruthy();
    expect(document.getElementById(titleId!)).toHaveTextContent('All Verbs (3)');
  });

  it('close button has aria-label="Close"', () => {
    renderModal();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});
