import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('CallVerbPage — "about" section definitions', () => {
  it('renders definition for calling about a topic', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To make a phone call concerning a specific topic\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To make a phone call concerning a specific topic\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To make a phone call concerning a specific topic\./i)).toHaveAttribute(
      'title',
      'To make a phone call concerning a specific topic.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'callAbout_section_expanded', /To make a phone call concerning a specific topic\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'callAbout', /To make a phone call concerning a specific topic\./i, /calling about the open software engineering position/i, renderPage, getCard);

// --- across ---

describe('CallVerbPage — "across" section definitions', () => {
  it('renders definition for shouting across a space', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To shout to someone on the other side of a room, street, or space\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To shout to someone on the other side of a room, street, or space\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To shout to someone on the other side of a room, street, or space\./i)).toHaveAttribute(
      'title',
      'To shout to someone on the other side of a room, street, or space.'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'callAcross_section_expanded', /To shout to someone on the other side of a room, street, or space\./i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'callAcross', /To shout to someone on the other side of a room, street, or space\./i, /called across the open-plan office/i, renderPage, getCard);

// --- after ---

describe('CallVerbPage — "after" section definitions', () => {
  it('renders definition for shouting after someone walking away', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To shout to someone as they are walking away from you\./i)).toBeInTheDocument();
  });

  it('renders definition for naming a child', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To give a child the same name as someone else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To shout to someone as they are walking away from you\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To shout to someone as they are walking away from you\./i)).toHaveAttribute(
      'title',
      'To shout to someone as they are walking away from you.'
    );
  });
});

describeSectionToggle(LABEL, 'after', 'callAfter_section_expanded', /To shout to someone as they are walking away from you\./i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'callAfter', /To shout to someone as they are walking away from you\./i, /called after him, but he had already entered the elevator/i, renderPage, getCard);

// --- ahead ---

describe('CallVerbPage — "ahead" section definitions', () => {
  it('renders definition for calling ahead', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To telephone a place before you arrive there/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To telephone a place before you arrive there/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To telephone a place before you arrive there/i)).toHaveAttribute(
      'title',
      'To telephone a place before you arrive there (often to make a reservation or check something).'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'callAhead_section_expanded', /To telephone a place before you arrive there/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'callAhead', /To telephone a place before you arrive there/i, /call ahead to ensure the conference room/i, renderPage, getCard);

// --- around_round ---

describe('CallVerbPage — "around / round" section definitions', () => {
  it('renders definition for telephoning several people', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To telephone several different people or companies/i)).toBeInTheDocument();
  });

  it('renders definition for visiting someone casually', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To visit someone's house casually\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To telephone several different people or companies/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To telephone several different people or companies/i)).toHaveAttribute(
      'title',
      'To telephone several different people or companies, usually to get information or compare prices.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'callAround_section_expanded', /To telephone several different people or companies/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'callAround', /To telephone several different people or companies/i, /call around to find a better price/i, renderPage, getCard);

// --- away ---

describe('CallVerbPage — "away" section definitions', () => {
  it('renders definition for calling someone away', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To ask someone to leave the place where they are to go somewhere else/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To ask someone to leave the place where they are to go somewhere else/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To ask someone to leave the place where they are to go somewhere else/i)).toHaveAttribute(
      'title',
      'To ask someone to leave the place where they are to go somewhere else, usually for an emergency.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'callAway_section_expanded', /To ask someone to leave the place where they are to go somewhere else/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'callAway', /To ask someone to leave the place where they are to go somewhere else/i, /director was called away to an urgent meeting/i, renderPage, getCard);

// --- back ---

describe('CallVerbPage — "back" section definitions', () => {
  it('renders definition for returning a phone call', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return a telephone call\./i)).toBeInTheDocument();
  });

  it('renders definition for asking someone to return for an interview', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To ask someone to return for a second job interview\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return a telephone call\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return a telephone call\./i)).toHaveAttribute(
      'title',
      'To return a telephone call.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'callBack_section_expanded', /To return a telephone call\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'callBack', /To return a telephone call\./i, /call you back in an hour/i, renderPage, getCard);

// --- by ---

describe('CallVerbPage — "by" section definitions', () => {
  it('renders definition for making a short visit', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, informal visit to a place while going somewhere else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, informal visit to a place while going somewhere else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, informal visit to a place while going somewhere else\./i)).toHaveAttribute(
      'title',
      'To make a short, informal visit to a place while going somewhere else.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'callBy_section_expanded', /To make a short, informal visit to a place while going somewhere else\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'callBy', /To make a short, informal visit to a place while going somewhere else\./i, /call by the IT department on my way to lunch/i, renderPage, getCard);

// --- down ---

describe('CallVerbPage — "down" section definitions', () => {
  it('renders definition for shouting to someone on a lower level', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To shout to someone who is on a lower level than you\./i)).toBeInTheDocument();
  });

  it('renders definition for requesting punishment', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To request negative consequences or punishment upon someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To shout to someone who is on a lower level than you\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To shout to someone who is on a lower level than you\./i)).toHaveAttribute(
      'title',
      'To shout to someone who is on a lower level than you.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'callDown_section_expanded', /To shout to someone who is on a lower level than you\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'callDown', /To shout to someone who is on a lower level than you\./i, /called down from the second floor/i, renderPage, getCard);

// --- for ---

describe('CallVerbPage — "for" section definitions', () => {
  it('renders definition for demanding a specific action', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To demand or require a specific action or quality\./i)).toBeInTheDocument();
  });

  it('renders definition for publicly asking for something', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To publicly ask for something to happen\./i)).toBeInTheDocument();
  });

  it('renders definition for picking someone up', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To go to a place to pick someone or something up\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To demand or require a specific action or quality\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To demand or require a specific action or quality\./i)).toHaveAttribute(
      'title',
      'To demand or require a specific action or quality.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'callFor_section_expanded', /To demand or require a specific action or quality\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'callFor', /To demand or require a specific action or quality\./i, /calls for great communication skills/i, renderPage, getCard);

// --- forward ---

describe('CallVerbPage — "forward" section definitions', () => {
  it('renders definition for asking someone to step forward', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To ask someone to step to the front of a group\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To ask someone to step to the front of a group\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To ask someone to step to the front of a group\./i)).toHaveAttribute(
      'title',
      'To ask someone to step to the front of a group.'
    );
  });
});

