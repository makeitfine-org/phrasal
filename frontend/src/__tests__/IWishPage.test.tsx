import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IWishPage from '../pages/IWishPage';

vi.mock('../hooks/useGrammarEntries', () => ({
  useGrammarEntries: () => ({
    entries: [
      {
        sentence: 'Жаль, что я не прочитал документацию',
        correctAnswers: ['I wish I had read the documentation'],
      },
      {
        sentence: 'Я бы хотел, чтобы компьютер работал быстрее',
        correctAnswers: ['I wish my computer would work faster'],
      },
      {
        sentence: 'Если бы только я не удалил файл!',
        correctAnswers: [
          "If only I hadn't deleted the file",
          "I wish I hadn't deleted the file",
        ],
      },
    ],
    loading: false,
    error: null,
  }),
}));

vi.mock('../utils/renderSentence', () => ({
  renderSentenceWithMask: vi.fn((sentence: string) => <span>{sentence}</span>),
}));

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(Math, 'random').mockReturnValue(0);
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderPage() {
  return render(<IWishPage />);
}

function getInput() {
  return screen.getByPlaceholderText('Type phrasal verb');
}

describe('IWishPage — initial render', () => {
  it('renders "I wish / If only" heading', () => {
    renderPage();
    expect(screen.getByText('I wish / If only')).toBeInTheDocument();
  });

  it('shows the Russian sentence as the quiz prompt', () => {
    renderPage();
    expect(screen.getByText('Жаль, что я не прочитал документацию')).toBeInTheDocument();
  });

  it('shows question 1 on first load', () => {
    renderPage();
    expect(screen.getByTestId('question-number')).toHaveTextContent('1');
  });

  it('restores state from grammarIWishState localStorage key', () => {
    localStorage.setItem('grammarIWishState', JSON.stringify({
      mastered: [0, 1],
      excluded: [],
      history: [{ index: 2, inputValue: '', status: 'idle' }],
      currentIndex: 0,
    }));
    renderPage();
    expect(screen.getByTestId('mastered-count')).toHaveTextContent('2');
  });
});

describe('IWishPage — answer checking', () => {
  it('marks correct when answer matches ignoring punctuation', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.type(getInput(), 'I wish I had read the documentation.');
    await user.click(screen.getByText('Check'));
    expect(screen.getByText('Excellent!')).toBeInTheDocument();
  });

  it('marks correct when answer matches ignoring casing', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.type(getInput(), 'i wish i had read the documentation');
    await user.click(screen.getByText('Check'));
    expect(screen.getByText('Excellent!')).toBeInTheDocument();
  });

  it('marks wrong for an incorrect answer and shows first correct answer', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.type(getInput(), 'I wish I had written better code');
    await user.click(screen.getByText('Check'));
    expect(screen.getByText('Not quite!')).toBeInTheDocument();
    expect(screen.getByText('I wish I had read the documentation')).toBeInTheDocument();
  });

  it('accepts the second correct answer for a multi-answer entry', async () => {
    const user = userEvent.setup();
    // Pre-load state with the third entry (index 2) as current
    localStorage.setItem('grammarIWishState', JSON.stringify({
      mastered: [],
      excluded: [],
      history: [{ index: 2, inputValue: '', status: 'idle' }],
      currentIndex: 0,
    }));
    renderPage();
    await user.type(getInput(), "I wish I hadn't deleted the file");
    await user.click(screen.getByText('Check'));
    expect(screen.getByText('Excellent!')).toBeInTheDocument();
  });
});

describe('IWishPage — Header button labels', () => {
  it('Search button has title "Search by sentences"', () => {
    renderPage();
    expect(screen.getByTitle('Search by sentences')).toBeInTheDocument();
  });

  it('Excluded button has title "View excluded sentences"', () => {
    renderPage();
    expect(screen.getByTitle('View excluded sentences')).toBeInTheDocument();
  });

  it('Tutorial button has title "Tutorial"', () => {
    renderPage();
    expect(screen.getByTitle('Tutorial')).toBeInTheDocument();
  });
});

describe('IWishPage — SearchModal label', () => {
  it('opens SearchModal with "Search by sentences..." placeholder', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByTitle('Search by sentences'));
    expect(screen.getByPlaceholderText('Search by sentences...')).toBeInTheDocument();
  });
});

describe('IWishPage — ExcludedModal label', () => {
  it('shows "Excluded Sentences (0)" heading in ExcludedModal', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByTitle('View excluded sentences'));
    expect(screen.getByText('Excluded Sentences (0)')).toBeInTheDocument();
  });

  it('shows "No sentences are currently excluded." empty state', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByTitle('View excluded sentences'));
    expect(screen.getByText('No sentences are currently excluded.')).toBeInTheDocument();
  });
});

describe('IWishPage — localStorage persistence', () => {
  it('persists state to grammarIWishState key', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.type(getInput(), 'I wish I had read the documentation');
    await user.click(screen.getByText('Check'));
    const saved = JSON.parse(localStorage.getItem('grammarIWishState') || '{}');
    expect(saved.mastered).toContain(0);
  });

  it('does not write to phrasalQuizState key', () => {
    renderPage();
    expect(localStorage.getItem('phrasalQuizState')).toBeNull();
  });
});
