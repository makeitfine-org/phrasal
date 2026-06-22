import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListSearchModal from '../components/ListSearchModal';
import type { ListSearchEntry } from '../data/listVerbIndex';

const mockEntries: ListSearchEntry[] = [
  { verb: 'Get off', definition: 'To leave a form of public transport', example: 'She got off the bus', route: '/phrasal-verbs/list/get', storageKey: 'getOff_section_expanded', sectionId: 'getOff', entryId: 'getOff_0' },
  { verb: 'Get off', definition: 'To finish work', example: 'She got off early', route: '/phrasal-verbs/list/get', storageKey: 'getOff_section_expanded', sectionId: 'getOff', entryId: 'getOff_1' },
  { verb: 'Get on', definition: 'To board a vehicle', example: 'He got on the train', route: '/phrasal-verbs/list/get', storageKey: 'getOn_section_expanded', sectionId: 'getOn', entryId: 'getOn_0' },
  { verb: 'Make up', definition: 'To invent a story or lie', example: 'She made up an excuse', route: '/phrasal-verbs/list/make', storageKey: 'makeUp_section_expanded', sectionId: 'makeUp', entryId: 'makeUp_0' },
  { verb: 'Make up', definition: 'To reconcile after a quarrel', example: 'They made up after the fight', route: '/phrasal-verbs/list/make', storageKey: 'makeUp_section_expanded', sectionId: 'makeUp', entryId: 'makeUp_1' },
  { verb: 'Put off', definition: 'To postpone or delay', example: 'They put off the meeting', route: '/phrasal-verbs/list/put', storageKey: 'putOff_section_expanded', sectionId: 'putOff', entryId: 'putOff_0' },
  { verb: 'Put off', definition: 'To disgust or repel', example: 'The smell put him off', route: '/phrasal-verbs/list/put', storageKey: 'putOff_section_expanded', sectionId: 'putOff', entryId: 'putOff_1' },
];

function renderModal(props: Partial<React.ComponentProps<typeof ListSearchModal>> = {}) {
  return render(
    <ListSearchModal
      onSelect={props.onSelect ?? vi.fn()}
      onClose={props.onClose ?? vi.fn()}
      entries={mockEntries}
    />
  );
}

describe('ListSearchModal', () => {
  it('renders the search input', () => {
    renderModal();
    expect(screen.getByPlaceholderText('Search phrasal verbs...')).toBeInTheDocument();
  });

  it('shows all entries when query is empty', () => {
    renderModal();
    expect(screen.getAllByRole('listitem')).toHaveLength(7);
  });

  it('filters results by verb name', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'get');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('filters results by definition', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'postpone');
    expect(screen.getByText('Put off')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('filters results by example sentence', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'smell');
    expect(screen.getByText('Put off')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('shows "No matches found" when query has no results', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'zzznomatch');
    expect(screen.getByText(/No matches found/)).toBeInTheDocument();
  });

  it('shows results sorted alphabetically by verb', () => {
    renderModal();
    const items = screen.getAllByRole('listitem').map(li => li.querySelector('.font-semibold')!.textContent);
    expect(items).toEqual(['Get off', 'Get off', 'Get on', 'Make up', 'Make up', 'Put off', 'Put off']);
  });

  it('displays definition and example for each entry', () => {
    renderModal();
    expect(screen.getByText('To leave a form of public transport')).toBeInTheDocument();
    expect(screen.getByText('"She got off the bus"')).toBeInTheDocument();
  });

  it('calls onSelect and onClose when a result is clicked', async () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={onSelect} onClose={onClose} entries={mockEntries} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'get off');
    await user.click(screen.getAllByText('Get off')[0].closest('li')!);
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ verb: 'Get off', sectionId: 'getOff' })
    );
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose on Escape key', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={vi.fn()} onClose={onClose} entries={mockEntries} />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<ListSearchModal onSelect={vi.fn()} onClose={onClose} entries={mockEntries} />);
    await user.click(container.firstChild as Element);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when the X button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={vi.fn()} onClose={onClose} entries={mockEntries} />);
    await user.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });

  it('highlights first item on ArrowDown', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.keyboard('{ArrowDown}');
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('bg-blue-100');
  });

  it('moves selection down on repeated ArrowDown', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.keyboard('{ArrowDown}{ArrowDown}');
    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveClass('bg-blue-100');
  });

  it('selects highlighted item on Enter', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={onSelect} onClose={vi.fn()} entries={mockEntries} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'get off');
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ verb: 'Get off' }));
  });

  it('does not call onSelect on Enter when nothing is highlighted', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={onSelect} onClose={vi.fn()} entries={mockEntries} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'Get off');
    await user.keyboard('{Enter}');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('resets selection when query changes', async () => {
    const user = userEvent.setup();
    renderModal();
    const input = screen.getByPlaceholderText('Search phrasal verbs...');
    await user.type(input, 'get');
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Backspace}');
    const items = screen.getAllByRole('listitem');
    const highlighted = items.filter(i => i.classList.contains('bg-blue-100'));
    expect(highlighted).toHaveLength(0);
  });

  it('finds entry by a non-first meaning definition', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'reconcile');
    expect(screen.getByText('Make up')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('finds entry by a word in the example sentence', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'disgust');
    expect(screen.getByText('Put off')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('has role="dialog" on the panel', () => {
    renderModal();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    renderModal();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('has aria-label on the dialog', () => {
    renderModal();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Search');
  });

  it('close button has aria-label="Close"', () => {
    renderModal();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});
