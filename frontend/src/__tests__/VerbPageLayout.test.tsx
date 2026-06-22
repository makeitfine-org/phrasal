import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import VerbPageLayout, { type SectionData } from '../components/VerbPage';

const sections: SectionData[] = [
  {
    particle: 'up',
    storageKey: 'test_verb_up',
    storageKeyPrefix: 'test_verb_up',
    meanings: [
      { definition: 'To increase', example: 'Turn up the volume.', imageSrc: '/default.png', imageAlt: 'alt' },
      { definition: 'To appear', example: 'She turned up late.', imageSrc: '/default.png', imageAlt: 'alt' },
    ],
  },
  {
    particle: 'down',
    storageKey: 'test_verb_down',
    storageKeyPrefix: 'test_verb_down',
    meanings: [
      { definition: 'To reduce', example: 'Turn down the heat.', imageSrc: '/default.png', imageAlt: 'alt' },
    ],
  },
];

beforeEach(() => {
  localStorage.clear();
  document.getElementById('verb-page-actions')?.remove();
  const portal = document.createElement('div');
  portal.id = 'verb-page-actions';
  document.body.appendChild(portal);
});

function renderLayout() {
  return render(
    <MemoryRouter>
      <VerbPageLayout title="Test Verb" sections={sections} />
    </MemoryRouter>
  );
}

describe('VerbPageLayout — section headers', () => {
  it('section header has role="button"', () => {
    renderLayout();
    const headers = screen.getAllByRole('button', { name: /up|down/i });
    expect(headers.length).toBeGreaterThanOrEqual(2);
  });

  it('section header has aria-expanded="false" when collapsed', () => {
    renderLayout();
    const header = screen.getByRole('button', { name: /up/i });
    expect(header).toHaveAttribute('aria-expanded', 'false');
  });

  it('section header toggles to aria-expanded="true" on click', async () => {
    const user = userEvent.setup();
    renderLayout();
    const header = screen.getByRole('button', { name: /up/i });
    await user.click(header);
    expect(header).toHaveAttribute('aria-expanded', 'true');
  });

  it('section header toggles on Enter key', async () => {
    const user = userEvent.setup();
    renderLayout();
    const header = screen.getByRole('button', { name: /up/i });
    header.focus();
    await user.keyboard('{Enter}');
    expect(header).toHaveAttribute('aria-expanded', 'true');
  });

  it('section header toggles on Space key', async () => {
    const user = userEvent.setup();
    renderLayout();
    const header = screen.getByRole('button', { name: /up/i });
    header.focus();
    await user.keyboard(' ');
    expect(header).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('VerbPageLayout — meaning cards', () => {
  it('meaning card has aria-expanded="false" when collapsed by default', async () => {
    const user = userEvent.setup();
    renderLayout();
    const sectionHeader = screen.getByRole('button', { name: /up/i });
    await user.click(sectionHeader);

    const meaningCards = screen.getAllByRole('button', { name: /To increase|To appear/i });
    expect(meaningCards[0]).toHaveAttribute('aria-expanded', 'false');
  });

  it('meaning card toggles aria-expanded on click', async () => {
    const user = userEvent.setup();
    renderLayout();
    const sectionHeader = screen.getByRole('button', { name: /up/i });
    await user.click(sectionHeader);

    const meaningCard = screen.getByRole('button', { name: /To increase/i });
    await user.click(meaningCard);
    expect(meaningCard).toHaveAttribute('aria-expanded', 'true');
  });

  it('meaning card toggles on Enter key', async () => {
    const user = userEvent.setup();
    renderLayout();
    const sectionHeader = screen.getByRole('button', { name: /up/i });
    await user.click(sectionHeader);

    const meaningCard = screen.getByRole('button', { name: /To increase/i });
    meaningCard.focus();
    await user.keyboard('{Enter}');
    expect(meaningCard).toHaveAttribute('aria-expanded', 'true');
  });

  it('meaning card toggles on Space key', async () => {
    const user = userEvent.setup();
    renderLayout();
    const sectionHeader = screen.getByRole('button', { name: /up/i });
    await user.click(sectionHeader);

    const meaningCard = screen.getByRole('button', { name: /To increase/i });
    meaningCard.focus();
    await user.keyboard(' ');
    expect(meaningCard).toHaveAttribute('aria-expanded', 'true');
  });
});
