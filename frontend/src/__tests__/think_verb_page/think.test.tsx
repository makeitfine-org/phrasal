import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'ThinkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('ThinkVerbPage — "about" section definitions', () => {
  it('renders definition for considering a person, thing, or idea', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To consider a person, thing, or idea/i)).toBeInTheDocument();
  });

  it('renders definition for holding a specific view or belief', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To hold a specific view or belief regarding a topic\./i)).toBeInTheDocument();
  });

  it('renders definition for recalling a memory', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To recall a memory or picture something in your mind\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about');
    const defs = [
      screen.getByText(/To consider a person, thing, or idea/i),
      screen.getByText(/To hold a specific view or belief regarding a topic\./i),
      screen.getByText(/To recall a memory or picture something in your mind\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To consider a person, thing, or idea/i)).toHaveAttribute(
      'title',
      'To consider a person, thing, or idea — to spend time examining an idea or focusing your mind on someone or something.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To hold a specific view or belief regarding a topic\./i)).toHaveAttribute(
      'title',
      'To hold a specific view or belief regarding a topic.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To recall a memory or picture something in your mind\./i)).toHaveAttribute(
      'title',
      'To recall a memory or picture something in your mind.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'thinkAbout_section_expanded', /To consider a person, thing, or idea/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'thinkAbout', /To consider a person, thing, or idea/i, /Give me a few days to think about your proposal\./i, renderPage, getCard);

// --- ahead ---

describe('ThinkVerbPage — "ahead" section definitions', () => {
  it('renders definition for considering the future to be prepared', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To consider what might happen in the future so that you are prepared\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To consider what might happen in the future so that you are prepared\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To consider what might happen in the future so that you are prepared\./i)).toHaveAttribute(
      'title',
      'To consider what might happen in the future so that you are prepared.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'thinkAhead_section_expanded', /To consider what might happen in the future so that you are prepared\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'thinkAhead', /To consider what might happen in the future so that you are prepared\./i, /Good managers always think ahead to avoid potential problems\./i, renderPage, getCard);

// --- around_round ---

describe('ThinkVerbPage — "around / round" section definitions', () => {
  it('renders definition for considering every perspective to find a solution', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To consider a situation or problem from every possible perspective/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To consider a situation or problem from every possible perspective/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To consider a situation or problem from every possible perspective/i)).toHaveAttribute(
      'title',
      'To consider a situation or problem from every possible perspective in order to find a solution.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'thinkAround_section_expanded', /To consider a situation or problem from every possible perspective/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'thinkAround', /To consider a situation or problem from every possible perspective/i, /The team needs to think around this issue to find a creative fix\./i, renderPage, getCard);

// --- back ---

describe('ThinkVerbPage — "back" section definitions', () => {
  it('renders definition for focusing on past events', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To focus your mind on events that have already happened\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To focus your mind on events that have already happened\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To focus your mind on events that have already happened\./i)).toHaveAttribute(
      'title',
      'To focus your mind on events that have already happened.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'thinkBack_section_expanded', /To focus your mind on events that have already happened\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'thinkBack', /To focus your mind on events that have already happened\./i, /When I think back to my first job, I realize how much I have learned\./i, renderPage, getCard);

// --- for ---

describe('ThinkVerbPage — "for" section definitions', () => {
  it('renders definition for forming your own opinions', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To form your own opinions and make your own choices/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To form your own opinions and make your own choices/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To form your own opinions and make your own choices/i)).toHaveAttribute(
      'title',
      'To form your own opinions and make your own choices, rather than letting others decide for you (think for yourself).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'thinkFor_section_expanded', /To form your own opinions and make your own choices/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'thinkFor', /To form your own opinions and make your own choices/i, /A good leader encourages their team to think for themselves\./i, renderPage, getCard);

// --- on ---

describe('ThinkVerbPage — "on" section definitions', () => {
  it('renders definition for spending time considering something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To spend time considering something/i)).toBeInTheDocument();
  });

  it('renders definition for keeping something in mind', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To keep in mind or remember/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/To spend time considering something/i),
      screen.getByText(/To keep in mind or remember/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To spend time considering something/i)).toHaveAttribute(
      'title',
      'To spend time considering something — similar to "think about," meaning to reflect on a decision or idea.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To keep in mind or remember/i)).toHaveAttribute(
      'title',
      'To keep in mind or remember (mainly British/informal).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'thinkOn_section_expanded', /To spend time considering something/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'thinkOn', /To spend time considering something/i, /It is a strong offer, but I need to think on it for a few days\./i, renderPage, getCard);

// --- out ---

describe('ThinkVerbPage — "out" section definitions', () => {
  it('renders definition for planning something completely from start to finish', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To plan something completely and carefully from start to finish\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To plan something completely and carefully from start to finish\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To plan something completely and carefully from start to finish\./i)).toHaveAttribute(
      'title',
      'To plan something completely and carefully from start to finish.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'thinkOut_section_expanded', /To plan something completely and carefully from start to finish\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'thinkOut', /To plan something completely and carefully from start to finish\./i, /We need to think out our strategy before the client meeting\./i, renderPage, getCard);

// --- over ---

describe('ThinkVerbPage — "over" section definitions', () => {
  it('renders definition for reflecting on a suggestion before deciding', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To take time to reflect on a suggestion, offer, or problem/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To take time to reflect on a suggestion, offer, or problem/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To take time to reflect on a suggestion, offer, or problem/i)).toHaveAttribute(
      'title',
      'To take time to reflect on a suggestion, offer, or problem before making a final decision.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'thinkOver_section_expanded', /To take time to reflect on a suggestion, offer, or problem/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'thinkOver', /To take time to reflect on a suggestion, offer, or problem/i, /Take the weekend to think over the job offer\./i, renderPage, getCard);

// --- through ---

describe('ThinkVerbPage — "through" section definitions', () => {
  it('renders definition for carefully considering every step of a plan', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To carefully consider every step, detail, and possible result/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To carefully consider every step, detail, and possible result/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To carefully consider every step, detail, and possible result/i)).toHaveAttribute(
      'title',
      'To carefully consider every step, detail, and possible result of a plan or action before doing it.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'thinkThrough_section_expanded', /To carefully consider every step, detail, and possible result/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'thinkThrough', /To carefully consider every step, detail, and possible result/i, /You should think through the consequences before you quit your job\./i, renderPage, getCard);

// --- to ---

describe('ThinkVerbPage — "to" section definitions', () => {
  it('renders definition for remembering to do something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To remember to do something/i)).toBeInTheDocument();
  });

  it('renders definition for expecting a situation to be possible', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To expect or imagine that a specific situation is possible\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To remember to do something/i),
      screen.getByText(/To expect or imagine that a specific situation is possible\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To remember to do something/i)).toHaveAttribute(
      'title',
      'To remember to do something (usually used in the negative).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To expect or imagine that a specific situation is possible\./i)).toHaveAttribute(
      'title',
      'To expect or imagine that a specific situation is possible.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'thinkTo_section_expanded', /To remember to do something/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'thinkTo', /To remember to do something/i, /I was so busy that I didn't think to call my clients to update them\./i, renderPage, getCard);

// --- up ---

describe('ThinkVerbPage — "up" section definitions', () => {
  it('renders definition for using imagination to create a plan or idea', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To use your imagination to create a plan, an idea, or an excuse\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To use your imagination to create a plan, an idea, or an excuse\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To use your imagination to create a plan, an idea, or an excuse\./i)).toHaveAttribute(
      'title',
      'To use your imagination to create a plan, an idea, or an excuse.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'thinkUp_section_expanded', /To use your imagination to create a plan, an idea, or an excuse\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'thinkUp', /To use your imagination to create a plan, an idea, or an excuse\./i, /The developers thought up a brilliant solution to the software bug\./i, renderPage, getCard);
