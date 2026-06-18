import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'HangVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around_round ---

describe('HangVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for spending time somewhere doing nothing in particular', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time somewhere doing nothing in particular/i)).toBeInTheDocument();
  });

  it('renders definition for waiting or staying in a place for a specific reason', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To wait or stay in a place for a specific reason\./i)).toBeInTheDocument();
  });

  it('renders definition for spending time with a specific group of people', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time with a specific group of people\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time somewhere doing nothing in particular/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time somewhere doing nothing in particular/i)).toHaveAttribute(
      'title',
      'To spend time somewhere doing nothing in particular, just waiting or relaxing.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'hangAbout_section_expanded', /To spend time somewhere doing nothing in particular/i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'hangAbout', /To spend time somewhere doing nothing in particular/i, /Teenagers often hang around the shopping mall on weekends\./i, renderPage, getCard);

// --- back ---

describe('HangVerbPage — "back" section definitions', () => {
  it('renders definition for hesitating or staying behind the rest of a group', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hesitate or stay behind the rest of a group because of fear, shyness, or uncertainty\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hesitate or stay behind the rest of a group/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hesitate or stay behind the rest of a group/i)).toHaveAttribute(
      'title',
      'To hesitate or stay behind the rest of a group because of fear, shyness, or uncertainty.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'hangBack_section_expanded', /To hesitate or stay behind the rest of a group/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'hangBack', /To hesitate or stay behind the rest of a group/i, /She hung back while the other candidates rushed to introduce themselves to the CEO\./i, renderPage, getCard);

// --- behind ---

describe('HangVerbPage — "behind" section definitions', () => {
  it('renders definition for staying in a place after other people have left', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To stay in a place after other people have already left\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To stay in a place after other people have already left\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To stay in a place after other people have already left\./i)).toHaveAttribute(
      'title',
      'To stay in a place after other people have already left.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'hangBehind_section_expanded', /To stay in a place after other people have already left\./i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'hangBehind', /To stay in a place after other people have already left\./i, /The lead developer hung behind after the meeting to ask a few more questions\./i, renderPage, getCard);

// --- down ---

describe('HangVerbPage — "down" section definitions', () => {
  it('renders definition for dropping or falling loosely downwards', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To drop or fall loosely downwards/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To drop or fall loosely downwards/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To drop or fall loosely downwards/i)).toHaveAttribute(
      'title',
      'To drop or fall loosely downwards (usually describing hair, clothing, or branches).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'hangDown_section_expanded', /To drop or fall loosely downwards/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'hangDown', /To drop or fall loosely downwards/i, /Her long coat hung down to her ankles\./i, renderPage, getCard);

// --- in ---

describe('HangVerbPage — "in" section definitions', () => {
  it('renders definition for remaining positive and not giving up', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To remain positive and not give up during a difficult situation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To remain positive and not give up during a difficult situation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To remain positive and not give up during a difficult situation/i)).toHaveAttribute(
      'title',
      'To remain positive and not give up during a difficult situation. (Almost always used in the phrase "hang in there".)'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'hangIn_section_expanded', /To remain positive and not give up during a difficult situation/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'hangIn', /To remain positive and not give up during a difficult situation/i, /The Java migration project is really tough right now, but hang in there/i, renderPage, getCard);

// --- off ---

describe('HangVerbPage — "off" section definitions', () => {
  it('renders definition for holding onto the side of something to prevent falling', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To hold onto the side of something to prevent yourself from falling\./i)).toBeInTheDocument();
  });

  it('renders definition for hesitating or waiting before taking an action', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To hesitate or wait before taking an action/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To hold onto the side of something to prevent yourself from falling\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To hold onto the side of something to prevent yourself from falling\./i)).toHaveAttribute(
      'title',
      'To hold onto the side of something to prevent yourself from falling.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'hangOff_section_expanded', /To hold onto the side of something to prevent yourself from falling\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'hangOff', /To hold onto the side of something to prevent yourself from falling\./i, /The rescue worker was hanging off the side of the helicopter\./i, renderPage, getCard);

// --- on ---

describe('HangVerbPage — "on" section definitions', () => {
  it('renders definition for waiting for a short time', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To wait for a short time\./i)).toBeInTheDocument();
  });

  it('renders definition for holding something very securely', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To hold something very securely\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping something instead of throwing it away', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To keep something instead of throwing it away/i)).toBeInTheDocument();
  });

  it('renders definition for relying or depending completely on something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To rely or depend completely on something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To wait for a short time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To wait for a short time\./i)).toHaveAttribute(
      'title',
      'To wait for a short time.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'hangOn_section_expanded', /To wait for a short time\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'hangOn', /To wait for a short time\./i, /Hang on a minute, I need to find my laptop charger\./i, renderPage, getCard);

// --- out ---

describe('HangVerbPage — "out" section definitions', () => {
  it('renders definition for spending free time relaxing or socializing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To spend free time relaxing or socializing with friends\./i)).toBeInTheDocument();
  });

  it('renders definition for putting wet clothes outside on a line to dry', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To put wet clothes outside on a line to dry\./i)).toBeInTheDocument();
  });

  it('renders definition for leaning your body out of a window or opening', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To lean your body out of a window or opening\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To spend free time relaxing or socializing with friends\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To spend free time relaxing or socializing with friends\./i)).toHaveAttribute(
      'title',
      'To spend free time relaxing or socializing with friends.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'hangOut_section_expanded', /To spend free time relaxing or socializing with friends\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'hangOut', /To spend free time relaxing or socializing with friends\./i, /We usually hang out at the local coffee shop after work\./i, renderPage, getCard);

// --- over ---

describe('HangVerbPage — "over" section definitions', () => {
  it('renders definition for making someone worry about a future problem', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To make someone worry about a future problem, or to loom like a threat\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To make someone worry about a future problem/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To make someone worry about a future problem/i)).toHaveAttribute(
      'title',
      'To make someone worry about a future problem, or to loom like a threat.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'hangOver_section_expanded', /To make someone worry about a future problem/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'hangOver', /To make someone worry about a future problem/i, /The threat of budget cuts was hanging over the entire IT department\./i, renderPage, getCard);

// --- together ---

describe('HangVerbPage — "together" section definitions', () => {
  it('renders definition for supporting each other and staying united as a group', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To support each other and stay united as a group/i)).toBeInTheDocument();
  });

  it('renders definition for being logical, consistent, or believable', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To be logical, consistent, or believable/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To support each other and stay united as a group/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To support each other and stay united as a group/i)).toHaveAttribute(
      'title',
      'To support each other and stay united as a group, especially in difficult times.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'hangTogether_section_expanded', /To support each other and stay united as a group/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'hangTogether', /To support each other and stay united as a group/i, /If the startup wants to survive this crisis, the leadership team must hang together\./i, renderPage, getCard);

// --- up ---

describe('HangVerbPage — "up" section definitions', () => {
  it('renders definition for ending a telephone conversation', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To end a telephone conversation by breaking the connection\./i)).toBeInTheDocument();
  });

  it('renders definition for placing a piece of clothing on a hook or hanger', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To place a piece of clothing on a hook or a hanger\./i)).toBeInTheDocument();
  });

  it('renders definition for causing a delay or problem', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To cause a delay or problem/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To end a telephone conversation by breaking the connection\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To end a telephone conversation by breaking the connection\./i)).toHaveAttribute(
      'title',
      'To end a telephone conversation by breaking the connection.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'hangUp_section_expanded', /To end a telephone conversation by breaking the connection\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'hangUp', /To end a telephone conversation by breaking the connection\./i, /Please don't hang up on me, I haven't finished explaining the problem!/i, renderPage, getCard);

// --- with ---

describe('HangVerbPage — "with" section definitions', () => {
  it('renders definition for spending time with people (informal)', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/An informal version of "hang out with"; to spend time with people\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/An informal version of "hang out with"/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/An informal version of "hang out with"/i)).toHaveAttribute(
      'title',
      'An informal version of "hang out with"; to spend time with people.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'hangWith_section_expanded', /An informal version of "hang out with"/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'hangWith', /An informal version of "hang out with"/i, /I prefer to hang with people who share my interest in business management\./i, renderPage, getCard);
