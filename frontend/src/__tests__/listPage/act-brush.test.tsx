import { screen, within, fireEvent } from '@testing-library/react';
import { setupPortal, renderPage, expandCard, ALL_BREAK_PARTICLES, ALL_BRING_PARTICLES, ALL_ACT_PARTICLES, ALL_CUT_PARTICLES, ALL_ASK_PARTICLES, ALL_BACK_PARTICLES, ALL_BE_PARTICLES, ALL_BLOW_PARTICLES, ALL_BRUSH_PARTICLES } from './helpers';

setupPortal();

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

