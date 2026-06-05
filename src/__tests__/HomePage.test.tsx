import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PhrasalVerbsPage from '../pages/PhrasalVerbsPage';
import App from '../App';

vi.mock('../data/phrasalVerbs', () => ({
  allVerbs: [
    { verb: 'Act out', definition: 'To perform', sentences: ['They acted out the scene.'], wordsToHide: ['acted out'] },
  ],
}));

vi.mock('../utils/renderSentence', () => ({
  renderSentenceWithMask: vi.fn((sentence: string) => <span>{sentence}</span>),
}));

beforeEach(() => {
  localStorage.clear();
});

describe('HomePage', () => {
  function renderHomePage() {
    return render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  }

  it('renders "English Tutorial" heading', () => {
    renderHomePage();
    expect(screen.getByRole('heading', { name: 'English Tutorial' })).toBeInTheDocument();
  });

  it('renders the Phrasal Verbs link card', () => {
    renderHomePage();
    expect(screen.getByRole('heading', { name: 'Phrasal Verbs' })).toBeInTheDocument();
  });

  it('Phrasal Verbs link points to /phrasal-verbs', () => {
    renderHomePage();
    const link = screen.getByRole('link', { name: /Phrasal Verbs/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs');
  });

  it('renders the subtitle text', () => {
    renderHomePage();
    expect(screen.getByText('Choose an exercise to practice')).toBeInTheDocument();
  });

  it('renders the Grammar link card', () => {
    renderHomePage();
    expect(screen.getByRole('heading', { name: 'Grammar' })).toBeInTheDocument();
  });

  it('Grammar link points to /grammar', () => {
    renderHomePage();
    const link = screen.getByRole('link', { name: /Grammar/i });
    expect(link).toHaveAttribute('href', '/grammar');
  });
});

describe('Routing smoke tests', () => {
  function renderRoutes(initialPath: string) {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phrasal-verbs" element={<PhrasalVerbsPage />} />
          <Route path="/phrasal-verbs/test-most-popular" element={<App />} />
        </Routes>
      </MemoryRouter>
    );
  }

  it('/ renders the HomePage with "English Tutorial" heading', () => {
    renderRoutes('/');
    expect(screen.getByRole('heading', { name: 'English Tutorial' })).toBeInTheDocument();
  });

  it('/phrasal-verbs renders the PhrasalVerbsPage hub', () => {
    renderRoutes('/phrasal-verbs');
    expect(screen.getByRole('heading', { name: 'Phrasal Verbs' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Test most popular/i })).toBeInTheDocument();
  });

  it('/phrasal-verbs/test-most-popular renders the quiz', () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({
      mastered: [],
      excluded: [],
      history: [{ index: 0, inputValue: '', status: 'idle' }],
      currentIndex: 0,
      darkMode: false,
    }));
    renderRoutes('/phrasal-verbs/test-most-popular');
    expect(screen.getByPlaceholderText('Type phrasal verb')).toBeInTheDocument();
  });
});
