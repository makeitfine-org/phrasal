import { screen, within, fireEvent } from '@testing-library/react';
import { setupPortal, renderPage, expandCard, ALL_THINK_PARTICLES, ALL_THROW_PARTICLES, ALL_TRY_PARTICLES, ALL_TURN_PARTICLES, ALL_USE_PARTICLES, ALL_WAKE_PARTICLES, ALL_WARM_PARTICLES, ALL_WATCH_PARTICLES, ALL_WEAR_PARTICLES, ALL_WORK_PARTICLES, ALL_WRITE_PARTICLES, ALL_ZIP_PARTICLES } from './helpers';

setupPortal();

describe('PhrasalVerbsListPage — Think card', () => {
  it('renders the "Think" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-think')).toBeInTheDocument();
  });

  it('renders "Think" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-think')).getByText('Think')).toBeInTheDocument();
  });

  it('"Think" link points to /phrasal-verbs/list/think', () => {
    renderPage();
    expandCard('think');
    const link = within(screen.getByTestId('verb-card-think')).getByRole('link', { name: /think/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/think');
  });

  it('shows think particles text in subtitle after expand', () => {
    renderPage();
    expandCard('think');
    expect(within(screen.getByTestId('verb-card-think')).getByText(/about, ahead, around/i)).toBeInTheDocument();
  });

  it('think subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('think');
    const subtitle = within(screen.getByTestId('verb-card-think')).getByText(/about, ahead, around/i);
    expect(subtitle).toHaveAttribute('title', ALL_THINK_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — think copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a think copy button when expanded', () => {
    renderPage();
    expandCard('think');
    expect(screen.getByRole('button', { name: /copy all "think" phrasal verbs/i })).toBeInTheDocument();
  });

  it('think copy button title is \'Copy all "think" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('think');
    expect(screen.getByRole('button', { name: /copy all "think" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "think" phrasal verbs');
  });

  it('clipboard receives all 11 think particles as "think X" forms in order', () => {
    renderPage();
    expandCard('think');
    fireEvent.click(screen.getByRole('button', { name: /copy all "think" phrasal verbs/i }));
    const expected = ALL_THINK_PARTICLES.map(p => `think ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every think particle', () => {
    renderPage();
    expandCard('think');
    fireEvent.click(screen.getByRole('button', { name: /copy all "think" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_THINK_PARTICLES) {
      expect(written).toContain(`think ${p}`);
    }
  });

  it('think copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('think');
    fireEvent.click(screen.getByRole('button', { name: /copy all "think" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Throw card', () => {
  it('renders the "Throw" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-throw')).toBeInTheDocument();
  });

  it('renders "Throw" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-throw')).getByText('Throw')).toBeInTheDocument();
  });

  it('"Throw" link points to /phrasal-verbs/list/throw', () => {
    renderPage();
    expandCard('throw');
    const link = within(screen.getByTestId('verb-card-throw')).getByRole('link', { name: /throw/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/throw');
  });

  it('shows throw particles text in subtitle after expand', () => {
    renderPage();
    expandCard('throw');
    expect(within(screen.getByTestId('verb-card-throw')).getByText(/about \/ around \/ round, away/i)).toBeInTheDocument();
  });

  it('throw subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('throw');
    const subtitle = within(screen.getByTestId('verb-card-throw')).getByText(/about \/ around \/ round, away/i);
    expect(subtitle).toHaveAttribute('title', ALL_THROW_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — throw copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a throw copy button when expanded', () => {
    renderPage();
    expandCard('throw');
    expect(screen.getByRole('button', { name: /copy all "throw" phrasal verbs/i })).toBeInTheDocument();
  });

  it('throw copy button title is \'Copy all "throw" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('throw');
    expect(screen.getByRole('button', { name: /copy all "throw" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "throw" phrasal verbs');
  });

  it('clipboard receives all 12 throw particles as "throw X" forms in order', () => {
    renderPage();
    expandCard('throw');
    fireEvent.click(screen.getByRole('button', { name: /copy all "throw" phrasal verbs/i }));
    const expected = ALL_THROW_PARTICLES.map(p => `throw ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every throw particle', () => {
    renderPage();
    expandCard('throw');
    fireEvent.click(screen.getByRole('button', { name: /copy all "throw" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_THROW_PARTICLES) {
      expect(written).toContain(`throw ${p}`);
    }
  });

  it('throw copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('throw');
    fireEvent.click(screen.getByRole('button', { name: /copy all "throw" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Try card', () => {
  it('renders the "Try" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-try')).toBeInTheDocument();
  });

  it('renders "Try" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-try')).getByText('Try')).toBeInTheDocument();
  });

  it('"Try" link points to /phrasal-verbs/list/try', () => {
    renderPage();
    expandCard('try');
    const link = within(screen.getByTestId('verb-card-try')).getByRole('link', { name: /try/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/try');
  });

  it('shows try particles text in subtitle after expand', () => {
    renderPage();
    expandCard('try');
    expect(within(screen.getByTestId('verb-card-try')).getByText(/back, for/i)).toBeInTheDocument();
  });

  it('try subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('try');
    const subtitle = within(screen.getByTestId('verb-card-try')).getByText(/back, for/i);
    expect(subtitle).toHaveAttribute('title', ALL_TRY_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — try copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a try copy button when expanded', () => {
    renderPage();
    expandCard('try');
    expect(screen.getByRole('button', { name: /copy all "try" phrasal verbs/i })).toBeInTheDocument();
  });

  it('try copy button title is \'Copy all "try" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('try');
    expect(screen.getByRole('button', { name: /copy all "try" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "try" phrasal verbs');
  });

  it('clipboard receives all 6 try particles as "try X" forms in order', () => {
    renderPage();
    expandCard('try');
    fireEvent.click(screen.getByRole('button', { name: /copy all "try" phrasal verbs/i }));
    const expected = ALL_TRY_PARTICLES.map(p => `try ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every try particle', () => {
    renderPage();
    expandCard('try');
    fireEvent.click(screen.getByRole('button', { name: /copy all "try" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_TRY_PARTICLES) {
      expect(written).toContain(`try ${p}`);
    }
  });

  it('try copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('try');
    fireEvent.click(screen.getByRole('button', { name: /copy all "try" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Turn card', () => {
  it('renders the "Turn" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-turn')).toBeInTheDocument();
  });

  it('renders "Turn" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-turn')).getByText('Turn')).toBeInTheDocument();
  });

  it('"Turn" link points to /phrasal-verbs/list/turn', () => {
    renderPage();
    expandCard('turn');
    const link = within(screen.getByTestId('verb-card-turn')).getByRole('link', { name: /turn/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/turn');
  });

  it('shows turn particles text in subtitle after expand', () => {
    renderPage();
    expandCard('turn');
    expect(within(screen.getByTestId('verb-card-turn')).getByText(/about, against/i)).toBeInTheDocument();
  });

  it('turn subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('turn');
    const subtitle = within(screen.getByTestId('verb-card-turn')).getByText(/about, against/i);
    expect(subtitle).toHaveAttribute('title', ALL_TURN_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — turn copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a turn copy button when expanded', () => {
    renderPage();
    expandCard('turn');
    expect(screen.getByRole('button', { name: /copy all "turn" phrasal verbs/i })).toBeInTheDocument();
  });

  it('turn copy button title is \'Copy all "turn" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('turn');
    expect(screen.getByRole('button', { name: /copy all "turn" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "turn" phrasal verbs');
  });

  it('clipboard receives all 14 turn particles as "turn X" forms in order', () => {
    renderPage();
    expandCard('turn');
    fireEvent.click(screen.getByRole('button', { name: /copy all "turn" phrasal verbs/i }));
    const expected = ALL_TURN_PARTICLES.map(p => `turn ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every turn particle', () => {
    renderPage();
    expandCard('turn');
    fireEvent.click(screen.getByRole('button', { name: /copy all "turn" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_TURN_PARTICLES) {
      expect(written).toContain(`turn ${p}`);
    }
  });

  it('turn copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('turn');
    fireEvent.click(screen.getByRole('button', { name: /copy all "turn" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Use card', () => {
  it('renders the "Use" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-use')).toBeInTheDocument();
  });

  it('renders "Use" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-use')).getByText('Use')).toBeInTheDocument();
  });

  it('"Use" link points to /phrasal-verbs/list/use', () => {
    renderPage();
    expandCard('use');
    const link = within(screen.getByTestId('verb-card-use')).getByRole('link', { name: /use/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/use');
  });

  it('shows use particles text in subtitle after expand', () => {
    renderPage();
    expandCard('use');
    expect(within(screen.getByTestId('verb-card-use')).getByText(/against, to \/ used to/i)).toBeInTheDocument();
  });

  it('use subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('use');
    const subtitle = within(screen.getByTestId('verb-card-use')).getByText(/against, to \/ used to/i);
    expect(subtitle).toHaveAttribute('title', ALL_USE_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — use copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a use copy button when expanded', () => {
    renderPage();
    expandCard('use');
    expect(screen.getByRole('button', { name: /copy all "use" phrasal verbs/i })).toBeInTheDocument();
  });

  it('use copy button title is \'Copy all "use" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('use');
    expect(screen.getByRole('button', { name: /copy all "use" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "use" phrasal verbs');
  });

  it('clipboard receives all 3 use particles as "use X" forms in order', () => {
    renderPage();
    expandCard('use');
    fireEvent.click(screen.getByRole('button', { name: /copy all "use" phrasal verbs/i }));
    const expected = ALL_USE_PARTICLES.map(p => `use ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every use particle', () => {
    renderPage();
    expandCard('use');
    fireEvent.click(screen.getByRole('button', { name: /copy all "use" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_USE_PARTICLES) {
      expect(written).toContain(`use ${p}`);
    }
  });

  it('use copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('use');
    fireEvent.click(screen.getByRole('button', { name: /copy all "use" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Wake card', () => {
  it('renders the "Wake" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-wake')).toBeInTheDocument();
  });

  it('renders "Wake" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-wake')).getByText('Wake')).toBeInTheDocument();
  });

  it('"Wake" link points to /phrasal-verbs/list/wake', () => {
    renderPage();
    expandCard('wake');
    const link = within(screen.getByTestId('verb-card-wake')).getByRole('link', { name: /wake/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/wake');
  });

  it('shows wake particles text in subtitle after expand', () => {
    renderPage();
    expandCard('wake');
    expect(within(screen.getByTestId('verb-card-wake')).getByText(/to, up, up to/i)).toBeInTheDocument();
  });

  it('wake subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('wake');
    const subtitle = within(screen.getByTestId('verb-card-wake')).getByText(/to, up, up to/i);
    expect(subtitle).toHaveAttribute('title', ALL_WAKE_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — wake copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a wake copy button when expanded', () => {
    renderPage();
    expandCard('wake');
    expect(screen.getByRole('button', { name: /copy all "wake" phrasal verbs/i })).toBeInTheDocument();
  });

  it('wake copy button title is \'Copy all "wake" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('wake');
    expect(screen.getByRole('button', { name: /copy all "wake" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "wake" phrasal verbs');
  });

  it('clipboard receives all 3 wake particles as "wake X" forms in order', () => {
    renderPage();
    expandCard('wake');
    fireEvent.click(screen.getByRole('button', { name: /copy all "wake" phrasal verbs/i }));
    const expected = ALL_WAKE_PARTICLES.map(p => `wake ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every wake particle', () => {
    renderPage();
    expandCard('wake');
    fireEvent.click(screen.getByRole('button', { name: /copy all "wake" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_WAKE_PARTICLES) {
      expect(written).toContain(`wake ${p}`);
    }
  });

  it('wake copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('wake');
    fireEvent.click(screen.getByRole('button', { name: /copy all "wake" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Warm card', () => {
  it('renders the "Warm" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-warm')).toBeInTheDocument();
  });

  it('renders "Warm" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-warm')).getByText('Warm')).toBeInTheDocument();
  });

  it('"Warm" link points to /phrasal-verbs/list/warm', () => {
    renderPage();
    expandCard('warm');
    const link = within(screen.getByTestId('verb-card-warm')).getByRole('link', { name: /warm/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/warm');
  });

  it('shows warm particles text in subtitle after expand', () => {
    renderPage();
    expandCard('warm');
    expect(within(screen.getByTestId('verb-card-warm')).getByText(/down, over, through, to, up/i)).toBeInTheDocument();
  });

  it('warm subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('warm');
    const subtitle = within(screen.getByTestId('verb-card-warm')).getByText(/down, over, through, to, up/i);
    expect(subtitle).toHaveAttribute('title', ALL_WARM_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — warm copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a warm copy button when expanded', () => {
    renderPage();
    expandCard('warm');
    expect(screen.getByRole('button', { name: /copy all "warm" phrasal verbs/i })).toBeInTheDocument();
  });

  it('warm copy button title is \'Copy all "warm" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('warm');
    expect(screen.getByRole('button', { name: /copy all "warm" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "warm" phrasal verbs');
  });

  it('clipboard receives all 5 warm particles as "warm X" forms in order', () => {
    renderPage();
    expandCard('warm');
    fireEvent.click(screen.getByRole('button', { name: /copy all "warm" phrasal verbs/i }));
    const expected = ALL_WARM_PARTICLES.map(p => `warm ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every warm particle', () => {
    renderPage();
    expandCard('warm');
    fireEvent.click(screen.getByRole('button', { name: /copy all "warm" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_WARM_PARTICLES) {
      expect(written).toContain(`warm ${p}`);
    }
  });

  it('warm copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('warm');
    fireEvent.click(screen.getByRole('button', { name: /copy all "warm" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Watch card', () => {
  it('renders the "Watch" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-watch')).toBeInTheDocument();
  });

  it('renders "Watch" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-watch')).getByText('Watch')).toBeInTheDocument();
  });

  it('"Watch" link points to /phrasal-verbs/list/watch', () => {
    renderPage();
    expandCard('watch');
    const link = within(screen.getByTestId('verb-card-watch')).getByRole('link', { name: /watch/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/watch');
  });

  it('shows watch particles text in subtitle after expand', () => {
    renderPage();
    expandCard('watch');
    expect(within(screen.getByTestId('verb-card-watch')).getByText(/back, for, on, out, out for, over, through/i)).toBeInTheDocument();
  });

  it('watch subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('watch');
    const subtitle = within(screen.getByTestId('verb-card-watch')).getByText(/back, for, on, out, out for, over, through/i);
    expect(subtitle).toHaveAttribute('title', ALL_WATCH_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — watch copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a watch copy button when expanded', () => {
    renderPage();
    expandCard('watch');
    expect(screen.getByRole('button', { name: /copy all "watch" phrasal verbs/i })).toBeInTheDocument();
  });

  it('watch copy button title is \'Copy all "watch" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('watch');
    expect(screen.getByRole('button', { name: /copy all "watch" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "watch" phrasal verbs');
  });

  it('clipboard receives all 7 watch particles as "watch X" forms in order', () => {
    renderPage();
    expandCard('watch');
    fireEvent.click(screen.getByRole('button', { name: /copy all "watch" phrasal verbs/i }));
    const expected = ALL_WATCH_PARTICLES.map(p => `watch ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every watch particle', () => {
    renderPage();
    expandCard('watch');
    fireEvent.click(screen.getByRole('button', { name: /copy all "watch" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_WATCH_PARTICLES) {
      expect(written).toContain(`watch ${p}`);
    }
  });

  it('watch copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('watch');
    fireEvent.click(screen.getByRole('button', { name: /copy all "watch" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Wear card', () => {
  it('renders the "Wear" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-wear')).toBeInTheDocument();
  });

  it('renders "Wear" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-wear')).getByText('Wear')).toBeInTheDocument();
  });

  it('"Wear" link points to /phrasal-verbs/list/wear', () => {
    renderPage();
    expandCard('wear');
    const link = within(screen.getByTestId('verb-card-wear')).getByRole('link', { name: /wear/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/wear');
  });

  it('shows wear particles text in subtitle after expand', () => {
    renderPage();
    expandCard('wear');
    expect(within(screen.getByTestId('verb-card-wear')).getByText(/away, down, in, off, on, out, through/i)).toBeInTheDocument();
  });

  it('wear subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('wear');
    const subtitle = within(screen.getByTestId('verb-card-wear')).getByText(/away, down, in, off, on, out, through/i);
    expect(subtitle).toHaveAttribute('title', ALL_WEAR_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — wear copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a wear copy button when expanded', () => {
    renderPage();
    expandCard('wear');
    expect(screen.getByRole('button', { name: /copy all "wear" phrasal verbs/i })).toBeInTheDocument();
  });

  it('wear copy button title is \'Copy all "wear" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('wear');
    expect(screen.getByRole('button', { name: /copy all "wear" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "wear" phrasal verbs');
  });

  it('clipboard receives all 7 wear particles as "wear X" forms in order', () => {
    renderPage();
    expandCard('wear');
    fireEvent.click(screen.getByRole('button', { name: /copy all "wear" phrasal verbs/i }));
    const expected = ALL_WEAR_PARTICLES.map(p => `wear ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every wear particle', () => {
    renderPage();
    expandCard('wear');
    fireEvent.click(screen.getByRole('button', { name: /copy all "wear" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_WEAR_PARTICLES) {
      expect(written).toContain(`wear ${p}`);
    }
  });

  it('wear copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('wear');
    fireEvent.click(screen.getByRole('button', { name: /copy all "wear" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Work card', () => {
  it('renders the "Work" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-work')).toBeInTheDocument();
  });

  it('renders "Work" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-work')).getByText('Work')).toBeInTheDocument();
  });

  it('"Work" link points to /phrasal-verbs/list/work', () => {
    renderPage();
    expandCard('work');
    const link = within(screen.getByTestId('verb-card-work')).getByRole('link', { name: /work/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/work');
  });

  it('shows work particles text in subtitle after expand', () => {
    renderPage();
    expandCard('work');
    expect(within(screen.getByTestId('verb-card-work')).getByText(/against, ahead, around \/ round, away, back, down, for, in, into, off, on, out, over, through, to, together, up, with/i)).toBeInTheDocument();
  });

  it('work subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('work');
    const subtitle = within(screen.getByTestId('verb-card-work')).getByText(/against, ahead, around \/ round, away, back, down, for, in, into, off, on, out, over, through, to, together, up, with/i);
    expect(subtitle).toHaveAttribute('title', ALL_WORK_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — work copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a work copy button when expanded', () => {
    renderPage();
    expandCard('work');
    expect(screen.getByRole('button', { name: /copy all "work" phrasal verbs/i })).toBeInTheDocument();
  });

  it('work copy button title is \'Copy all "work" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('work');
    expect(screen.getByRole('button', { name: /copy all "work" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "work" phrasal verbs');
  });

  it('clipboard receives all 18 work particles as "work X" forms in order', () => {
    renderPage();
    expandCard('work');
    fireEvent.click(screen.getByRole('button', { name: /copy all "work" phrasal verbs/i }));
    const expected = ALL_WORK_PARTICLES.map(p => `work ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every work particle', () => {
    renderPage();
    expandCard('work');
    fireEvent.click(screen.getByRole('button', { name: /copy all "work" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_WORK_PARTICLES) {
      expect(written).toContain(`work ${p}`);
    }
  });

  it('work copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('work');
    fireEvent.click(screen.getByRole('button', { name: /copy all "work" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Write card', () => {
  it('renders the "Write" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-write')).toBeInTheDocument();
  });

  it('renders "Write" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-write')).getByText('Write')).toBeInTheDocument();
  });

  it('"Write" link points to /phrasal-verbs/list/write', () => {
    renderPage();
    expandCard('write');
    const link = within(screen.getByTestId('verb-card-write')).getByRole('link', { name: /write/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/write');
  });

  it('shows write particles text in subtitle after expand', () => {
    renderPage();
    expandCard('write');
    expect(within(screen.getByTestId('verb-card-write')).getByText(/about, against, around \/ round, away, back, down, for, in, into, off, on, out, over, through, to, up/i)).toBeInTheDocument();
  });

  it('write subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('write');
    const subtitle = within(screen.getByTestId('verb-card-write')).getByText(/about, against, around \/ round, away, back, down, for, in, into, off, on, out, over, through, to, up/i);
    expect(subtitle).toHaveAttribute('title', ALL_WRITE_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — write copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a write copy button when expanded', () => {
    renderPage();
    expandCard('write');
    expect(screen.getByRole('button', { name: /copy all "write" phrasal verbs/i })).toBeInTheDocument();
  });

  it('write copy button title is \'Copy all "write" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('write');
    expect(screen.getByRole('button', { name: /copy all "write" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "write" phrasal verbs');
  });

  it('clipboard receives all 16 write particles as "write X" forms in order', () => {
    renderPage();
    expandCard('write');
    fireEvent.click(screen.getByRole('button', { name: /copy all "write" phrasal verbs/i }));
    const expected = ALL_WRITE_PARTICLES.map(p => `write ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every write particle', () => {
    renderPage();
    expandCard('write');
    fireEvent.click(screen.getByRole('button', { name: /copy all "write" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_WRITE_PARTICLES) {
      expect(written).toContain(`write ${p}`);
    }
  });

  it('write copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('write');
    fireEvent.click(screen.getByRole('button', { name: /copy all "write" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Zip card', () => {
  it('renders the "Zip" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-zip')).toBeInTheDocument();
  });

  it('renders "Zip" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-zip')).getByText('Zip')).toBeInTheDocument();
  });

  it('"Zip" link points to /phrasal-verbs/list/zip', () => {
    renderPage();
    expandCard('zip');
    const link = within(screen.getByTestId('verb-card-zip')).getByRole('link', { name: /zip/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/zip');
  });

  it('shows zip particles text in subtitle after expand', () => {
    renderPage();
    expandCard('zip');
    expect(within(screen.getByTestId('verb-card-zip')).getByText(/about \/ around \/ round, across, ahead, apart, away, back, by, down, in, into, off, on, out, over, through, to, together, up/i)).toBeInTheDocument();
  });

  it('zip subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('zip');
    const subtitle = within(screen.getByTestId('verb-card-zip')).getByText(/about \/ around \/ round, across, ahead, apart, away, back, by, down, in, into, off, on, out, over, through, to, together, up/i);
    expect(subtitle).toHaveAttribute('title', ALL_ZIP_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — zip copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a zip copy button when expanded', () => {
    renderPage();
    expandCard('zip');
    expect(screen.getByRole('button', { name: /copy all "zip" phrasal verbs/i })).toBeInTheDocument();
  });

  it('zip copy button title is \'Copy all "zip" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('zip');
    expect(screen.getByRole('button', { name: /copy all "zip" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "zip" phrasal verbs');
  });

  it('clipboard receives all 18 zip particles as "zip X" forms in order', () => {
    renderPage();
    expandCard('zip');
    fireEvent.click(screen.getByRole('button', { name: /copy all "zip" phrasal verbs/i }));
    const expected = ALL_ZIP_PARTICLES.map(p => `zip ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every zip particle', () => {
    renderPage();
    expandCard('zip');
    fireEvent.click(screen.getByRole('button', { name: /copy all "zip" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_ZIP_PARTICLES) {
      expect(written).toContain(`zip ${p}`);
    }
  });

  it('zip copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('zip');
    fireEvent.click(screen.getByRole('button', { name: /copy all "zip" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