describeSectionToggle(LABEL, 'forward', 'callForward_section_expanded', /To ask someone to step to the front of a group\./i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'callForward', /To ask someone to step to the front of a group\./i, /called the project manager forward to receive an award/i, renderPage, getCard);

// --- in ---

describe('CallVerbPage — "in" section definitions', () => {
  it('renders definition for asking an expert to help', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To ask an expert or specialist to come and help with a problem\./i)).toBeInTheDocument();
  });

  it('renders definition for telephoning office or show', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To telephone your office or a radio\/TV show\./i)).toBeInTheDocument();
  });

  it('renders definition for product recall', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To demand that people return a product because it is broken or dangerous/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To ask an expert or specialist to come and help with a problem\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To ask an expert or specialist to come and help with a problem\./i)).toHaveAttribute(
      'title',
      'To ask an expert or specialist to come and help with a problem.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'callIn_section_expanded', /To ask an expert or specialist to come and help with a problem\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'callIn', /To ask an expert or specialist to come and help with a problem\./i, /call in an external IT consultant/i, renderPage, getCard);

// --- into ---

describe('CallVerbPage — "into" section definitions', () => {
  it('renders definition for calling into question', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To call into question means to make people doubt something/i)).toBeInTheDocument();
  });

  it('renders definition for summoning into a room', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To summon someone into a room\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To call into question means to make people doubt something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To call into question means to make people doubt something/i)).toHaveAttribute(
      'title',
      'To call into question means to make people doubt something (idiom).'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'callInto_section_expanded', /To call into question means to make people doubt something/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'callInto', /To call into question means to make people doubt something/i, /called into question the software's reliability/i, renderPage, getCard);

// --- off ---

describe('CallVerbPage — "off" section definitions', () => {
  it('renders definition for cancelling an event', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cancel an event, meeting, or agreement that was planned\./i)).toBeInTheDocument();
  });

  it('renders definition for ordering to stop attacking', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To order a person or animal to stop attacking or searching\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cancel an event, meeting, or agreement that was planned\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cancel an event, meeting, or agreement that was planned\./i)).toHaveAttribute(
      'title',
      'To cancel an event, meeting, or agreement that was planned.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'callOff_section_expanded', /To cancel an event, meeting, or agreement that was planned\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'callOff', /To cancel an event, meeting, or agreement that was planned\./i, /call off the project meeting/i, renderPage, getCard);

// --- on_upon ---

describe('CallVerbPage — "on / upon" section definitions', () => {
  it('renders definition for asking formally to speak', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To ask someone formally to speak or do something\./i)).toBeInTheDocument();
  });

  it('renders definition for using a skill or resource', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To use a quality, skill, or resource that you have\./i)).toBeInTheDocument();
  });

  it('renders definition for visiting formally', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To visit someone for a short time \(often formally\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To ask someone formally to speak or do something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To ask someone formally to speak or do something\./i)).toHaveAttribute(
      'title',
      'To ask someone formally to speak or do something.'
    );
  });
});

