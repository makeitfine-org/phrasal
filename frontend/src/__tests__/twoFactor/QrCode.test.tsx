import React from 'react';
import { render, screen, act } from '@testing-library/react';
import QrCode from '../../components/twoFactor/QrCode';

// A plain function (not vi.fn): vitest's result tracking would report a deliberately rejected promise as unhandled.
const qr = vi.hoisted(() => ({
  calls: [] as unknown[][],
  impl: (() => Promise.resolve('')) as (...args: unknown[]) => Promise<string>,
}));

vi.mock('qrcode', () => ({
  default: { toDataURL: (...args: unknown[]) => { qr.calls.push(args); return qr.impl(...args); } },
}));

describe('QrCode', () => {
  beforeEach(() => { qr.calls.length = 0; });

  it('renders the image from the data URL', async () => {
    qr.impl = () => Promise.resolve('data:image/png;base64,AAA');
    render(<QrCode value="otpauth://totp/x" />);
    const img = await screen.findByTestId('two-factor-qr');
    expect(img).toHaveAttribute('src', 'data:image/png;base64,AAA');
    expect(img).toHaveAttribute('alt', 'QR code for your authenticator app');
    expect(qr.calls[0][0]).toBe('otpauth://totp/x');
    expect(qr.calls[0][1]).toMatchObject({ errorCorrectionLevel: 'M' });
  });

  it('renders nothing when generation fails', async () => {
    qr.impl = () => Promise.reject(new Error('boom'));
    let container!: HTMLElement;
    await act(async () => { ({ container } = render(<QrCode value="x" />)); });
    expect(qr.calls).toHaveLength(1);
    expect(container).toBeEmptyDOMElement();
  });

  it('ignores a late result after unmount', async () => {
    let resolve!: (url: string) => void;
    qr.impl = () => new Promise<string>(r => { resolve = r; });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { unmount, container } = render(<QrCode value="x" />);
    unmount();
    await act(async () => { resolve('data:image/png;base64,BBB'); });
    expect(container).toBeEmptyDOMElement();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
