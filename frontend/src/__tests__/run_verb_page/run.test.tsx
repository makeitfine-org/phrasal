import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around_round ---

describe('RunVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for being very busy doing many tasks', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To be very busy doing many different tasks/i)).toBeInTheDocument();
  });

  it('renders definition for deceiving or cheating someone', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To deceive or cheat someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To be very busy doing many different tasks/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To be very busy doing many different tasks/i)).toHaveAttribute(
      'title',
      'To be very busy doing many different tasks.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'runAbout_section_expanded', /To be very busy doing many different tasks/i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'runAbout', /To be very busy doing many different tasks/i, /The project manager was running around all day/i, renderPage, getCard);

// --- across ---

describe('RunVerbPage — "across" section definitions', () => {
  it('renders definition for finding something by chance', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To find something or meet someone by chance/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To find something or meet someone by chance/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To find something or meet someone by chance/i)).toHaveAttribute(
      'title',
      'To find something or meet someone by chance.'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'runAcross_section_expanded', /To find something or meet someone by chance/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'runAcross', /To find something or meet someone by chance/i, /I ran across an old Java library/i, renderPage, getCard);

// --- after ---

describe('RunVerbPage — "after" section definitions', () => {
  it('renders definition for chasing someone or something', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To chase someone or something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To chase someone or something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To chase someone or something/i)).toHaveAttribute(
      'title',
      'To chase someone or something.'
    );
  });
});

describeSectionToggle(LABEL, 'after', 'runAfter_section_expanded', /To chase someone or something/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'runAfter', /To chase someone or something/i, /Startups spend a lot of time running after/i, renderPage, getCard);

// --- against ---

