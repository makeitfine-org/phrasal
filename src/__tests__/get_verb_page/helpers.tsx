import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GetVerbPage from '../../pages/get/GetVerbPage';

export function renderPage() {
  return render(
    <MemoryRouter>
      <GetVerbPage />
    </MemoryRouter>
  );
}

export function getCard(definitionPattern: RegExp) {
  return screen.getByText(definitionPattern).closest('[class*="rounded-2xl"]')!;
}

export function getSection(particle: string) {
  return screen.getByText(particle).closest('[class*="mb-5"]')!;
}

export function expandSection(particle: string) {
  fireEvent.click(screen.getByText(particle));
}
