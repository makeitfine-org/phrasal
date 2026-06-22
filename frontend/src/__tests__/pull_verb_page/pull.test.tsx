import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('PullVerbPage — "about" section definitions', () => {
  it('renders definition for treating someone roughly', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To treat someone or something roughly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To treat someone or something roughly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To treat someone or something roughly/i)).toHaveAttribute(
      'title',
      'To treat someone or something roughly.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'pullAbout_section_expanded', /To treat someone or something roughly/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'pullAbout', /To treat someone or something roughly/i, /The older children were pulling the little boy about/i, renderPage, getCard);

// --- against ---

describe('PullVerbPage — "against" section definitions', () => {
  it('renders definition for resisting a force', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To resist or oppose a force/i)).toBeInTheDocument();
  });

  it('renders definition for working in opposition to someone', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To work in opposition to someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To resist or oppose a force/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To resist or oppose a force/i)).toHaveAttribute(
      'title',
      'To resist or oppose a force.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'pullAgainst_section_expanded', /To resist or oppose a force/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'pullAgainst', /To resist or oppose a force/i, /The dog kept pulling against the leash/i, renderPage, getCard);

// --- ahead ---

describe('PullVerbPage — "ahead" section definitions', () => {
  it('renders definition for taking the lead in a race', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To take the lead in a race or competition/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To take the lead in a race or competition/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To take the lead in a race or competition/i)).toHaveAttribute(
      'title',
      'To take the lead in a race or competition.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'pullAhead_section_expanded', /To take the lead in a race or competition/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'pullAhead', /To take the lead in a race or competition/i, /our software company finally pulled ahead/i, renderPage, getCard);

// --- apart ---

describe('PullVerbPage — "apart" section definitions', () => {
  it('renders definition for separating people that are fighting', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate people or animals that are fighting/i)).toBeInTheDocument();
  });

  it('renders definition for criticizing heavily', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To criticize heavily to show the flaws in something/i)).toBeInTheDocument();
  });

  it('renders definition for breaking into pieces', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To break or tear something into pieces/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate people or animals that are fighting/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate people or animals that are fighting/i)).toHaveAttribute(
      'title',
      'To separate people or animals that are fighting.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'pullApart_section_expanded', /To separate people or animals that are fighting/i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'pullApart', /To separate people or animals that are fighting/i, /The referee had to pull the two players apart/i, renderPage, getCard);

// --- around_round ---

describe('PullVerbPage — "around / round" section definitions', () => {
  it('renders definition for recovering from serious illness', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To recover from a serious illness or injury/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To recover from a serious illness or injury/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To recover from a serious illness or injury/i)).toHaveAttribute(
      'title',
      'To recover from a serious illness or injury (mostly British English).'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'pullAround_section_expanded', /To recover from a serious illness or injury/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'pullAround', /To recover from a serious illness or injury/i, /He was very sick after the surgery/i, renderPage, getCard);

// --- away ---

describe('PullVerbPage — "away" section definitions', () => {
  it('renders definition for starting to move', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To start moving \(usually a vehicle\)/i)).toBeInTheDocument();
  });

  it('renders definition for moving body back', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move your body back from someone/i)).toBeInTheDocument();
  });

  it('renders definition for increasing lead in competition', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To increase your lead in a competition/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To start moving \(usually a vehicle\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To start moving \(usually a vehicle\)/i)).toHaveAttribute(
      'title',
      'To start moving (usually a vehicle).'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'pullAway_section_expanded', /To start moving \(usually a vehicle\)/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'pullAway', /To start moving \(usually a vehicle\)/i, /The train pulled away from the station/i, renderPage, getCard);

// --- back ---

