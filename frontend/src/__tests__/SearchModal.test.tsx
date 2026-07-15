import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchModal from '../components/SearchModal';
import type { VerbEntry } from '../types';

const allVerbs: VerbEntry[] = Array.from({ length: 20 }, (_, i) => ({
  verb: `Verb ${i}`,
  definition: `Definition number ${i}`,
  sentences: [],
  wordsToHide: [],
}));

interface ModalProps {
  allVerbs: VerbEntry[];
  excluded: Set<number>;
  onSelect: (idx: number) => void;
  onUnexclude: (idx: number) => void;
  onClose: () => void;
}

function makeProps(overrides: Partial<ModalProps> = {}): ModalProps {
  return {
    allVerbs,
    excluded: new Set(),
    onSelect: vi.fn(),
    onUnexclude: vi.fn(),
    onClose: vi.fn(),
    ...overrides,
  };
}

describe('SearchModal', () => {
  it('renders the search input', () => {
    render(<SearchModal {...makeProps()} />);
    expect(screen.getByPlaceholderText('Search phrasal verbs...')).toBeInTheDocument();
  });

  it('shows all verbs when query is empty', () => {
    render(<SearchModal {...makeProps()} />);
    expect(screen.getAllByRole('listitem').length).toBe(allVerbs.length);
  });

  it('shows matching results by verb name as query is typed', async () => {
    const user = userEvent.setup();
    render(<SearchModal {...makeProps()} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'Verb 1');
    expect(screen.getByText('Verb 1')).toBeInTheDocument();
  });

  it('shows matching results by definition as query is typed', async () => {
    const user = userEvent.setup();
    render(<SearchModal {...makeProps()} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'Definition number 3');
    expect(screen.getByText('Verb 3')).toBeInTheDocument();
  });

  it('hides excluded verbs from results by default', () => {
    render(<SearchModal {...makeProps({ excluded: new Set([3]) })} />);
    expect(screen.queryByText('Verb 3')).not.toBeInTheDocument();
  });

  it('shows "No matches found" when query matches nothing', async () => {
    const user = userEvent.setup();
    render(<SearchModal {...makeProps()} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'zzznomatch');
    expect(screen.getByText(/No matches found/)).toBeInTheDocument();
  });

  it('limits results to a maximum of 50 items', async () => {
    const user = userEvent.setup();
    render(<SearchModal {...makeProps()} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'Verb');
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeLessThanOrEqual(50);
  });

  it('calls onSelect and onClose when a non-excluded result is clicked', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<SearchModal {...props} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'Verb 0');
    await user.click(screen.getByText('Verb 0').closest('li')!);
    expect(props.onSelect).toHaveBeenCalledWith(0);
    expect(props.onClose).toHaveBeenCalledOnce();
  });

  describe('Excluded checkbox', () => {
    it('renders the Excluded checkbox', () => {
      render(<SearchModal {...makeProps()} />);
      expect(screen.getByRole('checkbox', { name: /excluded/i })).toBeInTheDocument();
    });

    it('is unchecked by default', () => {
      render(<SearchModal {...makeProps()} />);
      expect(screen.getByRole('checkbox', { name: /excluded/i })).not.toBeChecked();
    });

    it('shows excluded verbs when checkbox is checked', async () => {
      const user = userEvent.setup();
      render(<SearchModal {...makeProps({ excluded: new Set([3]) })} />);
      await user.click(screen.getByRole('checkbox', { name: /excluded/i }));
      expect(screen.getByText('Verb 3')).toBeInTheDocument();
    });

    it('marks excluded verbs with an "excluded" badge', async () => {
      const user = userEvent.setup();
      render(<SearchModal {...makeProps({ excluded: new Set([3]) })} />);
      await user.click(screen.getByRole('checkbox', { name: /excluded/i }));
      const item = screen.getByText('Verb 3').closest('li')!;
      expect(within(item).getByText('excluded')).toBeInTheDocument();
    });

    it('does not show "excluded" badge on included verbs', () => {
      render(<SearchModal {...makeProps({ excluded: new Set([3]) })} />);
      const item = screen.getByText('Verb 0').closest('li')!;
      expect(within(item).queryByText('excluded')).not.toBeInTheDocument();
    });

    it('calls onUnexclude and onClose when an excluded verb is clicked', async () => {
      const props = makeProps({ excluded: new Set([3]) });
      const user = userEvent.setup();
      render(<SearchModal {...props} />);
      await user.click(screen.getByRole('checkbox', { name: /excluded/i }));
      await user.click(screen.getByText('Verb 3').closest('li')!);
      expect(props.onUnexclude).toHaveBeenCalledWith(3);
      expect(props.onClose).toHaveBeenCalledOnce();
      expect(props.onSelect).not.toHaveBeenCalled();
    });

    it('calls onUnexclude via Enter key on highlighted excluded verb', async () => {
      const props = makeProps({ excluded: new Set([3]) });
      const user = userEvent.setup();
      render(<SearchModal {...props} />);
      const input = screen.getByPlaceholderText('Search phrasal verbs...');
      await user.click(screen.getByRole('checkbox', { name: /excluded/i }));
      await user.type(input, 'Verb 3');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');
      expect(props.onUnexclude).toHaveBeenCalledWith(3);
      expect(props.onClose).toHaveBeenCalledOnce();
    });
  });

  it('highlights the first item on ArrowDown from -1', async () => {
    const user = userEvent.setup();
    render(<SearchModal {...makeProps()} />);
    const input = screen.getByPlaceholderText('Search phrasal verbs...');
    await user.type(input, 'Verb 1');
    await user.keyboard('{ArrowDown}');
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('bg-blue-100');
  });

  it('moves selection down on repeated ArrowDown presses', async () => {
    const user = userEvent.setup();
    render(<SearchModal {...makeProps()} />);
    const input = screen.getByPlaceholderText('Search phrasal verbs...');
    await user.type(input, 'Verb');
    await user.keyboard('{ArrowDown}{ArrowDown}');
    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveClass('bg-blue-100');
  });

  it('moves selection up on ArrowUp and does not go below index 0', async () => {
    const user = userEvent.setup();
    render(<SearchModal {...makeProps()} />);
    const input = screen.getByPlaceholderText('Search phrasal verbs...');
    await user.type(input, 'Verb');
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowUp}');
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('bg-blue-100');
  });

  it('calls onSelect and onClose on Enter when a non-excluded item is highlighted', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<SearchModal {...props} />);
    const input = screen.getByPlaceholderText('Search phrasal verbs...');
    await user.type(input, 'Verb 0');
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(props.onSelect).toHaveBeenCalledWith(0);
    expect(props.onClose).toHaveBeenCalledOnce();
  });

  it('does not call onSelect on Enter when no item is highlighted', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<SearchModal {...props} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'Verb 0');
    await user.keyboard('{Enter}');
    expect(props.onSelect).not.toHaveBeenCalled();
  });

  it('resets selection to -1 when query changes', async () => {
    const user = userEvent.setup();
    render(<SearchModal {...makeProps()} />);
    const input = screen.getByPlaceholderText('Search phrasal verbs...');
    await user.type(input, 'Verb');
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Backspace}');
    const items = screen.getAllByRole('listitem');
    const highlighted = items.filter(i => i.classList.contains('bg-blue-100'));
    expect(highlighted).toHaveLength(0);
  });

  it('calls onClose on Escape key', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<SearchModal {...props} />);
    await user.keyboard('{Escape}');
    expect(props.onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    const { container } = render(<SearchModal {...props} />);
    await user.click(container.firstChild as Element);
    expect(props.onClose).toHaveBeenCalled();
  });

  it('calls onClose when the X button is clicked', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<SearchModal {...props} />);
    await user.click(screen.getByRole('button'));
    expect(props.onClose).toHaveBeenCalled();
  });

  it('Close (X) button has subtle border class', () => {
    render(<SearchModal {...makeProps()} />);
    expect(screen.getByRole('button')).toHaveClass('border-gray-200');
  });

  it('displays results sorted alphabetically by verb', () => {
    const unordered: VerbEntry[] = [
      { verb: 'zoom in', definition: 'def z', sentences: [], wordsToHide: [] },
      { verb: 'break down', definition: 'def b', sentences: [], wordsToHide: [] },
      { verb: 'look up', definition: 'def l', sentences: [], wordsToHide: [] },
    ];
    render(<SearchModal {...makeProps({ allVerbs: unordered })} />);
    const items = screen.getAllByRole('listitem').map(li => li.querySelector('.font-semibold')!.textContent);
    expect(items).toEqual(['break down', 'look up', 'zoom in']);
  });

  it('returns matching results sorted by relevance for non-empty query', async () => {
    const unordered: VerbEntry[] = [
      { verb: 'zone out', definition: 'stop paying attention', sentences: [], wordsToHide: [] },
      { verb: 'act up', definition: 'behave badly', sentences: [], wordsToHide: [] },
      { verb: 'burn out', definition: 'exhaust', sentences: [], wordsToHide: [] },
    ];
    const user = userEvent.setup();
    render(<SearchModal {...makeProps({ allVerbs: unordered })} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'out');
    const items = screen.getAllByRole('listitem').map(li => li.querySelector('.font-semibold')!.textContent);
    expect(items).toContain('burn out');
    expect(items).toContain('zone out');
    expect(items).not.toContain('act up');
  });

  it('finds verbs with typos via fuzzy matching', async () => {
    const verbs: VerbEntry[] = [
      { verb: 'figure out', definition: 'understand a problem', sentences: [], wordsToHide: [] },
      { verb: 'look up', definition: 'search for information', sentences: [], wordsToHide: [] },
    ];
    const user = userEvent.setup();
    render(<SearchModal {...makeProps({ allVerbs: verbs })} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'figure owt');
    expect(screen.getByText('figure out')).toBeInTheDocument();
  });

  it('ranks best match first when query is non-empty', async () => {
    const verbs: VerbEntry[] = [
      { verb: 'look out', definition: 'be careful', sentences: [], wordsToHide: [] },
      { verb: 'look up', definition: 'search for information', sentences: [], wordsToHide: [] },
    ];
    const user = userEvent.setup();
    render(<SearchModal {...makeProps({ allVerbs: verbs })} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'look up');
    const items = screen.getAllByRole('listitem').map(li => li.querySelector('.font-semibold')!.textContent);
    expect(items[0]).toBe('look up');
  });

  describe('partial and tokenized search', () => {
    const verbs: VerbEntry[] = [
      { verb: 'figure out', definition: 'To understand a problem and find a solution', sentences: ['It took the team three hours to figure out why the Java application was crashing.'], wordsToHide: [] },
      { verb: 'look up', definition: 'To search for information', sentences: [], wordsToHide: [] },
      { verb: 'break down', definition: 'To stop functioning or to divide into parts', sentences: [], wordsToHide: [] },
    ];

    it('finds verbs by subsequence across word boundaries', async () => {
      const user = userEvent.setup();
      render(<SearchModal {...makeProps({ allVerbs: verbs })} />);
      await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'figout');
      expect(screen.getByText('figure out')).toBeInTheDocument();
    });

    it('finds verbs by tokenized partial words', async () => {
      const user = userEvent.setup();
      render(<SearchModal {...makeProps({ allVerbs: verbs })} />);
      await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'fig owt');
      expect(screen.getByText('figure out')).toBeInTheDocument();
    });

    it('finds verbs by partial definition words', async () => {
      const user = userEvent.setup();
      render(<SearchModal {...makeProps({ allVerbs: verbs })} />);
      await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'understand probl');
      expect(screen.getByText('figure out')).toBeInTheDocument();
    });
  });

  it('has role="dialog" on the panel', () => {
    render(<SearchModal {...makeProps()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(<SearchModal {...makeProps()} />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('has aria-label on the dialog', () => {
    render(<SearchModal {...makeProps()} />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Search');
  });

  it('close button has aria-label="Close"', () => {
    render(<SearchModal {...makeProps()} />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});
