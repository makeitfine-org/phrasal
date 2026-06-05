import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import PhrasalVerbsListPage from '../pages/PhrasalVerbsListPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <PhrasalVerbsListPage />
    </MemoryRouter>
  );
}

function LocationSpy() {
  const loc = useLocation();
  return <div data-testid="location">{loc.pathname}</div>;
}

function renderPageWithRoutes() {
  return render(
    <MemoryRouter initialEntries={['/phrasal-verbs/list']}>
      <Routes>
        <Route path="/phrasal-verbs/list" element={<><PhrasalVerbsListPage /><LocationSpy /></>} />
        <Route path="/phrasal-verbs/list/get" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/make" element={<LocationSpy />} />
      </Routes>
    </MemoryRouter>
  );
}

const ALL_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'by', 'together', 'with', 'over', 'ahead', 'after',
  'behind', 'through', 'about / around', 'to',
];

const ALL_MAKE_PARTICLES = [
  'after', 'away (with)', 'for', 'into', 'off (with)', 'out', 'over', 'up', 'up for', 'with',
];

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
    const link = screen.getByRole('link', { name: /Get/i });
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
});

describe('PhrasalVerbsListPage — particles subtitle', () => {
  it('shows particles text in subtitle', () => {
    renderPage();
    expect(screen.getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('subtitle has line-clamp-2 class', () => {
    renderPage();
    const subtitle = screen.getByText(/off, on, up/i);
    expect(subtitle).toHaveClass('line-clamp-2');
  });

  it('subtitle title attribute contains all particles', () => {
    renderPage();
    const subtitle = screen.getByText(/off, on, up/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('about / around'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('through'));
  });
});

describe('PhrasalVerbsListPage — copy button', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a copy button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i })).toBeInTheDocument();
  });

  it('copy button title is "Copy all \\"get\\" phrasal verbs" before click', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "get" phrasal verbs');
  });

  it('clipboard receives all 21 particles as "get X" forms in order', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i }));
    const expected = ALL_PARTICLES.map(p => `get ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every particle', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_PARTICLES) {
      expect(written).toContain(`get ${p}`);
    }
  });

  it('copy button shows "Copied!" title after click', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking copy button does not navigate to get page', () => {
    renderPageWithRoutes();
    fireEvent.click(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i }));
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list');
  });
});

describe('PhrasalVerbsListPage — Make particles subtitle', () => {
  it('shows make particles text in subtitle', () => {
    renderPage();
    expect(screen.getByText(/after, away \(with\)/i)).toBeInTheDocument();
  });

  it('make subtitle has line-clamp-2 class', () => {
    renderPage();
    const subtitle = screen.getByText(/after, away \(with\)/i);
    expect(subtitle).toHaveClass('line-clamp-2');
  });

  it('make subtitle title attribute contains all particles', () => {
    renderPage();
    const subtitle = screen.getByText(/after, away \(with\)/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('up for'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('off (with)'));
  });
});

describe('PhrasalVerbsListPage — make copy button', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a make copy button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i })).toBeInTheDocument();
  });

  it('make copy button title is \'Copy all "make" phrasal verbs\' before click', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "make" phrasal verbs');
  });

  it('clipboard receives all 10 make particles as "make X" forms in order', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i }));
    const expected = ALL_MAKE_PARTICLES.map(p => `make ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every make particle', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_MAKE_PARTICLES) {
      expect(written).toContain(`make ${p}`);
    }
  });

  it('make copy button shows "Copied!" title after click', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('make copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking make copy button does not navigate to make page', () => {
    renderPageWithRoutes();
    fireEvent.click(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i }));
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list');
  });
});
