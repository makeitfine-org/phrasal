import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

vi.mock('../data/phrasalVerbs', () => ({
  allVerbs: [
    { verb: 'Act out',   definition: 'To perform',  sentences: ['They acted out the scene.'], wordsToHide: ['acted out'] },
    { verb: 'Break out', definition: 'To escape',   sentences: ['A riot broke out.'],          wordsToHide: ['broke out'] },
    { verb: 'Call up',   definition: 'To phone',    sentences: ['I called up the office.'],    wordsToHide: ['called up'] },
  ],
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

function renderApp() {
  return render(<App />);
}

// Helper: get the visible input
function getInput() {
  return screen.getByPlaceholderText('Type phrasal verb');
}

describe('App — initial render', () => {
  it('renders without crashing when localStorage is empty', () => {
    renderApp();
    expect(screen.getByText('Phrasal Verbs')).toBeInTheDocument();
  });

  it('shows a verb definition after bootstrapping', () => {
    renderApp();
    // With Math.random() = 0, first remaining index is 0 → 'Act out'
    expect(screen.getByText('To perform')).toBeInTheDocument();
  });

  it('shows question 1 on first load', () => {
    renderApp();
    expect(screen.getByTestId('question-number')).toHaveTextContent('1');
  });

  it('restores mastered count from localStorage on mount', () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({
      mastered: [0, 1],
      excluded: [],
      history: [{ index: 2, inputValue: '', status: 'idle' }],
      currentIndex: 0,
      darkMode: false,
    }));
    renderApp();
    expect(screen.getByTestId('mastered-count')).toHaveTextContent('2');
  });

});

describe('App — handleSubmit', () => {
  it('marks status "correct" on a case-insensitive exact match', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(getInput(), 'act out');
    await user.click(screen.getByText('Check'));
    expect(screen.getByText('Excellent!')).toBeInTheDocument();
  });

  it('marks status "correct" when parentheses are stripped from input', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(getInput(), 'Act (out)');
    await user.click(screen.getByText('Check'));
    expect(screen.getByText('Excellent!')).toBeInTheDocument();
  });

  it('marks status "wrong" on an incorrect answer', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(getInput(), 'wrong answer');
    await user.click(screen.getByText('Check'));
    expect(screen.getByText('Not quite!')).toBeInTheDocument();
  });

  it('does not submit when input is blank', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByText('Check'));
    expect(screen.queryByText('Excellent!')).not.toBeInTheDocument();
    expect(screen.queryByText('Not quite!')).not.toBeInTheDocument();
  });

  it('does not re-submit when status is already "correct"', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(getInput(), 'act out');
    await user.click(screen.getByText('Check'));
    expect(screen.getByText('Excellent!')).toBeInTheDocument();
    expect(screen.queryByText('Not quite!')).not.toBeInTheDocument();
  });

  it('increments mastered count in Header after correct answer', async () => {
    const user = userEvent.setup();
    renderApp();
    expect(screen.getByTestId('mastered-count')).toHaveTextContent('0');
    await user.type(getInput(), 'act out');
    await user.click(screen.getByText('Check'));
    expect(screen.getByTestId('mastered-count')).toHaveTextContent('1');
  });

  it('does not increment mastered count after wrong answer', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(getInput(), 'wrong');
    await user.click(screen.getByText('Check'));
    expect(screen.getByTestId('mastered-count')).toHaveTextContent('0');
  });
});

describe('App — handleIdk', () => {
  it('sets status to "wrong" when IDK is clicked', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByText('IDK'));
    expect(screen.getByText('Not quite!')).toBeInTheDocument();
  });

  it('shows the correct verb in Feedback after IDK', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByText('IDK'));
    expect(screen.getByText('Act out')).toBeInTheDocument();
  });
});

describe('App — resetState', () => {
  it('clears status and input back to idle when Reset is clicked', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByText('IDK'));
    expect(screen.getByText('Not quite!')).toBeInTheDocument();
    await user.click(screen.getByText('Reset').closest('button')!);
    expect(screen.queryByText('Not quite!')).not.toBeInTheDocument();
    expect(getInput()).not.toBeDisabled();
  });

  it('Reset button is disabled when status is "idle"', () => {
    renderApp();
    expect(screen.getByText('Reset').closest('button')).toBeDisabled();
  });

  it('Reset button is enabled when status is "correct"', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(getInput(), 'act out');
    await user.click(screen.getByText('Check'));
    expect(screen.getByText('Reset').closest('button')).not.toBeDisabled();
  });

  it('removes verb from mastered when Reset is clicked after a correct answer', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(getInput(), 'act out');
    await user.click(screen.getByText('Check'));
    expect(screen.getByTestId('mastered-count')).toHaveTextContent('1');
    await user.click(screen.getByText('Reset').closest('button')!);
    expect(screen.getByTestId('mastered-count')).toHaveTextContent('0');
  });
});

