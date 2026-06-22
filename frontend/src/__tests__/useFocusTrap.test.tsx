import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFocusTrap } from '../hooks/useFocusTrap';

function Dialog({ onClose }: { onClose: () => void }) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef);

  return (
    <div ref={panelRef} role="dialog">
      <input data-testid="input" />
      <button data-testid="btn-a">A</button>
      <button data-testid="btn-close" onClick={onClose}>Close</button>
    </div>
  );
}

function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button data-testid="trigger" onClick={() => setOpen(true)}>Open</button>
      {open && <Dialog onClose={() => setOpen(false)} />}
    </div>
  );
}

describe('useFocusTrap', () => {
  it('wraps focus from last to first element on Tab', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByTestId('trigger'));

    const lastEl = screen.getByTestId('btn-close');
    lastEl.focus();
    expect(lastEl).toHaveFocus();

    fireEvent.keyDown(lastEl, { key: 'Tab' });
    expect(screen.getByTestId('input')).toHaveFocus();
  });

  it('wraps focus from first to last element on Shift+Tab', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByTestId('trigger'));

    const firstEl = screen.getByTestId('input');
    firstEl.focus();
    expect(firstEl).toHaveFocus();

    fireEvent.keyDown(firstEl, { key: 'Tab', shiftKey: true });
    expect(screen.getByTestId('btn-close')).toHaveFocus();
  });

  it('does not wrap focus for middle elements', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByTestId('trigger'));

    const middleEl = screen.getByTestId('btn-a');
    middleEl.focus();
    expect(middleEl).toHaveFocus();

    fireEvent.keyDown(middleEl, { key: 'Tab' });
    expect(middleEl).toHaveFocus();
  });

  it('restores focus to the trigger element on close', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const trigger = screen.getByTestId('trigger');
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByTestId('btn-close'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
