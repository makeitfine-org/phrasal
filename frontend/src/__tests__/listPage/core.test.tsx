import { screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupPortal, renderPage, renderPageWithRoutes, expandCard, ALL_PARTICLE_NAMES } from './helpers';

setupPortal();

describe('PhrasalVerbsListPage', () => {
  it('renders "Phrasal Verbs List" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Phrasal Verbs List' })).toBeInTheDocument();
  });

  it('renders the "Get" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Get' })).toBeInTheDocument();
  });

  it('"Get" link points to /phrasal-verbs/list/get', () => {
    renderPage();
    const link = screen.getByRole('heading', { name: 'Get' }).closest('a')!;
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/get');
  });

  it('renders the "Make" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Make' })).toBeInTheDocument();
  });

  it('"Make" link points to /phrasal-verbs/list/make', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /Make/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/make');
  });

  it('renders the "Put" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Put' })).toBeInTheDocument();
  });

  it('"Put" link points to /phrasal-verbs/list/put', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /Put/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/put');
  });
});

describe('PhrasalVerbsListPage — expand/collapse', () => {
  it('hides particles text by default', () => {
    renderPage();
    expect(screen.queryByText(/off, on, up, down, in, into, out, away, across/i)).not.toBeInTheDocument();
  });

  it('shows particles text after clicking the card', () => {
    renderPage();
    expandCard('get');
    expect(within(screen.getByTestId('verb-card-get')).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('hides particles text again after second click', () => {
    renderPage();
    expandCard('get');
    expandCard('get');
    expect(within(screen.getByTestId('verb-card-get')).queryByText(/off, on, up/i)).not.toBeInTheDocument();
  });

  it('saves expanded state to localStorage', () => {
    renderPage();
    expandCard('get');
    const saved = JSON.parse(localStorage.getItem('verbListExpanded') ?? '[]') as string[];
    expect(saved).toContain('get');
  });

  it('removes key from localStorage when collapsed', () => {
    renderPage();
    expandCard('get');
    expandCard('get');
    const saved = JSON.parse(localStorage.getItem('verbListExpanded') ?? '[]') as string[];
    expect(saved).not.toContain('get');
  });

  it('restores expanded state from localStorage on render', () => {
    localStorage.setItem('verbListExpanded', JSON.stringify(['make']));
    renderPage();
    expect(within(screen.getByTestId('verb-card-make')).getByText(/after, away \(with\)/i)).toBeInTheDocument();
  });

  it('expanding one card does not expand another', () => {
    renderPage();
    expandCard('get');
    expect(within(screen.getByTestId('verb-card-put')).queryByText(/off, on, up/i)).not.toBeInTheDocument();
  });

  it('clicking the verb link does not toggle expand', () => {
    renderPage();
    fireEvent.click(screen.getByRole('heading', { name: 'Get' }).closest('a')!);
    expect(within(screen.getByTestId('verb-card-get')).queryByText(/off, on, up/i)).not.toBeInTheDocument();
  });

  it('clicking the card frame navigates to verb page', () => {
    renderPageWithRoutes();
    fireEvent.click(screen.getByTestId('verb-card-get'));
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list/get');
  });

  it('clicking the chevron does not navigate', () => {
    renderPageWithRoutes();
    expandCard('get');
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list');
  });
});

describe('PhrasalVerbsListPage — particles subtitle', () => {
  it('shows particles text in subtitle after expand', () => {
    renderPage();
    expandCard('get');
    expect(within(screen.getByTestId('verb-card-get')).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('get');
    const subtitle = within(screen.getByTestId('verb-card-get')).getByText(/off, on, up/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('about / around'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('through'));
  });
});

describe('PhrasalVerbsListPage — Particles card', () => {
  it('renders the "Particles" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Particles' })).toBeInTheDocument();
  });

  it('"Particles" link points to /phrasal-verbs/particles', () => {
    renderPage();
    const link = screen.getByRole('heading', { name: 'Particles' }).closest('a')!;
    expect(link).toHaveAttribute('href', '/phrasal-verbs/particles');
  });

  it('clicking the particles card frame navigates to particles page', () => {
    renderPageWithRoutes();
    fireEvent.click(screen.getByTestId('verb-card-particles'));
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/particles');
  });

  it('clicking the particles chevron does not navigate', () => {
    renderPageWithRoutes();
    expandCard('particles');
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list');
  });
});

describe('PhrasalVerbsListPage — Particles subtitle', () => {
  it('shows particles names text in subtitle after expand', () => {
    renderPage();
    expandCard('particles');
    expect(within(screen.getByTestId('verb-card-particles')).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('particles subtitle title attribute contains representative particles', () => {
    renderPage();
    expandCard('particles');
    const subtitle = within(screen.getByTestId('verb-card-particles')).getByText(/off, on, up/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('cross / across'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('around / round'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('along'));
  });

  it('particles subtitle title attribute contains all 27 particle names', () => {
    renderPage();
    expandCard('particles');
    const subtitle = within(screen.getByTestId('verb-card-particles')).getByText(/off, on, up/i);
    for (const name of ALL_PARTICLE_NAMES) {
      expect(subtitle).toHaveAttribute('title', expect.stringContaining(name));
    }
  });
});

describe('PhrasalVerbsListPage — Search', () => {
  it('renders a "Search phrasal verbs" button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /search phrasal verbs/i })).toBeInTheDocument();
  });

  it('search button opens the ListSearchModal', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /search phrasal verbs/i }));
    expect(screen.getByPlaceholderText('Search phrasal verbs...')).toBeInTheDocument();
  });

  it('modal closes when Escape is pressed', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /search phrasal verbs/i }));
    await user.keyboard('{Escape}');
    expect(screen.queryByPlaceholderText('Search phrasal verbs...')).not.toBeInTheDocument();
  });

  it('selecting a verb navigates to its route', async () => {
    const user = userEvent.setup();
    renderPageWithRoutes();
    await user.click(screen.getByRole('button', { name: /search phrasal verbs/i }));
    const input = screen.getByPlaceholderText('Search phrasal verbs...');
    await user.type(input, 'get off');
    await user.click(screen.getAllByText('Get off')[0].closest('li')!);
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list/get');
  });

  it('selecting a verb sets the section localStorage key to true', async () => {
    const user = userEvent.setup();
    renderPageWithRoutes();
    await user.click(screen.getByRole('button', { name: /search phrasal verbs/i }));
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'get off');
    await user.click(screen.getAllByText('Get off')[0].closest('li')!);
    expect(localStorage.getItem('getOff_section_expanded')).toBe('true');
  });
});

