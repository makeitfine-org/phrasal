import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('GoVerbPage — "about" section definitions', () => {
  it('renders definition for beginning to tackle a task', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To begin to tackle a task or problem/i)).toBeInTheDocument();
  });

  it('renders definition for behaving in a normal way', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To behave or do things in a normal or usual way/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'about', 'goAbout_section_expanded', /To begin to tackle a task or problem/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'goAbout', /To begin to tackle a task or problem/i, /"I don't know how to go about fixing this complex bug/i, renderPage, getCard);

// --- across ---

describe('GoVerbPage — "across" section definitions', () => {
  it('renders definition for moving to the other side', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To move to the other side of something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'across', 'goAcross_section_expanded', /To move to the other side of something/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'goAcross', /To move to the other side of something/i, /"We need to go across the street/i, renderPage, getCard);

// --- after ---

describe('GoVerbPage — "after" section definitions', () => {
  it('renders definition for trying to catch or stop someone', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To try to catch or stop someone/i)).toBeInTheDocument();
  });

  it('renders definition for trying to achieve a goal', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To try to achieve or get something \(like a job or goal\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'after', 'goAfter_section_expanded', /To try to catch or stop someone/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'goAfter', /To try to catch or stop someone/i, /"The police went after the thief/i, renderPage, getCard);

// --- against ---

describe('GoVerbPage — "against" section definitions', () => {
  it('renders definition for opposing or disagreeing', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose or disagree with something/i)).toBeInTheDocument();
  });

  it('renders definition for being unfavorable to someone', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To be unfavorable to someone \(especially in contests or legal cases\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'against', 'goAgainst_section_expanded', /To oppose or disagree with something/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'goAgainst', /To oppose or disagree with something/i, /"Implementing this feature goes against our main design principles/i, renderPage, getCard);

// --- ahead ---

describe('GoVerbPage — "ahead" section definitions', () => {
  it('renders definition for starting or proceeding with an action', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To start or proceed with an action/i)).toBeInTheDocument();
  });

  it('renders definition for moving in front of someone', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To move in front of someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'ahead', 'goAhead_section_expanded', /To start or proceed with an action/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'goAhead', /To start or proceed with an action/i, /"We have the budget, so we can go ahead/i, renderPage, getCard);

// --- around_round ---

describe('GoVerbPage — "around / round" section definitions', () => {
  it('renders definition for circulating or spreading', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To circulate or spread \(illness or news\)/i)).toBeInTheDocument();
  });

  it('renders definition for being enough for everyone', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To be enough for everyone to have a share/i)).toBeInTheDocument();
  });

  it('renders definition for visiting someone at their location', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To visit someone at their location/i)).toBeInTheDocument();
  });

  it('renders definition for spinning or rotating', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To spin or rotate/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'around / round', 'goAround_section_expanded', /To circulate or spread \(illness or news\)/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'goAround', /To circulate or spread \(illness or news\)/i, /"There is a rumor going around about a new software release/i, renderPage, getCard);

// --- away ---

describe('GoVerbPage — "away" section definitions', () => {
  it('renders definition for leaving a place or person', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To leave a place or person/i)).toBeInTheDocument();
  });

  it('renders definition for disappearing or fading', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To disappear or fade/i)).toBeInTheDocument();
  });

  it('renders definition for leaving home for a holiday', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To leave home for a holiday/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'away', 'goAway_section_expanded', /To leave a place or person/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'goAway', /To leave a place or person/i, /"Please go away, I need to focus/i, renderPage, getCard);

// --- back ---

describe('GoVerbPage — "back" section definitions', () => {
  it('renders definition for returning to a place or state', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a place or previous state/i)).toBeInTheDocument();
  });

  it('renders definition for having existed since a specific time', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To have existed or started since a specific time/i)).toBeInTheDocument();
  });

  it('renders definition for breaking a promise', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To break a promise or agreement/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'back', 'goBack_section_expanded', /To return to a place or previous state/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'goBack', /To return to a place or previous state/i, /"I need to go back to the office/i, renderPage, getCard);

// --- behind ---

describe('GoVerbPage — "behind" section definitions', () => {
  it('renders definition for going to the back of something', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To go to the back of something/i)).toBeInTheDocument();
  });

  it('renders definition for doing something secretly', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To do something secretly without someone's knowledge or permission/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'behind', 'goBehind_section_expanded', /To go to the back of something/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'goBehind', /To go to the back of something/i, /"The cat went behind the sofa/i, renderPage, getCard);

// --- by ---

describe('GoVerbPage — "by" section definitions', () => {
  it('renders definition for time passing', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To pass \(used for time\)/i)).toBeInTheDocument();
  });

  it('renders definition for basing a decision on something', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To base a decision on something or follow rules/i)).toBeInTheDocument();
  });

  it('renders definition for being known by a name', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be known by a specific name/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'by', 'goBy_section_expanded', /To pass \(used for time\)/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'goBy', /To pass \(used for time\)/i, /"As the years went by, the technology improved/i, renderPage, getCard);

// --- down ---

describe('GoVerbPage — "down" section definitions', () => {
  it('renders definition for decreasing or falling', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To decrease or fall/i)).toBeInTheDocument();
  });

  it('renders definition for stopping working (computers or systems)', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(computers or systems\)/i)).toBeInTheDocument();
  });

  it('renders definition for being remembered in a certain way', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To be remembered in a certain way/i)).toBeInTheDocument();
  });

  it('renders definition for being received by an audience', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To be received by an audience in a specific way/i)).toBeInTheDocument();
  });

  it('renders definition for setting (the sun)', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To set \(the sun\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'down', 'goDown_section_expanded', /To decrease or fall/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'goDown', /To decrease or fall/i, /"Our server error rates went down/i, renderPage, getCard);

// --- for ---

describe('GoVerbPage — "for" section definitions', () => {
  it('renders definition for choosing or selecting', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To choose or select something/i)).toBeInTheDocument();
  });

  it('renders definition for trying to achieve something', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To try to achieve or get something/i)).toBeInTheDocument();
  });

  it('renders definition for attacking someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To attack someone physically or verbally/i)).toBeInTheDocument();
  });

  it('renders definition for applying equally to someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To apply equally to someone or something else/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'for', 'goFor_section_expanded', /To choose or select something/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'goFor', /To choose or select something/i, /"I will go for the standard Java framework/i, renderPage, getCard);

// --- forward ---

describe('GoVerbPage — "forward" section definitions', () => {
  it('renders definition for progressing or advancing', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To progress or advance with a plan or idea/i)).toBeInTheDocument();
  });

  it('renders definition for moving clocks ahead', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move clocks ahead \(daylight saving time\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'forward', 'goForward_section_expanded', /To progress or advance with a plan or idea/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'goForward', /To progress or advance with a plan or idea/i, /"We are going forward with the new business strategy/i, renderPage, getCard);

// --- general ---

const ALL_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

describe('GoVerbPage — general', () => {
  it('renders "Go" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Go' })).toBeInTheDocument();
  });

  it('renders all 25 section particles', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expect(screen.getByText(p)).toBeInTheDocument();
    }
  });

  it('all sections start collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To explode or fire/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To increase or rise/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To experience a difficult situation/i)).not.toBeInTheDocument();
  });

  it('shows badge "7" in exactly 1 section (off)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('7')).toHaveLength(1);
  });

  it('shows badge "6" in exactly 2 sections (off and on)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('6')).toHaveLength(2);
  });

  it('shows badge "5" in exactly 5 sections (off, on, down, out, through)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('5')).toHaveLength(5);
  });

  it('shows badge "4" in exactly 8 sections', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('4')).toHaveLength(8);
  });

  it('badge "1" appears in every expanded section', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(25);
  });
});

