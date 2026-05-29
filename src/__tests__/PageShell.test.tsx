import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import PageShell from '../components/PageShell';

function renderWithShell(initialPath: string = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route element={<PageShell><Outlet /></PageShell>}>
          <Route path="/" element={<div>Home page</div>} />
          <Route path="/phrasal-verbs" element={<div>Phrasal verbs page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

describe('PageShell — dark/light toggle', () => {
  it('renders the toggle button on every page', () => {
    renderWithShell('/');
    expect(screen.getByTitle('Toggle Dark/Light Mode')).toBeInTheDocument();
  });

  it('renders the toggle button on non-home pages too', () => {
    renderWithShell('/phrasal-verbs');
    expect(screen.getByTitle('Toggle Dark/Light Mode')).toBeInTheDocument();
  });

  it('clicking toggle adds dark class to document.documentElement', async () => {
    const user = userEvent.setup();
    renderWithShell();
    await user.click(screen.getByTitle('Toggle Dark/Light Mode'));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('clicking toggle twice removes dark class', async () => {
    const user = userEvent.setup();
    renderWithShell();
    await user.click(screen.getByTitle('Toggle Dark/Light Mode'));
    await user.click(screen.getByTitle('Toggle Dark/Light Mode'));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists darkMode:true to localStorage after toggling on', async () => {
    const user = userEvent.setup();
    renderWithShell();
    await user.click(screen.getByTitle('Toggle Dark/Light Mode'));
    const saved = JSON.parse(localStorage.getItem('phrasalQuizState')!);
    expect(saved.darkMode).toBe(true);
  });

  it('persists darkMode:false to localStorage after toggling off', async () => {
    const user = userEvent.setup();
    renderWithShell();
    await user.click(screen.getByTitle('Toggle Dark/Light Mode'));
    await user.click(screen.getByTitle('Toggle Dark/Light Mode'));
    const saved = JSON.parse(localStorage.getItem('phrasalQuizState')!);
    expect(saved.darkMode).toBe(false);
  });

  it('reads darkMode:true from localStorage and applies dark class on mount', () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({ darkMode: true }));
    renderWithShell();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('does not apply dark class when localStorage darkMode is false', () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({ darkMode: false }));
    renderWithShell();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('does not apply dark class when localStorage is empty', () => {
    renderWithShell();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});

describe('PageShell — Home button', () => {
  it('does not render the Home button on the / route', () => {
    renderWithShell('/');
    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();
  });

  it('renders the Home button on /phrasal-verbs', () => {
    renderWithShell('/phrasal-verbs');
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('Home button href points to /', () => {
    renderWithShell('/phrasal-verbs');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });

  it('Home link has subtle border class', () => {
    renderWithShell('/phrasal-verbs');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveClass('border-gray-300');
  });
});

describe('PageShell — button borders', () => {
  it('Dark/Light toggle has subtle border class', () => {
    renderWithShell('/');
    expect(screen.getByTitle('Toggle Dark/Light Mode')).toHaveClass('border-gray-300');
  });
});