describe('PhrasalVerbsListPage — heading link no-underline style', () => {
  it('"Particles" heading link does not have hover:underline class', () => {
    renderPage();
    const link = screen.getByRole('heading', { name: 'Particles' }).closest('a')!;
    expect(link).not.toHaveClass('hover:underline');
  });

  it('"Get" heading link does not have hover:underline class', () => {
    renderPage();
    const link = screen.getByRole('heading', { name: 'Get' }).closest('a')!;
    expect(link).not.toHaveClass('hover:underline');
  });

  it('"Make" heading link does not have hover:underline class', () => {
    renderPage();
    const link = screen.getByRole('heading', { name: 'Make' }).closest('a')!;
    expect(link).not.toHaveClass('hover:underline');
  });
});

describe('PhrasalVerbsListPage — Particles divider', () => {
  it('renders an hr separator after the Particles card', () => {
    const { container } = renderPage();
    const particlesCard = screen.getByTestId('verb-card-particles');
    const hr = particlesCard.nextElementSibling;
    expect(hr?.tagName).toBe('HR');
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('hr has light-theme border class border-gray-600', () => {
    const { container } = renderPage();
    const hr = container.querySelector('hr')!;
    expect(hr).toHaveClass('border-gray-600');
  });

  it('hr has dark-theme border class dark:border-gray-500', () => {
    const { container } = renderPage();
    const hr = container.querySelector('hr')!;
    expect(hr).toHaveClass('dark:border-gray-500');
  });
});

describe('PhrasalVerbsListPage — alphabetical ordering', () => {
  it('verb cards are rendered in alphabetical order (Particles card excluded)', () => {
    renderPage();
    const headings = screen.getAllByRole('heading', { level: 2 });
    const verbLabels = headings
      .map(h => h.textContent ?? '')
      .filter(t => t !== 'Particles');
    const sorted = [...verbLabels].sort((a, b) => a.localeCompare(b));
    expect(verbLabels).toEqual(sorted);
  });

  it('first verb card is "Act"', () => {
    renderPage();
    const headings = screen.getAllByRole('heading', { level: 2 });
    const firstVerb = headings.find(h => h.textContent !== 'Particles');
    expect(firstVerb?.textContent).toBe('Act');
  });

  it('last verb card is "Zip"', () => {
    renderPage();
    const headings = screen.getAllByRole('heading', { level: 2 });
    const verbHeadings = headings.filter(h => h.textContent !== 'Particles');
    expect(verbHeadings[verbHeadings.length - 1].textContent).toBe('Zip');
  });
});

describe('PhrasalVerbsListPage — expand/collapse all button', () => {
  it('renders expand-all button in portal target', () => {
    renderPage();
    expect(screen.getByTitle('Expand all')).toBeInTheDocument();
  });

  it('expand-all button expands all verb cards', () => {
    renderPage();
    fireEvent.click(screen.getByTitle('Expand all'));
    expect(within(screen.getByTestId('verb-card-get')).getByText(/off, on, up/i)).toBeInTheDocument();
    expect(within(screen.getByTestId('verb-card-zip')).getByText(/about \/ around \/ round/i)).toBeInTheDocument();
  });

  it('expand-all button also expands particles card', () => {
    renderPage();
    fireEvent.click(screen.getByTitle('Expand all'));
    expect(within(screen.getByTestId('verb-card-particles')).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('after expand-all, button title changes to Collapse all', () => {
    renderPage();
    fireEvent.click(screen.getByTitle('Expand all'));
    expect(screen.getByTitle('Collapse all')).toBeInTheDocument();
  });

  it('collapse-all button collapses all verb cards', () => {
    renderPage();
    fireEvent.click(screen.getByTitle('Expand all'));
    fireEvent.click(screen.getByTitle('Collapse all'));
    expect(within(screen.getByTestId('verb-card-get')).queryByText(/off, on, up/i)).not.toBeInTheDocument();
    expect(within(screen.getByTestId('verb-card-zip')).queryByText(/about \/ around \/ round/i)).not.toBeInTheDocument();
  });

  it('expand-all saves all keys to localStorage', () => {
    renderPage();
    fireEvent.click(screen.getByTitle('Expand all'));
    const saved = JSON.parse(localStorage.getItem('verbListExpanded') ?? '[]') as string[];
    expect(saved).toContain('get');
    expect(saved).toContain('zip');
    expect(saved).toContain('particles');
  });

  it('collapse-all clears all keys from localStorage', () => {
    renderPage();
    fireEvent.click(screen.getByTitle('Expand all'));
    fireEvent.click(screen.getByTitle('Collapse all'));
    const saved = JSON.parse(localStorage.getItem('verbListExpanded') ?? '[]') as string[];
    expect(saved).toHaveLength(0);
  });
});

