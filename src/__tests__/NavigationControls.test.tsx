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

  it('Prev button has subtle border class', () => {
    render(<NavigationControls {...makeProps({ currentIndex: 1 })} />);
    expect(screen.getByTitle('Previous Question')).toHaveClass('border-gray-200');
  });

  it('Next chevron button has subtle border class', () => {
    render(<NavigationControls {...makeProps()} />);
    expect(screen.getByTitle('Next / History Forward')).toHaveClass('border-gray-200');
  });

  it('Reset button (enabled) has border class', () => {
    render(<NavigationControls {...makeProps({ status: 'correct' })} />);
    expect(screen.getByText('Reset').closest('button')).toHaveClass('border-gray-300');
  });

  it('Reset button has amber-500 text color when enabled', () => {
    render(<NavigationControls {...makeProps({ status: 'correct' })} />);
    expect(screen.getByText('Reset').closest('button')).toHaveClass('text-amber-500');
  });

  it('Reset button has amber-500 text color when status is "wrong"', () => {
    render(<NavigationControls {...makeProps({ status: 'wrong' })} />);
    expect(screen.getByText('Reset').closest('button')).toHaveClass('text-amber-500');
  });

  it('Reset button does not have amber-500 text color when disabled (idle)', () => {
    render(<NavigationControls {...makeProps({ status: 'idle' })} />);
    expect(screen.getByText('Reset').closest('button')).not.toHaveClass('text-amber-500');
  });

});
