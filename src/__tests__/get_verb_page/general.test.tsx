import { screen, fireEvent } from '@testing-library/react';
import { renderPage } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — general', () => {
  it('renders "Get" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Get' })).toBeInTheDocument();
  });

  it('does not render "4 meanings" subtitle', () => {
    renderPage();
    expect(screen.queryByText(/4 meanings/i)).not.toBeInTheDocument();
  });

  it('renders correct numbered badges across all 7 sections (off:4, on:4, up:3, down:4, in:4, into:3, out:4)', () => {
    renderPage();
    ['off', 'on', 'up', 'down', 'in', 'into', 'out'].forEach(p => fireEvent.click(screen.getByText(p)));
    expect(screen.getAllByText('1')).toHaveLength(7);
    expect(screen.getAllByText('2')).toHaveLength(7);
    expect(screen.getAllByText('3')).toHaveLength(7);
    expect(screen.getAllByText('4')).toHaveLength(5);
  });
});
