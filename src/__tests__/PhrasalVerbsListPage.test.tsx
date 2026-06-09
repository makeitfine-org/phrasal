import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import PhrasalVerbsListPage from '../pages/PhrasalVerbsListPage';

beforeEach(() => localStorage.clear());

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
        <Route path="/phrasal-verbs/list/put" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/take" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/give" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/go" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/come" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/act" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/cut" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/break" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/bring" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/ask" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/back" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/be" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/blow" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/brush" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/build" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/call" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/carry" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/catch" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/check" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/cheer" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/clean" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/count" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/deal" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/do" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/dress" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/drop" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/eat" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/fall" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/figure" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/particles" element={<LocationSpy />} />
      </Routes>
    </MemoryRouter>
  );
}

function expandCard(key: string) {
  fireEvent.click(screen.getByTestId(`toggle-card-${key}`));
}

const ALL_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'by', 'together', 'with', 'over', 'ahead', 'after',
  'behind', 'through', 'about / around', 'to',
];

const ALL_MAKE_PARTICLES = [
  'after', 'away (with)', 'for', 'into', 'off (with)', 'out', 'over', 'up', 'up for', 'with',
];

const ALL_PUT_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across / over',
  'forward', 'back', 'by', 'together', 'with', 'ahead', 'behind', 'through',
  'about / around / round', 'to',
];

const ALL_TAKE_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'cross / across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

const ALL_GIVE_PARTICLES = [
  'away', 'back', 'in', 'in to', 'off', 'on / onto', 'out', 'over', 'up', '(it) up for', 'with',
];

const ALL_GO_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
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

  it('renders a copy button when expanded', () => {
    renderPage();
    expandCard('get');
    expect(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i })).toBeInTheDocument();
  });

  it('copy button is not visible when collapsed', () => {
    renderPage();
    expect(screen.queryByRole('button', { name: /copy all "get" phrasal verbs/i })).not.toBeInTheDocument();
  });

  it('copy button title is "Copy all \\"get\\" phrasal verbs" before click', () => {
    renderPage();
    expandCard('get');
    expect(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "get" phrasal verbs');
  });

  it('clipboard receives all 21 particles as "get X" forms in order', () => {
    renderPage();
    expandCard('get');
    fireEvent.click(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i }));
    const expected = ALL_PARTICLES.map(p => `get ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every particle', () => {
    renderPage();
    expandCard('get');
    fireEvent.click(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_PARTICLES) {
      expect(written).toContain(`get ${p}`);
    }
  });

  it('copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('get');
    fireEvent.click(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    expandCard('get');
    fireEvent.click(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking copy button does not navigate to get page', () => {
    renderPageWithRoutes();
    expandCard('get');
    fireEvent.click(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i }));
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list');
  });

  it('clicking copy button does not collapse the card', () => {
    renderPage();
    expandCard('get');
    fireEvent.click(screen.getByRole('button', { name: /copy all "get" phrasal verbs/i }));
    expect(within(screen.getByTestId('verb-card-get')).getByText(/off, on, up/i)).toBeInTheDocument();
  });
});

describe('PhrasalVerbsListPage — Make particles subtitle', () => {
  it('shows make particles text in subtitle after expand', () => {
    renderPage();
    expandCard('make');
    expect(within(screen.getByTestId('verb-card-make')).getByText(/after, away \(with\)/i)).toBeInTheDocument();
  });

  it('make subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('make');
    const subtitle = within(screen.getByTestId('verb-card-make')).getByText(/after, away \(with\)/i);
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

  it('renders a make copy button when expanded', () => {
    renderPage();
    expandCard('make');
    expect(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i })).toBeInTheDocument();
  });

  it('make copy button title is \'Copy all "make" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('make');
    expect(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "make" phrasal verbs');
  });

  it('clipboard receives all 10 make particles as "make X" forms in order', () => {
    renderPage();
    expandCard('make');
    fireEvent.click(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i }));
    const expected = ALL_MAKE_PARTICLES.map(p => `make ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every make particle', () => {
    renderPage();
    expandCard('make');
    fireEvent.click(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_MAKE_PARTICLES) {
      expect(written).toContain(`make ${p}`);
    }
  });

  it('make copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('make');
    fireEvent.click(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('make copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    expandCard('make');
    fireEvent.click(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking make copy button does not navigate to make page', () => {
    renderPageWithRoutes();
    expandCard('make');
    fireEvent.click(screen.getByRole('button', { name: /copy all "make" phrasal verbs/i }));
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list');
  });
});

describe('PhrasalVerbsListPage — Put particles subtitle', () => {
  it('shows put particles text in subtitle after expand', () => {
    renderPage();
    expandCard('put');
    expect(within(screen.getByTestId('verb-card-put')).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('put subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('put');
    const subtitle = within(screen.getByTestId('verb-card-put')).getByText(/off, on, up/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('about / around / round'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('through'));
  });
});

describe('PhrasalVerbsListPage — put copy button', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a put copy button when expanded', () => {
    renderPage();
    expandCard('put');
    expect(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i })).toBeInTheDocument();
  });

  it('put copy button title is \'Copy all "put" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('put');
    expect(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "put" phrasal verbs');
  });

  it('clipboard receives all 19 put particles as "put X" forms in order', () => {
    renderPage();
    expandCard('put');
    fireEvent.click(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i }));
    const expected = ALL_PUT_PARTICLES.map(p => `put ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every put particle', () => {
    renderPage();
    expandCard('put');
    fireEvent.click(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_PUT_PARTICLES) {
      expect(written).toContain(`put ${p}`);
    }
  });

  it('put copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('put');
    fireEvent.click(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('put copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    expandCard('put');
    fireEvent.click(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking put copy button does not navigate to put page', () => {
    renderPageWithRoutes();
    expandCard('put');
    fireEvent.click(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i }));
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list');
  });
});

describe('PhrasalVerbsListPage — Take card', () => {
  it('renders the "Take" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Take' })).toBeInTheDocument();
  });

  it('"Take" link points to /phrasal-verbs/list/take', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /Take/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/take');
  });
});

describe('PhrasalVerbsListPage — Take particles subtitle', () => {
  it('shows take particles text in subtitle after expand', () => {
    renderPage();
    expandCard('take');
    expect(within(screen.getByTestId('verb-card-take')).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('take subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('take');
    const subtitle = within(screen.getByTestId('verb-card-take')).getByText(/off, on, up/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('cross / across'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('around / round'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('against'));
  });
});

describe('PhrasalVerbsListPage — take copy button', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a take copy button when expanded', () => {
    renderPage();
    expandCard('take');
    expect(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i })).toBeInTheDocument();
  });

  it('take copy button title is \'Copy all "take" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('take');
    expect(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "take" phrasal verbs');
  });

  it('clipboard receives all 26 take particles as "take X" forms in order', () => {
    renderPage();
    expandCard('take');
    fireEvent.click(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i }));
    const expected = ALL_TAKE_PARTICLES.map(p => `take ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every take particle', () => {
    renderPage();
    expandCard('take');
    fireEvent.click(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_TAKE_PARTICLES) {
      expect(written).toContain(`take ${p}`);
    }
  });

  it('take copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('take');
    fireEvent.click(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('take copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    expandCard('take');
    fireEvent.click(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking take copy button does not navigate to take page', () => {
    renderPageWithRoutes();
    expandCard('take');
    fireEvent.click(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i }));
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list');
  });
});

