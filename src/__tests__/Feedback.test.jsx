import { render, screen } from '@testing-library/react';
import Feedback from '../components/Feedback.jsx';

describe('Feedback', () => {
  it('renders nothing when status is "idle"', () => {
    const { container } = render(<Feedback status="idle" correctVerb="Act out" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders "Excellent!" when status is "correct"', () => {
    render(<Feedback status="correct" correctVerb="Act out" />);
    expect(screen.getByText('Excellent!')).toBeInTheDocument();
  });

  it('renders the mastered-list message when status is "correct"', () => {
    render(<Feedback status="correct" correctVerb="Act out" />);
    expect(screen.getByText(/added to your mastered list/i)).toBeInTheDocument();
  });

  it('renders "Not quite!" when status is "wrong"', () => {
    render(<Feedback status="wrong" correctVerb="Act out" />);
    expect(screen.getByText('Not quite!')).toBeInTheDocument();
  });

  it('renders the correctVerb text when status is "wrong"', () => {
    render(<Feedback status="wrong" correctVerb="Act out" />);
    expect(screen.getByText('Act out')).toBeInTheDocument();
  });

  it('does not render correctVerb text when status is "correct"', () => {
    render(<Feedback status="correct" correctVerb="Act out" />);
    expect(screen.queryByText('Act out')).not.toBeInTheDocument();
  });
});
