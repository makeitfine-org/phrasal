import { screen, within, fireEvent } from '@testing-library/react';
import { setupPortal, renderPage, expandCard, ALL_SETTLE_PARTICLES, ALL_SHOW_PARTICLES, ALL_SHUT_PARTICLES, ALL_SIT_PARTICLES, ALL_STAND_PARTICLES, ALL_STICK_PARTICLES, ALL_TALK_PARTICLES } from './helpers';

setupPortal();

describe('PhrasalVerbsListPage — Settle card', () => {
  it('renders the "Settle" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-settle')).toBeInTheDocument();
  });

  it('renders "Settle" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-settle')).getByText('Settle')).toBeInTheDocument();
  });

  it('"Settle" link points to /phrasal-verbs/list/settle', () => {
    renderPage();
    expandCard('settle');
    const link = within(screen.getByTestId('verb-card-settle')).getByRole('link', { name: /settle/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/settle');
  });

  it('shows settle particles text in subtitle after expand', () => {
    renderPage();
    expandCard('settle');
    expect(within(screen.getByTestId('verb-card-settle')).getByText(/back, down/i)).toBeInTheDocument();
  });

  it('settle subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('settle');
    const subtitle = within(screen.getByTestId('verb-card-settle')).getByText(/back, down/i);
    expect(subtitle).toHaveAttribute('title', ALL_SETTLE_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — settle copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a settle copy button when expanded', () => {
    renderPage();
    expandCard('settle');
    expect(screen.getByRole('button', { name: /copy all "settle" phrasal verbs/i })).toBeInTheDocument();
  });

  it('settle copy button title is \'Copy all "settle" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('settle');
    expect(screen.getByRole('button', { name: /copy all "settle" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "settle" phrasal verbs');
  });

  it('clipboard receives all 11 settle particles as "settle X" forms in order', () => {
    renderPage();
    expandCard('settle');
    fireEvent.click(screen.getByRole('button', { name: /copy all "settle" phrasal verbs/i }));
    const expected = ALL_SETTLE_PARTICLES.map(p => `settle ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every settle particle', () => {
    renderPage();
    expandCard('settle');
    fireEvent.click(screen.getByRole('button', { name: /copy all "settle" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    for (const p of ALL_SETTLE_PARTICLES) {
      expect(written).toContain(`settle ${p}`);
    }
  });

  it('settle copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('settle');
    fireEvent.click(screen.getByRole('button', { name: /copy all "settle" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Show card', () => {
  it('renders the "Show" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-show')).toBeInTheDocument();
  });

  it('renders "Show" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-show')).getByText('Show')).toBeInTheDocument();
  });

  it('"Show" link points to /phrasal-verbs/list/show', () => {
    renderPage();
    expandCard('show');
    const link = within(screen.getByTestId('verb-card-show')).getByRole('link', { name: /show/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/show');
  });

  it('shows show particles text in subtitle after expand', () => {
    renderPage();
    expandCard('show');
    expect(within(screen.getByTestId('verb-card-show')).getByText(/around \/ round \/ about, down/i)).toBeInTheDocument();
  });

  it('show subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('show');
    const subtitle = within(screen.getByTestId('verb-card-show')).getByText(/around \/ round \/ about, down/i);
    expect(subtitle).toHaveAttribute('title', ALL_SHOW_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — show copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a show copy button when expanded', () => {
    renderPage();
    expandCard('show');
    expect(screen.getByRole('button', { name: /copy all "show" phrasal verbs/i })).toBeInTheDocument();
  });

  it('show copy button title is \'Copy all "show" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('show');
    expect(screen.getByRole('button', { name: /copy all "show" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "show" phrasal verbs');
  });

  it('clipboard receives all 10 show particles as "show X" forms in order', () => {
    renderPage();
    expandCard('show');
    fireEvent.click(screen.getByRole('button', { name: /copy all "show" phrasal verbs/i }));
    const expected = ALL_SHOW_PARTICLES.map(p => `show ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every show particle', () => {
    renderPage();
    expandCard('show');
    fireEvent.click(screen.getByRole('button', { name: /copy all "show" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_SHOW_PARTICLES) {
      expect(written).toContain(`show ${p}`);
    }
  });

  it('show copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('show');
    fireEvent.click(screen.getByRole('button', { name: /copy all "show" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Shut card', () => {
  it('renders the "Shut" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-shut')).toBeInTheDocument();
  });

  it('renders "Shut" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-shut')).getByText('Shut')).toBeInTheDocument();
  });

  it('"Shut" link points to /phrasal-verbs/list/shut', () => {
    renderPage();
    expandCard('shut');
    const link = within(screen.getByTestId('verb-card-shut')).getByRole('link', { name: /shut/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/shut');
  });

  it('shows shut particles text in subtitle after expand', () => {
    renderPage();
    expandCard('shut');
    expect(within(screen.getByTestId('verb-card-shut')).getByText(/away, down/i)).toBeInTheDocument();
  });

  it('shut subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('shut');
    const subtitle = within(screen.getByTestId('verb-card-shut')).getByText(/away, down/i);
    expect(subtitle).toHaveAttribute('title', ALL_SHUT_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — shut copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a shut copy button when expanded', () => {
    renderPage();
    expandCard('shut');
    expect(screen.getByRole('button', { name: /copy all "shut" phrasal verbs/i })).toBeInTheDocument();
  });

  it('shut copy button title is \'Copy all "shut" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('shut');
    expect(screen.getByRole('button', { name: /copy all "shut" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "shut" phrasal verbs');
  });

  it('clipboard receives all 6 shut particles as "shut X" forms in order', () => {
    renderPage();
    expandCard('shut');
    fireEvent.click(screen.getByRole('button', { name: /copy all "shut" phrasal verbs/i }));
    const expected = ALL_SHUT_PARTICLES.map(p => `shut ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every shut particle', () => {
    renderPage();
    expandCard('shut');
    fireEvent.click(screen.getByRole('button', { name: /copy all "shut" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_SHUT_PARTICLES) {
      expect(written).toContain(`shut ${p}`);
    }
  });

  it('shut copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('shut');
    fireEvent.click(screen.getByRole('button', { name: /copy all "shut" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Sit card', () => {
  it('renders the "Sit" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-sit')).toBeInTheDocument();
  });

  it('renders "Sit" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-sit')).getByText('Sit')).toBeInTheDocument();
  });

  it('"Sit" link points to /phrasal-verbs/list/sit', () => {
    renderPage();
    expandCard('sit');
    const link = within(screen.getByTestId('verb-card-sit')).getByRole('link', { name: /sit/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/sit');
  });

  it('shows sit particles text in subtitle after expand', () => {
    renderPage();
    expandCard('sit');
    expect(within(screen.getByTestId('verb-card-sit')).getByText(/about \/ around \/ round, back/i)).toBeInTheDocument();
  });

  it('sit subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('sit');
    const subtitle = within(screen.getByTestId('verb-card-sit')).getByText(/about \/ around \/ round, back/i);
    expect(subtitle).toHaveAttribute('title', ALL_SIT_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — sit copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a sit copy button when expanded', () => {
    renderPage();
    expandCard('sit');
    expect(screen.getByRole('button', { name: /copy all "sit" phrasal verbs/i })).toBeInTheDocument();
  });

  it('sit copy button title is \'Copy all "sit" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('sit');
    expect(screen.getByRole('button', { name: /copy all "sit" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "sit" phrasal verbs');
  });

  it('clipboard receives all 12 sit particles as "sit X" forms in order', () => {
    renderPage();
    expandCard('sit');
    fireEvent.click(screen.getByRole('button', { name: /copy all "sit" phrasal verbs/i }));
    const expected = ALL_SIT_PARTICLES.map(p => `sit ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every sit particle', () => {
    renderPage();
    expandCard('sit');
    fireEvent.click(screen.getByRole('button', { name: /copy all "sit" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_SIT_PARTICLES) {
      expect(written).toContain(`sit ${p}`);
    }
  });

  it('sit copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('sit');
    fireEvent.click(screen.getByRole('button', { name: /copy all "sit" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Stand card', () => {
  it('renders the "Stand" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-stand')).toBeInTheDocument();
  });

  it('renders "Stand" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-stand')).getByText('Stand')).toBeInTheDocument();
  });

  it('"Stand" link points to /phrasal-verbs/list/stand', () => {
    renderPage();
    expandCard('stand');
    const link = within(screen.getByTestId('verb-card-stand')).getByRole('link', { name: /stand/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/stand');
  });

  it('shows stand particles text in subtitle after expand', () => {
    renderPage();
    expandCard('stand');
    expect(within(screen.getByTestId('verb-card-stand')).getByText(/about \/ around, against/i)).toBeInTheDocument();
  });

  it('stand subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('stand');
    const subtitle = within(screen.getByTestId('verb-card-stand')).getByText(/about \/ around, against/i);
    expect(subtitle).toHaveAttribute('title', ALL_STAND_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — stand copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a stand copy button when expanded', () => {
    renderPage();
    expandCard('stand');
    expect(screen.getByRole('button', { name: /copy all "stand" phrasal verbs/i })).toBeInTheDocument();
  });

  it('stand copy button title is \'Copy all "stand" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('stand');
    expect(screen.getByRole('button', { name: /copy all "stand" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "stand" phrasal verbs');
  });

  it('clipboard receives all 19 stand particles as "stand X" forms in order', () => {
    renderPage();
    expandCard('stand');
    fireEvent.click(screen.getByRole('button', { name: /copy all "stand" phrasal verbs/i }));
    const expected = ALL_STAND_PARTICLES.map(p => `stand ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every stand particle', () => {
    renderPage();
    expandCard('stand');
    fireEvent.click(screen.getByRole('button', { name: /copy all "stand" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_STAND_PARTICLES) {
      expect(written).toContain(`stand ${p}`);
    }
  });

  it('stand copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('stand');
    fireEvent.click(screen.getByRole('button', { name: /copy all "stand" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Stick card', () => {
  it('renders the "Stick" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-stick')).toBeInTheDocument();
  });

  it('renders "Stick" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-stick')).getByText('Stick')).toBeInTheDocument();
  });

  it('"Stick" link points to /phrasal-verbs/list/stick', () => {
    renderPage();
    expandCard('stick');
    const link = within(screen.getByTestId('verb-card-stick')).getByRole('link', { name: /stick/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/stick');
  });

  it('shows stick particles text in subtitle after expand', () => {
    renderPage();
    expandCard('stick');
    expect(within(screen.getByTestId('verb-card-stick')).getByText(/about \/ around, away/i)).toBeInTheDocument();
  });

  it('stick subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('stick');
    const subtitle = within(screen.getByTestId('verb-card-stick')).getByText(/about \/ around, away/i);
    expect(subtitle).toHaveAttribute('title', ALL_STICK_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — stick copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a stick copy button when expanded', () => {
    renderPage();
    expandCard('stick');
    expect(screen.getByRole('button', { name: /copy all "stick" phrasal verbs/i })).toBeInTheDocument();
  });

  it('stick copy button title is \'Copy all "stick" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('stick');
    expect(screen.getByRole('button', { name: /copy all "stick" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "stick" phrasal verbs');
  });

  it('clipboard receives all 11 stick particles as "stick X" forms in order', () => {
    renderPage();
    expandCard('stick');
    fireEvent.click(screen.getByRole('button', { name: /copy all "stick" phrasal verbs/i }));
    const expected = ALL_STICK_PARTICLES.map(p => `stick ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every stick particle', () => {
    renderPage();
    expandCard('stick');
    fireEvent.click(screen.getByRole('button', { name: /copy all "stick" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_STICK_PARTICLES) {
      expect(written).toContain(`stick ${p}`);
    }
  });

  it('stick copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('stick');
    fireEvent.click(screen.getByRole('button', { name: /copy all "stick" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

describe('PhrasalVerbsListPage — Talk card', () => {
  it('renders the "Talk" card', () => {
    renderPage();
    expect(screen.getByTestId('verb-card-talk')).toBeInTheDocument();
  });

  it('renders "Talk" heading', () => {
    renderPage();
    expect(within(screen.getByTestId('verb-card-talk')).getByText('Talk')).toBeInTheDocument();
  });

  it('"Talk" link points to /phrasal-verbs/list/talk', () => {
    renderPage();
    expandCard('talk');
    const link = within(screen.getByTestId('verb-card-talk')).getByRole('link', { name: /talk/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/talk');
  });

  it('shows talk particles text in subtitle after expand', () => {
    renderPage();
    expandCard('talk');
    expect(within(screen.getByTestId('verb-card-talk')).getByText(/about, across, against/i)).toBeInTheDocument();
  });

  it('talk subtitle title attribute contains all particles', () => {
    renderPage();
    expandCard('talk');
    const subtitle = within(screen.getByTestId('verb-card-talk')).getByText(/about, across, against/i);
    expect(subtitle).toHaveAttribute('title', ALL_TALK_PARTICLES.join(', '));
  });
});

describe('PhrasalVerbsListPage — talk copy button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it('renders a talk copy button when expanded', () => {
    renderPage();
    expandCard('talk');
    expect(screen.getByRole('button', { name: /copy all "talk" phrasal verbs/i })).toBeInTheDocument();
  });

  it('talk copy button title is \'Copy all "talk" phrasal verbs\' before click', () => {
    renderPage();
    expandCard('talk');
    expect(screen.getByRole('button', { name: /copy all "talk" phrasal verbs/i }))
      .toHaveAttribute('title', 'Copy all "talk" phrasal verbs');
  });

  it('clipboard receives all 17 talk particles as "talk X" forms in order', () => {
    renderPage();
    expandCard('talk');
    fireEvent.click(screen.getByRole('button', { name: /copy all "talk" phrasal verbs/i }));
    const expected = ALL_TALK_PARTICLES.map(p => `talk ${p}`).join(', ');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it('clipboard content contains every talk particle', () => {
    renderPage();
    expandCard('talk');
    fireEvent.click(screen.getByRole('button', { name: /copy all "talk" phrasal verbs/i }));
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const p of ALL_TALK_PARTICLES) {
      expect(written).toContain(`talk ${p}`);
    }
  });

  it('talk copy button shows "Copied!" title after click', async () => {
    renderPage();
    expandCard('talk');
    fireEvent.click(screen.getByRole('button', { name: /copy all "talk" phrasal verbs/i }));
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i }))
        .toHaveAttribute('title', 'Copied!');
    });
  });
});