describe('App — navigation', () => {
  it('Prev button is disabled at the first card', () => {
    renderApp();
    expect(screen.getByTitle('Previous Question')).toBeDisabled();
  });

  it('Next (history forward) button is disabled when at last card and no remaining', async () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({
      mastered: [],
      excluded: [],
      history: [
        { index: 0, inputValue: '', status: 'idle' },
        { index: 1, inputValue: '', status: 'idle' },
        { index: 2, inputValue: '', status: 'idle' },
      ],
      currentIndex: 2,
      darkMode: false,
    }));
    renderApp();
    expect(screen.getByTitle('Next / History Forward')).toBeDisabled();
  });

  it('navigates back to previous card when Prev is clicked', async () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({
      mastered: [],
      excluded: [],
      history: [
        { index: 0, inputValue: '', status: 'idle' },
        { index: 1, inputValue: '', status: 'idle' },
      ],
      currentIndex: 1,
      darkMode: false,
    }));
    const user = userEvent.setup();
    renderApp();
    expect(screen.getByText('To escape')).toBeInTheDocument();
    await user.click(screen.getByTitle('Previous Question'));
    expect(screen.getByText('To perform')).toBeInTheDocument();
  });

  it('navigates forward within history when Next (history) is clicked', async () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({
      mastered: [],
      excluded: [],
      history: [
        { index: 0, inputValue: '', status: 'idle' },
        { index: 1, inputValue: '', status: 'idle' },
      ],
      currentIndex: 0,
      darkMode: false,
    }));
    const user = userEvent.setup();
    renderApp();
    expect(screen.getByText('To perform')).toBeInTheDocument();
    await user.click(screen.getByTitle('Next / History Forward'));
    expect(screen.getByText('To escape')).toBeInTheDocument();
  });

});

describe('App — handleToggleExclude / handleIncludeVerb', () => {
  it('shows the excluded badge count in Header after excluding', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByText('Exclude'));
    const excludedBtn = screen.getByTitle('View excluded verbs');
    expect(within(excludedBtn).getByText('1')).toBeInTheDocument();
  });

  it('removes the excluded verb from badge when included via ExcludedModal', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByText('Exclude'));
    await user.click(screen.getByTitle('View excluded verbs'));
    await user.click(screen.getByText('Include'));
    const excludedBtn = screen.getByTitle('View excluded verbs');
    expect(within(excludedBtn).queryByText('1')).not.toBeInTheDocument();
  });
});

describe('App — handleGlobalReset', () => {
  it('clears state and localStorage after confirming reset', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const user = userEvent.setup();
    renderApp();
    await user.type(getInput(), 'act out');
    await user.click(screen.getByText('Check'));
    expect(screen.getByTestId('mastered-count')).toHaveTextContent('1');

    await user.click(screen.getByTitle('Global Reset - Clear all progress'));
    expect(screen.getByTestId('mastered-count')).toHaveTextContent('0');
    const saved = JSON.parse(localStorage.getItem('phrasalQuizState')!);
    expect(saved.mastered).toEqual([]);
    expect(saved.excluded).toEqual([]);
  });

  it('does not reset when user cancels the confirm dialog', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const user = userEvent.setup();
    renderApp();
    await user.type(getInput(), 'act out');
    await user.click(screen.getByText('Check'));
    await user.click(screen.getByTitle('Global Reset - Clear all progress'));
    expect(screen.getByTestId('mastered-count')).toHaveTextContent('1');
  });
});

describe('App — StrictMode bootstrap guard', () => {
  function renderStrict() {
    return render(<React.StrictMode><App /></React.StrictMode>);
  }

  it('shows question 1, not 2, on fresh load under StrictMode', () => {
    renderStrict();
    expect(screen.getByTestId('question-number')).toHaveTextContent('1');
  });

  it('persists exactly one card to history on fresh load under StrictMode', () => {
    renderStrict();
    const saved = JSON.parse(localStorage.getItem('phrasalQuizState')!);
    expect(saved.history).toHaveLength(1);
  });

  it('re-bootstraps with exactly one card after global reset under StrictMode', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const user = userEvent.setup();
    renderStrict();
    await user.click(screen.getByTitle('Global Reset - Clear all progress'));
    expect(screen.getByTestId('question-number')).toHaveTextContent('1');
    const saved = JSON.parse(localStorage.getItem('phrasalQuizState')!);
    expect(saved.history).toHaveLength(1);
  });
});

