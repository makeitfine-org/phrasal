import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('AskVerbPage — "about" section definitions', () => {
  it('renders definition for getting information', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To try to get information about a subject or a person/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To try to get information about a subject or a person/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To try to get information about a subject or a person/i)).toHaveAttribute(
      'title',
      'To try to get information about a subject or a person.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'askAbout_section_expanded', /To try to get information about a subject or a person/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'askAbout', /To try to get information about a subject or a person/i, /I need to call the hotel to ask about their parking rules/i, renderPage, getCard);

// --- after ---

describe('AskVerbPage — "after" section definitions', () => {
  it('renders definition for asking for news about someone', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To ask for news about someone, usually concerning their health/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To ask for news about someone, usually concerning their health/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To ask for news about someone, usually concerning their health/i)).toHaveAttribute(
      'title',
      'To ask for news about someone, usually concerning their health or how their life is going.'
    );
  });
});

describeSectionToggle(LABEL, 'after', 'askAfter_section_expanded', /To ask for news about someone, usually concerning their health/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'askAfter', /To ask for news about someone, usually concerning their health/i, /I saw your old manager yesterday, and he asked after you/i, renderPage, getCard);

// --- around_round ---

describe('AskVerbPage — "around / round" section definitions', () => {
  it('renders definition for asking many people', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To ask many different people the same question/i)).toBeInTheDocument();
  });

  it('renders definition for inviting someone to your home', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To invite someone to your home/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To ask many different people the same question/i)).toHaveClass('truncate');
    expect(screen.getByText(/To invite someone to your home/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To ask many different people the same question/i)).toHaveAttribute(
      'title',
      'To ask many different people the same question, usually to find information or get help.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'askAround_section_expanded', /To ask many different people the same question/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'askAround', /To ask many different people the same question/i, /I don't know a good plumber/i, renderPage, getCard);

// --- away ---

describe('AskVerbPage — "away" section definitions', () => {
  it('renders definition for telling someone to start asking questions', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/An expression used to tell someone that they can start asking/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/An expression used to tell someone that they can start asking/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/An expression used to tell someone that they can start asking/i)).toHaveAttribute(
      'title',
      'An expression used to tell someone that they can start asking their questions.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'askAway_section_expanded', /An expression used to tell someone that they can start asking/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'askAway', /An expression used to tell someone that they can start asking/i, /If anyone has questions about the new software update/i, renderPage, getCard);

// --- back ---

describe('AskVerbPage — "back" section definitions', () => {
  it('renders definition for inviting someone to return to a place', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To invite someone to return to a place/i)).toBeInTheDocument();
  });

  it('renders definition for inviting someone for a second interview', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To invite someone to return for a second job interview/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To invite someone to return to a place/i)).toHaveClass('truncate');
    expect(screen.getByText(/To invite someone to return for a second job interview/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To invite someone to return to a place/i)).toHaveAttribute(
      'title',
      'To invite someone to return to a place (like your house or an event).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'askBack_section_expanded', /To invite someone to return to a place/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'askBack', /To invite someone to return to a place/i, /We had a great time with them/i, renderPage, getCard);

// --- down ---

describe('AskVerbPage — "down" section definitions', () => {
  it('renders definition for inviting someone downstairs', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To invite someone to come downstairs from a higher floor/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To invite someone to come downstairs from a higher floor/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To invite someone to come downstairs from a higher floor/i)).toHaveAttribute(
      'title',
      'To invite someone to come downstairs from a higher floor.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'askDown_section_expanded', /To invite someone to come downstairs from a higher floor/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'askDown', /To invite someone to come downstairs from a higher floor/i, /His mother asked him down for breakfast/i, renderPage, getCard);

// --- for ---

describe('AskVerbPage — "for" section definitions', () => {
  it('renders definition for requesting something', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To request something to be given to you/i)).toBeInTheDocument();
  });

  it('renders definition for asking to speak to a specific person', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To say that you want to speak to a specific person/i)).toBeInTheDocument();
  });

  it('renders definition for asking for trouble', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To behave in a way that will clearly cause trouble/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To request something to be given to you/i)).toHaveClass('truncate');
    expect(screen.getByText(/To say that you want to speak to a specific person/i)).toHaveClass('truncate');
    expect(screen.getByText(/To behave in a way that will clearly cause trouble/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To request something to be given to you/i)).toHaveAttribute(
      'title',
      'To request something to be given to you.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'askFor_section_expanded', /To request something to be given to you/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'askFor', /To request something to be given to you/i, /I am going to the boss's office to ask for a pay rise/i, renderPage, getCard);

