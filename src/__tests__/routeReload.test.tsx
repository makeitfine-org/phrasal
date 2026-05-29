import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import PageShell from '../components/PageShell';

vi.mock('../data/phrasalVerbs', () => ({
  allVerbs: [
    { verb: 'Act out', definition: 'To perform', sentences: ['They acted out the scene.'], wordsToHide: ['acted out'] },
  ],
}));

vi.mock('../utils/renderSentence', () => ({
  renderSentenceWithMask: vi.fn((sentence: string) => <span>{sentence}</span>),
}));

// Mirrors the full route tree defined in main.tsx.
function renderApp(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route element={<PageShell><Outlet /></PageShell>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/phrasal-verbs" element={<App />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('Page reload — router renders correct page, no console errors', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy  = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('reload / renders the home page', () => {
    renderApp('/');
    expect(screen.getByRole('heading', { name: 'English Tutorial' })).toBeInTheDocument();
  });

  it('reload / produces no console errors or warnings', () => {
    renderApp('/');
    expect(errorSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('reload /phrasal-verbs renders the quiz page', () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({
      mastered: [], excluded: [],
      history: [{ index: 0, inputValue: '', status: 'idle' }],
      currentIndex: 0, darkMode: false,
    }));
    renderApp('/phrasal-verbs');
    expect(screen.getByPlaceholderText('Type phrasal verb')).toBeInTheDocument();
  });

  it('reload /phrasal-verbs produces no console errors or warnings', () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({
      mastered: [], excluded: [],
      history: [{ index: 0, inputValue: '', status: 'idle' }],
      currentIndex: 0, darkMode: false,
    }));
    renderApp('/phrasal-verbs');
    expect(errorSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('reload / shows no back-to-Home button', () => {
    renderApp('/');
    expect(screen.queryByTitle('Move to Home page')).not.toBeInTheDocument();
  });

  it('reload /phrasal-verbs shows the back-to-Home button', () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({
      mastered: [], excluded: [],
      history: [{ index: 0, inputValue: '', status: 'idle' }],
      currentIndex: 0, darkMode: false,
    }));
    renderApp('/phrasal-verbs');
    expect(screen.getByTitle('Move to Home page')).toBeInTheDocument();
  });
});
