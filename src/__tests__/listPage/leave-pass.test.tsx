import { screen, within, fireEvent } from '@testing-library/react';
import { setupPortal, renderPage, expandCard, ALL_LEAVE_PARTICLES, ALL_LET_PARTICLES, ALL_LOG_PARTICLES, ALL_LOOK_PARTICLES, ALL_MIX_PARTICLES, ALL_PASS_PARTICLES } from './helpers';

setupPortal();

describe('PhrasalVerbsListPage — Leave card', () => {
  it('renders the "Leave" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-leave')).toBeInTheDocument();
  });

  it('renders "Leave" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-leave')).getByText('Leave')).toBeInTheDocument();
  });

  it('"Leave" link points to /phrasal-verbs/list/leave', () => {
    renderPage();
    expandCard('leave');
    const link = within(screen.getByTestId('verb-card-leave')).getByRole('link', { name: /leave/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/leave');
  });

  it('shows leave particles text in subtitle after expand', () => {
    renderPage();
    expandCard('leave');
    expect(within(screen.getByTestId('verb-card-leave')).getByText(/about \/ around, back/i)).toBeInTheDocument();
  });

  it('leave subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('leave');
    const subtitle = within(screen.getByTestId('verb-card-leave')).getByText(/about \/ around, back/i);
    expect(subtitle).toHaveAttribute('title', ALL_LEAVE_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — leave copy button', () => {
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

  it('renders a leave copy button when expanded', () => {
    renderPage();
    expandCard('leave');
    expect(screen.getByRole('button', { name: /copy all "leave" phrasal verbs/i })).toBeInTheDocument();
  });

  it('leave copy button title is \'Copy all "leave" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('leave');
    expect(screen.getByRole('button', { name: /copy all "leave" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "leave" phrasal verbs');
  });

  it('clipboard receives all 12 leave particles as "leave X" forms in order', () => {
    renderPage();
    expandCard('leave');
    fireEvent.click(screen.getByRole('button', { name: /copy all "leave" phrasal verbs/i }));
    const expected = ALL_LEAVE_PARTICLES.map(p => `leave ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every leave particle', () => {
    renderPage();
    expandCard('leave');
    fireEvent.click(screen.getByRole('button', { name: /copy all "leave" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_LEAVE_PARTICLES) {
      expect(written).toContain(`leave ${p}`);
    }
  });

  it('leave copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('leave');
    fireEvent.click(screen.getByRole('button', { name: /copy all "leave" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Let card', () => {
  it('renders the "Let" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-let')).toBeInTheDocument();
  });

  it('renders "Let" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-let')).getByText('Let')).toBeInTheDocument();
  });

  it('"Let" link points to /phrasal-verbs/list/let', () => {
    renderPage();
    expandCard('let');
    const link = within(screen.getByTestId('verb-card-let')).getByRole('link', { name: /let/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/let');
  });

  it('shows let particles text in subtitle after expand', () => {
    renderPage();
    expandCard('let');
    expect(within(screen.getByTestId('verb-card-let')).getByText(/down, in/i)).toBeInTheDocument();
  });

  it('let subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('let');
    const subtitle = within(screen.getByTestId('verb-card-let')).getByText(/down, in/i);
    expect(subtitle).toHaveAttribute('title', ALL_LET_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — let copy button', () => {
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

  it('renders a let copy button when expanded', () => {
    renderPage();
    expandCard('let');
    expect(screen.getByRole('button', { name: /copy all "let" phrasal verbs/i })).toBeInTheDocument();
  });

  it('let copy button title is \'Copy all "let" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('let');
    expect(screen.getByRole('button', { name: /copy all "let" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "let" phrasal verbs');
  });

  it('clipboard receives all 9 let particles as "let X" forms in order', () => {
    renderPage();
    expandCard('let');
    fireEvent.click(screen.getByRole('button', { name: /copy all "let" phrasal verbs/i }));
    const expected = ALL_LET_PARTICLES.map(p => `let ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every let particle', () => {
    renderPage();
    expandCard('let');
    fireEvent.click(screen.getByRole('button', { name: /copy all "let" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_LET_PARTICLES) {
      expect(written).toContain(`let ${p}`);
    }
  });

  it('let copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('let');
    fireEvent.click(screen.getByRole('button', { name: /copy all "let" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Log card', () => {
  it('renders the "Log" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-log')).toBeInTheDocument();
  });

  it('renders "Log" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-log')).getByText('Log')).toBeInTheDocument();
  });

  it('"Log" link points to /phrasal-verbs/list/log', () => {
    renderPage();
    expandCard('log');
    const link = within(screen.getByTestId('verb-card-log')).getByRole('link', { name: /log/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/log');
  });

  it('shows log particles text in subtitle after expand', () => {
    renderPage();
    expandCard('log');
    expect(within(screen.getByTestId('verb-card-log')).getByText(/in \/ into, out/i)).toBeInTheDocument();
  });

  it('log subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('log');
    const subtitle = within(screen.getByTestId('verb-card-log')).getByText(/in \/ into, out/i);
    expect(subtitle).toHaveAttribute('title', ALL_LOG_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — log copy button', () => {
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

  it('renders a log copy button when expanded', () => {
    renderPage();
    expandCard('log');
    expect(screen.getByRole('button', { name: /copy all "log" phrasal verbs/i })).toBeInTheDocument();
  });

  it('log copy button title is \'Copy all "log" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('log');
    expect(screen.getByRole('button', { name: /copy all "log" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "log" phrasal verbs');
  });

  it('clipboard receives all 5 log particles as "log X" forms in order', () => {
    renderPage();
    expandCard('log');
    fireEvent.click(screen.getByRole('button', { name: /copy all "log" phrasal verbs/i }));
    const expected = ALL_LOG_PARTICLES.map(p => `log ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every log particle', () => {
    renderPage();
    expandCard('log');
    fireEvent.click(screen.getByRole('button', { name: /copy all "log" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_LOG_PARTICLES) {
      expect(written).toContain(`log ${p}`);
    }
  });

  it('log copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('log');
    fireEvent.click(screen.getByRole('button', { name: /copy all "log" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Look card', () => {
  it('renders the "Look" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-look')).toBeInTheDocument();
  });

  it('renders "Look" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-look')).getByText('Look')).toBeInTheDocument();
  });

  it('"Look" link points to /phrasal-verbs/list/look', () => {
    renderPage();
    expandCard('look');
    const link = within(screen.getByTestId('verb-card-look')).getByRole('link', { name: /look/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/look');
  });

  it('shows look particles text in subtitle after expand', () => {
    renderPage();
    expandCard('look');
    expect(within(screen.getByTestId('verb-card-look')).getByText(/after, ahead/i)).toBeInTheDocument();
  });

  it('look subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('look');
    const subtitle = within(screen.getByTestId('verb-card-look')).getByText(/after, ahead/i);
    expect(subtitle).toHaveAttribute('title', ALL_LOOK_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — look copy button', () => {
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

  it('renders a look copy button when expanded', () => {
    renderPage();
    expandCard('look');
    expect(screen.getByRole('button', { name: /copy all "look" phrasal verbs/i })).toBeInTheDocument();
  });

  it('look copy button title is \'Copy all "look" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('look');
    expect(screen.getByRole('button', { name: /copy all "look" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "look" phrasal verbs');
  });

  it('clipboard receives all 16 look particles as "look X" forms in order', () => {
    renderPage();
    expandCard('look');
    fireEvent.click(screen.getByRole('button', { name: /copy all "look" phrasal verbs/i }));
    const expected = ALL_LOOK_PARTICLES.map(p => `look ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every look particle', () => {
    renderPage();
    expandCard('look');
    fireEvent.click(screen.getByRole('button', { name: /copy all "look" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_LOOK_PARTICLES) {
      expect(written).toContain(`look ${p}`);
    }
  });

  it('look copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('look');
    fireEvent.click(screen.getByRole('button', { name: /copy all "look" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Mix card', () => {
  it('renders the "Mix" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-mix')).toBeInTheDocument();
  });

  it('renders "Mix" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-mix')).getByText('Mix')).toBeInTheDocument();
  });

  it('"Mix" link points to /phrasal-verbs/list/mix', () => {
    renderPage();
    expandCard('mix');
    const link = within(screen.getByTestId('verb-card-mix')).getByRole('link', { name: /mix/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/mix');
  });

  it('shows mix particles text in subtitle after expand', () => {
    renderPage();
    expandCard('mix');
    expect(within(screen.getByTestId('verb-card-mix')).getByText(/up, in \/ into/i)).toBeInTheDocument();
  });

  it('mix subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('mix');
    const subtitle = within(screen.getByTestId('verb-card-mix')).getByText(/up, in \/ into/i);
    expect(subtitle).toHaveAttribute('title', ALL_MIX_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — mix copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  it('renders a mix copy button when expanded', () => {
    renderPage();
    expandCard('mix');
    expect(screen.getByRole('button', { name: /copy all "mix" phrasal verbs/i })).toBeInTheDocument();
  });

  it('mix copy button title is \'Copy all "mix" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('mix');
    expect(screen.getByRole('button', { name: /copy all "mix" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "mix" phrasal verbs');
  });

  it('clipboard receives all 5 mix particles as "mix X" forms in order', () => {
    renderPage();
    expandCard('mix');
    fireEvent.click(screen.getByRole('button', { name: /copy all "mix" phrasal verbs/i }));
    const expected = ALL_MIX_PARTICLES.map(p => `mix ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every mix particle', () => {
    renderPage();
    expandCard('mix');
    fireEvent.click(screen.getByRole('button', { name: /copy all "mix" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_MIX_PARTICLES) {
      expect(written).toContain(`mix ${p}`);
    }
  });

  it('mix copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('mix');
    fireEvent.click(screen.getByRole('button', { name: /copy all "mix" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Pass card', () => {
  it('renders the "Pass" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-pass')).toBeInTheDocument();
  });

  it('renders "Pass" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-pass')).getByText('Pass')).toBeInTheDocument();
  });

  it('"Pass" link points to /phrasal-verbs/list/pass', () => {
    renderPage();
    expandCard('pass');
    const link = within(screen.getByTestId('verb-card-pass')).getByRole('link', { name: /pass/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/pass');
  });

  it('shows pass particles text in subtitle after expand', () => {
    renderPage();
    expandCard('pass');
    expect(within(screen.getByTestId('verb-card-pass')).getByText(/away, by/i)).toBeInTheDocument();
  });

  it('pass subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('pass');
    const subtitle = within(screen.getByTestId('verb-card-pass')).getByText(/away, by/i);
    expect(subtitle).toHaveAttribute('title', ALL_PASS_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — pass copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  it('renders a pass copy button when expanded', () => {
    renderPage();
    expandCard('pass');
    expect(screen.getByRole('button', { name: /copy all "pass" phrasal verbs/i })).toBeInTheDocument();
  });

  it('pass copy button title is \'Copy all "pass" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('pass');
    expect(screen.getByRole('button', { name: /copy all "pass" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "pass" phrasal verbs');
  });

  it('clipboard receives all 14 pass particles as "pass X" forms in order', () => {
    renderPage();
    expandCard('pass');
    fireEvent.click(screen.getByRole('button', { name: /copy all "pass" phrasal verbs/i }));
    const expected = ALL_PASS_PARTICLES.map(p => `pass ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every pass particle', () => {
    renderPage();
    expandCard('pass');
    fireEvent.click(screen.getByRole('button', { name: /copy all "pass" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_PASS_PARTICLES) {
      expect(written).toContain(`pass ${p}`);
    }
  });

  it('pass copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('pass');
    fireEvent.click(screen.getByRole('button', { name: /copy all "pass" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