// --- in ---

describe('GoVerbPage — "in" section definitions', () => {
  it('renders definition for entering a place', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a place/i)).toBeInTheDocument();
  });

  it('renders definition for being understood or remembered', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be understood or remembered/i)).toBeInTheDocument();
  });

  it('renders definition for becoming hidden (the sun)', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To become hidden \(the sun going behind clouds\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'in', 'goIn_section_expanded', /To enter a place/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'goIn', /To enter a place/i, /"The door is open, so you can go in/i, renderPage, getCard);

// --- into ---

describe('GoVerbPage — "into" section definitions', () => {
  it('renders definition for discussing in detail', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To discuss or explain something in detail/i)).toBeInTheDocument();
  });

  it('renders definition for entering a profession or business', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a specific profession or business/i)).toBeInTheDocument();
  });

  it('renders definition for crashing or colliding', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To crash or collide with something/i)).toBeInTheDocument();
  });

  it('renders definition for entering a state or condition', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a specific state or condition/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'into', 'goInto_section_expanded', /To discuss or explain something in detail/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'goInto', /To discuss or explain something in detail/i, /"Let's not go into the budget problems/i, renderPage, getCard);

// --- off ---

describe('GoVerbPage — "off" section definitions', () => {
  it('renders definition for exploding or firing', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To explode or fire \(a weapon or device\)/i)).toBeInTheDocument();
  });

  it('renders definition for making a loud noise (alarm)', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To make a sudden loud noise \(an alarm\)/i)).toBeInTheDocument();
  });

  it('renders definition for stopping working or powering down', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop working or power down/i)).toBeInTheDocument();
  });

  it('renders definition for spoiling or going bad', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To spoil or go bad \(food\)/i)).toBeInTheDocument();
  });

  it('renders definition for happening in a specific way', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To happen in a specific way/i)).toBeInTheDocument();
  });

  it('renders definition for stopping liking someone or something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop liking someone or something/i)).toBeInTheDocument();
  });

  it('renders definition for leaving a place', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a place/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'off', 'goOff_section_expanded', /To explode or fire \(a weapon or device\)/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'goOff', /To explode or fire \(a weapon or device\)/i, /"The bomb went off in the city center/i, renderPage, getCard);

// --- on ---

describe('GoVerbPage — "on" section definitions', () => {
  it('renders definition for continuing', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue doing something/i)).toBeInTheDocument();
  });

  it('renders definition for happening', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To happen or be taking place/i)).toBeInTheDocument();
  });

  it('renders definition for starting operating', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To start operating \(power, lights, machines\)/i)).toBeInTheDocument();
  });

  it('renders definition for talking too much', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To talk too much or at excessive length/i)).toBeInTheDocument();
  });

  it('renders definition for proceeding to do something next', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To proceed to do something next after completing a previous action/i)).toBeInTheDocument();
  });

  it('renders definition for basing an opinion on something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To base an opinion or decision on something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'on', 'goOn_section_expanded', /To continue doing something/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'goOn', /To continue doing something/i, /"Please go on with your code explanation/i, renderPage, getCard);

// --- out ---

describe('GoVerbPage — "out" section definitions', () => {
  it('renders definition for leaving home for a social event', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave home for a social event or activity/i)).toBeInTheDocument();
  });

  it('renders definition for stopping burning or shining', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop burning or shining \(fire or lights\)/i)).toBeInTheDocument();
  });

  it('renders definition for being published or sent', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be published, broadcast, or sent/i)).toBeInTheDocument();
  });

  it('renders definition for becoming unfashionable', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To become unfashionable or out of date/i)).toBeInTheDocument();
  });

  it('renders definition for having a romantic relationship', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To have a romantic relationship with someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'out', 'goOut_section_expanded', /To leave home for a social event or activity/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'goOut', /To leave home for a social event or activity/i, /"We are going out for dinner to celebrate/i, renderPage, getCard);

// --- over ---

describe('GoVerbPage — "over" section definitions', () => {
  it('renders definition for reviewing or examining carefully', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To review, check, or examine something carefully/i)).toBeInTheDocument();
  });

  it('renders definition for moving toward someone', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To move toward someone or something/i)).toBeInTheDocument();
  });

  it('renders definition for being received by an audience', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To be received in a specific way by an audience/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'over', 'goOver_section_expanded', /To review, check, or examine something carefully/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'goOver', /To review, check, or examine something carefully/i, /"Let's go over the project requirements/i, renderPage, getCard);

// --- through ---

describe('GoVerbPage — "through" section definitions', () => {
  it('renders definition for experiencing a difficult situation', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To experience a difficult situation/i)).toBeInTheDocument();
  });

  it('renders definition for searching or examining carefully', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To search or examine something carefully/i)).toBeInTheDocument();
  });

  it('renders definition for being officially approved or completed', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be officially approved or completed/i)).toBeInTheDocument();
  });

  it('renders definition for using up a supply', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To use up a supply of something/i)).toBeInTheDocument();
  });

  it('renders definition for practising or rehearsing', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To practise or rehearse something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'through', 'goThrough_section_expanded', /To experience a difficult situation/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'goThrough', /To experience a difficult situation/i, /"The company went through a tough financial period/i, renderPage, getCard);

// --- to ---

describe('GoVerbPage — "to" section definitions', () => {
  it('renders definition for starting a specific action or entering a state', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start a specific action or enter a state/i)).toBeInTheDocument();
  });

  it('renders definition for being given or assigned to someone', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To be given or assigned to someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'to', 'goTo_section_expanded', /To start a specific action or enter a state/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'goTo', /To start a specific action or enter a state/i, /"After 12 hours of coding, I finally went to sleep/i, renderPage, getCard);

// --- together ---

describe('GoVerbPage — "together" section definitions', () => {
  it('renders definition for looking good in combination', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To look or sound good in combination/i)).toBeInTheDocument();
  });

  it('renders definition for frequently accompanying each other', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To frequently accompany each other/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'together', 'goTogether_section_expanded', /To look or sound good in combination/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'goTogether', /To look or sound good in combination/i, /"The new logo and the brand colors go together/i, renderPage, getCard);

// --- up ---

describe('GoVerbPage — "up" section definitions', () => {
  it('renders definition for increasing or rising', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To increase or rise/i)).toBeInTheDocument();
  });

  it('renders definition for being built or constructed', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be built or constructed/i)).toBeInTheDocument();
  });

  it('renders definition for exploding or catching fire', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To explode or catch fire/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'up', 'goUp_section_expanded', /To increase or rise/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'goUp', /To increase or rise/i, /"Software licensing prices have gone up/i, renderPage, getCard);

// --- with ---

describe('GoVerbPage — "with" section definitions', () => {
  it('renders definition for matching or suiting something', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To match or suit something/i)).toBeInTheDocument();
  });

  it('renders definition for choosing or accepting an idea', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To choose or accept an idea or offer/i)).toBeInTheDocument();
  });

  it('renders definition for accompanying someone', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To accompany someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'with', 'goWith_section_expanded', /To match or suit something/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'goWith', /To match or suit something/i, /"That font doesn't go with the website/i, renderPage, getCard);

// --- without ---

describe('GoVerbPage — "without" section definitions', () => {
  it('renders definition for managing without something', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To manage or live without something you usually have/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'without', 'goWithout_section_expanded', /To manage or live without something you usually have/i, renderPage);

describeChevronAndColour(LABEL, 'without', renderPage);

describeDefaultImageCards(LABEL, 'without', 'goWithout', /To manage or live without something you usually have/i, /"The budget is tight, so we will have to go without/i, renderPage, getCard);
