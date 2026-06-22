import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around_round ---

describe('FallVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for laughing uncontrollably', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To laugh uncontrollably \(mostly British\/Australian English\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To laugh uncontrollably \(mostly British\/Australian English\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To laugh uncontrollably \(mostly British\/Australian English\)\./i)).toHaveAttribute(
      'title',
      'To laugh uncontrollably (mostly British/Australian English).'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'fallAbout_section_expanded', /To laugh uncontrollably \(mostly British\/Australian English\)\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'fallAbout', /To laugh uncontrollably \(mostly British\/Australian English\)\./i, /The whole team fell about laughing during the presentation\./i, renderPage, getCard);

// --- apart ---

describe('FallVerbPage — "apart" section definitions', () => {
  it('renders definition for failing completely', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To fail completely \(systems, plans, or organizations\)\./i)).toBeInTheDocument();
  });

  it('renders definition for emotional breakdown', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To experience a serious emotional or mental breakdown\./i)).toBeInTheDocument();
  });

  it('renders definition for breaking into pieces', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To break into pieces because of poor condition\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To fail completely \(systems, plans, or organizations\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To fail completely \(systems, plans, or organizations\)\./i)).toHaveAttribute(
      'title',
      'To fail completely (systems, plans, or organizations).'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'fallApart_section_expanded', /To fail completely \(systems, plans, or organizations\)\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'fallApart', /To fail completely \(systems, plans, or organizations\)\./i, /The software project fell apart due to poor management\./i, renderPage, getCard);

// --- away ---

describe('FallVerbPage — "away" section definitions', () => {
  it('renders definition for gradually decreasing', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually decrease, fade, or disappear\./i)).toBeInTheDocument();
  });

  it('renders definition for breaking off and dropping', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To break off and drop to the ground\./i)).toBeInTheDocument();
  });

  it('renders definition for sloping downwards', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To slope downwards\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually decrease, fade, or disappear\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually decrease, fade, or disappear\./i)).toHaveAttribute(
      'title',
      'To gradually decrease, fade, or disappear.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'fallAway_section_expanded', /To gradually decrease, fade, or disappear\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'fallAway', /To gradually decrease, fade, or disappear\./i, /Client interest fell away when the prices increased\./i, renderPage, getCard);

// --- back ---

describe('FallVerbPage — "back" section definitions', () => {
  it('renders definition for retreating or moving backwards', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To retreat or move backwards \(often military or strategic\)\./i)).toBeInTheDocument();
  });

  it('renders definition for relying on a backup plan', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To rely on something as a backup plan when other things fail \(fall back on\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To retreat or move backwards \(often military or strategic\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To retreat or move backwards \(often military or strategic\)\./i)).toHaveAttribute(
      'title',
      'To retreat or move backwards (often military or strategic).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'fallBack_section_expanded', /To retreat or move backwards \(often military or strategic\)\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'fallBack', /To retreat or move backwards \(often military or strategic\)\./i, /Our competitors pushed hard, forcing us to fall back and rethink our strategy\./i, renderPage, getCard);

// --- behind ---

describe('FallVerbPage — "behind" section definitions', () => {
  it('renders definition for failing to complete work on time', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fail to complete work or make payments on time\./i)).toBeInTheDocument();
  });

  it('renders definition for moving slower than the group', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To move slower than the rest of a group\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fail to complete work or make payments on time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fail to complete work or make payments on time\./i)).toHaveAttribute(
      'title',
      'To fail to complete work or make payments on time.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'fallBehind_section_expanded', /To fail to complete work or make payments on time\./i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'fallBehind', /To fail to complete work or make payments on time\./i, /If you don't manage your time well, you will fall behind on the project schedule\./i, renderPage, getCard);

// --- down ---