describe('App — localStorage persistence', () => {
  it('persists mastered Set to localStorage after a correct answer', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(getInput(), 'act out');
    await user.click(screen.getByText('Check'));
    const saved = JSON.parse(localStorage.getItem('phrasalQuizState')!);
    expect(saved.mastered).toContain(0);
  });

  it('persists currentIndex to localStorage after navigation', async () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({
      mastered: [], excluded: [],
      history: [
        { index: 0, inputValue: '', status: 'idle' },
        { index: 1, inputValue: '', status: 'idle' },
      ],
      currentIndex: 0, darkMode: false,
    }));
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTitle('Next / History Forward'));
    const saved = JSON.parse(localStorage.getItem('phrasalQuizState')!);
    expect(saved.currentIndex).toBe(1);
  });
});

describe('App — keyboard shortcuts', () => {
  it('Escape sets status to "wrong" when status is "idle"', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.keyboard('{Escape}');
    expect(screen.getByText('Not quite!')).toBeInTheDocument();
  });

  it('ArrowRight advances to a new card when at end of history', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('question-number')).toHaveTextContent('2');
  });

  it('ArrowLeft navigates to previous card', async () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({
      mastered: [], excluded: [],
      history: [
        { index: 0, inputValue: '', status: 'idle' },
        { index: 1, inputValue: '', status: 'idle' },
      ],
      currentIndex: 1, darkMode: false,
    }));
    const user = userEvent.setup();
    renderApp();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByText('To perform')).toBeInTheDocument();
  });

  it('Enter key advances to next card when status is not "idle"', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.keyboard('{Escape}'); // sets status to wrong
    await user.keyboard('{Enter}');
    expect(screen.getByTestId('question-number')).toHaveTextContent('2');
  });

  it('Backtick key resets current card when status is not "idle"', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.keyboard('{Escape}'); // status → wrong
    await user.keyboard('`');
    expect(screen.queryByText('Not quite!')).not.toBeInTheDocument();
  });

  it('keyboard shortcuts are ignored when ExcludedModal is open', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTitle('View excluded verbs'));
    await user.keyboard('{Escape}');
    expect(screen.queryByText('Not quite!')).not.toBeInTheDocument();
  });

  it('keyboard shortcuts are ignored when SearchModal is open', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTitle('Search phrasal verbs'));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('question-number')).toHaveTextContent('1');
  });
});

describe('App — modals', () => {
  it('opens ExcludedModal when excluded button in Header is clicked', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTitle('View excluded verbs'));
    expect(screen.getByText(/Excluded Verbs/)).toBeInTheDocument();
  });

  it('closes ExcludedModal when Escape is pressed', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTitle('View excluded verbs'));
    await user.keyboard('{Escape}');
    expect(screen.queryByText(/Excluded Verbs/)).not.toBeInTheDocument();
  });

  it('opens SearchModal when search button in Header is clicked', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTitle('Search phrasal verbs'));
    expect(screen.getByPlaceholderText('Search phrasal verbs...')).toBeInTheDocument();
  });

  it('closes SearchModal when Escape is pressed', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTitle('Search phrasal verbs'));
    await user.keyboard('{Escape}');
    expect(screen.queryByPlaceholderText('Search phrasal verbs...')).not.toBeInTheDocument();
  });

  it('handleJumpToVerb: jumps to an in-history entry when verb already visited', async () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({
      mastered: [], excluded: [],
      history: [
        { index: 0, inputValue: '', status: 'idle' },
        { index: 1, inputValue: '', status: 'idle' },
      ],
      currentIndex: 1, darkMode: false,
    }));
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTitle('Search phrasal verbs'));
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'Act out');
    await user.click(screen.getByText('Act out').closest('li')!);
    expect(screen.getByText('To perform')).toBeInTheDocument();
    expect(screen.getByTestId('question-number')).toHaveTextContent('1');
  });

  it('handleJumpToVerb: appends new history entry for not-yet-seen verb', async () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({
      mastered: [], excluded: [],
      history: [{ index: 0, inputValue: '', status: 'idle' }],
      currentIndex: 0, darkMode: false,
    }));
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTitle('Search phrasal verbs'));
    await user.type(screen.getByPlaceholderText('Search phrasal verbs...'), 'Break out');
    await user.click(screen.getByText('Break out').closest('li')!);
    expect(screen.getByText('To escape')).toBeInTheDocument();
    expect(screen.getByTestId('question-number')).toHaveTextContent('2');
  });
});

