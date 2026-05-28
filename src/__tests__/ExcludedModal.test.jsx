import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExcludedModal from '../components/ExcludedModal.jsx';

const allVerbs = [
  { verb: 'Act out', definition: 'To perform a role', sentences: [], wordsToHide: [] },
  { verb: 'Break out', definition: 'To escape suddenly', sentences: [], wordsToHide: [] },
  { verb: 'Call up', definition: 'To make a phone call', sentences: [], wordsToHide: [] },
];

function makeProps(overrides = {}) {
  return {
    excluded: new Set([0, 2]),
    allVerbs,
    onInclude: vi.fn(),
    onClose: vi.fn(),
    ...overrides,
  };
}

describe('ExcludedModal', () => {
  it('renders the modal title with excluded count', () => {
    render(<ExcludedModal {...makeProps()} />);
    expect(screen.getByText('Excluded Verbs (2)')).toBeInTheDocument();
  });

  it('renders an entry for each excluded verb', () => {
    render(<ExcludedModal {...makeProps()} />);
    expect(screen.getByText('Act out')).toBeInTheDocument();
    expect(screen.getByText('Call up')).toBeInTheDocument();
  });

  it('does not render non-excluded verbs', () => {
    render(<ExcludedModal {...makeProps()} />);
    expect(screen.queryByText('Break out')).not.toBeInTheDocument();
  });

  it('shows "No verbs are currently excluded." when excluded Set is empty', () => {
    render(<ExcludedModal {...makeProps({ excluded: new Set() })} />);
    expect(screen.getByText(/No verbs are currently excluded/)).toBeInTheDocument();
  });

  it('shows the search input when excluded Set is non-empty', () => {
    render(<ExcludedModal {...makeProps()} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('does not show the search input when excluded Set is empty', () => {
    render(<ExcludedModal {...makeProps({ excluded: new Set() })} />);
    expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();
  });

  it('filters the list by verb name when search query matches', async () => {
    const user = userEvent.setup();
    render(<ExcludedModal {...makeProps()} />);
    await user.type(screen.getByPlaceholderText('Search...'), 'Act');
    expect(screen.getByText('Act out')).toBeInTheDocument();
    expect(screen.queryByText('Call up')).not.toBeInTheDocument();
  });

  it('filters the list by definition when search query matches', async () => {
    const user = userEvent.setup();
    render(<ExcludedModal {...makeProps()} />);
    await user.type(screen.getByPlaceholderText('Search...'), 'phone call');
    expect(screen.getByText('Call up')).toBeInTheDocument();
    expect(screen.queryByText('Act out')).not.toBeInTheDocument();
  });

  it('shows "No matches found." when search query matches nothing', async () => {
    const user = userEvent.setup();
    render(<ExcludedModal {...makeProps()} />);
    await user.type(screen.getByPlaceholderText('Search...'), 'zzznomatch');
    expect(screen.getByText('No matches found.')).toBeInTheDocument();
  });

  it('calls onInclude with the correct verbIndex when Include is clicked', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<ExcludedModal {...props} />);
    const includeButtons = screen.getAllByText('Include');
    await user.click(includeButtons[0]);
    expect(props.onInclude).toHaveBeenCalledWith(0);
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    const { container } = render(<ExcludedModal {...props} />);
    // Click the outermost backdrop div (the fixed overlay)
    await user.click(container.firstChild);
    expect(props.onClose).toHaveBeenCalled();
  });

  it('calls onClose when the X button is clicked', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<ExcludedModal {...props} />);
    // The X button is the close button in the header
    const xButtons = screen.getAllByRole('button');
    const xBtn = xButtons.find(b => !b.textContent.includes('Include'));
    await user.click(xBtn);
    expect(props.onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<ExcludedModal {...props} />);
    await user.keyboard('{Escape}');
    expect(props.onClose).toHaveBeenCalledOnce();
  });

  it('does not close when clicking inside the modal panel', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<ExcludedModal {...props} />);
    await user.click(screen.getByText('Act out'));
    expect(props.onClose).not.toHaveBeenCalled();
  });
});
