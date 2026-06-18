import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_round ---

describe('CutVerbPage — "about / round" section definitions', () => {
  it('renders definition for moving around aimlessly', () => {
    renderPage();
    expandSection('about / round');
    expect(screen.getByText(/To move or run around actively or aimlessly/i)).toBeInTheDocument();
  });

  it('renders definition for taking a shortcut around an obstacle', () => {
    renderPage();
    expandSection('about / round');
    expect(screen.getByText(/To take a quick shortcut around an obstacle/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about / round');
    expect(screen.getByText(/To move or run around actively or aimlessly/i)).toHaveClass('truncate');
    expect(screen.getByText(/To take a quick shortcut around an obstacle/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / round');
    expect(screen.getByText(/To move or run around actively or aimlessly/i)).toHaveAttribute(
      'title',
      'To move or run around actively or aimlessly (UK Informal).'
    );
  });
});

describeSectionToggle(LABEL, 'about / round', 'cutAbout_section_expanded', /To move or run around actively or aimlessly/i, renderPage);

describeChevronAndColour(LABEL, 'about / round', renderPage);

describeDefaultImageCards(LABEL, 'about / round', 'cutAbout', /To move or run around actively or aimlessly/i, /The kids were cutting about/i, renderPage, getCard);

// --- across ---

describe('CutVerbPage — "across" section definitions', () => {
  it('renders definition for taking a shortcut across an area', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To take a shortcut across an area/i)).toBeInTheDocument();
  });

  it('renders definition for affecting multiple groups', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To affect or apply to multiple different groups/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To take a shortcut across an area/i)).toHaveClass('truncate');
    expect(screen.getByText(/To affect or apply to multiple different groups/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To take a shortcut across an area/i)).toHaveAttribute(
      'title',
      'To take a shortcut across an area.'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'cutAcross_section_expanded', /To take a shortcut across an area/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'cutAcross', /To take a shortcut across an area/i, /We cut across the park/i, renderPage, getCard);

// --- against ---

describe('CutVerbPage — "against" section definitions', () => {
  it('renders definition for going against the grain', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To go against the grain, expectations, or natural order/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To go against the grain, expectations, or natural order/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To go against the grain, expectations, or natural order/i)).toHaveAttribute(
      'title',
      'To go against the grain, expectations, or natural order.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'cutAgainst_section_expanded', /To go against the grain, expectations, or natural order/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'cutAgainst', /To go against the grain, expectations, or natural order/i, /His decision to expand the business cuts against/i, renderPage, getCard);

// --- ahead ---

describe('CutVerbPage — "ahead" section definitions', () => {
  it('renders definition for moving in front in a queue', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To move in front of others in a line unethically/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To move in front of others in a line unethically/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To move in front of others in a line unethically/i)).toHaveAttribute(
      'title',
      'To move in front of others in a line unethically.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'cutAhead_section_expanded', /To move in front of others in a line unethically/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'cutAhead', /To move in front of others in a line unethically/i, /A group of teenagers tried to cut ahead/i, renderPage, getCard);

// --- apart ---

describe('CutVerbPage — "apart" section definitions', () => {
  it('renders definition for separating by cutting', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate or dismantle by cutting/i)).toBeInTheDocument();
  });

  it('renders definition for severely criticizing an argument', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To severely criticize or destroy an argument/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate or dismantle by cutting/i)).toHaveClass('truncate');
    expect(screen.getByText(/To severely criticize or destroy an argument/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate or dismantle by cutting/i)).toHaveAttribute(
      'title',
      'To separate or dismantle by cutting.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'cutApart_section_expanded', /To separate or dismantle by cutting/i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'cutApart', /To separate or dismantle by cutting/i, /They cut the old ship apart/i, renderPage, getCard);

// --- away ---

describe('CutVerbPage — "away" section definitions', () => {
  it('renders definition for removing unwanted parts', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove the outer or unwanted parts by cutting/i)).toBeInTheDocument();
  });

  it('renders definition for shifting the camera to another scene', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To suddenly shift the camera to another scene/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove the outer or unwanted parts by cutting/i)).toHaveClass('truncate');
    expect(screen.getByText(/To suddenly shift the camera to another scene/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove the outer or unwanted parts by cutting/i)).toHaveAttribute(
      'title',
      'To remove the outer or unwanted parts by cutting.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'cutAway_section_expanded', /To remove the outer or unwanted parts by cutting/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'cutAway', /To remove the outer or unwanted parts by cutting/i, /The surgeon carefully cut away/i, renderPage, getCard);

// --- back ---

describe('CutVerbPage — "back" section definitions', () => {
  it('renders definition for reducing spending or consumption', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reduce spending, production, or consumption/i)).toBeInTheDocument();
  });

  it('renders definition for pruning a plant', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To prune a plant to control its growth/i)).toBeInTheDocument();
  });

  it('renders definition for returning to a previous scene', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a previous scene/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reduce spending, production, or consumption/i)).toHaveClass('truncate');
    expect(screen.getByText(/To prune a plant to control its growth/i)).toHaveClass('truncate');
    expect(screen.getByText(/To return to a previous scene/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reduce spending, production, or consumption/i)).toHaveAttribute(
      'title',
      'To reduce spending, production, or consumption.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'cutBack_section_expanded', /To reduce spending, production, or consumption/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'cutBack', /To reduce spending, production, or consumption/i, /The company is cutting back/i, renderPage, getCard);

// --- down ---

describe('CutVerbPage — "down" section definitions', () => {
  it('renders definition for felling by cutting', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To cause something to fall by cutting/i)).toBeInTheDocument();
  });

  it('renders definition for reducing amount or frequency', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the amount or frequency of something/i)).toBeInTheDocument();
  });

  it('renders definition for killing or severely injuring', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To kill or severely injure someone/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To cause something to fall by cutting/i)).toHaveClass('truncate');
    expect(screen.getByText(/To reduce the amount or frequency of something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To kill or severely injure someone/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To cause something to fall by cutting/i)).toHaveAttribute(
      'title',
      'To cause something to fall by cutting.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'cutDown_section_expanded', /To cause something to fall by cutting/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'cutDown', /To cause something to fall by cutting/i, /The city cut down the old oak tree/i, renderPage, getCard);

// --- in ---

describe('CutVerbPage — "in" section definitions', () => {
  it('renders definition for interrupting a conversation', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interrupt a conversation/i)).toBeInTheDocument();
  });

  it('renders definition for moving in front of another vehicle', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To move suddenly in front of another vehicle or person/i)).toBeInTheDocument();
  });

  it('renders definition for including in a deal', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include someone in a deal or share of profits/i)).toBeInTheDocument();
  });

  it('renders definition for machines starting automatically', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To automatically start operating/i)).toBeInTheDocument();
  });

  it('renders definition for interrupting a dancing couple', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interrupt a dancing couple to take over as a partner/i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interrupt a conversation/i)).toHaveClass('truncate');
    expect(screen.getByText(/To move suddenly in front of another vehicle or person/i)).toHaveClass('truncate');
    expect(screen.getByText(/To include someone in a deal or share of profits/i)).toHaveClass('truncate');
    expect(screen.getByText(/To automatically start operating/i)).toHaveClass('truncate');
    expect(screen.getByText(/To interrupt a dancing couple to take over as a partner/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interrupt a conversation/i)).toHaveAttribute(
      'title',
      'To interrupt a conversation.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'cutIn_section_expanded', /To interrupt a conversation/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'cutIn', /To interrupt a conversation/i, /Do you mind if I cut in/i, renderPage, getCard);

// --- into ---

describe('CutVerbPage — "into" section definitions', () => {
  it('renders definition for slicing or penetrating', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To slice or penetrate a physical object/i)).toBeInTheDocument();
  });

  it('renders definition for consuming something valuable', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To consume a portion of something valuable/i)).toBeInTheDocument();
  });

  it('renders definition for interrupting (similar to cut in)', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To interrupt \(similar to cut in\)/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To slice or penetrate a physical object/i)).toHaveClass('truncate');
    expect(screen.getByText(/To consume a portion of something valuable/i)).toHaveClass('truncate');
    expect(screen.getByText(/To interrupt \(similar to cut in\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To slice or penetrate a physical object/i)).toHaveAttribute(
      'title',
      'To slice or penetrate a physical object.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'cutInto_section_expanded', /To slice or penetrate a physical object/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'cutInto', /To slice or penetrate a physical object/i, /The sharp wire cut into my skin/i, renderPage, getCard);

// --- off ---

describe('CutVerbPage — "off" section definitions', () => {
  it('renders definition for removing by cutting', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove something by cutting/i)).toBeInTheDocument();
  });

  it('renders definition for interrupting someone speaking', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To interrupt someone speaking/i)).toBeInTheDocument();
  });

  it('renders definition for stopping a service or supply', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop providing a service or supply/i)).toBeInTheDocument();
  });

  it('renders definition for isolating a place', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To isolate or block access to a place/i)).toBeInTheDocument();
  });

  it("renders definition for blocking a vehicle's path", () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To block another vehicle's path aggressively/i)).toBeInTheDocument();
  });

  it('renders definition for disinheriting', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To disinherit or stop giving someone money/i)).toBeInTheDocument();
  });

  it('all 6 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove something by cutting/i)).toHaveClass('truncate');
    expect(screen.getByText(/To interrupt someone speaking/i)).toHaveClass('truncate');
    expect(screen.getByText(/To stop providing a service or supply/i)).toHaveClass('truncate');
    expect(screen.getByText(/To isolate or block access to a place/i)).toHaveClass('truncate');
    expect(screen.getByText(/To block another vehicle's path aggressively/i)).toHaveClass('truncate');
    expect(screen.getByText(/To disinherit or stop giving someone money/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove something by cutting/i)).toHaveAttribute(
      'title',
      'To remove something by cutting.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'cutOff_section_expanded', /To remove something by cutting/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'cutOff', /To remove something by cutting/i, /He cut off the tags from his new shirt/i, renderPage, getCard);

// --- on ---

describe('CutVerbPage — "on" section definitions', () => {
  it('renders definition for turning on a device', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To turn on a device or switch/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To turn on a device or switch/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To turn on a device or switch/i)).toHaveAttribute(
      'title',
      'To turn on a device or switch (Regional/Southern US).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'cutOn_section_expanded', /To turn on a device or switch/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'cutOn', /To turn on a device or switch/i, /Can you cut on the lights/i, renderPage, getCard);

// --- out ---

describe('CutVerbPage — "out" section definitions', () => {
  it('renders definition for removing by cutting', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove a shape or part by cutting/i)).toBeInTheDocument();
  });

  it('renders definition for stopping something completely', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop eating or doing something completely/i)).toBeInTheDocument();
  });

  it('renders definition for machines stopping working', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To suddenly stop working/i)).toBeInTheDocument();
  });

  it('renders definition for excluding someone', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To exclude someone/i)).toBeInTheDocument();
  });

  it('renders definition for being naturally suited', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be naturally suited for something/i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove a shape or part by cutting/i)).toHaveClass('truncate');
    expect(screen.getByText(/To stop eating or doing something completely/i)).toHaveClass('truncate');
    expect(screen.getByText(/To suddenly stop working/i)).toHaveClass('truncate');
    expect(screen.getByText(/To exclude someone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To be naturally suited for something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove a shape or part by cutting/i)).toHaveAttribute(
      'title',
      'To remove a shape or part by cutting.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'cutOut_section_expanded', /To remove a shape or part by cutting/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'cutOut', /To remove a shape or part by cutting/i, /She cut out an interesting article/i, renderPage, getCard);

// --- over ---

describe('CutVerbPage — "over" section definitions', () => {
  it('renders definition for switching to a new system', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To switch from an old system to a new one/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To switch from an old system to a new one/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To switch from an old system to a new one/i)).toHaveAttribute(
      'title',
      'To switch from an old system to a new one (IT/Business context).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'cutOver_section_expanded', /To switch from an old system to a new one/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'cutOver', /To switch from an old system to a new one/i, /The engineering team will cut over/i, renderPage, getCard);

// --- through ---

describe('CutVerbPage — "through" section definitions', () => {
  it('renders definition for taking a shortcut through an area', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To take a shortcut through an area/i)).toBeInTheDocument();
  });

  it('renders definition for bypassing obstacles and bureaucracy', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To quickly deal with or bypass obstacles and bureaucracy/i)).toBeInTheDocument();
  });

  it('renders definition for penetrating a barrier', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To penetrate a barrier such as sound, darkness, or confusion/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To take a shortcut through an area/i)).toHaveClass('truncate');
    expect(screen.getByText(/To quickly deal with or bypass obstacles and bureaucracy/i)).toHaveClass('truncate');
    expect(screen.getByText(/To penetrate a barrier such as sound, darkness, or confusion/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To take a shortcut through an area/i)).toHaveAttribute(
      'title',
      'To take a shortcut through an area.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'cutThrough_section_expanded', /To take a shortcut through an area/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'cutThrough', /To take a shortcut through an area/i, /Let's cut through the alley/i, renderPage, getCard);

