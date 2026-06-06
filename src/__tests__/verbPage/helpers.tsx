import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export function createVerbPageHelpers(PageComponent: React.ComponentType) {
  function renderPage() {
    return render(<MemoryRouter><PageComponent /></MemoryRouter>);
  }
  function getCard(definitionPattern: RegExp) {
    return screen.getByText(definitionPattern).closest('[class*="rounded-2xl"]') as HTMLElement;
  }
  function getSection(particle: string) {
    return screen.getByText(particle).closest('[class*="mb-5"]')!;
  }
  function expandSection(particle: string) {
    fireEvent.click(screen.getByText(particle));
  }
  return { renderPage, getCard, getSection, expandSection };
}