describeSectionToggle(LABEL, 'on / upon', 'callOn_section_expanded', /To ask someone formally to speak or do something\./i, renderPage);

describeChevronAndColour(LABEL, 'on / upon', renderPage);

describeDefaultImageCards(LABEL, 'on / upon', 'callOn', /To ask someone formally to speak or do something\./i, /call on our CEO to say a few words/i, renderPage, getCard);

// --- out ---

describe('CallVerbPage — "out" section definitions', () => {
  it('renders definition for publicly criticizing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To publicly criticize someone for doing something wrong\./i)).toBeInTheDocument();
  });

  it('renders definition for asking a professional for emergency', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To ask a professional to come for an emergency\./i)).toBeInTheDocument();
  });

  it('renders definition for speaking loudly', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To speak loudly so someone can hear you\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To publicly criticize someone for doing something wrong\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To publicly criticize someone for doing something wrong\./i)).toHaveAttribute(
      'title',
      'To publicly criticize someone for doing something wrong.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'callOut_section_expanded', /To publicly criticize someone for doing something wrong\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'callOut', /To publicly criticize someone for doing something wrong\./i, /called out the team member for unprofessional behavior/i, renderPage, getCard);

// --- over ---

describe('CallVerbPage — "over" section definitions', () => {
  it('renders definition for asking someone to come over', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ask someone to come to where you are standing\./i)).toBeInTheDocument();
  });

  it('renders definition for reading aloud a list of names', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To read aloud a list of names to check who is present/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ask someone to come to where you are standing\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ask someone to come to where you are standing\./i)).toHaveAttribute(
      'title',
      'To ask someone to come to where you are standing.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'callOver_section_expanded', /To ask someone to come to where you are standing\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'callOver', /To ask someone to come to where you are standing\./i, /called the junior developer over to look at my screen/i, renderPage, getCard);

// --- through ---

describe('CallVerbPage — "through" section definitions', () => {
  it('renders definition for connecting a phone call', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To connect a phone call to someone else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To connect a phone call to someone else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To connect a phone call to someone else\./i)).toHaveAttribute(
      'title',
      'To connect a phone call to someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'callThrough_section_expanded', /To connect a phone call to someone else\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'callThrough', /To connect a phone call to someone else\./i, /receptionist called me through to the HR director/i, renderPage, getCard);

// --- to ---

describe('CallVerbPage — "to" section definitions', () => {
  it('renders definition for shouting to get attention', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To shout in order to get someone's attention\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To shout in order to get someone's attention\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To shout in order to get someone's attention\./i)).toHaveAttribute(
      'title',
      "To shout in order to get someone's attention."
    );
  });
});

describeSectionToggle(LABEL, 'to', 'callTo_section_expanded', /To shout in order to get someone's attention\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'callTo', /To shout in order to get someone's attention\./i, /called to the cab driver to stop/i, renderPage, getCard);

// --- together ---

describe('CallVerbPage — "together" section definitions', () => {
  it('renders definition for calling a group together', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To formally ask a group of people to meet in one place\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To formally ask a group of people to meet in one place\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To formally ask a group of people to meet in one place\./i)).toHaveAttribute(
      'title',
      'To formally ask a group of people to meet in one place.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'callTogether_section_expanded', /To formally ask a group of people to meet in one place\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'callTogether', /To formally ask a group of people to meet in one place\./i, /call the board of directors together to discuss the merger/i, renderPage, getCard);

// --- up ---

describe('CallVerbPage — "up" section definitions', () => {
  it('renders definition for telephoning someone', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To telephone someone\./i)).toBeInTheDocument();
  });

  it('renders definition for showing information on screen', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To find and show information on a computer screen\./i)).toBeInTheDocument();
  });

  it('renders definition for joining the military', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To officially order someone to join the military\./i)).toBeInTheDocument();
  });

  it('renders definition for making someone remember', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make someone remember something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To telephone someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To telephone someone\./i)).toHaveAttribute(
      'title',
      'To telephone someone.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'callUp_section_expanded', /To telephone someone\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'callUp', /To telephone someone\./i, /call up the software vendor to ask about the pricing/i, renderPage, getCard);
