import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import ResendVerification, { RESEND_COOLDOWN_MS } from '../components/ResendVerification';
import * as authApi from '../api/authApi';
import { ApiError } from '../api/client';

vi.mock('../api/authApi', () => ({ resendVerification: vi.fn() }));

beforeEach(() => {
  vi.useFakeTimers();
  vi.mocked(authApi.resendVerification).mockReset().mockResolvedValue(undefined);
});

afterEach(() => {
  vi.useRealTimers();
});

async function click() {
  await act(async () => { fireEvent.click(screen.getByTestId('resend-verification')); });
}

describe('ResendVerification', () => {
  it('sends the typed email', async () => {
    render(<ResendVerification />);
    expect(screen.getByTestId('resend-verification')).toBeDisabled();
    fireEvent.change(screen.getByTestId('resend-email'), { target: { value: 'a@b.co' } });
    await click();
    expect(authApi.resendVerification).toHaveBeenCalledWith('a@b.co');
    expect(screen.getByTestId('resend-done')).toHaveTextContent("we've sent a new link");
  });

  it('uses the prefilled email and hides the field when compact', async () => {
    render(<ResendVerification initialEmail="x@y.co" compact />);
    expect(screen.queryByTestId('resend-email')).not.toBeInTheDocument();
    await click();
    expect(authApi.resendVerification).toHaveBeenCalledWith('x@y.co');
  });

  it('keeps the field when prefilled but not compact', () => {
    render(<ResendVerification initialEmail="x@y.co" />);
    expect(screen.getByTestId('resend-email')).toHaveValue('x@y.co');
  });

  it('shows the server message on 429', async () => {
    vi.mocked(authApi.resendVerification).mockRejectedValue(new ApiError(429, 'Try again in 42 minutes'));
    render(<ResendVerification initialEmail="x@y.co" compact />);
    await click();
    expect(screen.getByTestId('resend-error')).toHaveTextContent('Try again in 42 minutes');
    expect(screen.queryByTestId('resend-done')).not.toBeInTheDocument();
  });

  it('shows a generic message on other errors', async () => {
    vi.mocked(authApi.resendVerification).mockRejectedValue(new ApiError(500, 'boom'));
    render(<ResendVerification initialEmail="x@y.co" compact />);
    await click();
    expect(screen.getByTestId('resend-error')).toHaveTextContent('Could not send the email');
  });

  it('re-enables the button after the cooldown', async () => {
    render(<ResendVerification initialEmail="x@y.co" compact />);
    await click();
    expect(screen.getByTestId('resend-verification')).toBeDisabled();
    act(() => { vi.advanceTimersByTime(RESEND_COOLDOWN_MS - 1); });
    expect(screen.getByTestId('resend-verification')).toBeDisabled();
    act(() => { vi.advanceTimersByTime(1); });
    expect(screen.getByTestId('resend-verification')).not.toBeDisabled();
  });
});
