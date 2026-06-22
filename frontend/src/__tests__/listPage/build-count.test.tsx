import { screen, within, fireEvent } from '@testing-library/react';
import { setupPortal, renderPage, expandCard, ALL_PARTICLES, ALL_BUILD_PARTICLES, ALL_CALL_PARTICLES, ALL_CARRY_PARTICLES, ALL_CATCH_PARTICLES, ALL_CHECK_PARTICLES, ALL_CHEER_PARTICLES, ALL_CLEAN_PARTICLES, ALL_COUNT_PARTICLES } from './helpers';

setupPortal();

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
      configurable: true,
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
      configurable: true,
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
      configurable: true,
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
      configurable: true,
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
      configurable: true,
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
      configurable: true,
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

