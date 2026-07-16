import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import NavigationMenu from '../components/NavigationMenu';

const defaultToggle = vi.fn();

function renderNav(initialPath: string = '/phrasal-verbs', darkMode = false, onToggle = defaultToggle) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route element={<><NavigationMenu darkMode={darkMode} onToggleDarkMode={onToggle} /><Outlet /></>}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/phrasal-verbs" element={<div>PV Hub</div>} />
          <Route path="/phrasal-verbs/test-most-popular" element={<div>PV Quiz</div>} />
          <Route path="/phrasal-verbs/list" element={<div>PV List</div>} />
          <Route path="/phrasal-verbs/particles" element={<div>PV Particles</div>} />
          <Route path="/grammar" element={<div>Grammar Hub</div>} />
          <Route path="/grammar/i-wish-if-only" element={<div>Grammar Quiz</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('NavigationMenu — visibility', () => {
  it('does not render on the home page', () => {
    renderNav('/');
    expect(screen.queryByTestId('nav-menu')).not.toBeInTheDocument();
  });

  it('renders on /phrasal-verbs', () => {
    renderNav('/phrasal-verbs');
    expect(screen.getByTestId('nav-menu')).toBeInTheDocument();
  });

  it('renders on /grammar/i-wish-if-only', () => {
    renderNav('/grammar/i-wish-if-only');
    expect(screen.getByTestId('nav-menu')).toBeInTheDocument();
  });
});

describe('NavigationMenu — home link', () => {
  it('contains a home link with title', () => {
    renderNav('/phrasal-verbs');
    expect(screen.getByTitle('Home')).toBeInTheDocument();
  });

  it('home link navigates to /', () => {
    renderNav('/phrasal-verbs');
    expect(screen.getByTitle('Home')).toHaveAttribute('href', '/');
  });
});

describe('NavigationMenu — desktop dropdowns', () => {
  it('shows Phrasal Verbs dropdown trigger', () => {
    renderNav('/phrasal-verbs');
    expect(screen.getByTestId('nav-phrasal-verbs')).toBeInTheDocument();
  });

  it('shows Grammar dropdown trigger', () => {
    renderNav('/phrasal-verbs');
    expect(screen.getByTestId('nav-grammar')).toBeInTheDocument();
  });

  it('Phrasal Verbs dropdown is closed by default', () => {
    renderNav('/phrasal-verbs');
    expect(screen.queryByTestId('dropdown-phrasal-verbs')).not.toBeInTheDocument();
  });

  it('clicking Phrasal Verbs opens the dropdown', async () => {
    const user = userEvent.setup();
    renderNav('/phrasal-verbs');
    await user.click(screen.getByTestId('nav-phrasal-verbs'));
    expect(screen.getByTestId('dropdown-phrasal-verbs')).toBeInTheDocument();
  });

  it('Phrasal Verbs dropdown contains Quiz link', async () => {
    const user = userEvent.setup();
    renderNav('/phrasal-verbs');
    await user.click(screen.getByTestId('nav-phrasal-verbs'));
    const dropdown = screen.getByTestId('dropdown-phrasal-verbs');
    expect(within(dropdown).getByText('Quiz')).toHaveAttribute('href', '/phrasal-verbs/test-most-popular');
  });

  it('Phrasal Verbs dropdown contains List link', async () => {
    const user = userEvent.setup();
    renderNav('/phrasal-verbs');
    await user.click(screen.getByTestId('nav-phrasal-verbs'));
    const dropdown = screen.getByTestId('dropdown-phrasal-verbs');
    expect(within(dropdown).getByText('List')).toHaveAttribute('href', '/phrasal-verbs/list');
  });

  it('Phrasal Verbs dropdown contains Particles link', async () => {
    const user = userEvent.setup();
    renderNav('/phrasal-verbs');
    await user.click(screen.getByTestId('nav-phrasal-verbs'));
    const dropdown = screen.getByTestId('dropdown-phrasal-verbs');
    expect(within(dropdown).getByText('Particles')).toHaveAttribute('href', '/phrasal-verbs/particles');
  });

  it('Grammar dropdown contains I wish / If only link', async () => {
    const user = userEvent.setup();
    renderNav('/grammar');
    await user.click(screen.getByTestId('nav-grammar'));
    const dropdown = screen.getByTestId('dropdown-grammar');
    expect(within(dropdown).getByText('I wish / If only')).toHaveAttribute('href', '/grammar/i-wish-if-only');
  });

  it('clicking dropdown trigger twice closes it', async () => {
    const user = userEvent.setup();
    renderNav('/phrasal-verbs');
    await user.click(screen.getByTestId('nav-phrasal-verbs'));
    expect(screen.getByTestId('dropdown-phrasal-verbs')).toBeInTheDocument();
    await user.click(screen.getByTestId('nav-phrasal-verbs'));
    expect(screen.queryByTestId('dropdown-phrasal-verbs')).not.toBeInTheDocument();
  });

  it('dropdown trigger has aria-expanded=false when closed', () => {
    renderNav('/phrasal-verbs');
    expect(screen.getByTestId('nav-phrasal-verbs')).toHaveAttribute('aria-expanded', 'false');
  });

  it('dropdown trigger has aria-expanded=true when open', async () => {
    const user = userEvent.setup();
    renderNav('/phrasal-verbs');
    await user.click(screen.getByTestId('nav-phrasal-verbs'));
    expect(screen.getByTestId('nav-phrasal-verbs')).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('NavigationMenu — active state', () => {
  it('highlights Phrasal Verbs when on a phrasal-verbs route', () => {
    renderNav('/phrasal-verbs/test-most-popular');
    expect(screen.getByTestId('nav-phrasal-verbs')).toHaveClass('text-blue-700');
  });

  it('does not highlight Grammar when on a phrasal-verbs route', () => {
    renderNav('/phrasal-verbs/test-most-popular');
    expect(screen.getByTestId('nav-grammar')).not.toHaveClass('text-blue-700');
  });

  it('highlights Grammar when on a grammar route', () => {
    renderNav('/grammar/i-wish-if-only');
    expect(screen.getByTestId('nav-grammar')).toHaveClass('text-blue-700');
  });
});

describe('NavigationMenu — mobile hamburger', () => {
  it('renders the hamburger button', () => {
    renderNav('/phrasal-verbs');
    expect(screen.getByTestId('nav-hamburger')).toBeInTheDocument();
  });

  it('hamburger has aria-label "Open menu" when closed', () => {
    renderNav('/phrasal-verbs');
    expect(screen.getByTestId('nav-hamburger')).toHaveAttribute('aria-label', 'Open menu');
  });

  it('mobile menu is hidden by default', () => {
    renderNav('/phrasal-verbs');
    expect(screen.queryByTestId('nav-mobile-menu')).not.toBeInTheDocument();
  });

  it('clicking hamburger opens mobile menu', async () => {
    const user = userEvent.setup();
    renderNav('/phrasal-verbs');
    await user.click(screen.getByTestId('nav-hamburger'));
    expect(screen.getByTestId('nav-mobile-menu')).toBeInTheDocument();
  });

  it('hamburger has aria-label "Close menu" when open', async () => {
    const user = userEvent.setup();
    renderNav('/phrasal-verbs');
    await user.click(screen.getByTestId('nav-hamburger'));
    expect(screen.getByTestId('nav-hamburger')).toHaveAttribute('aria-label', 'Close menu');
  });

  it('mobile menu shows Phrasal Verbs section', async () => {
    const user = userEvent.setup();
    renderNav('/phrasal-verbs');
    await user.click(screen.getByTestId('nav-hamburger'));
    const menu = screen.getByTestId('nav-mobile-menu');
    expect(within(menu).getByText('Phrasal Verbs')).toBeInTheDocument();
  });

  it('mobile menu shows Grammar section', async () => {
    const user = userEvent.setup();
    renderNav('/phrasal-verbs');
    await user.click(screen.getByTestId('nav-hamburger'));
    const menu = screen.getByTestId('nav-mobile-menu');
    expect(within(menu).getByText('Grammar')).toBeInTheDocument();
  });

  it('expanding a mobile section shows sub-items', async () => {
    const user = userEvent.setup();
    renderNav('/phrasal-verbs');
    await user.click(screen.getByTestId('nav-hamburger'));
    const menu = screen.getByTestId('nav-mobile-menu');
    await user.click(within(menu).getByText('Phrasal Verbs'));
    expect(within(menu).getByText('Quiz')).toBeInTheDocument();
    expect(within(menu).getByText('List')).toBeInTheDocument();
    expect(within(menu).getByText('Particles')).toBeInTheDocument();
  });

  it('clicking hamburger again closes mobile menu', async () => {
    const user = userEvent.setup();
    renderNav('/phrasal-verbs');
    await user.click(screen.getByTestId('nav-hamburger'));
    expect(screen.getByTestId('nav-mobile-menu')).toBeInTheDocument();
    await user.click(screen.getByTestId('nav-hamburger'));
    expect(screen.queryByTestId('nav-mobile-menu')).not.toBeInTheDocument();
  });
});

describe('NavigationMenu — portal target', () => {
  it('contains the verb-page-actions portal target on non-home routes', () => {
    renderNav('/phrasal-verbs');
    expect(document.getElementById('verb-page-actions')).not.toBeNull();
  });
});

describe('NavigationMenu — theme toggle', () => {
  it('renders the theme toggle on non-home pages', () => {
    renderNav('/phrasal-verbs');
    expect(screen.getByTitle('Toggle Dark/Light Mode')).toBeInTheDocument();
  });

  it('does not render the theme toggle on the home page', () => {
    renderNav('/');
    expect(screen.queryByTitle('Toggle Dark/Light Mode')).not.toBeInTheDocument();
  });

  it('calls onToggleDarkMode when clicked', async () => {
    const user = userEvent.setup();
    const toggle = vi.fn();
    renderNav('/phrasal-verbs', false, toggle);
    await user.click(screen.getByTitle('Toggle Dark/Light Mode'));
    expect(toggle).toHaveBeenCalledOnce();
  });

  it('has correct aria-label when darkMode is false', () => {
    renderNav('/phrasal-verbs', false);
    expect(screen.getByTitle('Toggle Dark/Light Mode')).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('has correct aria-label when darkMode is true', () => {
    renderNav('/phrasal-verbs', true);
    expect(screen.getByTitle('Toggle Dark/Light Mode')).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('theme toggle and portal target are siblings in the same flex container', () => {
    renderNav('/phrasal-verbs');
    const portalTarget = document.getElementById('verb-page-actions');
    const themeButton = screen.getByTitle('Toggle Dark/Light Mode');
    expect(portalTarget!.parentElement).toBe(themeButton.parentElement);
    expect(themeButton.parentElement).toHaveClass('flex', 'items-center', 'gap-2');
  });
});
