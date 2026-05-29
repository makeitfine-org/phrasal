import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavigationControls from '../components/NavigationControls';
import type { Status } from '../types';

function makeProps(overrides: Record<string, unknown> = {}) {
  return {
    currentIndex: 1,
    historyLength: 3,
    remainingCount: 2,
    status: 'idle' as Status,
    onPrev: vi.fn(),
    onNext: vi.fn(),
    onReset: vi.fn(),
    onSkip: vi.fn(),
    ...overrides,
  };
}

describe('NavigationControls', () => {
  it('disables the Prev button when currentIndex is 0', () => {
    render(<NavigationControls {...makeProps({ currentIndex: 0 })} />);
    expect(screen.getByTitle('Previous Question')).toBeDisabled();
  });

  it('enables the Prev button when currentIndex > 0', () => {
    render(<NavigationControls {...makeProps({ currentIndex: 1 })} />);
    expect(screen.getByTitle('Previous Question')).not.toBeDisabled();
  });

  it('disables the Next button when at last history entry and remainingCount is 0', () => {
    render(<NavigationControls {...makeProps({ currentIndex: 2, historyLength: 3, remainingCount: 0 })} />);
    expect(screen.getByTitle('Next / History Forward')).toBeDisabled();
  });

  it('enables the Next button when not at end of history', () => {
    render(<NavigationControls {...makeProps({ currentIndex: 1, historyLength: 3, remainingCount: 0 })} />);
    expect(screen.getByTitle('Next / History Forward')).not.toBeDisabled();
  });

  it('enables the Next button when remainingCount > 0 even at end of history', () => {
    render(<NavigationControls {...makeProps({ currentIndex: 2, historyLength: 3, remainingCount: 1 })} />);
    expect(screen.getByTitle('Next / History Forward')).not.toBeDisabled();
  });

  it('disables the Reset button when status is "idle"', () => {
    render(<NavigationControls {...makeProps({ status: 'idle' })} />);
    expect(screen.getByText('Reset').closest('button')).toBeDisabled();
  });

  it('enables the Reset button when status is "correct"', () => {
    render(<NavigationControls {...makeProps({ status: 'correct' })} />);
    expect(screen.getByText('Reset').closest('button')).not.toBeDisabled();
  });

  it('enables the Reset button when status is "wrong"', () => {
    render(<NavigationControls {...makeProps({ status: 'wrong' })} />);
    expect(screen.getByText('Reset').closest('button')).not.toBeDisabled();
  });

  it('disables the Skip button when remainingCount is 0', () => {
    render(<NavigationControls {...makeProps({ remainingCount: 0 })} />);
    expect(screen.getByText('Next').closest('button')).toBeDisabled();
  });

  it('enables the Skip button when remainingCount > 0', () => {
    render(<NavigationControls {...makeProps({ remainingCount: 1 })} />);
    expect(screen.getByText('Next').closest('button')).not.toBeDisabled();
  });

  it('calls onPrev when Prev button is clicked', async () => {
    const props = makeProps({ currentIndex: 1 });
    const user = userEvent.setup();
    render(<NavigationControls {...props} />);
    await user.click(screen.getByTitle('Previous Question'));
    expect(props.onPrev).toHaveBeenCalledOnce();
  });

  it('calls onNext when Next (history) button is clicked', async () => {
    const props = makeProps({ currentIndex: 1, historyLength: 3 });
    const user = userEvent.setup();
    render(<NavigationControls {...props} />);
    await user.click(screen.getByTitle('Next / History Forward'));
    expect(props.onNext).toHaveBeenCalledOnce();
  });

  it('calls onReset when Reset button is clicked', async () => {
    const props = makeProps({ status: 'correct' });
    const user = userEvent.setup();
    render(<NavigationControls {...props} />);
    await user.click(screen.getByText('Reset').closest('button')!);
    expect(props.onReset).toHaveBeenCalledOnce();
  });

  it('calls onSkip when Skip button is clicked', async () => {
    const props = makeProps({ remainingCount: 2 });
    const user = userEvent.setup();
    render(<NavigationControls {...props} />);
    await user.click(screen.getByText('Next').closest('button')!);
    expect(props.onSkip).toHaveBeenCalledOnce();
  });
});
