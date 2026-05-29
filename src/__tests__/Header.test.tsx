import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';

function makeProps(overrides: Record<string, unknown> = {}) {
  return {
    masteredCount: 3,
    totalCount: 10,
    currentIndex: 2,
    onReset: vi.fn(),
    excludedCount: 0,
    onShowExcluded: vi.fn(),
    onShowSearch: vi.fn(),
    ...overrides,
  };
}

describe('Header', () => {
  it('renders the "Phrasal Verbs" heading', () => {
    render(<Header {...makeProps()} />);
    expect(screen.getByText('Phrasal Verbs')).toBeInTheDocument();
  });

  it('renders masteredCount and totalCount in the correct format', () => {
    render(<Header {...makeProps({ masteredCount: 3, totalCount: 10 })} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/\/ 10/)).toBeInTheDocument();
  });

  it('renders "Question № N" with 1-based currentIndex', () => {
    render(<Header {...makeProps({ currentIndex: 4 })} />);
    expect(screen.getByText(/Question № 5/)).toBeInTheDocument();
  });

  it('does not render the excluded badge when excludedCount is 0', () => {
    render(<Header {...makeProps({ excludedCount: 0 })} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('renders the excluded badge with the count when excludedCount > 0', () => {
    render(<Header {...makeProps({ excludedCount: 5 })} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows "99+" in the badge when excludedCount exceeds 99', () => {
    render(<Header {...makeProps({ excludedCount: 150 })} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('calls onReset when the reset button is clicked', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<Header {...props} />);
    await user.click(screen.getByTitle('Global Reset - Clear all progress'));
    expect(props.onReset).toHaveBeenCalledOnce();
  });

  it('calls onShowExcluded when the excluded button is clicked', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<Header {...props} />);
    await user.click(screen.getByTitle('View excluded verbs'));
    expect(props.onShowExcluded).toHaveBeenCalledOnce();
  });

  it('calls onShowSearch when the search button is clicked', async () => {
    const props = makeProps();
    const user = userEvent.setup();
    render(<Header {...props} />);
    await user.click(screen.getByTitle('Search phrasal verbs'));
    expect(props.onShowSearch).toHaveBeenCalledOnce();
  });

  it('Search button has subtle border class', () => {
    render(<Header {...makeProps()} />);
    expect(screen.getByTitle('Search phrasal verbs')).toHaveClass('border-gray-300');
  });

  it('ExcludedModal trigger has subtle border class', () => {
    render(<Header {...makeProps()} />);
    expect(screen.getByTitle('View excluded verbs')).toHaveClass('border-gray-300');
  });

  it('Reset button has subtle border class', () => {
    render(<Header {...makeProps()} />);
    expect(screen.getByTitle('Global Reset - Clear all progress')).toHaveClass('border-gray-300');
  });
});