describe('RunVerbPage — "against" section definitions', () => {
  it('renders definition for competing in an election or business contest', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To compete with someone in an election/i)).toBeInTheDocument();
  });

  it('renders definition for causing difficulties or opposing principles', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To cause difficulties or oppose principles/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To compete with someone in an election/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To compete with someone in an election/i)).toHaveAttribute(
      'title',
      'To compete with someone in an election or business contest.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'runAgainst_section_expanded', /To compete with someone in an election/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'runAgainst', /To compete with someone in an election/i, /Our product is running against two major competitors/i, renderPage, getCard);

// --- ahead ---

describe('RunVerbPage — "ahead" section definitions', () => {
  it('renders definition for progressing faster than scheduled', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To progress faster than scheduled/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To progress faster than scheduled/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To progress faster than scheduled/i)).toHaveAttribute(
      'title',
      'To progress faster than scheduled.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'runAhead_section_expanded', /To progress faster than scheduled/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'runAhead', /To progress faster than scheduled/i, /The development team is running ahead of schedule/i, renderPage, getCard);

// --- away ---

describe('RunVerbPage — "away" section definitions', () => {
  it('renders definition for escaping a difficult situation', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To escape or leave a difficult situation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To escape or leave a difficult situation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To escape or leave a difficult situation/i)).toHaveAttribute(
      'title',
      'To escape or leave a difficult situation.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'runAway_section_expanded', /To escape or leave a difficult situation/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'runAway', /To escape or leave a difficult situation/i, /A good leader does not run away from hard decisions/i, renderPage, getCard);

// --- back ---

describe('RunVerbPage — "back" section definitions', () => {
  it('renders definition for returning quickly', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return quickly/i)).toBeInTheDocument();
  });

  it('renders definition for replaying audio or video', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To replay audio or video/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return quickly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return quickly/i)).toHaveAttribute(
      'title',
      'To return quickly.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'runBack_section_expanded', /To return quickly/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'runBack', /To return quickly/i, /I need to run back to the office/i, renderPage, getCard);

// --- behind ---

describe('RunVerbPage — "behind" section definitions', () => {
  it('renders definition for being late or delayed according to a schedule', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To be late or delayed according to a schedule/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To be late or delayed according to a schedule/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To be late or delayed according to a schedule/i)).toHaveAttribute(
      'title',
      'To be late or delayed according to a schedule.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'runBehind_section_expanded', /To be late or delayed according to a schedule/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'runBehind', /To be late or delayed according to a schedule/i, /We are running behind on the backend integration/i, renderPage, getCard);

// --- by ---

describe('RunVerbPage — "by" section definitions', () => {
  it('renders definition for telling someone about an idea to get approval', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To tell someone about an idea to get their opinion/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To tell someone about an idea to get their opinion/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To tell someone about an idea to get their opinion/i)).toHaveAttribute(
      'title',
      'To tell someone about an idea to get their opinion or approval.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'runBy_section_expanded', /To tell someone about an idea to get their opinion/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'runBy', /To tell someone about an idea to get their opinion/i, /I need to run this new architecture design by the CTO/i, renderPage, getCard);

// --- down ---

describe('RunVerbPage — "down" section definitions', () => {
  it('renders definition for losing power or energy', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To lose power/i)).toBeInTheDocument();
  });

  it('renders definition for criticizing someone constantly', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To criticize someone constantly/i)).toBeInTheDocument();
  });

  it('renders definition for finding the source of something after a long search', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To find the source of something after a long search/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To lose power/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To lose power/i)).toHaveAttribute(
      'title',
      'To lose power (a battery/machine) or energy (a person).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'runDown_section_expanded', /To lose power/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'runDown', /To lose power/i, /The server.*s backup battery finally ran down/i, renderPage, getCard);

// --- for ---

describe('RunVerbPage — "for" section definitions', () => {
  it('renders definition for trying to be elected to a position', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To try to be elected to an official/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To try to be elected to an official/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To try to be elected to an official/i)).toHaveAttribute(
      'title',
      'To try to be elected to an official or leadership position.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'runFor_section_expanded', /To try to be elected to an official/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'runFor', /To try to be elected to an official/i, /She decided to run for the board of directors/i, renderPage, getCard);

// --- in ---

describe('RunVerbPage — "in" section definitions', () => {
  it('renders definition for using a new machine carefully', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To use a new machine carefully/i)).toBeInTheDocument();
  });

  it('renders definition for arresting someone', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrest someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To use a new machine carefully/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To use a new machine carefully/i)).toHaveAttribute(
      'title',
      'To use a new machine carefully until it is ready for normal use.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'runIn_section_expanded', /To use a new machine carefully/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'runIn', /To use a new machine carefully/i, /We need to run in the new servers before/i, renderPage, getCard);

// --- into ---

describe('RunVerbPage — "into" section definitions', () => {
  it('renders definition for experiencing a problem unexpectedly', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To experience a problem or difficulty unexpectedly/i)).toBeInTheDocument();
  });

  it('renders definition for meeting someone unexpectedly', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To meet someone unexpectedly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To experience a problem or difficulty unexpectedly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To experience a problem or difficulty unexpectedly/i)).toHaveAttribute(
      'title',
      'To experience a problem or difficulty unexpectedly.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'runInto_section_expanded', /To experience a problem or difficulty unexpectedly/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'runInto', /To experience a problem or difficulty unexpectedly/i, /We ran into an unexpected bug while compiling/i, renderPage, getCard);

// --- off ---

describe('RunVerbPage — "off" section definitions', () => {
  it('renders definition for quickly making copies of a document', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To quickly make copies of a document/i)).toBeInTheDocument();
  });

  it('renders definition for forcing someone to leave', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To force someone or something to leave/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To quickly make copies of a document/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To quickly make copies of a document/i)).toHaveAttribute(
      'title',
      'To quickly make copies of a document.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'runOff_section_expanded', /To quickly make copies of a document/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'runOff', /To quickly make copies of a document/i, /Could you run off 20 copies of the meeting agenda/i, renderPage, getCard);

// --- on ---

describe('RunVerbPage — "on" section definitions', () => {
  it('renders definition for being powered by something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be powered by something/i)).toBeInTheDocument();
  });

  it('renders definition for continuing for too long', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue for too long/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be powered by something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be powered by something/i)).toHaveAttribute(
      'title',
      'To be powered by something.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'runOn_section_expanded', /To be powered by something/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'runOn', /To be powered by something/i, /The legacy enterprise system still runs on Java/i, renderPage, getCard);

// --- out ---

describe('RunVerbPage — "out" section definitions', () => {
  it('renders definition for using all of a supply', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To use all of a supply so there is nothing left/i)).toBeInTheDocument();
  });

  it('renders definition for expiring', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To expire \(for a contract, document, or agreement\)/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To use all of a supply so there is nothing left/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To use all of a supply so there is nothing left/i)).toHaveAttribute(
      'title',
      'To use all of a supply so there is nothing left.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'runOut_section_expanded', /To use all of a supply so there is nothing left/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'runOut', /To use all of a supply so there is nothing left/i, /We ran out of budget before finishing/i, renderPage, getCard);

// --- over ---

describe('RunVerbPage — "over" section definitions', () => {
  it('renders definition for going beyond a time limit', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To go beyond a time limit/i)).toBeInTheDocument();
  });

  it('renders definition for quickly reviewing something', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To quickly review or explain something/i)).toBeInTheDocument();
  });

  it('renders definition for hitting with a vehicle', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To hit with a vehicle/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To go beyond a time limit/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To go beyond a time limit/i)).toHaveAttribute(
      'title',
      'To go beyond a time limit.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'runOver_section_expanded', /To go beyond a time limit/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'runOver', /To go beyond a time limit/i, /The project review ran over its scheduled time/i, renderPage, getCard);

// --- through ---

describe('RunVerbPage — "through" section definitions', () => {
  it('renders definition for practicing something from beginning to end', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To practice, review, or explain something from beginning to end/i)).toBeInTheDocument();
  });

  it('renders definition for spending money very quickly', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To spend money very quickly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To practice, review, or explain something from beginning to end/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To practice, review, or explain something from beginning to end/i)).toHaveAttribute(
      'title',
      'To practice, review, or explain something from beginning to end.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'runThrough_section_expanded', /To practice, review, or explain something from beginning to end/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'runThrough', /To practice, review, or explain something from beginning to end/i, /The team ran through the deployment steps/i, renderPage, getCard);

// --- to ---

describe('RunVerbPage — "to" section definitions', () => {
  it('renders definition for reaching a particular amount or cost', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reach a particular amount or cost/i)).toBeInTheDocument();
  });

  it('renders definition for asking someone for help too quickly', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To ask someone for help, often too quickly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reach a particular amount or cost/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reach a particular amount or cost/i)).toHaveAttribute(
      'title',
      'To reach a particular amount or cost.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'runTo_section_expanded', /To reach a particular amount or cost/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'runTo', /To reach a particular amount or cost/i, /The costs for upgrading the IT infrastructure will run to/i, renderPage, getCard);

// --- together ---

describe('RunVerbPage — "together" section definitions', () => {
  it('renders definition for mixing so things cannot be separated', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To mix or blend so that things cannot be separated/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To mix or blend so that things cannot be separated/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To mix or blend so that things cannot be separated/i)).toHaveAttribute(
      'title',
      'To mix or blend so that things cannot be separated.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'runTogether_section_expanded', /To mix or blend so that things cannot be separated/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'runTogether', /To mix or blend so that things cannot be separated/i, /your professional and personal lives can easily run together/i, renderPage, getCard);

// --- up ---

describe('RunVerbPage — "up" section definitions', () => {
  it('renders definition for creating a large debt or cost', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To create a large debt or cost/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To create a large debt or cost/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To create a large debt or cost/i)).toHaveAttribute(
      'title',
      'To create a large debt or cost.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'runUp_section_expanded', /To create a large debt or cost/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'runUp', /To create a large debt or cost/i, /We ran up a huge AWS bill/i, renderPage, getCard);

// --- with ---

describe('RunVerbPage — "with" section definitions', () => {
  it('renders definition for taking an idea and developing it independently', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To take an idea and develop it independently/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To take an idea and develop it independently/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To take an idea and develop it independently/i)).toHaveAttribute(
      'title',
      'To take an idea and develop it independently.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'runWith_section_expanded', /To take an idea and develop it independently/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'runWith', /To take an idea and develop it independently/i, /The management team loved the proposal and told us to run with it/i, renderPage, getCard);

// --- without ---

describe('RunVerbPage — "without" section definitions', () => {
  it('renders definition for functioning lacking something', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To function lacking something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To function lacking something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To function lacking something/i)).toHaveAttribute(
      'title',
      'To function lacking something.'
    );
  });
});

describeSectionToggle(LABEL, 'without', 'runWithout_section_expanded', /To function lacking something/i, renderPage);

describeChevronAndColour(LABEL, 'without', renderPage);

describeDefaultImageCards(LABEL, 'without', 'runWithout', /To function lacking something/i, /The microservice is designed to run without/i, renderPage, getCard);
