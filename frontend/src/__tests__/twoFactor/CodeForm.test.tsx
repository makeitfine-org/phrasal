import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CodeForm from '../../components/twoFactor/CodeForm';
import { ApiError } from '../../api/client';

const problem = (slug: string) => ({ type: `https://phrasal.net/problems/${slug}` });

function renderForm(onSubmit: (code: string) => Promise<void>) {
  render(<CodeForm label="Code" submitLabel="Go" testIdPrefix="t" onSubmit={onSubmit} />);
}

function submit(value: string) {
  fireEvent.change(screen.getByTestId('t-code'), { target: { value } });
  fireEvent.click(screen.getByTestId('t-submit'));
}

describe('CodeForm', () => {
  it('submits the trimmed code', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    renderForm(onSubmit);
    submit('  123456 ');
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith('123456'));
    expect(screen.getByTestId('t-code')).toHaveAttribute('autocomplete', 'one-time-code');
  });

  it('shows a field error for an invalid code and clears the input', async () => {
    renderForm(vi.fn().mockRejectedValue(new ApiError(400, 'bad', problem('invalid-two-factor-code'))));
    submit('000000');
    expect(await screen.findByTestId('t-error')).toHaveTextContent('Invalid or already used code');
    expect(screen.getByTestId('t-code')).toHaveValue('');
  });

  it('shows an alert for other errors', async () => {
    renderForm(vi.fn().mockRejectedValue(new ApiError(429, 'Too many attempts')));
    submit('000000');
    expect(await screen.findByTestId('t-alert')).toHaveTextContent('Too many attempts');
  });

  it('disables the button while pending', async () => {
    let resolve!: () => void;
    renderForm(vi.fn().mockReturnValue(new Promise<void>(r => { resolve = r; })));
    submit('123456');
    await waitFor(() => expect(screen.getByTestId('t-submit')).toBeDisabled());
    resolve();
    await waitFor(() => expect(screen.getByTestId('t-submit')).not.toBeDisabled());
  });
});
