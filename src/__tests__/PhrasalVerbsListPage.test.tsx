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
        <Route path="/phrasal-verbs/particles" element={<LocationSpy />} />
      </Routes>
    </MemoryRouter>
  );
}

function expandCard(key: string) {
  fireEvent.click(screen.getByTestId(`verb-card-${key}`));
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
});

describe('PhrasalVerbsListPage — Particles subtitle', () => {
  it('shows particles names text in subtitle', () => {
    renderPage();
    const particlesCard = screen.getByRole('heading', { name: 'Particles' }).closest('a')!;
    expect(within(particlesCard).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('particles subtitle has line-clamp-2 class', () => {
    renderPage();
    const particlesCard = screen.getByRole('heading', { name: 'Particles' }).closest('a')!;
    const subtitle = within(particlesCard).getByText(/off, on, up/i);
    expect(subtitle).toHaveClass('line-clamp-2');
  });

  it('particles subtitle title attribute contains representative particles', () => {
    renderPage();
    const particlesCard = screen.getByRole('heading', { name: 'Particles' }).closest('a')!;
    const subtitle = within(particlesCard).getByText(/off, on, up/i);
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('cross / across'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('around / round'));
    expect(subtitle).toHaveAttribute('title', expect.stringContaining('along'));
  });

  it('particles subtitle title attribute contains all 27 particle names', () => {
    renderPage();
    const particlesCard = screen.getByRole('heading', { name: 'Particles' }).closest('a')!;
    const subtitle = within(particlesCard).getByText(/off, on, up/i);
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

describe('PhrasalVerbsListPage — Particles divider', () => {
  it('renders an hr separator after the Particles card', () => {
    const { container } = renderPage();
    const particlesCard = screen.getByRole('heading', { name: 'Particles' }).closest('a')!;
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
