import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('test crash');
  return <div>OK</div>;
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('renders children when there is no error', () => {
  render(<ErrorBoundary><Bomb shouldThrow={false} /></ErrorBoundary>);
  expect(screen.getByText('OK')).toBeInTheDocument();
});

it('renders 500 error page when a child throws', () => {
  render(<ErrorBoundary><Bomb shouldThrow={true} /></ErrorBoundary>);
  expect(screen.getByText('500')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Something Went Wrong' })).toBeInTheDocument();
});

it('shows the error message', () => {
  render(<ErrorBoundary><Bomb shouldThrow={true} /></ErrorBoundary>);
  expect(screen.getByText('test crash')).toBeInTheDocument();
});

it('shows a reload button', () => {
  render(<ErrorBoundary><Bomb shouldThrow={true} /></ErrorBoundary>);
  expect(screen.getByRole('button', { name: 'Reload Page' })).toBeInTheDocument();
});
