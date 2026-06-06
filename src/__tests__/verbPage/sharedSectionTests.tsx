import { screen, fireEvent, within } from '@testing-library/react';

export function describeSectionToggle(
  label: string,
  particle: string,
  storageKey: string,
  firstDef: RegExp,
  renderPage: () => void
) {
  describe(`${label} — "${particle}" section toggle`, () => {
    it(`renders "${particle}" section toggle`, () => {
      renderPage();
      expect(screen.getByText(particle)).toBeInTheDocument();
    });

    it(`"${particle}" section starts collapsed`, () => {
      renderPage();
      expect(screen.queryByText(firstDef)).not.toBeInTheDocument();
    });

    it(`clicking "${particle}" expands meaning cards`, () => {
      renderPage();
      fireEvent.click(screen.getByText(particle));
      expect(screen.getByText(firstDef)).toBeInTheDocument();
    });

    it(`clicking "${particle}" twice collapses meaning cards`, () => {
      renderPage();
      fireEvent.click(screen.getByText(particle));
      fireEvent.click(screen.getByText(particle));
      expect(screen.queryByText(firstDef)).not.toBeInTheDocument();
    });

    it(`saves "${particle}" section state to localStorage when expanded`, () => {
      renderPage();
      fireEvent.click(screen.getByText(particle));
      expect(localStorage.getItem(storageKey)).toBe('true');
    });

    it(`restores "${particle}" section collapsed state from localStorage`, () => {
      localStorage.setItem(storageKey, 'false');
      renderPage();
      expect(screen.queryByText(firstDef)).not.toBeInTheDocument();
    });
  });
}

export function describeChevronAndColour(
  label: string,
  particle: string,
  renderPage: () => void
) {
  describe(`${label} — "${particle}" chevron and colour`, () => {
    it(`${particle} chevron is ▶ character`, () => {
      renderPage();
      const header = screen.getByText(particle).closest('div')!;
      expect(within(header).getByText('▶')).toBeInTheDocument();
    });

    it(`${particle} chevron has rotate-90 class when expanded`, () => {
      renderPage();
      fireEvent.click(screen.getByText(particle));
      const header = screen.getByText(particle).closest('div')!;
      expect(within(header).getByText('▶')).toHaveClass('rotate-90');
    });

    it(`${particle} chevron does not have rotate-90 class when collapsed`, () => {
      renderPage();
      const header = screen.getByText(particle).closest('div')!;
      expect(within(header).getByText('▶')).not.toHaveClass('rotate-90');
    });

    it(`${particle} chevron regains rotate-90 class when re-expanded`, () => {
      renderPage();
      fireEvent.click(screen.getByText(particle));
      fireEvent.click(screen.getByText(particle));
      fireEvent.click(screen.getByText(particle));
      const header = screen.getByText(particle).closest('div')!;
      expect(within(header).getByText('▶')).toHaveClass('rotate-90');
    });

    it(`${particle} chevron is blue when collapsed`, () => {
      renderPage();
      const header = screen.getByText(particle).closest('div')!;
      expect(within(header).getByText('▶')).toHaveClass('text-blue-600');
    });

    it(`${particle} chevron is white when expanded`, () => {
      renderPage();
      fireEvent.click(screen.getByText(particle));
      const header = screen.getByText(particle).closest('div')!;
      expect(within(header).getByText('▶')).toHaveClass('text-white');
    });

    it(`${particle} particle text is blue when collapsed`, () => {
      renderPage();
      expect(screen.getByText(particle)).toHaveClass('text-blue-600');
    });

    it(`${particle} particle text is white when expanded`, () => {
      renderPage();
      fireEvent.click(screen.getByText(particle));
      expect(screen.getByText(particle)).toHaveClass('text-white');
    });
  });
}
