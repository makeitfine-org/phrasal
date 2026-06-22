import { screen, within, fireEvent } from '@testing-library/react';
import { setupPortal, renderPage, expandCard, ALL_PARTICLES, ALL_DEAL_PARTICLES, ALL_DO_PARTICLES, ALL_DRESS_PARTICLES, ALL_DROP_PARTICLES, ALL_EAT_PARTICLES, ALL_FALL_PARTICLES, ALL_FIGURE_PARTICLES, ALL_FILL_PARTICLES, ALL_FIND_PARTICLES } from './helpers';

setupPortal();

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
      configurable: true,
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
      configurable: true,
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
      configurable: true,
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
      configurable: true,
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
      configurable: true,
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
      configurable: true,
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
      configurable: true,
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

describe('PhrasalVerbsListPage — Fill card', () => {
  it('renders the "Fill" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Fill' })).toBeInTheDocument();
  });

  it('"Fill" link points to /phrasal-verbs/list/fill', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Fill$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/fill');
  });
});

describe('PhrasalVerbsListPage — Fill particles subtitle', () => {
  it('shows fill particles text in subtitle after expand', () => {
    renderPage();
    expandCard('fill');
    expect(within(screen.getByTestId('verb-card-fill')).getByText(/down, in, out, up, with/i)).toBeInTheDocument();
  });

  it('fill subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('fill');
    const subtitle = within(screen.getByTestId('verb-card-fill')).getByText(/down, in, out, up, with/i);
    expect(subtitle).toHaveAttribute('title', ALL_FILL_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — fill copy button', () => {
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

  it('renders a fill copy button when expanded', () => {
    renderPage();
    expandCard('fill');
    expect(screen.getByRole('button', { name: /copy all "fill" phrasal verbs/i })).toBeInTheDocument();
  });

  it('fill copy button title is \'Copy all "fill" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('fill');
    expect(screen.getByRole('button', { name: /copy all "fill" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "fill" phrasal verbs');
  });

  it('clipboard receives all 5 fill particles as "fill X" forms in order', () => {
    renderPage();
    expandCard('fill');
    fireEvent.click(screen.getByRole('button', { name: /copy all "fill" phrasal verbs/i }));
    const expected = ALL_FILL_PARTICLES.map(p => `fill ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every fill particle', () => {
    renderPage();
    expandCard('fill');
    fireEvent.click(screen.getByRole('button', { name: /copy all "fill" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_FILL_PARTICLES) {
      expect(written).toContain(`fill ${p}`);
    }
  });

  it('fill copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('fill');
    fireEvent.click(screen.getByRole('button', { name: /copy all "fill" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Find card', () => {
  it('renders the "Find" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Find' })).toBeInTheDocument();
  });

  it('"Find" link points to /phrasal-verbs/list/find', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /^Find$/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/find');
  });
});

describe('PhrasalVerbsListPage — Find particles subtitle', () => {
  it('shows find particles text in subtitle after expand', () => {
    renderPage();
    expandCard('find');
    expect(within(screen.getByTestId('verb-card-find')).getByText(/out, for, against/i)).toBeInTheDocument();
  });

  it('find subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('find');
    const subtitle = within(screen.getByTestId('verb-card-find')).getByText(/out, for, against/i);
    expect(subtitle).toHaveAttribute('title', ALL_FIND_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — find copy button', () => {
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

  it('renders a find copy button when expanded', () => {
    renderPage();
    expandCard('find');
    expect(screen.getByRole('button', { name: /copy all "find" phrasal verbs/i })).toBeInTheDocument();
  });

  it('find copy button title is \'Copy all "find" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('find');
    expect(screen.getByRole('button', { name: /copy all "find" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "find" phrasal verbs');
  });

  it('clipboard receives all 3 find particles as "find X" forms in order', () => {
    renderPage();
    expandCard('find');
    fireEvent.click(screen.getByRole('button', { name: /copy all "find" phrasal verbs/i }));
    const expected = ALL_FIND_PARTICLES.map(p => `find ${p}`).join(', ');
    expect(mockWriteText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every find particle', () => {
    renderPage();
    expandCard('find');
    fireEvent.click(screen.getByRole('button', { name: /copy all "find" phrasal verbs/i }));
    const written = mockWriteText.mock.calls[0][0] as string;
    for (const p of ALL_FIND_PARTICLES) {
      expect(written).toContain(`find ${p}`);
    }
  });

  it('find copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('find');
    fireEvent.click(screen.getByRole('button', { name: /copy all "find" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