describe('FallVerbPage — "down" section definitions', () => {
  it('renders definition for being proven weak or incorrect', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To be proven weak, inadequate, or incorrect \(often an argument or plan\)\./i)).toBeInTheDocument();
  });

  it('renders definition for dropping to the ground', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To drop to the ground \(literal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To be proven weak, inadequate, or incorrect \(often an argument or plan\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To be proven weak, inadequate, or incorrect \(often an argument or plan\)\./i)).toHaveAttribute(
      'title',
      'To be proven weak, inadequate, or incorrect (often an argument or plan).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'fallDown_section_expanded', /To be proven weak, inadequate, or incorrect \(often an argument or plan\)\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'fallDown', /To be proven weak, inadequate, or incorrect \(often an argument or plan\)\./i, /His business strategy falls down when you look at the financial data\./i, renderPage, getCard);

// --- for ---

describe('FallVerbPage — "for" section definitions', () => {
  it('renders definition for being tricked or deceived', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be tricked or deceived by a lie or scam\./i)).toBeInTheDocument();
  });

  it('renders definition for falling in love', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To fall deeply in love with someone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be tricked or deceived by a lie or scam\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be tricked or deceived by a lie or scam\./i)).toHaveAttribute(
      'title',
      'To be tricked or deceived by a lie or scam.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'fallFor_section_expanded', /To be tricked or deceived by a lie or scam\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'fallFor', /To be tricked or deceived by a lie or scam\./i, /I can't believe the manager fell for that obvious phishing email\./i, renderPage, getCard);

// --- in ---

describe('FallVerbPage — "in" section definitions', () => {
  it('renders definition for collapsing inwards', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To collapse inwards \(like a roof, wall, or ceiling\)\./i)).toBeInTheDocument();
  });

  it('renders definition for forming a line', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To form a line \(military\)\./i)).toBeInTheDocument();
  });

  it('renders definition for agreeing to a plan', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To agree to a plan or join a group of people \(fall in with\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To collapse inwards \(like a roof, wall, or ceiling\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To collapse inwards \(like a roof, wall, or ceiling\)\./i)).toHaveAttribute(
      'title',
      'To collapse inwards (like a roof, wall, or ceiling).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'fallIn_section_expanded', /To collapse inwards \(like a roof, wall, or ceiling\)\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'fallIn', /To collapse inwards \(like a roof, wall, or ceiling\)\./i, /The roof of the old warehouse fell in under the heavy snow\./i, renderPage, getCard);

// --- into ---

describe('FallVerbPage — "into" section definitions', () => {
  it('renders definition for starting something by chance', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To start doing something by chance, rather than by plan \(like a career\)\./i)).toBeInTheDocument();
  });

  it('renders definition for being naturally divided into categories', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be naturally divided into categories\./i)).toBeInTheDocument();
  });

  it('renders definition for entering a specific state', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a specific state or condition\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To start doing something by chance, rather than by plan \(like a career\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To start doing something by chance, rather than by plan \(like a career\)\./i)).toHaveAttribute(
      'title',
      'To start doing something by chance, rather than by plan (like a career).'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'fallInto_section_expanded', /To start doing something by chance, rather than by plan \(like a career\)\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'fallInto', /To start doing something by chance, rather than by plan \(like a career\)\./i, /I didn't study management; I just fell into it\./i, renderPage, getCard);

// --- off ---

describe('FallVerbPage — "off" section definitions', () => {
  it('renders definition for decreasing in quantity or frequency', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To decrease in quantity, quality, or frequency\./i)).toBeInTheDocument();
  });

  it('renders definition for detaching from something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To detach from something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To decrease in quantity, quality, or frequency\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To decrease in quantity, quality, or frequency\./i)).toHaveAttribute(
      'title',
      'To decrease in quantity, quality, or frequency.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'fallOff_section_expanded', /To decrease in quantity, quality, or frequency\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'fallOff', /To decrease in quantity, quality, or frequency\./i, /Product sales usually fall off during the summer holidays\./i, renderPage, getCard);

// --- on_upon ---

describe('FallVerbPage — "on / upon" section definitions', () => {
  it("renders definition for becoming someone's duty or responsibility", () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To become someone's duty or responsibility\./i)).toBeInTheDocument();
  });

  it('renders definition for happening on a specific date', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To happen on a specific date\./i)).toBeInTheDocument();
  });

  it('renders definition for attacking eagerly or suddenly', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To attack eagerly or suddenly\./i)).toBeInTheDocument();
  });

  it('renders definition for experiencing difficult times', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To experience difficult times \(idiom: fall on hard times\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To become someone's duty or responsibility\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To become someone's duty or responsibility\./i)).toHaveAttribute(
      'title',
      "To become someone's duty or responsibility."
    );
  });
});

