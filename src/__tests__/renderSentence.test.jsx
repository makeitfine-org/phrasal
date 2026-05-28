import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderSentenceWithMask } from '../utils/renderSentence.jsx';

function Wrapper({ sentence, wordsToHide, isRevealed, onToggle }) {
  return <div>{renderSentenceWithMask(sentence, wordsToHide, isRevealed, onToggle)}</div>;
}

describe('renderSentenceWithMask', () => {
  it('returns plain span when wordsToHide is empty', () => {
    render(<Wrapper sentence="Hello world" wordsToHide={[]} isRevealed={false} onToggle={() => {}} />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('returns plain span when wordsToHide is null', () => {
    render(<Wrapper sentence="Hello world" wordsToHide={null} isRevealed={false} onToggle={() => {}} />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('returns plain span when wordsToHide is undefined', () => {
    render(<Wrapper sentence="Hello world" wordsToHide={undefined} isRevealed={false} onToggle={() => {}} />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('replaces matched letters with X when isRevealed is false', () => {
    render(<Wrapper sentence="They acted out the play." wordsToHide={['acted out']} isRevealed={false} onToggle={() => {}} />);
    expect(screen.getByText('XXXXX XXX')).toBeInTheDocument();
  });

  it('shows the actual text when isRevealed is true', () => {
    render(<Wrapper sentence="They acted out the play." wordsToHide={['acted out']} isRevealed={true} onToggle={() => {}} />);
    expect(screen.getByText('acted out')).toBeInTheDocument();
  });

  it('is case-insensitive: hides word regardless of sentence casing', () => {
    render(<Wrapper sentence="They Acted Out the play." wordsToHide={['acted out']} isRevealed={false} onToggle={() => {}} />);
    expect(screen.getByText('XXXXX XXX')).toBeInTheDocument();
  });

  it('preserves non-alphabetic characters in the mask (e.g. spaces become X-padded)', () => {
    render(<Wrapper sentence="A riot broke out." wordsToHide={['broke out']} isRevealed={false} onToggle={() => {}} />);
    expect(screen.getByText('XXXXX XXX')).toBeInTheDocument();
  });

  it('handles multiple wordsToHide — each one is masked', () => {
    render(<Wrapper sentence="Let it down easy." wordsToHide={['let', 'down']} isRevealed={false} onToggle={() => {}} />);
    const masks = screen.getAllByText(/^X+$/);
    expect(masks).toHaveLength(2);
  });

  it('sorts longer words first to prevent partial overlap shadowing', () => {
    // "break away" must match before "break" to avoid splitting mid-phrase
    render(<Wrapper sentence="They break away now." wordsToHide={['break', 'break away']} isRevealed={true} onToggle={() => {}} />);
    // "break away" should be a single masked span, not two separate ones
    expect(screen.getByText('break away')).toBeInTheDocument();
    expect(screen.queryByText('break')).not.toBeInTheDocument();
  });

  it('only matches whole words — does not mask partial word matches', () => {
    render(<Wrapper sentence="He breakdown the door." wordsToHide={['break']} isRevealed={false} onToggle={() => {}} />);
    // "breakdown" should NOT be masked — "break" does not match at a word boundary inside it
    expect(screen.queryByText(/X/)).not.toBeInTheDocument();
  });

  it('calls onToggle when a masked span is clicked', async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    render(<Wrapper sentence="They acted out the play." wordsToHide={['acted out']} isRevealed={false} onToggle={onToggle} />);
    await user.click(screen.getByText('XXXXX XXX'));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it('calls onToggle when a revealed span is clicked', async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    render(<Wrapper sentence="They acted out the play." wordsToHide={['acted out']} isRevealed={true} onToggle={onToggle} />);
    await user.click(screen.getByText('acted out'));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it('applies text-transparent class on the masked span when isRevealed is false', () => {
    render(<Wrapper sentence="They acted out the play." wordsToHide={['acted out']} isRevealed={false} onToggle={() => {}} />);
    const span = screen.getByText('XXXXX XXX');
    expect(span).toHaveClass('text-transparent');
  });

  it('applies bg-yellow-100 class on the span when isRevealed is true', () => {
    render(<Wrapper sentence="They acted out the play." wordsToHide={['acted out']} isRevealed={true} onToggle={() => {}} />);
    const span = screen.getByText('acted out');
    expect(span).toHaveClass('bg-yellow-100');
  });

  it('renders non-matched text portions unchanged', () => {
    render(<Wrapper sentence="They acted out the play." wordsToHide={['acted out']} isRevealed={false} onToggle={() => {}} />);
    expect(screen.getByText(/They/)).toBeInTheDocument();
    expect(screen.getByText(/the play\./)).toBeInTheDocument();
  });

  it('escapes regex special characters in wordsToHide', () => {
    // If special chars are not escaped, new RegExp() would throw
    render(<Wrapper sentence="She (act) out well." wordsToHide={['(act)']} isRevealed={true} onToggle={() => {}} />);
    // Just verify it renders without throwing
    expect(screen.getByText(/She/)).toBeInTheDocument();
  });
});
