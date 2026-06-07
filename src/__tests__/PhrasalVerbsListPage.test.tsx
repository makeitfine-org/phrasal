import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
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
        <Route path="/phrasal-verbs/list/put" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/take" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/give" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/go" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/come" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/particles" element={<LocationSpy />} />
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

describe('PhrasalVerbsListPage — particles subtitle', () => {
  it('shows particles text in subtitle', () => {
    renderPage();
    const getCard = screen.getByRole('heading', { name: 'Get' }).closest('a')!;
    expect(within(getCard).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('subtitle has line-clamp-2 class', () => {
    renderPage();
    const getCard = screen.getByRole('heading', { name: 'Get' }).closest('a')!;
    const subtitle = within(getCard).getByText(/off, on, up/i);
    expect(subtitle).toHaveClass('line-clamp-2');
  });

  it('subtitle title attribute contains all particles', () => {
    renderPage();
    const getCard = screen.getByRole('heading', { name: 'Get' }).closest('a')!;
    const subtitle = within(getCard).getByText(/off, on, up/i);
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

describe('PhrasalVerbsListPage — Put particles subtitle', () => {
  it('shows put particles text in subtitle', () => {
    renderPage();
    const putCard = screen.getByRole('heading', { name: 'Put' }).closest('a')!;
    expect(within(putCard).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('put subtitle has line-clamp-2 class', () => {
    renderPage();
    const putCard = screen.getByRole('heading', { name: 'Put' }).closest('a')!;
    const subtitle = within(putCard).getByText(/off, on, up/i);
    expect(subtitle).toHaveClass('line-clamp-2');
  });

  it('put subtitle title attribute contains all particles', () => {
    renderPage();
    const putCard = screen.getByRole('heading', { name: 'Put' }).closest('a')!;
    const subtitle = within(putCard).getByText(/off, on, up/i);
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

  it('renders a put copy button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i })).toBeInTheDocument();
  });

  it('put copy button title is \'Copy all "put" phrasal verbs\' before click', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "put" phrasal verbs');
  });

  it('clipboard receives all 19 put particles as "put X" forms in order', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i }));
    const expected = ALL_PUT_PARTICLES.map(p => `put ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every put particle', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_PUT_PARTICLES) {
      expect(written).toContain(`put ${p}`);
    }
  });

  it('put copy button shows "Copied!" title after click', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('put copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "put" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking put copy button does not navigate to put page', () => {
    renderPageWithRoutes();
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
  it('shows take particles text in subtitle', () => {
    renderPage();
    const takeCard = screen.getByRole('heading', { name: 'Take' }).closest('a')!;
    expect(within(takeCard).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('take subtitle has line-clamp-2 class', () => {
    renderPage();
    const takeCard = screen.getByRole('heading', { name: 'Take' }).closest('a')!;
    const subtitle = within(takeCard).getByText(/off, on, up/i);
    expect(subtitle).toHaveClass('line-clamp-2');
  });

  it('take subtitle title attribute contains all particles', () => {
    renderPage();
    const takeCard = screen.getByRole('heading', { name: 'Take' }).closest('a')!;
    const subtitle = within(takeCard).getByText(/off, on, up/i);
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

  it('renders a take copy button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i })).toBeInTheDocument();
  });

  it('take copy button title is \'Copy all "take" phrasal verbs\' before click', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "take" phrasal verbs');
  });

  it('clipboard receives all 26 take particles as "take X" forms in order', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i }));
    const expected = ALL_TAKE_PARTICLES.map(p => `take ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every take particle', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_TAKE_PARTICLES) {
      expect(written).toContain(`take ${p}`);
    }
  });

  it('take copy button shows "Copied!" title after click', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('take copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "take" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking take copy button does not navigate to take page', () => {
    renderPageWithRoutes();
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
  it('shows give particles text in subtitle', () => {
    renderPage();
    const giveCard = screen.getByRole('heading', { name: 'Give' }).closest('a')!;
    expect(within(giveCard).getByText(/away, back, in/i)).toBeInTheDocument();
  });

  it('give subtitle has line-clamp-2 class', () => {
    renderPage();
    const giveCard = screen.getByRole('heading', { name: 'Give' }).closest('a')!;
    const subtitle = within(giveCard).getByText(/away, back, in/i);
    expect(subtitle).toHaveClass('line-clamp-2');
  });

  it('give subtitle title attribute contains all particles', () => {
    renderPage();
    const giveCard = screen.getByRole('heading', { name: 'Give' }).closest('a')!;
    const subtitle = within(giveCard).getByText(/away, back, in/i);
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

  it('renders a give copy button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i })).toBeInTheDocument();
  });

  it('give copy button title is \'Copy all "give" phrasal verbs\' before click', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "give" phrasal verbs');
  });

  it('clipboard receives all 11 give particles as "give X" forms in order', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i }));
    const expected = ALL_GIVE_PARTICLES.map(p => `give ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every give particle', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_GIVE_PARTICLES) {
      expect(written).toContain(`give ${p}`);
    }
  });

  it('give copy button shows "Copied!" title after click', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('give copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking give copy button does not navigate to give page', () => {
    renderPageWithRoutes();
    fireEvent.click(screen.getByRole('button', { name: /copy all "give" phrasal verbs/i }));
    expect(screen.getByTestId('location').textContent).toBe('/phrasal-verbs/list');
  });
});

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
  it('shows go particles text in subtitle', () => {
    renderPage();
    const goCard = screen.getByRole('heading', { name: 'Go' }).closest('a')!;
    expect(within(goCard).getByText(/off, on, up/i)).toBeInTheDocument();
  });

  it('go subtitle has line-clamp-2 class', () => {
    renderPage();
    const goCard = screen.getByRole('heading', { name: 'Go' }).closest('a')!;
    const subtitle = within(goCard).getByText(/off, on, up/i);
    expect(subtitle).toHaveClass('line-clamp-2');
  });

  it('go subtitle title attribute contains all particles', () => {
    renderPage();
    const goCard = screen.getByRole('heading', { name: 'Go' }).closest('a')!;
    const subtitle = within(goCard).getByText(/off, on, up/i);
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

  it('renders a go copy button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i })).toBeInTheDocument();
  });

  it('go copy button title is \'Copy all "go" phrasal verbs\' before click', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "go" phrasal verbs');
  });

  it('clipboard receives all 25 go particles as "go X" forms in order', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i }));
    const expected = ALL_GO_PARTICLES.map(p => `go ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every go particle', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_GO_PARTICLES) {
      expect(written).toContain(`go ${p}`);
    }
  });

  it('go copy button shows "Copied!" title after click', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('go copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "go" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking go copy button does not navigate to go page', () => {
    renderPageWithRoutes();
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
  it('shows come particles text in subtitle', () => {
    renderPage();
    const comeCard = screen.getByRole('heading', { name: 'Come' }).closest('a')!;
    expect(within(comeCard).getByText(/about, across, after/i)).toBeInTheDocument();
  });

  it('come subtitle has line-clamp-2 class', () => {
    renderPage();
    const comeCard = screen.getByRole('heading', { name: 'Come' }).closest('a')!;
    const subtitle = within(comeCard).getByText(/about, across, after/i);
    expect(subtitle).toHaveClass('line-clamp-2');
  });

  it('come subtitle title attribute contains unique particles', () => {
    renderPage();
    const comeCard = screen.getByRole('heading', { name: 'Come' }).closest('a')!;
    const subtitle = within(comeCard).getByText(/about, across, after/i);
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

  it('renders a come copy button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i })).toBeInTheDocument();
  });

  it('come copy button title is \'Copy all "come" phrasal verbs\' before click', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "come" phrasal verbs');
  });

  it('clipboard receives all 26 come particles as "come X" forms in order', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i }));
    const expected = ALL_COME_PARTICLES.map(p => `come ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every come particle', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_COME_PARTICLES) {
      expect(written).toContain(`come ${p}`);
    }
  });

  it('come copy button shows "Copied!" title after click', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });

  it('come copy button reverts to original title after 1500 ms', async () => {
    vi.useFakeTimers();
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i }));
    await vi.waitFor(() => expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument());
    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copy all "come" phrasal verbs/i })).toBeInTheDocument();
    });
  });

  it('clicking come copy button does not navigate to come page', () => {
    renderPageWithRoutes();
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
