import { screen, within, fireEvent } from '@testing-library/react';
import { setupPortal, renderPage, expandCard, ALL_GROW_PARTICLES, ALL_HAND_PARTICLES, ALL_HANG_PARTICLES, ALL_HOLD_PARTICLES, ALL_KEEP_PARTICLES, ALL_KNOCK_PARTICLES, ALL_LAY_PARTICLES } from './helpers';

setupPortal();

describe('PhrasalVerbsListPage — Grow card', () => {
  it('renders the "Grow" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Grow' })).toBeInTheDocument();
  });

  it('"Grow" link points to /phrasal-verbs/list/grow', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Grow$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/grow');
  });
});

describe('PhrasalVerbsListPage — Grow particles subtitle', () => {
  it('shows grow particles text in subtitle after expand', () => {
    renderPage();
    expandCard('grow');
    expect(within(screen.getByTestId('verb-card-grow')).getByText(/apart, away, back/i)).toBeInTheDocument();
  });

  it('grow subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('grow');
    const subtitle = within(screen.getByTestId('verb-card-grow')).getByText(/apart, away, back/i);
    expect(subtitle).toHaveAttribute('title', ALL_GROW_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — grow copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a grow copy button when expanded', () => {
    renderPage();
    expandCard('grow');
    expect(screen.getByRole('button', { name: /copy all "grow" phrasal verbs/i })).toBeInTheDocument();
  });

  it('grow copy button title is \'Copy all "grow" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('grow');
    expect(screen.getByRole('button', { name: /copy all "grow" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "grow" phrasal verbs');
  });

  it('clipboard receives all 12 grow particles as "grow X" forms in order', () => {
    renderPage();
    expandCard('grow');
    fireEvent.click(screen.getByRole('button', { name: /copy all "grow" phrasal verbs/i }));
    const expected = ALL_GROW_PARTICLES.map(p => `grow ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every grow particle', () => {
    renderPage();
    expandCard('grow');
    fireEvent.click(screen.getByRole('button', { name: /copy all "grow" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_GROW_PARTICLES) {
      expect(written).toContain(`grow ${p}`);
    }
  });

  it('grow copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('grow');
    fireEvent.click(screen.getByRole('button', { name: /copy all "grow" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Hand card', () => {
  it('renders the "Hand" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Hand' })).toBeInTheDocument();
  });

  it('"Hand" link points to /phrasal-verbs/list/hand', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Hand$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/hand');
  });
});

describe('PhrasalVerbsListPage — Hand particles subtitle', () => {
  it('shows hand particles text in subtitle after expand', () => {
    renderPage();
    expandCard('hand');
    expect(within(screen.getByTestId('verb-card-hand')).getByText(/back, down, in/i)).toBeInTheDocument();
  });

  it('hand subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('hand');
    const subtitle = within(screen.getByTestId('verb-card-hand')).getByText(/back, down, in/i);
    expect(subtitle).toHaveAttribute('title', ALL_HAND_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — hand copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a hand copy button when expanded', () => {
    renderPage();
    expandCard('hand');
    expect(screen.getByRole('button', { name: /copy all "hand" phrasal verbs/i })).toBeInTheDocument();
  });

  it('hand copy button title is \'Copy all "hand" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('hand');
    expect(screen.getByRole('button', { name: /copy all "hand" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "hand" phrasal verbs');
  });

  it('clipboard receives all 9 hand particles as "hand X" forms in order', () => {
    renderPage();
    expandCard('hand');
    fireEvent.click(screen.getByRole('button', { name: /copy all "hand" phrasal verbs/i }));
    const expected = ALL_HAND_PARTICLES.map(p => `hand ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every hand particle', () => {
    renderPage();
    expandCard('hand');
    fireEvent.click(screen.getByRole('button', { name: /copy all "hand" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_HAND_PARTICLES) {
      expect(written).toContain(`hand ${p}`);
    }
  });

  it('hand copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('hand');
    fireEvent.click(screen.getByRole('button', { name: /copy all "hand" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Hang card', () => {
  it('renders the "Hang" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Hang' })).toBeInTheDocument();
  });

  it('"Hang" link points to /phrasal-verbs/list/hang', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Hang$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/hang');
  });
});

describe('PhrasalVerbsListPage — Hang particles subtitle', () => {
  it('shows hang particles text in subtitle after expand', () => {
    renderPage();
    expandCard('hang');
    expect(within(screen.getByTestId('verb-card-hang')).getByText(/about \/ around \/ round, back/i)).toBeInTheDocument();
  });

  it('hang subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('hang');
    const subtitle = within(screen.getByTestId('verb-card-hang')).getByText(/about \/ around \/ round, back/i);
    expect(subtitle).toHaveAttribute('title', ALL_HANG_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — hang copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a hang copy button when expanded', () => {
    renderPage();
    expandCard('hang');
    expect(screen.getByRole('button', { name: /copy all "hang" phrasal verbs/i })).toBeInTheDocument();
  });

  it('hang copy button title is \'Copy all "hang" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('hang');
    expect(screen.getByRole('button', { name: /copy all "hang" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "hang" phrasal verbs');
  });

  it('clipboard receives all 12 hang particles as "hang X" forms in order', () => {
    renderPage();
    expandCard('hang');
    fireEvent.click(screen.getByRole('button', { name: /copy all "hang" phrasal verbs/i }));
    const expected = ALL_HANG_PARTICLES.map(p => `hang ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every hang particle', () => {
    renderPage();
    expandCard('hang');
    fireEvent.click(screen.getByRole('button', { name: /copy all "hang" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_HANG_PARTICLES) {
      expect(written).toContain(`hang ${p}`);
    }
  });

  it('hang copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('hang');
    fireEvent.click(screen.getByRole('button', { name: /copy all "hang" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Hold card', () => {
  it('renders the "Hold" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Hold' })).toBeInTheDocument();
  });

  it('"Hold" link points to /phrasal-verbs/list/hold', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Hold$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/hold');
  });
});

describe('PhrasalVerbsListPage — Hold particles subtitle', () => {
  it('shows hold particles text in subtitle after expand', () => {
    renderPage();
    expandCard('hold');
    expect(within(screen.getByTestId('verb-card-hold')).getByText(/against, back/i)).toBeInTheDocument();
  });

  it('hold subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('hold');
    const subtitle = within(screen.getByTestId('verb-card-hold')).getByText(/against, back/i);
    expect(subtitle).toHaveAttribute('title', ALL_HOLD_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — hold copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a hold copy button when expanded', () => {
    renderPage();
    expandCard('hold');
    expect(screen.getByRole('button', { name: /copy all "hold" phrasal verbs/i })).toBeInTheDocument();
  });

  it('hold copy button title is \'Copy all "hold" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('hold');
    expect(screen.getByRole('button', { name: /copy all "hold" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "hold" phrasal verbs');
  });

  it('clipboard receives all 12 hold particles as "hold X" forms in order', () => {
    renderPage();
    expandCard('hold');
    fireEvent.click(screen.getByRole('button', { name: /copy all "hold" phrasal verbs/i }));
    const expected = ALL_HOLD_PARTICLES.map(p => `hold ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every hold particle', () => {
    renderPage();
    expandCard('hold');
    fireEvent.click(screen.getByRole('button', { name: /copy all "hold" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_HOLD_PARTICLES) {
      expect(written).toContain(`hold ${p}`);
    }
  });

  it('hold copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('hold');
    fireEvent.click(screen.getByRole('button', { name: /copy all "hold" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Keep card', () => {
  it('renders the "Keep" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Keep' })).toBeInTheDocument();
  });

  it('"Keep" link points to /phrasal-verbs/list/keep', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Keep$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/keep');
  });
});

describe('PhrasalVerbsListPage — Keep particles subtitle', () => {
  it('shows keep particles text in subtitle after expand', () => {
    renderPage();
    expandCard('keep');
    expect(within(screen.getByTestId('verb-card-keep')).getByText(/about \/ around \/ round, across/i)).toBeInTheDocument();
  });

  it('keep subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('keep');
    const subtitle = within(screen.getByTestId('verb-card-keep')).getByText(/about \/ around \/ round, across/i);
    expect(subtitle).toHaveAttribute('title', ALL_KEEP_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — keep copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a keep copy button when expanded', () => {
    renderPage();
    expandCard('keep');
    expect(screen.getByRole('button', { name: /copy all "keep" phrasal verbs/i })).toBeInTheDocument();
  });

  it('keep copy button title is \'Copy all "keep" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('keep');
    expect(screen.getByRole('button', { name: /copy all "keep" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "keep" phrasal verbs');
  });

  it('clipboard receives all 16 keep particles as "keep X" forms in order', () => {
    renderPage();
    expandCard('keep');
    fireEvent.click(screen.getByRole('button', { name: /copy all "keep" phrasal verbs/i }));
    const expected = ALL_KEEP_PARTICLES.map(p => `keep ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every keep particle', () => {
    renderPage();
    expandCard('keep');
    fireEvent.click(screen.getByRole('button', { name: /copy all "keep" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_KEEP_PARTICLES) {
      expect(written).toContain(`keep ${p}`);
    }
  });

  it('keep copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('keep');
    fireEvent.click(screen.getByRole('button', { name: /copy all "keep" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Knock card', () => {
  it('renders the "Knock" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Knock' })).toBeInTheDocument();
  });

  it('"Knock" link points to /phrasal-verbs/list/knock', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Knock$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/knock');
  });
});

describe('PhrasalVerbsListPage — Knock particles subtitle', () => {
  it('shows knock particles text in subtitle after expand', () => {
    renderPage();
    expandCard('knock');
    expect(within(screen.getByTestId('verb-card-knock')).getByText(/about \/ around \/ round, against/i)).toBeInTheDocument();
  });

  it('knock subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('knock');
    const subtitle = within(screen.getByTestId('verb-card-knock')).getByText(/about \/ around \/ round, against/i);
    expect(subtitle).toHaveAttribute('title', ALL_KNOCK_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — knock copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a knock copy button when expanded', () => {
    renderPage();
    expandCard('knock');
    expect(screen.getByRole('button', { name: /copy all "knock" phrasal verbs/i })).toBeInTheDocument();
  });

  it('knock copy button title is \'Copy all "knock" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('knock');
    expect(screen.getByRole('button', { name: /copy all "knock" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "knock" phrasal verbs');
  });

  it('clipboard receives all 14 knock particles as "knock X" forms in order', () => {
    renderPage();
    expandCard('knock');
    fireEvent.click(screen.getByRole('button', { name: /copy all "knock" phrasal verbs/i }));
    const expected = ALL_KNOCK_PARTICLES.map(p => `knock ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every knock particle', () => {
    renderPage();
    expandCard('knock');
    fireEvent.click(screen.getByRole('button', { name: /copy all "knock" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_KNOCK_PARTICLES) {
      expect(written).toContain(`knock ${p}`);
    }
  });

  it('knock copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('knock');
    fireEvent.click(screen.getByRole('button', { name: /copy all "knock" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Lay card', () => {
  it('renders the "Lay" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Lay' })).toBeInTheDocument();
  });

  it('"Lay" link points to /phrasal-verbs/list/lay', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Lay$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/lay');
  });
});

describe('PhrasalVerbsListPage — Lay particles subtitle', () => {
  it('shows lay particles text in subtitle after expand', () => {
    renderPage();
    expandCard('lay');
    expect(within(screen.getByTestId('verb-card-lay')).getByText(/about, away, by/i)).toBeInTheDocument();
  });

  it('lay subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('lay');
    const subtitle = within(screen.getByTestId('verb-card-lay')).getByText(/about, away, by/i);
    expect(subtitle).toHaveAttribute('title', ALL_LAY_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — lay copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a lay copy button when expanded', () => {
    renderPage();
    expandCard('lay');
    expect(screen.getByRole('button', { name: /copy all "lay" phrasal verbs/i })).toBeInTheDocument();
  });

  it('lay copy button title is \'Copy all "lay" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('lay');
    expect(screen.getByRole('button', { name: /copy all "lay" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "lay" phrasal verbs');
  });

  it('clipboard receives all 13 lay particles as "lay X" forms in order', () => {
    renderPage();
    expandCard('lay');
    fireEvent.click(screen.getByRole('button', { name: /copy all "lay" phrasal verbs/i }));
    const expected = ALL_LAY_PARTICLES.map(p => `lay ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every lay particle', () => {
    renderPage();
    expandCard('lay');
    fireEvent.click(screen.getByRole('button', { name: /copy all "lay" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_LAY_PARTICLES) {
      expect(written).toContain(`lay ${p}`);
    }
  });

  it('lay copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('lay');
    fireEvent.click(screen.getByRole('button', { name: /copy all "lay" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

