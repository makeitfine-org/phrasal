import { screen, within, fireEvent } from '@testing-library/react';
import { setupPortal, renderPage, renderPageWithRoutes, expandCard, ALL_PARTICLES, ALL_MAKE_PARTICLES, ALL_PUT_PARTICLES, ALL_TAKE_PARTICLES, ALL_GIVE_PARTICLES, ALL_GO_PARTICLES, ALL_COME_PARTICLES } from './helpers';

setupPortal();

describe('PhrasalVerbsListPage — copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
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
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
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
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
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
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
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
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
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
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
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
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
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

