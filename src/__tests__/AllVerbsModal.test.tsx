import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AllVerbsModal from '../components/AllVerbsModal';
import type { VerbEntry } from '../types';

const verbs: VerbEntry[] = [
  { verb: 'Act out', definition: 'To perform a role', sentences: ['The students acted out a scene.'], wordsToHide: ['acted out'] },
  { verb: 'Break down', definition: 'To stop working', sentences: ['My car broke down.', 'She broke down and cried.'], wordsToHide: ['broke down'] },
  { verb: 'Call up', definition: 'To make a phone call', sentences: ['I will call up the restaurant.'], wordsToHide: ['call up'] },
];

describe('AllVerbsModal', () => {
  it('renders the modal title with verb count', () => {
    render(<AllVerbsModal verbs={verbs} onClose={vi.fn()} />);
    expect(screen.getByText('All Verbs (3)')).toBeInTheDocument();
  });

  it('renders all verb names', () => {
    render(<AllVerbsModal verbs={verbs} onClose={vi.fn()} />);
    expect(screen.getByText('Act out')).toBeInTheDocument();
    expect(screen.getByText('Break down')).toBeInTheDocument();
    expect(screen.getByText('Call up')).toBeInTheDocument();
  });

  it('renders the definition for each verb', () => {
    render(<AllVerbsModal verbs={verbs} onClose={vi.fn()} />);
    expect(screen.getByText('To perform a role')).toBeInTheDocument();
    expect(screen.getByText('To stop working')).toBeInTheDocument();
    expect(screen.getByText('To make a phone call')).toBeInTheDocument();
  });

  it('renders all sentences for each verb', () => {
    render(<AllVerbsModal verbs={verbs} onClose={vi.fn()} />);
    expect(screen.getByText(/The students acted out a scene/)).toBeInTheDocument();
    expect(screen.getByText(/My car broke down/)).toBeInTheDocument();
    expect(screen.getByText(/She broke down and cried/)).toBeInTheDocument();
    expect(screen.getByText(/I will call up the restaurant/)).toBeInTheDocument();
  });

  it('renders multiple sentences per entry', () => {
    render(<AllVerbsModal verbs={verbs} onClose={vi.fn()} />);
    const breakDownItems = screen.getAllByText(/broke down/);
    expect(breakDownItems).toHaveLength(2);
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<AllVerbsModal verbs={verbs} onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<AllVerbsModal verbs={verbs} onClose={onClose} />);
    await user.click(container.firstChild as Element);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not close when clicking inside the modal panel', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<AllVerbsModal verbs={verbs} onClose={onClose} />);
    await user.click(screen.getByText('Act out'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<AllVerbsModal verbs={verbs} onClose={onClose} />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });
});
