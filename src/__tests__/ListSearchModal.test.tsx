import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListSearchModal from '../components/ListSearchModal';
import type { ListSearchEntry } from '../data/listVerbIndex';

vi.mock('../data/listVerbIndex', () => ({
  listVerbIndex: [
    { verb: 'Get off', definition: 'To leave a form of public transport', searchText: 'To leave a form of public transport She got off the bus', route: '/phrasal-verbs/list/get', storageKey: 'getOff_section_expanded', sectionId: 'getOff' },
    { verb: 'Get on', definition: 'To board a vehicle', searchText: 'To board a vehicle He got on the train', route: '/phrasal-verbs/list/get', storageKey: 'getOn_section_expanded', sectionId: 'getOn' },
    { verb: 'Make up', definition: 'To invent a story or lie', searchText: 'To invent a story or lie She made up an excuse To reconcile after a quarrel They made up after the fight', route: '/phrasal-verbs/list/make', storageKey: 'makeUp_section_expanded', sectionId: 'makeUp' },
    { verb: 'Put off', definition: 'To postpone or delay', searchText: 'To postpone or delay They put off the meeting To disgust or repel The smell put him off', route: '/phrasal-verbs/list/put', storageKey: 'putOff_section_expanded', sectionId: 'putOff' },
  ] as ListSearchEntry[],
}));

describe('ListSearchModal', () => {
  it('renders the search input', () => {
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search phrasal verbs...')).toBeInTheDocument();
  });

  it('shows all entries when query is empty', () => {
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });

  it('filters results by verb name', async () => {
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'get');
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(screen.getByText('Get off')).toBeInTheDocument();
    expect(screen.getByText('Get on')).toBeInTheDocument();
  });

  it('filters results by definition', async () => {
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'postpone');
    expect(screen.getByText('Put off')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('shows "No matches found" when query has no results', async () => {
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'zzznomatch');
    expect(screen.getByText(/No matches found/)).toBeInTheDocument();
  });

  it('shows results sorted alphabetically by verb', () => {
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    const items = screen.getAllByRole('listitem').map(li => li.querySelector('.font-semibold')!.textContent);
    expect(items).toEqual(['Get off', 'Get on', 'Make up', 'Put off']);
  });

  it('calls onSelect and onClose when a result is clicked', async () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={onSelect} onClose={onClose} />);
    await user.click(screen.getByText('Get off').closest('li')!);
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ verb: 'Get off', sectionId: 'getOff' })
    );
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose on Escape key', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={vi.fn()} onClose={onClose} />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<ListSearchModal onSelect={vi.fn()} onClose={onClose} />);
    await user.click(container.firstChild as Element);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when the X button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={vi.fn()} onClose={onClose} />);
    await user.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });

  it('highlights first item on ArrowDown', async () => {
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    await user.keyboard('{ArrowDown}');
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('bg-blue-100');
  });

  it('moves selection down on repeated ArrowDown', async () => {
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    await user.keyboard('{ArrowDown}{ArrowDown}');
    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveClass('bg-blue-100');
  });

  it('selects highlighted item on Enter', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={onSelect} onClose={vi.fn()} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'get off');
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ verb: 'Get off' }));
  });

  it('does not call onSelect on Enter when nothing is highlighted', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={onSelect} onClose={vi.fn()} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'Get off');
    await user.keyboard('{Enter}');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('resets selection when query changes', async () => {
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    const input = screen.getByPlaceholderText('Search phrasal verbs...');
    await user.type(input, 'get');
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Backspace}');
    const items = screen.getAllByRole('listitem');
    const highlighted = items.filter(i => i.classList.contains('bg-blue-100'));
    expect(highlighted).toHaveLength(0);
  });

  it('finds entry by a non-first meaning definition in searchText', async () => {
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'reconcile');
    expect(screen.getByText('Make up')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('finds entry by an example sentence word in searchText', async () => {
    const user = userEvent.setup();
    render(<ListSearchModal onSelect={vi.fn()} onClose={vi.fn()} />);
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'disgust');
    expect(screen.getByText('Put off')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
