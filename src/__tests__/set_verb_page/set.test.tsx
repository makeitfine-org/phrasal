import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('SetVerbPage — "about" section definitions', () => {
  it('renders definition for starting something needing time and energy', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To start doing something that needs a lot of time and energy\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To start doing something that needs a lot of time and energy\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To start doing something that needs a lot of time and energy\./i)).toHaveAttribute(
      'title',
      'To start doing something that needs a lot of time and energy.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'setAbout_section_expanded', /To start doing something that needs a lot of time and energy\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'setAbout', /To start doing something that needs a lot of time and energy\./i, /The team immediately set about rewriting the legacy Java code\./i, renderPage, getCard);

// --- against ---

describe('SetVerbPage — "against" section definitions', () => {
  it('renders definition for making people or groups oppose each other', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make people or groups oppose or hate each other\./i)).toBeInTheDocument();
  });

  it('renders definition for balancing one thing against another', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To balance one thing against another/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make people or groups oppose or hate each other\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make people or groups oppose or hate each other\./i)).toHaveAttribute(
      'title',
      'To make people or groups oppose or hate each other.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'setAgainst_section_expanded', /To make people or groups oppose or hate each other\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'setAgainst', /To make people or groups oppose or hate each other\./i, /Poor leadership set the development team against the testing team\./i, renderPage, getCard);

// --- ahead ---

describe('SetVerbPage — "ahead" section definitions', () => {
  it('renders definition for changing time on a clock to a later time', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To change the time on a clock to a later time\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To change the time on a clock to a later time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To change the time on a clock to a later time\./i)).toHaveAttribute(
      'title',
      'To change the time on a clock to a later time.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'setAhead_section_expanded', /To change the time on a clock to a later time\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'setAhead', /To change the time on a clock to a later time\./i, /Don't forget to set your clocks ahead by one hour this weekend\./i, renderPage, getCard);

// --- apart ---

describe('SetVerbPage — "apart" section definitions', () => {
  it('renders definition for making someone different and better than others', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To make someone or something different and better than others\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping time or space for a special purpose', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To keep time or space for a special purpose\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To make someone or something different and better than others\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To make someone or something different and better than others\./i)).toHaveAttribute(
      'title',
      'To make someone or something different and better than others.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'setApart_section_expanded', /To make someone or something different and better than others\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'setApart', /To make someone or something different and better than others\./i, /Her excellent leadership skills set her apart from other managers\./i, renderPage, getCard);

// --- back ---

describe('SetVerbPage — "back" section definitions', () => {
  it('renders definition for delaying the progress of a project or plan', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To delay the progress of a project or plan\./i)).toBeInTheDocument();
  });

  it('renders definition for costing a large amount of money', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To cost someone a large amount of money/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To delay the progress of a project or plan\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To delay the progress of a project or plan\./i)).toHaveAttribute(
      'title',
      'To delay the progress of a project or plan.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'setBack_section_expanded', /To delay the progress of a project or plan\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'setBack', /To delay the progress of a project or plan\./i, /A critical bug in the database set the project back by three weeks\./i, renderPage, getCard);

// --- by ---

describe('SetVerbPage — "by" section definitions', () => {
  it('renders definition for saving money or things for the future', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To save money or things for the future\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To save money or things for the future\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To save money or things for the future\./i)).toHaveAttribute(
      'title',
      'To save money or things for the future.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'setBy_section_expanded', /To save money or things for the future\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'setBy', /To save money or things for the future\./i, /The company has a budget set by for emergency server repairs\./i, renderPage, getCard);

// --- down ---

describe('SetVerbPage — "down" section definitions', () => {
  it('renders definition for writing something on paper for an official record', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write something on paper so there is an official record\./i)).toBeInTheDocument();
  });

  it('renders definition for stating officially how something must be done', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To state officially how something must be done/i)).toBeInTheDocument();
  });

  it('renders definition for stopping a vehicle to let a passenger out', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop a vehicle to let a passenger get out\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write something on paper so there is an official record\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write something on paper so there is an official record\./i)).toHaveAttribute(
      'title',
      'To write something on paper so there is an official record.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'setDown_section_expanded', /To write something on paper so there is an official record\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'setDown', /To write something on paper so there is an official record\./i, /The new coding standards are set down in the employee handbook\./i, renderPage, getCard);

// --- in ---

describe('SetVerbPage — "in" section definitions', () => {
  it('renders definition for beginning and seeming likely to continue', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To begin and seem likely to continue for a long time/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To begin and seem likely to continue for a long time/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To begin and seem likely to continue for a long time/i)).toHaveAttribute(
      'title',
      'To begin and seem likely to continue for a long time (usually used for negative situations, feelings, or bad weather).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'setIn_section_expanded', /To begin and seem likely to continue for a long time/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'setIn', /To begin and seem likely to continue for a long time/i, /Panic set in when the main production server crashed\./i, renderPage, getCard);

// --- off ---

describe('SetVerbPage — "off" section definitions', () => {
  it('renders definition for starting a journey', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To start a journey\./i)).toBeInTheDocument();
  });

  it('renders definition for causing an alarm to ring', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cause an alarm to ring or a bomb to explode\./i)).toBeInTheDocument();
  });

  it('renders definition for causing a series of events to happen', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cause a series of events to happen\./i)).toBeInTheDocument();
  });

  it('renders definition for making someone start laughing or crying', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To make someone start laughing or crying\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To start a journey\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To start a journey\./i)).toHaveAttribute(
      'title',
      'To start a journey.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'setOff_section_expanded', /To start a journey\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'setOff', /To start a journey\./i, /They set off for the tech conference in Berlin at 8:00 AM\./i, renderPage, getCard);

// --- on ---

describe('SetVerbPage — "on" section definitions', () => {
  it('renders definition for attacking someone or making an animal attack', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attack someone, or to make an animal attack someone\./i)).toBeInTheDocument();
  });

  it('renders definition for being very determined to do something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be very determined to do something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attack someone, or to make an animal attack someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attack someone, or to make an animal attack someone\./i)).toHaveAttribute(
      'title',
      'To attack someone, or to make an animal attack someone.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'setOn_section_expanded', /To attack someone, or to make an animal attack someone\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'setOn', /To attack someone, or to make an animal attack someone\./i, /The security guards set their dogs on the intruders\./i, renderPage, getCard);

// --- out ---

describe('SetVerbPage — "out" section definitions', () => {
  it('renders definition for beginning an activity with a specific goal', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To begin an activity with a specific goal in mind\./i)).toBeInTheDocument();
  });

  it('renders definition for explaining ideas, facts, or plans clearly', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To explain ideas, facts, or plans clearly in writing or speaking\./i)).toBeInTheDocument();
  });

  it('renders definition for starting a journey', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To start a journey \(similar to "set off"\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To begin an activity with a specific goal in mind\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To begin an activity with a specific goal in mind\./i)).toHaveAttribute(
      'title',
      'To begin an activity with a specific goal in mind.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'setOut_section_expanded', /To begin an activity with a specific goal in mind\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'setOut', /To begin an activity with a specific goal in mind\./i, /We set out to build the fastest application on the market\./i, renderPage, getCard);

// --- over ---

describe('SetVerbPage — "over" section definitions', () => {
  it('renders definition for giving someone authority or power over someone else', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give someone authority or power over someone else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give someone authority or power over someone else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give someone authority or power over someone else\./i)).toHaveAttribute(
      'title',
      'To give someone authority or power over someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'setOver_section_expanded', /To give someone authority or power over someone else\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'setOver', /To give someone authority or power over someone else\./i, /She was set over the entire IT department after the reorganization\./i, renderPage, getCard);

// --- to ---

describe('SetVerbPage — "to" section definitions', () => {
  it('renders definition for starting working with energy and determination', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start working or doing something with a lot of energy and determination\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start working or doing something with a lot of energy and determination\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start working or doing something with a lot of energy and determination\./i)).toHaveAttribute(
      'title',
      'To start working or doing something with a lot of energy and determination.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'setTo_section_expanded', /To start working or doing something with a lot of energy and determination\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'setTo', /To start working or doing something with a lot of energy and determination\./i, /The developers set to and fixed all the major bugs before the deadline\./i, renderPage, getCard);

// --- up ---

describe('SetVerbPage — "up" section definitions', () => {
  it('renders definition for starting a new business or organization', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start a new business or organization\./i)).toBeInTheDocument();
  });

  it('renders definition for arranging or planning a meeting or event', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To arrange or plan a meeting or event\./i)).toBeInTheDocument();
  });

  it('renders definition for preparing equipment or software', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To prepare equipment or software so it is ready to use\./i)).toBeInTheDocument();
  });

  it('renders definition for tricking someone to look guilty', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To trick someone in order to make them look guilty of a crime or mistake\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start a new business or organization\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start a new business or organization\./i)).toHaveAttribute(
      'title',
      'To start a new business or organization.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'setUp_section_expanded', /To start a new business or organization\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'setUp', /To start a new business or organization\./i, /They set up a successful software company five years ago\./i, renderPage, getCard);