// --- in ---

describe('AskVerbPage — "in" section definitions', () => {
  it('renders definition for inviting someone inside', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To invite someone to come inside a building, house, or room/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To invite someone to come inside a building, house, or room/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To invite someone to come inside a building, house, or room/i)).toHaveAttribute(
      'title',
      'To invite someone to come inside a building, house, or room.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'askIn_section_expanded', /To invite someone to come inside a building, house, or room/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'askIn', /To invite someone to come inside a building, house, or room/i, /It was raining heavily outside, so I asked her in/i, renderPage, getCard);

// --- into ---

describe('AskVerbPage — "into" section definitions', () => {
  it('renders definition for inviting someone into a specific room', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/Similar to "ask in," but used when specifying the exact room/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/Similar to "ask in," but used when specifying the exact room/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/Similar to "ask in," but used when specifying the exact room/i)).toHaveAttribute(
      'title',
      'Similar to "ask in," but used when specifying the exact room someone is invited into.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'askInto_section_expanded', /Similar to "ask in," but used when specifying the exact room/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'askInto', /Similar to "ask in," but used when specifying the exact room/i, /The manager asked me into his office/i, renderPage, getCard);

// --- off ---

describe('AskVerbPage — "off" section definitions', () => {
  it('renders definition for requesting time off work', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To request permission to not go to work/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To request permission to not go to work/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To request permission to not go to work/i)).toHaveAttribute(
      'title',
      'To request permission to not go to work for a specific period of time.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'askOff_section_expanded', /To request permission to not go to work/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'askOff', /To request permission to not go to work/i, /I need to ask Friday off/i, renderPage, getCard);

// --- out ---

describe('AskVerbPage — "out" section definitions', () => {
  it('renders definition for asking someone on a date', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To invite someone to go to a movie, restaurant/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To invite someone to go to a movie, restaurant/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To invite someone to go to a movie, restaurant/i)).toHaveAttribute(
      'title',
      'To invite someone to go to a movie, restaurant, etc., because you want to start a romantic relationship with them.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'askOut_section_expanded', /To invite someone to go to a movie, restaurant/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'askOut', /To invite someone to go to a movie, restaurant/i, /He finally found the courage to ask her out/i, renderPage, getCard);

// --- over ---

describe('AskVerbPage — "over" section definitions', () => {
  it('renders definition for inviting someone to your home', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To invite someone to your home, usually for a short visit/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To invite someone to your home, usually for a short visit/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To invite someone to your home, usually for a short visit/i)).toHaveAttribute(
      'title',
      'To invite someone to your home, usually for a short visit or a meal.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'askOver_section_expanded', /To invite someone to your home, usually for a short visit/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'askOver', /To invite someone to your home, usually for a short visit/i, /Let's ask Tom and Sarah over for dinner/i, renderPage, getCard);

// --- up ---

describe('AskVerbPage — "up" section definitions', () => {
  it('renders definition for inviting someone upstairs', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To invite someone to come upstairs to a higher floor/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To invite someone to come upstairs to a higher floor/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To invite someone to come upstairs to a higher floor/i)).toHaveAttribute(
      'title',
      'To invite someone to come upstairs to a higher floor.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'askUp_section_expanded', /To invite someone to come upstairs to a higher floor/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'askUp', /To invite someone to come upstairs to a higher floor/i, /I asked him up to my apartment/i, renderPage, getCard);