describe('PullVerbPage — "back" section definitions', () => {
  it('renders definition for retreating', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To retreat or move backwards/i)).toBeInTheDocument();
  });

  it('renders definition for deciding not to do something', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To decide not to do something you previously planned/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To retreat or move backwards/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To retreat or move backwards/i)).toHaveAttribute(
      'title',
      'To retreat or move backwards.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'pullBack_section_expanded', /To retreat or move backwards/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'pullBack', /To retreat or move backwards/i, /The army was ordered to pull back/i, renderPage, getCard);

// --- down ---

describe('PullVerbPage — "down" section definitions', () => {
  it('renders definition for demolishing a building', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To demolish or destroy a building/i)).toBeInTheDocument();
  });

  it('renders definition for making someone feel depressed', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make someone feel depressed or weak/i)).toBeInTheDocument();
  });

  it('renders definition for earning money', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To earn a specific amount of money/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To demolish or destroy a building/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To demolish or destroy a building/i)).toHaveAttribute(
      'title',
      'To demolish or destroy a building.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'pullDown_section_expanded', /To demolish or destroy a building/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'pullDown', /To demolish or destroy a building/i, /They are pulling down the old factory/i, renderPage, getCard);

// --- for ---

describe('PullVerbPage — "for" section definitions', () => {
  it('renders definition for supporting someone\'s success', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support, hope, or cheer for someone's success/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support, hope, or cheer for someone's success/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support, hope, or cheer for someone's success/i)).toHaveAttribute(
      'title',
      "To support, hope, or cheer for someone's success."
    );
  });
});

describeSectionToggle(LABEL, 'for', 'pullFor_section_expanded', /To support, hope, or cheer for someone's success/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'pullFor', /To support, hope, or cheer for someone's success/i, /We are all pulling for you/i, renderPage, getCard);

// --- forward ---

describe('PullVerbPage — "forward" section definitions', () => {
  it('renders definition for moving a vehicle slightly forward', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move a vehicle slightly forward/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move a vehicle slightly forward/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move a vehicle slightly forward/i)).toHaveAttribute(
      'title',
      'To move a vehicle slightly forward.'
    );
  });
});

describeSectionToggle(LABEL, 'forward', 'pullForward_section_expanded', /To move a vehicle slightly forward/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'pullForward', /To move a vehicle slightly forward/i, /Can you pull forward a little bit/i, renderPage, getCard);

// --- in ---