describe('PhrasalVerbsListPage — Give card', () => {
  it('renders the "Give" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Give' })).toBeInTheDocument();
  });

  it('"Give" link points to /phrasal-verbs/list/give', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /Give/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/give');
  });
});

describe('PhrasalVerbsListPage — Give particles subtitle', () => {
  it('shows give particles text in subtitle after expand', () => {
    renderPage();
    expandCard('give');
    expect(within(screen.getByTestId('verb-card-give')).getByText(/away, back, in/i)).toBeInTheDocument();
  });

  it('give subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('give');
    const subtitle = within(screen.getByTestId('verb-card-give')).getByText(/away, back, in/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('on / onto'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('(it) up for'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('with'));
  });
});

describe('PhrasalVerbsListPage — give copy button', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a give copy button when expanded', () => {
    renderPage();
    expandCard('give');
    expect(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i })).toBeInTheDocument();
  });

  it('give copy button title is \'Copy all "give" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('give');
    expect(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "give" phrasal verbs');
  });

  it('clipboard receives all 11 give particles as "give X" forms in order', () => {
    renderPage();
    expandCard('give');
    fireEvent.click(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i }));
    const expected = ALL_GIVE_PARTICLES.map(p => `give ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every give particle', () => {
    renderPage();
    expandCard('give');
    fireEvent.click(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_GIVE_PARTICLES) {
      expect(written).toContain(`give ${p}`);
    }
  });

  it('give copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('give');
    fireEvent.click(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('give copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    expandCard('give');
    fireEvent.click(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking give copy button does not navigate to give page', () => {
    renderPageWithRoutes();
    expandCard('give');
    fireEvent.click(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i }));
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list');
  });
});

const ALL_BREAK_PARTICLES = [
  'off', 'up', 'down', 'in', 'into', 'out', 'away', 'back', 'for',
  'with', 'apart', 'over', 'through', 'to', 'against',
];

const ALL_BRING_PARTICLES = [
  'about', 'around / round', 'away', 'back', 'by', 'down', 'forward',
  'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to', 'together', 'up',
];

const ALL_ACT_PARTICLES = ['on / upon', 'up', 'out', 'for', 'against'];

const ALL_CUT_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'back', 'together', 'apart', 'over', 'ahead', 'through', 'about / round', 'to', 'against',
];

const ALL_COME_PARTICLES = [
  'about', 'across', 'after', 'against', 'ahead', 'apart', 'around / round',
  'away', 'back', 'behind', 'by', 'down', 'for', 'forward', 'in', 'into',
  'off', 'on', 'out', 'over', 'through', 'to', 'together', 'up', 'with', 'without',
];

describe('PhrasalVerbsListPage — Go card', () => {
  it('renders the "Go" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Go' })).toBeInTheDocument();
  });

  it('"Go" link points to /phrasal-verbs/list/go', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /Go/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/go');
  });
});

describe('PhrasalVerbsListPage — Go particles subtitle', () => {
  it('shows go particles text in subtitle after expand', () => {
    renderPage();
    expandCard('go');
    expect(within(screen.getByTestId('verb-card-go')).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('go subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('go');
    const subtitle = within(screen.getByTestId('verb-card-go')).getByText(/off, on, up/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('around / round'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('against'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('through'));
  });
});

describe('PhrasalVerbsListPage — go copy button', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a go copy button when expanded', () => {
    renderPage();
    expandCard('go');
    expect(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i })).toBeInTheDocument();
  });

  it('go copy button title is \'Copy all "go" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('go');
    expect(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "go" phrasal verbs');
  });

  it('clipboard receives all 25 go particles as "go X" forms in order', () => {
    renderPage();
    expandCard('go');
    fireEvent.click(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i }));
    const expected = ALL_GO_PARTICLES.map(p => `go ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every go particle', () => {
    renderPage();
    expandCard('go');
    fireEvent.click(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_GO_PARTICLES) {
      expect(written).toContain(`go ${p}`);
    }
  });

  it('go copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('go');
    fireEvent.click(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('go copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    expandCard('go');
    fireEvent.click(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking go copy button does not navigate to go page', () => {
    renderPageWithRoutes();
    expandCard('go');
    fireEvent.click(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i }));
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list');
  });
});

describe('PhrasalVerbsListPage — Come card', () => {
  it('renders the "Come" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Come' })).toBeInTheDocument();
  });

  it('"Come" link points to /phrasal-verbs/list/come', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /Come/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/come');
  });
});

describe('PhrasalVerbsListPage — Come particles subtitle', () => {
  it('shows come particles text in subtitle after expand', () => {
    renderPage();
    expandCard('come');
    expect(within(screen.getByTestId('verb-card-come')).getByText(/about, across, after/i)).toBeInTheDocument();
  });

  it('come subtitle title attribute contains unique particles', () => {
    renderPage();
    expandCard('come');
    const subtitle = within(screen.getByTestId('verb-card-come')).getByText(/about, across, after/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('around / round'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('without'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('through'));
  });
});

describe('PhrasalVerbsListPage — come copy button', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a come copy button when expanded', () => {
    renderPage();
    expandCard('come');
    expect(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i })).toBeInTheDocument();
  });

  it('come copy button title is \'Copy all "come" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('come');
    expect(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "come" phrasal verbs');
  });

  it('clipboard receives all 26 come particles as "come X" forms in order', () => {
    renderPage();
    expandCard('come');
    fireEvent.click(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i }));
    const expected = ALL_COME_PARTICLES.map(p => `come ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every come particle', () => {
    renderPage();
    expandCard('come');
    fireEvent.click(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_COME_PARTICLES) {
      expect(written).toContain(`come ${p}`);
    }
  });

  it('come copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('come');
    fireEvent.click(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('come copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    expandCard('come');
    fireEvent.click(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking come copy button does not navigate to come page', () => {
    renderPageWithRoutes();
    expandCard('come');
    fireEvent.click(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i }));
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list');
  });
});

const ALL_PARTICLE_NAMES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'cross / across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against', 'along',
];

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

describe('PhrasalVerbsListPage — Act card', () => {
  it('renders the "Act" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Act' })).toBeInTheDocument();
  });

  it('"Act" link points to /phrasal-verbs/list/act', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /Act/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/act');
  });
});

describe('PhrasalVerbsListPage — Act particles subtitle', () => {
  it('shows act particles text in subtitle after expand', () => {
    renderPage();
    expandCard('act');
    expect(within(screen.getByTestId('verb-card-act')).getByText(/on \/ upon, up, out/i)).toBeInTheDocument();
  });

  it('act subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('act');
    const subtitle = within(screen.getByTestId('verb-card-act')).getByText(/on \/ upon, up, out/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('for'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('against'));
  });
});

describe('PhrasalVerbsListPage — act copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(
      { writeText: mockWriteText } as unknown as Clipboard
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders an act copy button when expanded', () => {
    renderPage();
    expandCard('act');
    expect(screen.getByRole('button', { name: /copy all "act" phrasal verbs/i })).toBeInTheDocument();
  });

  it('act copy button title is \'Copy all "act" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('act');
    expect(screen.getByRole('button', { name: /copy all "act" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "act" phrasal verbs');
  });

  it('clipboard receives all 5 act particles as "act X" forms in order', () => {
    renderPage();
    expandCard('act');
    fireEvent.click(screen.getByRole('button', { name: /copy all "act" phrasal verbs/i }));
    const expected = ALL_ACT_PARTICLES.map(p => `act ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every act particle', () => {
    renderPage();
    expandCard('act');
    fireEvent.click(screen.getByRole('button', { name: /copy all "act" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_ACT_PARTICLES) {
      expect(written).toContain(`act ${p}`);
    }
  });

  it('act copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('act');
    fireEvent.click(screen.getByRole('button', { name: /copy all "act" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Cut card', () => {
  it('renders the "Cut" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Cut' })).toBeInTheDocument();
  });

  it('"Cut" link points to /phrasal-verbs/list/cut', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /Cut/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/cut');
  });
});