// --- to ---

describe('CutVerbPage — "to" section definitions', () => {
  it('renders definition for skipping ahead to a specific point', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To skip ahead to a specific, more important point/i)).toBeInTheDocument();
  });

  it('renders definition for shifting to a new scene', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To shift to a new scene/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To skip ahead to a specific, more important point/i)).toHaveClass('truncate');
    expect(screen.getByText(/To shift to a new scene/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To skip ahead to a specific, more important point/i)).toHaveAttribute(
      'title',
      'To skip ahead to a specific, more important point.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'cutTo_section_expanded', /To skip ahead to a specific, more important point/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'cutTo', /To skip ahead to a specific, more important point/i, /Let's cut to the chase/i, renderPage, getCard);

// --- together ---

describe('CutVerbPage — "together" section definitions', () => {
  it('renders definition for editing film or audio', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To edit film or audio by joining distinct pieces/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To edit film or audio by joining distinct pieces/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To edit film or audio by joining distinct pieces/i)).toHaveAttribute(
      'title',
      'To edit film or audio by joining distinct pieces.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'cutTogether_section_expanded', /To edit film or audio by joining distinct pieces/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'cutTogether', /To edit film or audio by joining distinct pieces/i, /The marketing team cut together/i, renderPage, getCard);

// --- up ---

describe('CutVerbPage — "up" section definitions', () => {
  it('renders definition for chopping into pieces', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To chop into small pieces/i)).toBeInTheDocument();
  });

  it('renders definition for acting silly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To act silly or cause a playful disruption/i)).toBeInTheDocument();
  });

  it('renders definition for upsetting someone emotionally', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To deeply upset someone emotionally/i)).toBeInTheDocument();
  });

  it('renders definition for criticizing severely', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To severely criticize/i)).toBeInTheDocument();
  });

  it("renders definition for driving aggressively across someone's path", () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To drive aggressively across someone's path/i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To chop into small pieces/i)).toHaveClass('truncate');
    expect(screen.getByText(/To act silly or cause a playful disruption/i)).toHaveClass('truncate');
    expect(screen.getByText(/To deeply upset someone emotionally/i)).toHaveClass('truncate');
    expect(screen.getByText(/To severely criticize/i)).toHaveClass('truncate');
    expect(screen.getByText(/To drive aggressively across someone's path/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To chop into small pieces/i)).toHaveAttribute(
      'title',
      'To chop into small pieces.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'cutUp_section_expanded', /To chop into small pieces/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'cutUp', /To chop into small pieces/i, /Could you cut up the carrots/i, renderPage, getCard);
