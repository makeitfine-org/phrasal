import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
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
});

describe('Routing smoke tests', () => {
  function renderRoutes(initialPath: string) {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phrasal-verbs" element={<App />} />
        </Routes>
      </MemoryRouter>
    );
  }

  it('/ renders the HomePage with "English Tutorial" heading', () => {
    renderRoutes('/');
    expect(screen.getByRole('heading', { name: 'English Tutorial' })).toBeInTheDocument();
  });

  it('/phrasal-verbs renders the App component', () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({
      mastered: [],
      excluded: [],
      history: [{ index: 0, inputValue: '', status: 'idle' }],
      currentIndex: 0,
      darkMode: false,
    }));
    renderRoutes('/phrasal-verbs');
    expect(screen.getByText('Phrasal Verbs')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type phrasal verb')).toBeInTheDocument();
  });
});
