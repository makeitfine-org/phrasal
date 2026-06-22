import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ParticlesPage, { PARTICLE_NAMES } from '../pages/particles/ParticlesPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <ParticlesPage />
    </MemoryRouter>
  );
}

describe('ParticlesPage', () => {
  it('renders "Particles" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Particles' })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    renderPage();
    expect(screen.getByText('Core meanings of the most common phrasal verb particles')).toBeInTheDocument();
  });

  it('renders all 27 particle names', () => {
    renderPage();
    for (const name of PARTICLE_NAMES) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });

  it('renders description for "off"', () => {
    renderPage();
    expect(screen.getByText(/Indicates breaking contact between two things/i)).toBeInTheDocument();
  });

  it('renders description for "into"', () => {
    renderPage();
    expect(screen.getByText(/Transformation, deep entry, intense investigation/i)).toBeInTheDocument();
  });

  it('renders description for "along"', () => {
    renderPage();
    expect(screen.getByText(/Indicates either forward movement\/progress, accompaniment/i)).toBeInTheDocument();
  });

  it('renders description for "against"', () => {
    renderPage();
    expect(screen.getByText(/Opposition, physical contact or leaning/i)).toBeInTheDocument();
  });
});
