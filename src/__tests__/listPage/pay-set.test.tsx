import { screen, within, fireEvent } from '@testing-library/react';
import { setupPortal, renderPage, expandCard, ALL_PAY_PARTICLES, ALL_PICK_PARTICLES, ALL_POINT_PARTICLES, ALL_PULL_PARTICLES, ALL_RUN_PARTICLES, ALL_SET_PARTICLES } from './helpers';

setupPortal();

describe('PhrasalVerbsListPage — Pay card', () => {
  it('renders the "Pay" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-pay')).toBeInTheDocument();
  });

  it('renders "Pay" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-pay')).getByText('Pay')).toBeInTheDocument();
  });

  it('"Pay" link points to /phrasal-verbs/list/pay', () => {
    renderPage();
    expandCard('pay');
    const link = within(screen.getByTestId('verb-card-pay')).getByRole('link', { name: /pay/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/pay');
  });

  it('shows pay particles text in subtitle after expand', () => {
    renderPage();
    expandCard('pay');
    expect(within(screen.getByTestId('verb-card-pay')).getByText(/off, up/i)).toBeInTheDocument();
  });

  it('pay subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('pay');
    const subtitle = within(screen.getByTestId('verb-card-pay')).getByText(/off, up/i);
    expect(subtitle).toHaveAttribute('title', ALL_PAY_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — pay copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  it('renders a pay copy button when expanded', () => {
    renderPage();
    expandCard('pay');
    expect(screen.getByRole('button', { name: /copy all "pay" phrasal verbs/i })).toBeInTheDocument();
  });

  it('pay copy button title is \'Copy all "pay" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('pay');
    expect(screen.getByRole('button', { name: /copy all "pay" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "pay" phrasal verbs');
  });

  it('clipboard receives all 10 pay particles as "pay X" forms in order', () => {
    renderPage();
    expandCard('pay');
    fireEvent.click(screen.getByRole('button', { name: /copy all "pay" phrasal verbs/i }));
    const expected = ALL_PAY_PARTICLES.map(p => `pay ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every pay particle', () => {
    renderPage();
    expandCard('pay');
    fireEvent.click(screen.getByRole('button', { name: /copy all "pay" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_PAY_PARTICLES) {
      expect(written).toContain(`pay ${p}`);
    }
  });

  it('pay copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('pay');
    fireEvent.click(screen.getByRole('button', { name: /copy all "pay" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Pick card', () => {
  it('renders the "Pick" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-pick')).toBeInTheDocument();
  });

  it('renders "Pick" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-pick')).getByText('Pick')).toBeInTheDocument();
  });

  it('"Pick" link points to /phrasal-verbs/list/pick', () => {
    renderPage();
    expandCard('pick');
    const link = within(screen.getByTestId('verb-card-pick')).getByRole('link', { name: /pick/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/pick');
  });

  it('shows pick particles text in subtitle after expand', () => {
    renderPage();
    expandCard('pick');
    expect(within(screen.getByTestId('verb-card-pick')).getByText(/apart, away/i)).toBeInTheDocument();
  });

  it('pick subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('pick');
    const subtitle = within(screen.getByTestId('verb-card-pick')).getByText(/apart, away/i);
    expect(subtitle).toHaveAttribute('title', ALL_PICK_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — pick copy button', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  it('renders a pick copy button when expanded', () => {
    renderPage();
    expandCard('pick');
    expect(screen.getByRole('button', { name: /copy all "pick" phrasal verbs/i })).toBeInTheDocument();
  });

  it('pick copy button title is \'Copy all "pick" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('pick');
    expect(screen.getByRole('button', { name: /copy all "pick" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "pick" phrasal verbs');
  });

  it('clipboard receives all 8 pick particles as "pick X" forms in order', () => {
    renderPage();
    expandCard('pick');
    fireEvent.click(screen.getByRole('button', { name: /copy all "pick" phrasal verbs/i }));
    const expected = ALL_PICK_PARTICLES.map(p => `pick ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every pick particle', () => {
    renderPage();
    expandCard('pick');
    fireEvent.click(screen.getByRole('button', { name: /copy all "pick" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_PICK_PARTICLES) {
      expect(written).toContain(`pick ${p}`);
    }
  });

  it('pick copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('pick');
    fireEvent.click(screen.getByRole('button', { name: /copy all "pick" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Point card', () => {
  it('renders the "Point" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-point')).toBeInTheDocument();
  });

  it('renders "Point" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-point')).getByText('Point')).toBeInTheDocument();
  });

  it('"Point" link points to /phrasal-verbs/list/point', () => {
    renderPage();
    expandCard('point');
    const link = within(screen.getByTestId('verb-card-point')).getByRole('link', { name: /point/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/point');
  });

  it('shows point particles text in subtitle after expand', () => {
    renderPage();
    expandCard('point');
    expect(within(screen.getByTestId('verb-card-point')).getByText(/ahead \/ forward, back/i)).toBeInTheDocument();
  });

  it('point subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('point');
    const subtitle = within(screen.getByTestId('verb-card-point')).getByText(/ahead \/ forward, back/i);
    expect(subtitle).toHaveAttribute('title', ALL_POINT_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — point copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a point copy button when expanded', () => {
    renderPage();
    expandCard('point');
    expect(screen.getByRole('button', { name: /copy all "point" phrasal verbs/i })).toBeInTheDocument();
  });

  it('point copy button title is \'Copy all "point" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('point');
    expect(screen.getByRole('button', { name: /copy all "point" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "point" phrasal verbs');
  });

  it('clipboard receives all 6 point particles as "point X" forms in order', () => {
    renderPage();
    expandCard('point');
    fireEvent.click(screen.getByRole('button', { name: /copy all "point" phrasal verbs/i }));
    const expected = ALL_POINT_PARTICLES.map(p => `point ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every point particle', () => {
    renderPage();
    expandCard('point');
    fireEvent.click(screen.getByRole('button', { name: /copy all "point" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_POINT_PARTICLES) {
      expect(written).toContain(`point ${p}`);
    }
  });

  it('point copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('point');
    fireEvent.click(screen.getByRole('button', { name: /copy all "point" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Pull card', () => {
  it('renders the "Pull" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-pull')).toBeInTheDocument();
  });

  it('renders "Pull" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-pull')).getByText('Pull')).toBeInTheDocument();
  });

  it('"Pull" link points to /phrasal-verbs/list/pull', () => {
    renderPage();
    expandCard('pull');
    const link = within(screen.getByTestId('verb-card-pull')).getByRole('link', { name: /pull/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/pull');
  });

  it('shows pull particles text in subtitle after expand', () => {
    renderPage();
    expandCard('pull');
    expect(within(screen.getByTestId('verb-card-pull')).getByText(/about, ahead/i)).toBeInTheDocument();
  });

  it('pull subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('pull');
    const subtitle = within(screen.getByTestId('verb-card-pull')).getByText(/about, ahead/i);
    expect(subtitle).toHaveAttribute('title', ALL_PULL_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — pull copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a pull copy button when expanded', () => {
    renderPage();
    expandCard('pull');
    expect(screen.getByRole('button', { name: /copy all "pull" phrasal verbs/i })).toBeInTheDocument();
  });

  it('pull copy button title is \'Copy all "pull" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('pull');
    expect(screen.getByRole('button', { name: /copy all "pull" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "pull" phrasal verbs');
  });

  it('clipboard receives all 20 pull particles as "pull X" forms in order', () => {
    renderPage();
    expandCard('pull');
    fireEvent.click(screen.getByRole('button', { name: /copy all "pull" phrasal verbs/i }));
    const expected = ALL_PULL_PARTICLES.map(p => `pull ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every pull particle', () => {
    renderPage();
    expandCard('pull');
    fireEvent.click(screen.getByRole('button', { name: /copy all "pull" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_PULL_PARTICLES) {
      expect(written).toContain(`pull ${p}`);
    }
  });

  it('pull copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('pull');
    fireEvent.click(screen.getByRole('button', { name: /copy all "pull" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Run card', () => {
  it('renders the "Run" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-run')).toBeInTheDocument();
  });

  it('renders "Run" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-run')).getByText('Run')).toBeInTheDocument();
  });

  it('"Run" link points to /phrasal-verbs/list/run', () => {
    renderPage();
    expandCard('run');
    const link = within(screen.getByTestId('verb-card-run')).getByRole('link', { name: /run/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/run');
  });

  it('shows run particles text in subtitle after expand', () => {
    renderPage();
    expandCard('run');
    expect(within(screen.getByTestId('verb-card-run')).getByText(/about \/ around \/ round, across/i)).toBeInTheDocument();
  });

  it('run subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('run');
    const subtitle = within(screen.getByTestId('verb-card-run')).getByText(/about \/ around \/ round, across/i);
    expect(subtitle).toHaveAttribute('title', ALL_RUN_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — run copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a run copy button when expanded', () => {
    renderPage();
    expandCard('run');
    expect(screen.getByRole('button', { name: /copy all "run" phrasal verbs/i })).toBeInTheDocument();
  });

  it('run copy button title is \'Copy all "run" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('run');
    expect(screen.getByRole('button', { name: /copy all "run" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "run" phrasal verbs');
  });

  it('clipboard receives all 23 run particles as "run X" forms in order', () => {
    renderPage();
    expandCard('run');
    fireEvent.click(screen.getByRole('button', { name: /copy all "run" phrasal verbs/i }));
    const expected = ALL_RUN_PARTICLES.map(p => `run ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every run particle', () => {
    renderPage();
    expandCard('run');
    fireEvent.click(screen.getByRole('button', { name: /copy all "run" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_RUN_PARTICLES) {
      expect(written).toContain(`run ${p}`);
    }
  });

  it('run copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('run');
    fireEvent.click(screen.getByRole('button', { name: /copy all "run" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Set card', () => {
  it('renders the "Set" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-set')).toBeInTheDocument();
  });

  it('renders "Set" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-set')).getByText('Set')).toBeInTheDocument();
  });

  it('"Set" link points to /phrasal-verbs/list/set', () => {
    renderPage();
    expandCard('set');
    const link = within(screen.getByTestId('verb-card-set')).getByRole('link', { name: /set/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/set');
  });

  it('shows set particles text in subtitle after expand', () => {
    renderPage();
    expandCard('set');
    expect(within(screen.getByTestId('verb-card-set')).getByText(/about, against/i)).toBeInTheDocument();
  });

  it('set subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('set');
    const subtitle = within(screen.getByTestId('verb-card-set')).getByText(/about, against/i);
    expect(subtitle).toHaveAttribute('title', ALL_SET_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — set copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a set copy button when expanded', () => {
    renderPage();
    expandCard('set');
    expect(screen.getByRole('button', { name: /copy all "set" phrasal verbs/i })).toBeInTheDocument();
  });

  it('set copy button title is \'Copy all "set" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('set');
    expect(screen.getByRole('button', { name: /copy all "set" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "set" phrasal verbs');
  });

  it('clipboard receives all 14 set particles as "set X" forms in order', () => {
    renderPage();
    expandCard('set');
    fireEvent.click(screen.getByRole('button', { name: /copy all "set" phrasal verbs/i }));
    const expected = ALL_SET_PARTICLES.map(p => `set ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every set particle', () => {
    renderPage();
    expandCard('set');
    fireEvent.click(screen.getByRole('button', { name: /copy all "set" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_SET_PARTICLES) {
      expect(written).toContain(`set ${p}`);
    }
  });

  it('set copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('set');
    fireEvent.click(screen.getByRole('button', { name: /copy all "set" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

