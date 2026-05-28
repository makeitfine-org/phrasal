import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuizCard from '../components/QuizCard.jsx';

const mockVerb = {
  verb: 'Break out',
  definition: 'To escape or start suddenly',
  sentences: ['A riot broke out in the city.', 'Fire broke out in the building.'],
  wordsToHide: ['broke out'],
};

const mockRender = vi.fn((sentence) => <span data-testid="sentence">{sentence}</span>);

function makeProps(overrides = {}) {
  return {
    verb: mockVerb,
    status: 'idle',
    inputValue: '',
    revealSentence: false,
    inputRef: { current: null },
    onInputChange: vi.fn(),
    onSubmit: vi.fn((e) => e.preventDefault()),
    onIdk: vi.fn(),
    onToggleReveal: vi.fn(),
    renderSentenceWithMask: mockRender,
    isExcluded: false,
    onToggleExclude: vi.fn(),
    ...overrides,
  };
}

beforeEach(() => {
  mockRender.mockClear();
});

describe('QuizCard', () => {
  it('renders the definition text', () => {
    render(<QuizCard {...makeProps()} />);
    expect(screen.getByText('To escape or start suddenly')).toBeInTheDocument();
  });

  it('renders the hint showing the first letter of the verb', () => {
    render(<QuizCard {...makeProps()} />);
    expect(screen.getByText(/Starts with the letter "B"/)).toBeInTheDocument();
  });

  it('renders the input field with placeholder text', () => {
    render(<QuizCard {...makeProps()} />);
    expect(screen.getByPlaceholderText('Type phrasal verb')).toBeInTheDocument();
  });

  it('shows IDK and Check buttons when status is "idle"', () => {
    render(<QuizCard {...makeProps({ status: 'idle' })} />);
    expect(screen.getByText('IDK')).toBeInTheDocument();
    expect(screen.getByText('Check')).toBeInTheDocument();
  });

  it('hides IDK and Check buttons when status is "correct"', () => {
    render(<QuizCard {...makeProps({ status: 'correct' })} />);
    expect(screen.queryByText('IDK')).not.toBeInTheDocument();
    expect(screen.queryByText('Check')).not.toBeInTheDocument();
  });

  it('hides IDK and Check buttons when status is "wrong"', () => {
    render(<QuizCard {...makeProps({ status: 'wrong' })} />);
    expect(screen.queryByText('IDK')).not.toBeInTheDocument();
    expect(screen.queryByText('Check')).not.toBeInTheDocument();
  });

  it('disables the input when status is not "idle"', () => {
    render(<QuizCard {...makeProps({ status: 'correct' })} />);
    expect(screen.getByPlaceholderText('Type phrasal verb')).toBeDisabled();
  });

  it('does not disable the input when status is "idle"', () => {
    render(<QuizCard {...makeProps({ status: 'idle' })} />);
    expect(screen.getByPlaceholderText('Type phrasal verb')).not.toBeDisabled();
  });

  it('calls onInputChange when the input value changes', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<QuizCard {...props} />);
    await user.type(screen.getByPlaceholderText('Type phrasal verb'), 'a');
    expect(props.onInputChange).toHaveBeenCalled();
  });

  it('calls onSubmit when the Check button is clicked', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<QuizCard {...props} />);
    await user.click(screen.getByText('Check'));
    expect(props.onSubmit).toHaveBeenCalledOnce();
  });

  it('calls onIdk when the IDK button is clicked', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<QuizCard {...props} />);
    await user.click(screen.getByText('IDK'));
    expect(props.onIdk).toHaveBeenCalledOnce();
  });

  it('calls renderSentenceWithMask for each sentence', () => {
    render(<QuizCard {...makeProps()} />);
    expect(mockRender).toHaveBeenCalledTimes(mockVerb.sentences.length);
  });

  it('passes isRevealed=true to renderSentenceWithMask when status is "correct"', () => {
    render(<QuizCard {...makeProps({ status: 'correct', revealSentence: false })} />);
    const [, , isRevealed] = mockRender.mock.calls[0];
    expect(isRevealed).toBe(true);
  });

  it('passes isRevealed=true to renderSentenceWithMask when status is "wrong"', () => {
    render(<QuizCard {...makeProps({ status: 'wrong', revealSentence: false })} />);
    const [, , isRevealed] = mockRender.mock.calls[0];
    expect(isRevealed).toBe(true);
  });

  it('passes isRevealed=false to renderSentenceWithMask when status is "idle" and revealSentence is false', () => {
    render(<QuizCard {...makeProps({ status: 'idle', revealSentence: false })} />);
    const [, , isRevealed] = mockRender.mock.calls[0];
    expect(isRevealed).toBe(false);
  });

  it('passes isRevealed=true to renderSentenceWithMask when revealSentence is true', () => {
    render(<QuizCard {...makeProps({ status: 'idle', revealSentence: true })} />);
    const [, , isRevealed] = mockRender.mock.calls[0];
    expect(isRevealed).toBe(true);
  });

  it('shows "Excluded" label on the button when isExcluded is true', () => {
    render(<QuizCard {...makeProps({ isExcluded: true })} />);
    expect(screen.getByText('Excluded')).toBeInTheDocument();
  });

  it('shows "Exclude" label on the button when isExcluded is false', () => {
    render(<QuizCard {...makeProps({ isExcluded: false })} />);
    expect(screen.getByText('Exclude')).toBeInTheDocument();
  });

  it('calls onToggleExclude when the exclude button is clicked', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<QuizCard {...props} />);
    await user.click(screen.getByText('Exclude'));
    expect(props.onToggleExclude).toHaveBeenCalledOnce();
  });

  it('sentence section has "hidden" class when isExcluded is true', () => {
    const { container } = render(<QuizCard {...makeProps({ isExcluded: true })} />);
    // The sentence div contains the sentences; find it by its sibling structure
    const sentenceSection = container.querySelector('.hidden');
    expect(sentenceSection).toBeTruthy();
  });

  it('applies green border class to input when status is "correct"', () => {
    render(<QuizCard {...makeProps({ status: 'correct' })} />);
    const input = screen.getByPlaceholderText('Type phrasal verb');
    expect(input).toHaveClass('border-green-500');
  });

  it('applies red border class to input when status is "wrong"', () => {
    render(<QuizCard {...makeProps({ status: 'wrong' })} />);
    const input = screen.getByPlaceholderText('Type phrasal verb');
    expect(input).toHaveClass('border-red-500');
  });
});
