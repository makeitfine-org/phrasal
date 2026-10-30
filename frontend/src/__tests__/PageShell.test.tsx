import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';

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

describe('PageShell — system color scheme on first start', () => {
  function mockSystemColorScheme(scheme: 'dark' | 'light') {
    return vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: scheme === 'dark' && query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as MediaQueryList);
  }

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('applies dark class when nothing is cached and the system prefers dark', () => {
    mockSystemColorScheme('dark');
    renderWithShell();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByTitle('Toggle Dark/Light Mode')).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('stays light when nothing is cached and the system prefers light', () => {
    mockSystemColorScheme('light');
    renderWithShell();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByTitle('Toggle Dark/Light Mode')).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('queries the prefers-color-scheme: dark media feature', () => {
    const matchMedia = mockSystemColorScheme('light');
    renderWithShell();
    expect(matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
  });

  it('caches the system-derived theme to localStorage on first start', () => {
    mockSystemColorScheme('dark');
    renderWithShell();
    const saved = JSON.parse(localStorage.getItem('phrasalQuizState')!);
    expect(saved.darkMode).toBe(true);
  });

  it('cached light preference overrides a dark system theme', () => {
    mockSystemColorScheme('dark');
    localStorage.setItem('phrasalQuizState', JSON.stringify({ darkMode: false }));
    renderWithShell();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('cached dark preference overrides a light system theme', () => {
    mockSystemColorScheme('light');
    localStorage.setItem('phrasalQuizState', JSON.stringify({ darkMode: true }));
    renderWithShell();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('does not consult the system theme when a preference is cached', () => {
    const matchMedia = mockSystemColorScheme('dark');
    localStorage.setItem('phrasalQuizState', JSON.stringify({ darkMode: false }));
    renderWithShell();
    expect(matchMedia).not.toHaveBeenCalled();
  });

  it('uses the system theme when the cache exists but has no darkMode field', () => {
    mockSystemColorScheme('dark');
    localStorage.setItem('phrasalQuizState', JSON.stringify({ currentIndex: 3 }));
    renderWithShell();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    const saved = JSON.parse(localStorage.getItem('phrasalQuizState')!);
    expect(saved).toEqual({ currentIndex: 3, darkMode: true });
  });

  it('toggling after a dark system start switches to light and caches it', async () => {
    mockSystemColorScheme('dark');
    const user = userEvent.setup();
    renderWithShell();
    await user.click(screen.getByTitle('Toggle Dark/Light Mode'));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    const saved = JSON.parse(localStorage.getItem('phrasalQuizState')!);
    expect(saved.darkMode).toBe(false);
  });

  it('falls back to light when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);
    expect(window.matchMedia).toBeUndefined();
    renderWithShell();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});

describe('PageShell — navigation menu', () => {
  it('renders the nav menu on the / route', () => {
    renderWithShell('/');
    expect(screen.getByTestId('nav-menu')).toBeInTheDocument();
  });

  it('renders the nav menu on /phrasal-verbs', () => {
    renderWithShell('/phrasal-verbs');
    expect(screen.getByTestId('nav-menu')).toBeInTheDocument();
  });

  it('nav menu contains a home link pointing to /', () => {
    renderWithShell('/phrasal-verbs');
    const homeLink = screen.getByTitle('Home');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('nav menu home link shows favicon image', () => {
    renderWithShell('/phrasal-verbs');
    const img = screen.getByAltText('');
    expect(img).toHaveAttribute('src', '/favicon.svg');
  });
});

describe('PageShell — button borders', () => {
  it('Dark/Light toggle has subtle border class', () => {
    renderWithShell('/');
    expect(screen.getByTitle('Toggle Dark/Light Mode')).toHaveClass('border-gray-300');
  });
});

describe('PageShell — skip-to-content link', () => {
  it('renders a skip-to-content link', () => {
    renderWithShell('/');
    expect(screen.getByText('Skip to content')).toBeInTheDocument();
  });

  it('skip-to-content link points to #main-content', () => {
    renderWithShell('/');
    expect(screen.getByText('Skip to content')).toHaveAttribute('href', '#main-content');
  });
});

describe('PageShell — main landmark', () => {
  it('renders children inside a <main> element', () => {
    renderWithShell('/');
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('main element has id="main-content"', () => {
    renderWithShell('/');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
  });
});

describe('PageShell — dark mode toggle aria-label', () => {
  it('has aria-label for light mode by default', () => {
    renderWithShell('/');
    expect(screen.getByTitle('Toggle Dark/Light Mode')).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('has aria-label for dark mode after toggling', async () => {
    const user = userEvent.setup();
    renderWithShell('/');
    await user.click(screen.getByTitle('Toggle Dark/Light Mode'));
    expect(screen.getByTitle('Toggle Dark/Light Mode')).toHaveAttribute('aria-label', 'Switch to light mode');
  });
});

describe('PageShell — two-factor enrollment banner', () => {
  it('shows the banner for an unenrolled admin', () => {
    const value = {
      status: 'authenticated',
      user: { id: 1, email: 'a@x.co', role: 'ADMIN', twoFactorEnabled: false, twoFactorEnrollmentRequired: true },
    } as unknown as AuthContextValue;
    render(
      <AuthContext.Provider value={value}>
        <MemoryRouter><Routes><Route element={<PageShell><Outlet /></PageShell>}><Route path="/" element={<div>Home</div>} /></Route></Routes></MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByTestId('two-factor-enrollment-banner')).toBeInTheDocument();
  });

  it('shows no banner for anonymous visitors', () => {
    renderWithShell('/');
    expect(screen.queryByTestId('two-factor-enrollment-banner')).toBeNull();
  });
});