describeSectionToggle(LABEL, 'on / upon', 'fallOn_section_expanded', /To become someone's duty or responsibility\./i, renderPage);

describeChevronAndColour(LABEL, 'on / upon', renderPage);

describeDefaultImageCards(LABEL, 'on / upon', 'fallOn', /To become someone's duty or responsibility\./i, /When the CEO resigned, the responsibility fell on the vice president\./i, renderPage, getCard);

// --- out ---

describe('FallVerbPage — "out" section definitions', () => {
  it('renders definition for having an argument and stopping being friends', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To have an argument and stop being friends or colleagues\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming detached and dropping', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To become detached and drop \(usually hair or teeth\)\./i)).toBeInTheDocument();
  });

  it('renders definition for leaving a military formation', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave a formation \(military\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To have an argument and stop being friends or colleagues\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To have an argument and stop being friends or colleagues\./i)).toHaveAttribute(
      'title',
      'To have an argument and stop being friends or colleagues.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'fallOut_section_expanded', /To have an argument and stop being friends or colleagues\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'fallOut', /To have an argument and stop being friends or colleagues\./i, /The two founders fell out over the future direction of the company\./i, renderPage, getCard);

// --- over ---

describe('FallVerbPage — "over" section definitions', () => {
  it('renders definition for collapsing or dropping to the ground', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To collapse or drop to the ground\./i)).toBeInTheDocument();
  });

  it('renders definition for trying extremely hard looking foolish', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To try extremely hard, often looking foolish, to do something \(fall over oneself\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To collapse or drop to the ground\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To collapse or drop to the ground\./i)).toHaveAttribute(
      'title',
      'To collapse or drop to the ground.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'fallOver_section_expanded', /To collapse or drop to the ground\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'fallOver', /To collapse or drop to the ground\./i, /The server rack almost fell over during the earthquake\./i, renderPage, getCard);

// --- through ---

describe('FallVerbPage — "through" section definitions', () => {
  it('renders definition for failing to be completed', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To fail to happen or be completed \(usually plans, deals, or projects\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To fail to happen or be completed \(usually plans, deals, or projects\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To fail to happen or be completed \(usually plans, deals, or projects\)\./i)).toHaveAttribute(
      'title',
      'To fail to happen or be completed (usually plans, deals, or projects).'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'fallThrough_section_expanded', /To fail to happen or be completed \(usually plans, deals, or projects\)\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'fallThrough', /To fail to happen or be completed \(usually plans, deals, or projects\)\./i, /The merger fell through at the last minute due to legal issues\./i, renderPage, getCard);

// --- to ---

describe('FallVerbPage — "to" section definitions', () => {
  it("renders definition for becoming someone's duty or responsibility", () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become someone's duty or responsibility \(similar to fall on\)\./i)).toBeInTheDocument();
  });

  it('renders definition for starting something energetically', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start doing something energetically, especially eating or working\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become someone's duty or responsibility \(similar to fall on\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become someone's duty or responsibility \(similar to fall on\)\./i)).toHaveAttribute(
      'title',
      "To become someone's duty or responsibility (similar to fall on)."
    );
  });
});

describeSectionToggle(LABEL, 'to', 'fallTo_section_expanded', /To become someone's duty or responsibility \(similar to fall on\)\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'fallTo', /To become someone's duty or responsibility \(similar to fall on\)\./i, /It falls to the senior developer to train the new team members\./i, renderPage, getCard);