describe('PhrasalVerbsListPage — Cut particles subtitle', () => {
  it('shows cut particles text in subtitle after expand', () => {
    renderPage();
    expandCard('cut');
    expect(within(screen.getByTestId('verb-card-cut')).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('cut subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('cut');
    const subtitle = within(screen.getByTestId('verb-card-cut')).getByText(/off, on, up/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('through'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('against'));
  });
});

describe('PhrasalVerbsListPage — cut copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(
      { writeText: mockWriteText } as unknown as Clipboard
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a cut copy button when expanded', () => {
    renderPage();
    expandCard('cut');
    expect(screen.getByRole('button', { name: /copy all "cut" phrasal verbs/i })).toBeInTheDocument();
  });

  it('cut copy button title is \'Copy all "cut" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('cut');
    expect(screen.getByRole('button', { name: /copy all "cut" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "cut" phrasal verbs');
  });

  it('clipboard receives all 18 cut particles as "cut X" forms in order', () => {
    renderPage();
    expandCard('cut');
    fireEvent.click(screen.getByRole('button', { name: /copy all "cut" phrasal verbs/i }));
    const expected = ALL_CUT_PARTICLES.map(p => `cut ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every cut particle', () => {
    renderPage();
    expandCard('cut');
    fireEvent.click(screen.getByRole('button', { name: /copy all "cut" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_CUT_PARTICLES) {
      expect(written).toContain(`cut ${p}`);
    }
  });

  it('cut copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('cut');
    fireEvent.click(screen.getByRole('button', { name: /copy all "cut" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Break card', () => {
  it('renders the "Break" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Break' })).toBeInTheDocument();
  });

  it('"Break" link points to /phrasal-verbs/list/break', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /Break/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/break');
  });
});

describe('PhrasalVerbsListPage — Break particles subtitle', () => {
  it('shows break particles text in subtitle after expand', () => {
    renderPage();
    expandCard('break');
    expect(within(screen.getByTestId('verb-card-break')).getByText(/off, up, down/i)).toBeInTheDocument();
  });

  it('break subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('break');
    const subtitle = within(screen.getByTestId('verb-card-break')).getByText(/off, up, down/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('through'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('against'));
  });
});

describe('PhrasalVerbsListPage — break copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(
      { writeText: mockWriteText } as unknown as Clipboard
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a break copy button when expanded', () => {
    renderPage();
    expandCard('break');
    expect(screen.getByRole('button', { name: /copy all "break" phrasal verbs/i })).toBeInTheDocument();
  });

  it('break copy button title is \'Copy all "break" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('break');
    expect(screen.getByRole('button', { name: /copy all "break" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "break" phrasal verbs');
  });

  it('clipboard receives all 15 break particles as "break X" forms in order', () => {
    renderPage();
    expandCard('break');
    fireEvent.click(screen.getByRole('button', { name: /copy all "break" phrasal verbs/i }));
    const expected = ALL_BREAK_PARTICLES.map(p => `break ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every break particle', () => {
    renderPage();
    expandCard('break');
    fireEvent.click(screen.getByRole('button', { name: /copy all "break" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_BREAK_PARTICLES) {
      expect(written).toContain(`break ${p}`);
    }
  });

  it('break copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('break');
    fireEvent.click(screen.getByRole('button', { name: /copy all "break" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Bring card', () => {
  it('renders the "Bring" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Bring' })).toBeInTheDocument();
  });

  it('"Bring" link points to /phrasal-verbs/list/bring', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /Bring/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/bring');
  });
});

describe('PhrasalVerbsListPage — Bring particles subtitle', () => {
  it('shows bring particles text in subtitle after expand', () => {
    renderPage();
    expandCard('bring');
    expect(within(screen.getByTestId('verb-card-bring')).getByText(/about, around \/ round/i)).toBeInTheDocument();
  });

  it('bring subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('bring');
    const subtitle = within(screen.getByTestId('verb-card-bring')).getByText(/about, around \/ round/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('together'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('up'));
  });
});

describe('PhrasalVerbsListPage — bring copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(
      { writeText: mockWriteText } as unknown as Clipboard
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a bring copy button when expanded', () => {
    renderPage();
    expandCard('bring');
    expect(screen.getByRole('button', { name: /copy all "bring" phrasal verbs/i })).toBeInTheDocument();
  });

  it('bring copy button title is \'Copy all "bring" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('bring');
    expect(screen.getByRole('button', { name: /copy all "bring" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "bring" phrasal verbs');
  });

  it('clipboard receives all 17 bring particles as "bring X" forms in order', () => {
    renderPage();
    expandCard('bring');
    fireEvent.click(screen.getByRole('button', { name: /copy all "bring" phrasal verbs/i }));
    const expected = ALL_BRING_PARTICLES.map(p => `bring ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every bring particle', () => {
    renderPage();
    expandCard('bring');
    fireEvent.click(screen.getByRole('button', { name: /copy all "bring" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_BRING_PARTICLES) {
      expect(written).toContain(`bring ${p}`);
    }
  });

  it('bring copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('bring');
    fireEvent.click(screen.getByRole('button', { name: /copy all "bring" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

const ALL_ASK_PARTICLES = [
  'about', 'after', 'around / round', 'away', 'back', 'down', 'for',
  'in', 'into', 'off', 'out', 'over', 'up',
];

const ALL_BACK_PARTICLES = [
  'away', 'down', 'in', 'into', 'off', 'onto', 'out / out of', 'over', 'up',
];

const ALL_BE_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

describe('PhrasalVerbsListPage — Ask card', () => {
  it('renders the "Ask" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Ask' })).toBeInTheDocument();
  });

  it('"Ask" link points to /phrasal-verbs/list/ask', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /Ask/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/ask');
  });
});

describe('PhrasalVerbsListPage — Ask particles subtitle', () => {
  it('shows ask particles text in subtitle after expand', () => {
    renderPage();
    expandCard('ask');
    expect(within(screen.getByTestId('verb-card-ask')).getByText(/about, after/i)).toBeInTheDocument();
  });

  it('ask subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('ask');
    const subtitle = within(screen.getByTestId('verb-card-ask')).getByText(/about, after/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('around / round'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('up'));
  });
});

describe('PhrasalVerbsListPage — ask copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(
      { writeText: mockWriteText } as unknown as Clipboard
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders an ask copy button when expanded', () => {
    renderPage();
    expandCard('ask');
    expect(screen.getByRole('button', { name: /copy all "ask" phrasal verbs/i })).toBeInTheDocument();
  });

  it('ask copy button title is \'Copy all "ask" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('ask');
    expect(screen.getByRole('button', { name: /copy all "ask" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "ask" phrasal verbs');
  });

  it('clipboard receives all 13 ask particles as "ask X" forms in order', () => {
    renderPage();
    expandCard('ask');
    fireEvent.click(screen.getByRole('button', { name: /copy all "ask" phrasal verbs/i }));
    const expected = ALL_ASK_PARTICLES.map(p => `ask ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every ask particle', () => {
    renderPage();
    expandCard('ask');
    fireEvent.click(screen.getByRole('button', { name: /copy all "ask" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_ASK_PARTICLES) {
      expect(written).toContain(`ask ${p}`);
    }
  });

  it('ask copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('ask');
    fireEvent.click(screen.getByRole('button', { name: /copy all "ask" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Back card', () => {
  it('renders the "Back" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Back' })).toBeInTheDocument();
  });

  it('"Back" link points to /phrasal-verbs/list/back', () => {
    renderPage();
    const link = screen.getByRole('heading', { name: 'Back' }).closest('a')!;
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/back');
  });
});

describe('PhrasalVerbsListPage — Back particles subtitle', () => {
  it('shows back particles text in subtitle after expand', () => {
    renderPage();
    expandCard('back');
    expect(within(screen.getByTestId('verb-card-back')).getByText(/away, down, in/i)).toBeInTheDocument();
  });

  it('back subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('back');
    const subtitle = within(screen.getByTestId('verb-card-back')).getByText(/away, down, in/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('out / out of'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('up'));
  });
});

describe('PhrasalVerbsListPage — back copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(
      { writeText: mockWriteText } as unknown as Clipboard
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a back copy button when expanded', () => {
    renderPage();
    expandCard('back');
    expect(screen.getByRole('button', { name: /copy all "back" phrasal verbs/i })).toBeInTheDocument();
  });

  it('back copy button title is \'Copy all "back" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('back');
    expect(screen.getByRole('button', { name: /copy all "back" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "back" phrasal verbs');
  });

  it('clipboard receives all 9 back particles as "back X" forms in order', () => {
    renderPage();
    expandCard('back');
    fireEvent.click(screen.getByRole('button', { name: /copy all "back" phrasal verbs/i }));
    const expected = ALL_BACK_PARTICLES.map(p => `back ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every back particle', () => {
    renderPage();
    expandCard('back');
    fireEvent.click(screen.getByRole('button', { name: /copy all "back" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_BACK_PARTICLES) {
      expect(written).toContain(`back ${p}`);
    }
  });

  it('back copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('back');
    fireEvent.click(screen.getByRole('button', { name: /copy all "back" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Be card', () => {
  it('renders the "Be" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Be' })).toBeInTheDocument();
  });

  it('"Be" link points to /phrasal-verbs/list/be', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Be$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/be');
  });
});

describe('PhrasalVerbsListPage — Be particles subtitle', () => {
  it('shows be particles text in subtitle after expand', () => {
    renderPage();
    expandCard('be');
    expect(within(screen.getByTestId('verb-card-be')).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('be subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('be');
    const subtitle = within(screen.getByTestId('verb-card-be')).getByText(/off, on, up/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('around / round'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('against'));
  });
});

describe('PhrasalVerbsListPage — be copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(
      { writeText: mockWriteText } as unknown as Clipboard
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a be copy button when expanded', () => {
    renderPage();
    expandCard('be');
    expect(screen.getByRole('button', { name: /copy all "be" phrasal verbs/i })).toBeInTheDocument();
  });

  it('be copy button title is \'Copy all "be" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('be');
    expect(screen.getByRole('button', { name: /copy all "be" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "be" phrasal verbs');
  });

  it('clipboard receives all 26 be particles as "be X" forms in order', () => {
    renderPage();
    expandCard('be');
    fireEvent.click(screen.getByRole('button', { name: /copy all "be" phrasal verbs/i }));
    const expected = ALL_BE_PARTICLES.map(p => `be ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every be particle', () => {
    renderPage();
    expandCard('be');
    fireEvent.click(screen.getByRole('button', { name: /copy all "be" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_BE_PARTICLES) {
      expect(written).toContain(`be ${p}`);
    }
  });

  it('be copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('be');
    fireEvent.click(screen.getByRole('button', { name: /copy all "be" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

const ALL_BLOW_PARTICLES = [
  'about / around (round)', 'apart', 'away', 'back', 'by', 'down', 'in',
  'into', 'off', 'out', 'over', 'through', 'up',
];

const ALL_BRUSH_PARTICLES = [
  'off', 'up / up on', 'away', 'down', 'out', 'on', 'over', 'against', 'by', 'back', 'through',
];

const ALL_BUILD_PARTICLES = ['around / round', 'in / into', 'on', 'out', 'up', 'to'];

describe('PhrasalVerbsListPage — Blow card', () => {
  it('renders the "Blow" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Blow' })).toBeInTheDocument();
  });

  it('"Blow" link points to /phrasal-verbs/list/blow', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Blow$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/blow');
  });
});

describe('PhrasalVerbsListPage — Blow particles subtitle', () => {
  it('shows blow particles text in subtitle after expand', () => {
    renderPage();
    expandCard('blow');
    expect(within(screen.getByTestId('verb-card-blow')).getByText(/about \/ around \(round\), apart/i)).toBeInTheDocument();
  });

  it('blow subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('blow');
    const subtitle = within(screen.getByTestId('verb-card-blow')).getByText(/about \/ around \(round\), apart/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('through'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('up'));
  });
});

describe('PhrasalVerbsListPage — blow copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(
      { writeText: mockWriteText } as unknown as Clipboard
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a blow copy button when expanded', () => {
    renderPage();
    expandCard('blow');
    expect(screen.getByRole('button', { name: /copy all "blow" phrasal verbs/i })).toBeInTheDocument();
  });

  it('blow copy button title is \'Copy all "blow" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('blow');
    expect(screen.getByRole('button', { name: /copy all "blow" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "blow" phrasal verbs');
  });

  it('clipboard receives all 13 blow particles as "blow X" forms in order', () => {
    renderPage();
    expandCard('blow');
    fireEvent.click(screen.getByRole('button', { name: /copy all "blow" phrasal verbs/i }));
    const expected = ALL_BLOW_PARTICLES.map(p => `blow ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every blow particle', () => {
    renderPage();
    expandCard('blow');
    fireEvent.click(screen.getByRole('button', { name: /copy all "blow" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_BLOW_PARTICLES) {
      expect(written).toContain(`blow ${p}`);
    }
  });

  it('blow copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('blow');
    fireEvent.click(screen.getByRole('button', { name: /copy all "blow" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Brush card', () => {
  it('renders the "Brush" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Brush' })).toBeInTheDocument();
  });

  it('"Brush" link points to /phrasal-verbs/list/brush', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Brush$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/brush');
  });
});

describe('PhrasalVerbsListPage — Brush particles subtitle', () => {
  it('shows brush particles text in subtitle after expand', () => {
    renderPage();
    expandCard('brush');
    expect(within(screen.getByTestId('verb-card-brush')).getByText(/off, up \/ up on, away/i)).toBeInTheDocument();
  });

  it('brush subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('brush');
    const subtitle = within(screen.getByTestId('verb-card-brush')).getByText(/off, up \/ up on, away/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('against'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('through'));
  });
});

describe('PhrasalVerbsListPage — brush copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(
      { writeText: mockWriteText } as unknown as Clipboard
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a brush copy button when expanded', () => {
    renderPage();
    expandCard('brush');
    expect(screen.getByRole('button', { name: /copy all "brush" phrasal verbs/i })).toBeInTheDocument();
  });

  it('brush copy button title is \'Copy all "brush" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('brush');
    expect(screen.getByRole('button', { name: /copy all "brush" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "brush" phrasal verbs');
  });

  it('clipboard receives all 11 brush particles as "brush X" forms in order', () => {
    renderPage();
    expandCard('brush');
    fireEvent.click(screen.getByRole('button', { name: /copy all "brush" phrasal verbs/i }));
    const expected = ALL_BRUSH_PARTICLES.map(p => `brush ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every brush particle', () => {
    renderPage();
    expandCard('brush');
    fireEvent.click(screen.getByRole('button', { name: /copy all "brush" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_BRUSH_PARTICLES) {
      expect(written).toContain(`brush ${p}`);
    }
  });

  it('brush copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('brush');
    fireEvent.click(screen.getByRole('button', { name: /copy all "brush" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Build card', () => {
  it('renders the "Build" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Build' })).toBeInTheDocument();
  });

  it('"Build" link points to /phrasal-verbs/list/build', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Build$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/build');
  });
});

describe('PhrasalVerbsListPage — Build particles subtitle', () => {
  it('shows build particles text in subtitle after expand', () => {
    renderPage();
    expandCard('build');
    expect(within(screen.getByTestId('verb-card-build')).getByText(/around \/ round, in \/ into/i)).toBeInTheDocument();
  });

  it('build subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('build');
    const subtitle = within(screen.getByTestId('verb-card-build')).getByText(/around \/ round, in \/ into/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('up'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('to'));
  });
});

describe('PhrasalVerbsListPage — build copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(
      { writeText: mockWriteText } as unknown as Clipboard
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a build copy button when expanded', () => {
    renderPage();
    expandCard('build');
    expect(screen.getByRole('button', { name: /copy all "build" phrasal verbs/i })).toBeInTheDocument();
  });

  it('build copy button title is \'Copy all "build" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('build');
    expect(screen.getByRole('button', { name: /copy all "build" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "build" phrasal verbs');
  });

  it('clipboard receives all 6 build particles as "build X" forms in order', () => {
    renderPage();
    expandCard('build');
    fireEvent.click(screen.getByRole('button', { name: /copy all "build" phrasal verbs/i }));
    const expected = ALL_BUILD_PARTICLES.map(p => `build ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every build particle', () => {
    renderPage();
    expandCard('build');
    fireEvent.click(screen.getByRole('button', { name: /copy all "build" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_BUILD_PARTICLES) {
      expect(written).toContain(`build ${p}`);
    }
  });

  it('build copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('build');
    fireEvent.click(screen.getByRole('button', { name: /copy all "build" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

const ALL_CALL_PARTICLES = [
  'off', 'on / upon', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'for', 'by', 'together', 'over', 'ahead', 'after',
  'through', 'about', 'around / round', 'to',
];

describe('PhrasalVerbsListPage — Call card', () => {
  it('renders the "Call" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Call' })).toBeInTheDocument();
  });

  it('"Call" link points to /phrasal-verbs/list/call', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Call$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/call');
  });
});

describe('PhrasalVerbsListPage — Call particles subtitle', () => {
  it('shows call particles text in subtitle after expand', () => {
    renderPage();
    expandCard('call');
    expect(within(screen.getByTestId('verb-card-call')).getByText(/off, on \/ upon/i)).toBeInTheDocument();
  });

  it('call subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('call');
    const subtitle = within(screen.getByTestId('verb-card-call')).getByText(/off, on \/ upon/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('around / round'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('through'));
  });
});

describe('PhrasalVerbsListPage — call copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(
      { writeText: mockWriteText } as unknown as Clipboard
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a call copy button when expanded', () => {
    renderPage();
    expandCard('call');
    expect(screen.getByRole('button', { name: /copy all "call" phrasal verbs/i })).toBeInTheDocument();
  });

  it('call copy button title is \'Copy all "call" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('call');
    expect(screen.getByRole('button', { name: /copy all "call" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "call" phrasal verbs');
  });

  it('clipboard receives all 21 call particles as "call X" forms in order', () => {
    renderPage();
    expandCard('call');
    fireEvent.click(screen.getByRole('button', { name: /copy all "call" phrasal verbs/i }));
    const expected = ALL_CALL_PARTICLES.map(p => `call ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every call particle', () => {
    renderPage();
    expandCard('call');
    fireEvent.click(screen.getByRole('button', { name: /copy all "call" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_CALL_PARTICLES) {
      expect(written).toContain(`call ${p}`);
    }
  });

  it('call copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('call');
    fireEvent.click(screen.getByRole('button', { name: /copy all "call" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

const ALL_CARRY_PARTICLES = [
  'about / around / round', 'away', 'back', 'forward', 'off', 'on', 'out', 'over', 'through',
];

describe('PhrasalVerbsListPage — Carry card', () => {
  it('renders the "Carry" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Carry' })).toBeInTheDocument();
  });

  it('"Carry" link points to /phrasal-verbs/list/carry', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Carry$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/carry');
  });
});

describe('PhrasalVerbsListPage — Carry particles subtitle', () => {
  it('shows carry particles text in subtitle after expand', () => {
    renderPage();
    expandCard('carry');
    expect(within(screen.getByTestId('verb-card-carry')).getByText(/about \/ around \/ round/i)).toBeInTheDocument();
  });

  it('carry subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('carry');
    const subtitle = within(screen.getByTestId('verb-card-carry')).getByText(/about \/ around \/ round/i);
    expect(subtitle).toHaveAttribute('title', ALL_CARRY_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — carry copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a carry copy button when expanded', () => {
    renderPage();
    expandCard('carry');
    expect(screen.getByRole('button', { name: /copy all "carry" phrasal verbs/i })).toBeInTheDocument();
  });

  it('carry copy button title is \'Copy all "carry" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('carry');
    expect(screen.getByRole('button', { name: /copy all "carry" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "carry" phrasal verbs');
  });

  it('clipboard receives all 9 carry particles as "carry X" forms in order', () => {
    renderPage();
    expandCard('carry');
    fireEvent.click(screen.getByRole('button', { name: /copy all "carry" phrasal verbs/i }));
    const expected = ALL_CARRY_PARTICLES.map(p => `carry ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every carry particle', () => {
    renderPage();
    expandCard('carry');
    fireEvent.click(screen.getByRole('button', { name: /copy all "carry" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_CARRY_PARTICLES) {
      expect(written).toContain(`carry ${p}`);
    }
  });

  it('carry copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('carry');
    fireEvent.click(screen.getByRole('button', { name: /copy all "carry" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
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

const ALL_CATCH_PARTICLES = ['in', 'on', 'out', 'up'];

describe('PhrasalVerbsListPage — Catch card', () => {
  it('renders the "Catch" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Catch' })).toBeInTheDocument();
  });

  it('"Catch" link points to /phrasal-verbs/list/catch', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Catch$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/catch');
  });
});

describe('PhrasalVerbsListPage — Catch particles subtitle', () => {
  it('shows catch particles text in subtitle after expand', () => {
    renderPage();
    expandCard('catch');
    expect(within(screen.getByTestId('verb-card-catch')).getByText(/in, on, out, up/i)).toBeInTheDocument();
  });

  it('catch subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('catch');
    const subtitle = within(screen.getByTestId('verb-card-catch')).getByText(/in, on, out, up/i);
    expect(subtitle).toHaveAttribute('title', ALL_CATCH_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — catch copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a catch copy button when expanded', () => {
    renderPage();
    expandCard('catch');
    expect(screen.getByRole('button', { name: /copy all "catch" phrasal verbs/i })).toBeInTheDocument();
  });

  it('catch copy button title is \'Copy all "catch" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('catch');
    expect(screen.getByRole('button', { name: /copy all "catch" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "catch" phrasal verbs');
  });

  it('clipboard receives all 4 catch particles as "catch X" forms in order', () => {
    renderPage();
    expandCard('catch');
    fireEvent.click(screen.getByRole('button', { name: /copy all "catch" phrasal verbs/i }));
    const expected = ALL_CATCH_PARTICLES.map(p => `catch ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every catch particle', () => {
    renderPage();
    expandCard('catch');
    fireEvent.click(screen.getByRole('button', { name: /copy all "catch" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_CATCH_PARTICLES) {
      expect(written).toContain(`catch ${p}`);
    }
  });

  it('catch copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('catch');
    fireEvent.click(screen.getByRole('button', { name: /copy all "catch" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

const ALL_CHECK_PARTICLES = [
  'against', 'around / round', 'back', 'down', 'for', 'in', 'into',
  'off', 'on', 'out', 'over', 'through', 'up', 'with',
];

describe('PhrasalVerbsListPage — Check card', () => {
  it('renders the "Check" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Check' })).toBeInTheDocument();
  });

  it('"Check" link points to /phrasal-verbs/list/check', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Check$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/check');
  });
});

describe('PhrasalVerbsListPage — Check particles subtitle', () => {
  it('shows check particles text in subtitle after expand', () => {
    renderPage();
    expandCard('check');
    expect(within(screen.getByTestId('verb-card-check')).getByText(/against, around \/ round, back, down/i)).toBeInTheDocument();
  });

  it('check subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('check');
    const subtitle = within(screen.getByTestId('verb-card-check')).getByText(/against, around \/ round/i);
    expect(subtitle).toHaveAttribute('title', ALL_CHECK_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — check copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a check copy button when expanded', () => {
    renderPage();
    expandCard('check');
    expect(screen.getByRole('button', { name: /copy all "check" phrasal verbs/i })).toBeInTheDocument();
  });

  it('check copy button title is \'Copy all "check" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('check');
    expect(screen.getByRole('button', { name: /copy all "check" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "check" phrasal verbs');
  });

  it('clipboard receives all 14 check particles as "check X" forms in order', () => {
    renderPage();
    expandCard('check');
    fireEvent.click(screen.getByRole('button', { name: /copy all "check" phrasal verbs/i }));
    const expected = ALL_CHECK_PARTICLES.map(p => `check ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every check particle', () => {
    renderPage();
    expandCard('check');
    fireEvent.click(screen.getByRole('button', { name: /copy all "check" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_CHECK_PARTICLES) {
      expect(written).toContain(`check ${p}`);
    }
  });

  it('check copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('check');
    fireEvent.click(screen.getByRole('button', { name: /copy all "check" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

const ALL_CHEER_PARTICLES = ['against', 'for', 'off', 'on', 'up'];

const ALL_CLEAN_PARTICLES = ['around', 'away', 'down', 'off', 'out', 'up', 'up after'];
const ALL_COUNT_PARTICLES = ['against', 'back', 'down', 'for', 'in', 'off', 'on', 'out', 'up'];
const ALL_DEAL_PARTICLES = ['around / round', 'away', 'by', 'in', 'into', 'out', 'to', 'with'];

const ALL_DO_PARTICLES = [
  'about', 'away', 'by', 'down', 'for', 'in', 'into', 'out', 'over', 'to', 'up', 'with', 'without',
];

const ALL_DRESS_PARTICLES = ['back', 'by', 'down', 'off', 'on', 'out', 'up'];

const ALL_DROP_PARTICLES = [
  'across', 'around / round', 'away', 'back', 'behind', 'by', 'down',
  'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to',
];

const ALL_EAT_PARTICLES = [
  'up', 'into', 'away', 'out', 'in', 'through', 'around / round', 'on', 'down', 'off',
];

const ALL_FALL_PARTICLES = [
  'about / around / round', 'apart', 'away', 'back', 'behind', 'down',
  'for', 'in', 'into', 'off', 'on / upon', 'out', 'over', 'through', 'to',
];

const ALL_FIGURE_PARTICLES = ['for', 'in', 'into', 'on', 'out', 'up'];

describe('PhrasalVerbsListPage — Cheer card', () => {
  it('renders the "Cheer" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Cheer' })).toBeInTheDocument();
  });

  it('"Cheer" link points to /phrasal-verbs/list/cheer', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Cheer$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/cheer');
  });
});

describe('PhrasalVerbsListPage — Cheer particles subtitle', () => {
  it('shows cheer particles text in subtitle after expand', () => {
    renderPage();
    expandCard('cheer');
    expect(within(screen.getByTestId('verb-card-cheer')).getByText(/against, for, off, on, up/i)).toBeInTheDocument();
  });

  it('cheer subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('cheer');
    const subtitle = within(screen.getByTestId('verb-card-cheer')).getByText(/against, for, off, on, up/i);
    expect(subtitle).toHaveAttribute('title', ALL_CHEER_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — cheer copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a cheer copy button when expanded', () => {
    renderPage();
    expandCard('cheer');
    expect(screen.getByRole('button', { name: /copy all "cheer" phrasal verbs/i })).toBeInTheDocument();
  });

  it('cheer copy button title is \'Copy all "cheer" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('cheer');
    expect(screen.getByRole('button', { name: /copy all "cheer" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "cheer" phrasal verbs');
  });

  it('clipboard receives all 5 cheer particles as "cheer X" forms in order', () => {
    renderPage();
    expandCard('cheer');
    fireEvent.click(screen.getByRole('button', { name: /copy all "cheer" phrasal verbs/i }));
    const expected = ALL_CHEER_PARTICLES.map(p => `cheer ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every cheer particle', () => {
    renderPage();
    expandCard('cheer');
    fireEvent.click(screen.getByRole('button', { name: /copy all "cheer" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_CHEER_PARTICLES) {
      expect(written).toContain(`cheer ${p}`);
    }
  });

  it('cheer copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('cheer');
    fireEvent.click(screen.getByRole('button', { name: /copy all "cheer" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Clean card', () => {
  it('renders the "Clean" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Clean' })).toBeInTheDocument();
  });

  it('"Clean" link points to /phrasal-verbs/list/clean', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Clean$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/clean');
  });
});

describe('PhrasalVerbsListPage — Clean particles subtitle', () => {
  it('shows clean particles text in subtitle after expand', () => {
    renderPage();
    expandCard('clean');
    expect(within(screen.getByTestId('verb-card-clean')).getByText(/around, away, down, off, out, up, up after/i)).toBeInTheDocument();
  });

  it('clean subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('clean');
    const subtitle = within(screen.getByTestId('verb-card-clean')).getByText(/around, away, down, off, out, up, up after/i);
    expect(subtitle).toHaveAttribute('title', ALL_CLEAN_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — clean copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a clean copy button when expanded', () => {
    renderPage();
    expandCard('clean');
    expect(screen.getByRole('button', { name: /copy all "clean" phrasal verbs/i })).toBeInTheDocument();
  });

  it('clean copy button title is \'Copy all "clean" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('clean');
    expect(screen.getByRole('button', { name: /copy all "clean" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "clean" phrasal verbs');
  });

  it('clipboard receives all 7 clean particles as "clean X" forms in order', () => {
    renderPage();
    expandCard('clean');
    fireEvent.click(screen.getByRole('button', { name: /copy all "clean" phrasal verbs/i }));
    const expected = ALL_CLEAN_PARTICLES.map(p => `clean ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every clean particle', () => {
    renderPage();
    expandCard('clean');
    fireEvent.click(screen.getByRole('button', { name: /copy all "clean" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_CLEAN_PARTICLES) {
      expect(written).toContain(`clean ${p}`);
    }
  });

  it('clean copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('clean');
    fireEvent.click(screen.getByRole('button', { name: /copy all "clean" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Count card', () => {
  it('renders the "Count" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Count' })).toBeInTheDocument();
  });

  it('"Count" link points to /phrasal-verbs/list/count', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Count$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/count');
  });
});

describe('PhrasalVerbsListPage — Count particles subtitle', () => {
  it('shows count particles text in subtitle after expand', () => {
    renderPage();
    expandCard('count');
    expect(within(screen.getByTestId('verb-card-count')).getByText(/against, back, down, for, in, off, on, out, up/i)).toBeInTheDocument();
  });

  it('count subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('count');
    const subtitle = within(screen.getByTestId('verb-card-count')).getByText(/against, back, down, for, in, off, on, out, up/i);
    expect(subtitle).toHaveAttribute('title', ALL_COUNT_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — count copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a count copy button when expanded', () => {
    renderPage();
    expandCard('count');
    expect(screen.getByRole('button', { name: /copy all "count" phrasal verbs/i })).toBeInTheDocument();
  });

  it('count copy button title is \'Copy all "count" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('count');
    expect(screen.getByRole('button', { name: /copy all "count" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "count" phrasal verbs');
  });

  it('clipboard receives all 9 count particles as "count X" forms in order', () => {
    renderPage();
    expandCard('count');
    fireEvent.click(screen.getByRole('button', { name: /copy all "count" phrasal verbs/i }));
    const expected = ALL_COUNT_PARTICLES.map(p => `count ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every count particle', () => {
    renderPage();
    expandCard('count');
    fireEvent.click(screen.getByRole('button', { name: /copy all "count" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_COUNT_PARTICLES) {
      expect(written).toContain(`count ${p}`);
    }
  });

  it('count copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('count');
    fireEvent.click(screen.getByRole('button', { name: /copy all "count" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Deal card', () => {
  it('renders the "Deal" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Deal' })).toBeInTheDocument();
  });

  it('"Deal" link points to /phrasal-verbs/list/deal', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Deal$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/deal');
  });
});

describe('PhrasalVerbsListPage — Deal particles subtitle', () => {
  it('shows deal particles text in subtitle after expand', () => {
    renderPage();
    expandCard('deal');
    expect(within(screen.getByTestId('verb-card-deal')).getByText(/around \/ round, away, by, in, into, out, to, with/i)).toBeInTheDocument();
  });

  it('deal subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('deal');
    const subtitle = within(screen.getByTestId('verb-card-deal')).getByText(/around \/ round, away, by, in, into, out, to, with/i);
    expect(subtitle).toHaveAttribute('title', ALL_DEAL_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — deal copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a deal copy button when expanded', () => {
    renderPage();
    expandCard('deal');
    expect(screen.getByRole('button', { name: /copy all "deal" phrasal verbs/i })).toBeInTheDocument();
  });

  it('deal copy button title is \'Copy all "deal" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('deal');
    expect(screen.getByRole('button', { name: /copy all "deal" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "deal" phrasal verbs');
  });

  it('clipboard receives all 8 deal particles as "deal X" forms in order', () => {
    renderPage();
    expandCard('deal');
    fireEvent.click(screen.getByRole('button', { name: /copy all "deal" phrasal verbs/i }));
    const expected = ALL_DEAL_PARTICLES.map(p => `deal ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every deal particle', () => {
    renderPage();
    expandCard('deal');
    fireEvent.click(screen.getByRole('button', { name: /copy all "deal" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_DEAL_PARTICLES) {
      expect(written).toContain(`deal ${p}`);
    }
  });

  it('deal copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('deal');
    fireEvent.click(screen.getByRole('button', { name: /copy all "deal" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Do card', () => {
  it('renders the "Do" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Do' })).toBeInTheDocument();
  });

  it('"Do" link points to /phrasal-verbs/list/do', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Do$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/do');
  });
});

describe('PhrasalVerbsListPage — Do particles subtitle', () => {
  it('shows do particles text in subtitle after expand', () => {
    renderPage();
    expandCard('do');
    expect(within(screen.getByTestId('verb-card-do')).getByText(/about, away, by, down, for, in, into, out, over, to, up, with, without/i)).toBeInTheDocument();
  });

  it('do subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('do');
    const subtitle = within(screen.getByTestId('verb-card-do')).getByText(/about, away, by, down, for, in, into, out, over, to, up, with, without/i);
    expect(subtitle).toHaveAttribute('title', ALL_DO_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — do copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a do copy button when expanded', () => {
    renderPage();
    expandCard('do');
    expect(screen.getByRole('button', { name: /copy all "do" phrasal verbs/i })).toBeInTheDocument();
  });

  it('do copy button title is \'Copy all "do" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('do');
    expect(screen.getByRole('button', { name: /copy all "do" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "do" phrasal verbs');
  });

  it('clipboard receives all 13 do particles as "do X" forms in order', () => {
    renderPage();
    expandCard('do');
    fireEvent.click(screen.getByRole('button', { name: /copy all "do" phrasal verbs/i }));
    const expected = ALL_DO_PARTICLES.map(p => `do ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every do particle', () => {
    renderPage();
    expandCard('do');
    fireEvent.click(screen.getByRole('button', { name: /copy all "do" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_DO_PARTICLES) {
      expect(written).toContain(`do ${p}`);
    }
  });

  it('do copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('do');
    fireEvent.click(screen.getByRole('button', { name: /copy all "do" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Dress card', () => {
  it('renders the "Dress" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Dress' })).toBeInTheDocument();
  });

  it('"Dress" link points to /phrasal-verbs/list/dress', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Dress$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/dress');
  });
});

describe('PhrasalVerbsListPage — Dress particles subtitle', () => {
  it('shows dress particles text in subtitle after expand', () => {
    renderPage();
    expandCard('dress');
    expect(within(screen.getByTestId('verb-card-dress')).getByText(/back, by, down, off, on, out, up/i)).toBeInTheDocument();
  });

  it('dress subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('dress');
    const subtitle = within(screen.getByTestId('verb-card-dress')).getByText(/back, by, down, off, on, out, up/i);
    expect(subtitle).toHaveAttribute('title', ALL_DRESS_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — dress copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a dress copy button when expanded', () => {
    renderPage();
    expandCard('dress');
    expect(screen.getByRole('button', { name: /copy all "dress" phrasal verbs/i })).toBeInTheDocument();
  });

  it('dress copy button title is \'Copy all "dress" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('dress');
    expect(screen.getByRole('button', { name: /copy all "dress" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "dress" phrasal verbs');
  });

  it('clipboard receives all 7 dress particles as "dress X" forms in order', () => {
    renderPage();
    expandCard('dress');
    fireEvent.click(screen.getByRole('button', { name: /copy all "dress" phrasal verbs/i }));
    const expected = ALL_DRESS_PARTICLES.map(p => `dress ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every dress particle', () => {
    renderPage();
    expandCard('dress');
    fireEvent.click(screen.getByRole('button', { name: /copy all "dress" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_DRESS_PARTICLES) {
      expect(written).toContain(`dress ${p}`);
    }
  });

  it('dress copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('dress');
    fireEvent.click(screen.getByRole('button', { name: /copy all "dress" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Drop card', () => {
  it('renders the "Drop" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Drop' })).toBeInTheDocument();
  });

  it('"Drop" link points to /phrasal-verbs/list/drop', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Drop$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/drop');
  });
});

describe('PhrasalVerbsListPage — Drop particles subtitle', () => {
  it('shows drop particles text in subtitle after expand', () => {
    renderPage();
    expandCard('drop');
    expect(within(screen.getByTestId('verb-card-drop')).getByText(/across, around \/ round, away, back, behind, by, down, in, into, off, on, out, over, through, to/i)).toBeInTheDocument();
  });

  it('drop subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('drop');
    const subtitle = within(screen.getByTestId('verb-card-drop')).getByText(/across, around \/ round, away, back, behind, by, down, in, into, off, on, out, over, through, to/i);
    expect(subtitle).toHaveAttribute('title', ALL_DROP_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — drop copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a drop copy button when expanded', () => {
    renderPage();
    expandCard('drop');
    expect(screen.getByRole('button', { name: /copy all "drop" phrasal verbs/i })).toBeInTheDocument();
  });

  it('drop copy button title is \'Copy all "drop" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('drop');
    expect(screen.getByRole('button', { name: /copy all "drop" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "drop" phrasal verbs');
  });

  it('clipboard receives all 15 drop particles as "drop X" forms in order', () => {
    renderPage();
    expandCard('drop');
    fireEvent.click(screen.getByRole('button', { name: /copy all "drop" phrasal verbs/i }));
    const expected = ALL_DROP_PARTICLES.map(p => `drop ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every drop particle', () => {
    renderPage();
    expandCard('drop');
    fireEvent.click(screen.getByRole('button', { name: /copy all "drop" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_DROP_PARTICLES) {
      expect(written).toContain(`drop ${p}`);
    }
  });

  it('drop copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('drop');
    fireEvent.click(screen.getByRole('button', { name: /copy all "drop" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Eat card', () => {
  it('renders the "Eat" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Eat' })).toBeInTheDocument();
  });

  it('"Eat" link points to /phrasal-verbs/list/eat', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Eat$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/eat');
  });
});

describe('PhrasalVerbsListPage — Eat particles subtitle', () => {
  it('shows eat particles text in subtitle after expand', () => {
    renderPage();
    expandCard('eat');
    expect(within(screen.getByTestId('verb-card-eat')).getByText(/up, into, away, out, in, through, around \/ round, on, down, off/i)).toBeInTheDocument();
  });

  it('eat subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('eat');
    const subtitle = within(screen.getByTestId('verb-card-eat')).getByText(/up, into, away, out, in, through, around \/ round, on, down, off/i);
    expect(subtitle).toHaveAttribute('title', ALL_EAT_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — eat copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders an eat copy button when expanded', () => {
    renderPage();
    expandCard('eat');
    expect(screen.getByRole('button', { name: /copy all "eat" phrasal verbs/i })).toBeInTheDocument();
  });

  it('eat copy button title is \'Copy all "eat" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('eat');
    expect(screen.getByRole('button', { name: /copy all "eat" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "eat" phrasal verbs');
  });

  it('clipboard receives all 10 eat particles as "eat X" forms in order', () => {
    renderPage();
    expandCard('eat');
    fireEvent.click(screen.getByRole('button', { name: /copy all "eat" phrasal verbs/i }));
    const expected = ALL_EAT_PARTICLES.map(p => `eat ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every eat particle', () => {
    renderPage();
    expandCard('eat');
    fireEvent.click(screen.getByRole('button', { name: /copy all "eat" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_EAT_PARTICLES) {
      expect(written).toContain(`eat ${p}`);
    }
  });

  it('eat copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('eat');
    fireEvent.click(screen.getByRole('button', { name: /copy all "eat" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Fall card', () => {
  it('renders the "Fall" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Fall' })).toBeInTheDocument();
  });

  it('"Fall" link points to /phrasal-verbs/list/fall', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Fall$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/fall');
  });
});

describe('PhrasalVerbsListPage — Fall particles subtitle', () => {
  it('shows fall particles text in subtitle after expand', () => {
    renderPage();
    expandCard('fall');
    expect(within(screen.getByTestId('verb-card-fall')).getByText(/about \/ around \/ round, apart, away, back, behind, down, for, in, into, off, on \/ upon, out, over, through, to/i)).toBeInTheDocument();
  });

  it('fall subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('fall');
    const subtitle = within(screen.getByTestId('verb-card-fall')).getByText(/about \/ around \/ round, apart, away, back, behind, down, for, in, into, off, on \/ upon, out, over, through, to/i);
    expect(subtitle).toHaveAttribute('title', ALL_FALL_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — fall copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a fall copy button when expanded', () => {
    renderPage();
    expandCard('fall');
    expect(screen.getByRole('button', { name: /copy all "fall" phrasal verbs/i })).toBeInTheDocument();
  });

  it('fall copy button title is \'Copy all "fall" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('fall');
    expect(screen.getByRole('button', { name: /copy all "fall" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "fall" phrasal verbs');
  });

  it('clipboard receives all 15 fall particles as "fall X" forms in order', () => {
    renderPage();
    expandCard('fall');
    fireEvent.click(screen.getByRole('button', { name: /copy all "fall" phrasal verbs/i }));
    const expected = ALL_FALL_PARTICLES.map(p => `fall ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every fall particle', () => {
    renderPage();
    expandCard('fall');
    fireEvent.click(screen.getByRole('button', { name: /copy all "fall" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_FALL_PARTICLES) {
      expect(written).toContain(`fall ${p}`);
    }
  });

  it('fall copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('fall');
    fireEvent.click(screen.getByRole('button', { name: /copy all "fall" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Figure card', () => {
  it('renders the "Figure" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Figure' })).toBeInTheDocument();
  });

  it('"Figure" link points to /phrasal-verbs/list/figure', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Figure$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/figure');
  });
});

describe('PhrasalVerbsListPage — Figure particles subtitle', () => {
  it('shows figure particles text in subtitle after expand', () => {
    renderPage();
    expandCard('figure');
    expect(within(screen.getByTestId('verb-card-figure')).getByText(/for, in, into, on, out, up/i)).toBeInTheDocument();
  });

  it('figure subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('figure');
    const subtitle = within(screen.getByTestId('verb-card-figure')).getByText(/for, in, into, on, out, up/i);
    expect(subtitle).toHaveAttribute('title', ALL_FIGURE_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — figure copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a figure copy button when expanded', () => {
    renderPage();
    expandCard('figure');
    expect(screen.getByRole('button', { name: /copy all "figure" phrasal verbs/i })).toBeInTheDocument();
  });

  it('figure copy button title is \'Copy all "figure" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('figure');
    expect(screen.getByRole('button', { name: /copy all "figure" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "figure" phrasal verbs');
  });

  it('clipboard receives all 6 figure particles as "figure X" forms in order', () => {
    renderPage();
    expandCard('figure');
    fireEvent.click(screen.getByRole('button', { name: /copy all "figure" phrasal verbs/i }));
    const expected = ALL_FIGURE_PARTICLES.map(p => `figure ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every figure particle', () => {
    renderPage();
    expandCard('figure');
    fireEvent.click(screen.getByRole('button', { name: /copy all "figure" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_FIGURE_PARTICLES) {
      expect(written).toContain(`figure ${p}`);
    }
  });

  it('figure copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('figure');
    fireEvent.click(screen.getByRole('button', { name: /copy all "figure" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});
