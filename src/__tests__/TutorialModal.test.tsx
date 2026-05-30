import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TutorialModal from '../components/TutorialModal';

function renderModal(onClose = vi.fn()) {
  return render(<TutorialModal onClose={onClose} />);
}

describe('TutorialModal — section headings', () => {
  it('renders "I wish I did" heading', () => {
    renderModal();
    expect(screen.getByText('I wish I did')).toBeInTheDocument();
  });

  it('renders "I wish I had done" heading', () => {
    renderModal();
    expect(screen.getByText('I wish I had done')).toBeInTheDocument();
  });

  it('renders "I wish you would do" heading', () => {
    renderModal();
    expect(screen.getByText('I wish you would do')).toBeInTheDocument();
  });

  it('renders "If only" heading', () => {
    renderModal();
    expect(screen.getByText('If only')).toBeInTheDocument();
  });
});

describe('TutorialModal — rule text', () => {
  it('shows past simple rule', () => {
    renderModal();
    expect(screen.getByText(/wish \+ subject \+ past simple/i)).toBeInTheDocument();
  });

  it('shows past perfect rule', () => {
    renderModal();
    expect(screen.getByText(/wish \+ subject \+ past perfect/i)).toBeInTheDocument();
  });

  it('shows would rule', () => {
    renderModal();
    expect(screen.getByText(/wish \+ person\/thing \+ would \+ infinitive/i)).toBeInTheDocument();
  });

  it('shows if only rule', () => {
    renderModal();
    expect(screen.getByText(/if only instead of I wish/i)).toBeInTheDocument();
  });
});

describe('TutorialModal — example sentences', () => {
  it('shows past simple example', () => {
    renderModal();
    expect(screen.getByText(/I wish things were different/i)).toBeInTheDocument();
  });

  it('shows past perfect example', () => {
    renderModal();
    expect(screen.getByText(/I wish I hadn't quit my job/i)).toBeInTheDocument();
  });

  it('shows would example', () => {
    renderModal();
    expect(screen.getByText(/I wish you would stop biting your nails/i)).toBeInTheDocument();
  });

  it('shows if only example', () => {
    renderModal();
    expect(screen.getByText(/If only I was\/were a bit taller/i)).toBeInTheDocument();
  });
});

describe('TutorialModal — notes', () => {
  it('shows the were/was note', () => {
    renderModal();
    expect(screen.getByText(/were instead of was/i)).toBeInTheDocument();
  });

  it('shows the "I wish I would" restriction note', () => {
    renderModal();
    expect(screen.getByText(/We can NOT use this structure to wish about ourselves/i)).toBeInTheDocument();
  });
});

describe('TutorialModal — close behaviour', () => {
  it('calls onClose when Escape is pressed', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderModal(onClose);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking the backdrop', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<TutorialModal onClose={onClose} />);
    const backdrop = document.querySelector('.fixed.inset-0') as HTMLElement;
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose when clicking inside the modal box', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderModal(onClose);
    await user.click(screen.getByText('I wish I did'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when X button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderModal(onClose);
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