describe('PullVerbPage — "in" section definitions', () => {
  it('renders definition for arriving (trains)', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive \(usually for trains\)/i)).toBeInTheDocument();
  });

  it('renders definition for moving to the side of the road', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To move a vehicle to the side of the road/i)).toBeInTheDocument();
  });

  it('renders definition for attracting people or money', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To attract people or money/i)).toBeInTheDocument();
  });

  it('renders definition for arresting someone', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrest someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive \(usually for trains\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive \(usually for trains\)/i)).toHaveAttribute(
      'title',
      'To arrive (usually for trains).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'pullIn_section_expanded', /To arrive \(usually for trains\)/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'pullIn', /To arrive \(usually for trains\)/i, /The train from Warsaw is pulling in/i, renderPage, getCard);

// --- into ---

describe('PullVerbPage — "into" section definitions', () => {
  it('renders definition for arriving at a destination', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To arrive at a destination \(for vehicles\)/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To arrive at a destination \(for vehicles\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To arrive at a destination \(for vehicles\)/i)).toHaveAttribute(
      'title',
      'To arrive at a destination (for vehicles).'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'pullInto_section_expanded', /To arrive at a destination \(for vehicles\)/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'pullInto', /To arrive at a destination \(for vehicles\)/i, /The bus pulled into the station/i, renderPage, getCard);

// --- off ---

describe('PullVerbPage — "off" section definitions', () => {
  it('renders definition for succeeding in something difficult', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something very difficult or unexpected/i)).toBeInTheDocument();
  });

  it('renders definition for driving off the main road', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To drive a vehicle off the main road/i)).toBeInTheDocument();
  });

  it('renders definition for removing clothing quickly', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove clothing quickly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something very difficult or unexpected/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something very difficult or unexpected/i)).toHaveAttribute(
      'title',
      'To succeed in doing something very difficult or unexpected.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'pullOff_section_expanded', /To succeed in doing something very difficult or unexpected/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'pullOff', /To succeed in doing something very difficult or unexpected/i, /but the team pulled it off/i, renderPage, getCard);

// --- on ---

describe('PullVerbPage — "on" section definitions', () => {
  it('renders definition for putting on clothing quickly', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on clothing quickly/i)).toBeInTheDocument();
  });

  it('renders definition for breathing in smoke', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To breathe in smoke from a cigarette or pipe/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on clothing quickly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on clothing quickly/i)).toHaveAttribute(
      'title',
      'To put on clothing quickly.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'pullOn_section_expanded', /To put on clothing quickly/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'pullOn', /To put on clothing quickly/i, /She pulled on a sweater/i, renderPage, getCard);

// --- out ---

describe('PullVerbPage — "out" section definitions', () => {
  it('renders definition for moving into traffic', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To move into traffic \(for vehicles\)/i)).toBeInTheDocument();
  });

  it('renders definition for leaving a station', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave a station \(for trains\)/i)).toBeInTheDocument();
  });

  it('renders definition for withdrawing from an agreement', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To withdraw from an agreement, deal, or situation/i)).toBeInTheDocument();
  });

  it('renders definition for extracting something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extract or remove something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To move into traffic \(for vehicles\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To move into traffic \(for vehicles\)/i)).toHaveAttribute(
      'title',
      'To move into traffic (for vehicles).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'pullOut_section_expanded', /To move into traffic \(for vehicles\)/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'pullOut', /To move into traffic \(for vehicles\)/i, /A truck pulled out right in front of me/i, renderPage, getCard);

// --- over ---

describe('PullVerbPage — "over" section definitions', () => {
  it('renders definition for stopping a vehicle by the road', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop a vehicle by the side of the road/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop a vehicle by the side of the road/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop a vehicle by the side of the road/i)).toHaveAttribute(
      'title',
      'To stop a vehicle by the side of the road.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'pullOver_section_expanded', /To stop a vehicle by the side of the road/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'pullOver', /To stop a vehicle by the side of the road/i, /The police officer signaled for the driver to pull over/i, renderPage, getCard);

// --- through ---

describe('PullVerbPage — "through" section definitions', () => {
  it('renders definition for recovering from serious illness', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To recover from a very serious illness or injury/i)).toBeInTheDocument();
  });

  it('renders definition for succeeding in a difficult situation', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To succeed in a very difficult situation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To recover from a very serious illness or injury/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To recover from a very serious illness or injury/i)).toHaveAttribute(
      'title',
      'To recover from a very serious illness or injury.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'pullThrough_section_expanded', /To recover from a very serious illness or injury/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'pullThrough', /To recover from a very serious illness or injury/i, /the doctors are confident she will pull through/i, renderPage, getCard);

// --- to ---

describe('PullVerbPage — "to" section definitions', () => {
  it('renders definition for closing a door without locking it', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To close something, like a door or window/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To close something, like a door or window/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To close something, like a door or window/i)).toHaveAttribute(
      'title',
      'To close something, like a door or window, but often without locking it.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'pullTo_section_expanded', /To close something, like a door or window/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'pullTo', /To close something, like a door or window/i, /Please pull the door to when you leave/i, renderPage, getCard);

// --- together ---

describe('PullVerbPage — "together" section definitions', () => {
  it('renders definition for working as a team', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To work as a team to achieve something/i)).toBeInTheDocument();
  });

  it('renders definition for collecting or organizing information', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To collect or organize information\/things/i)).toBeInTheDocument();
  });

  it('renders definition for regaining emotional control', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To regain emotional control/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To work as a team to achieve something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To work as a team to achieve something/i)).toHaveAttribute(
      'title',
      'To work as a team to achieve something.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'pullTogether_section_expanded', /To work as a team to achieve something/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'pullTogether', /To work as a team to achieve something/i, /If we all pull together/i, renderPage, getCard);

// --- up ---

describe('PullVerbPage — "up" section definitions', () => {
  it('renders definition for slowing and stopping a vehicle', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To slow down and stop a vehicle/i)).toBeInTheDocument();
  });

  it('renders definition for bringing info onto a screen', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To bring information onto a computer screen/i)).toBeInTheDocument();
  });

  it('renders definition for correcting someone for a mistake', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To correct or criticize someone for a mistake/i)).toBeInTheDocument();
  });

  it('renders definition for moving furniture closer', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move a piece of furniture closer/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To slow down and stop a vehicle/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To slow down and stop a vehicle/i)).toHaveAttribute(
      'title',
      'To slow down and stop a vehicle.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'pullUp_section_expanded', /To slow down and stop a vehicle/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'pullUp', /To slow down and stop a vehicle/i, /A black taxi pulled up outside/i, renderPage, getCard);
