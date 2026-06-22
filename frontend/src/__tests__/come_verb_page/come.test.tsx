import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('ComeVerbPage — "about" section definitions', () => {
  it('renders definition for happening or occurring', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To happen or occur, especially in a way that is not planned/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'about', 'comeAbout_section_expanded', /To happen or occur, especially in a way that is not planned/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'comeAbout', /To happen or occur, especially in a way that is not planned/i, /"How did this bug in the Java code come about\?"/i, renderPage, getCard);

// --- across ---

describe('ComeVerbPage — "across" section definitions', () => {
  it('renders definition for finding something by chance', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To find or meet something or someone by chance/i)).toBeInTheDocument();
  });

  it('renders definition for giving an impression', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To give a specific impression to others/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'across', 'comeAcross_section_expanded', /To find or meet something or someone by chance/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'comeAcross', /To find or meet something or someone by chance/i, /"I came across an excellent article on Agile leadership yesterday/i, renderPage, getCard);

// --- after ---

describe('ComeVerbPage — "after" section definitions', () => {
  it('renders definition for chasing or pursuing someone', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To chase or pursue someone \(often to punish them or take something\)/i)).toBeInTheDocument();
  });

  it('renders definition for following in time or order', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To follow in time or order/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'after', 'comeAfter_section_expanded', /To chase or pursue someone \(often to punish them or take something\)/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'comeAfter', /To chase or pursue someone \(often to punish them or take something\)/i, /"If we break the NDA, the client's legal team will come after us/i, renderPage, getCard);

// --- against ---

describe('ComeVerbPage — "against" section definitions', () => {
  it('renders definition for facing a difficult problem or opposition', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To face a difficult problem or strong opposition \(come up against\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'against', 'comeAgainst_section_expanded', /To face a difficult problem or strong opposition \(come up against\)/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'comeAgainst', /To face a difficult problem or strong opposition \(come up against\)/i, /"We came up against several security issues during deployment/i, renderPage, getCard);

// --- ahead ---

describe('ComeVerbPage — "ahead" section definitions', () => {
  it('renders definition for finishing in a winning position', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To finish in a winning, profitable, or advantageous position \(come out ahead\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'ahead', 'comeAhead_section_expanded', /To finish in a winning, profitable, or advantageous position \(come out ahead\)/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'comeAhead', /To finish in a winning, profitable, or advantageous position \(come out ahead\)/i, /"Despite the economic crisis, our company came out ahead of the competition/i, renderPage, getCard);

// --- apart ---

describe('ComeVerbPage — "apart" section definitions', () => {
  it('renders definition for breaking into pieces or failing', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To break into pieces or fail completely/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'apart', 'comeApart_section_expanded', /To break into pieces or fail completely/i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'comeApart', /To break into pieces or fail completely/i, /"The legacy system is so old that its architecture is starting to come apart/i, renderPage, getCard);

// --- around_round ---

describe('ComeVerbPage — "around / round" section definitions', () => {
  it('renders definition for changing opinion', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To change your opinion to agree with someone else/i)).toBeInTheDocument();
  });

  it('renders definition for visiting someone', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To visit someone at their home or desk/i)).toBeInTheDocument();
  });

  it('renders definition for regaining consciousness', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To regain consciousness \(wake up after fainting\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'around / round', 'comeAround_section_expanded', /To change your opinion to agree with someone else/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'comeAround', /To change your opinion to agree with someone else/i, /"He didn't like the new Java framework at first, but he came around/i, renderPage, getCard);

// --- away ---

describe('ComeVerbPage — "away" section definitions', () => {
  it('renders definition for leaving with a specific feeling', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To leave a place or situation with a specific feeling, idea, or result/i)).toBeInTheDocument();
  });

  it('renders definition for separating or detaching', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To separate or detach from something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'away', 'comeAway_section_expanded', /To leave a place or situation with a specific feeling, idea, or result/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'comeAway', /To leave a place or situation with a specific feeling, idea, or result/i, /"I came away from the strategy meeting feeling very optimistic about Q3/i, renderPage, getCard);

// --- back ---

describe('ComeVerbPage — "back" section definitions', () => {
  it('renders definition for returning to a place or topic', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a place, state, or topic/i)).toBeInTheDocument();
  });

  it('renders definition for becoming popular again', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To become popular or fashionable again/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'back', 'comeBack_section_expanded', /To return to a place, state, or topic/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'comeBack', /To return to a place, state, or topic/i, /"Let's come back to the budget discussion after lunch/i, renderPage, getCard);

// --- behind ---

describe('ComeVerbPage — "behind" section definitions', () => {
  it('renders definition for following or ranking lower', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To follow closely or to rank lower than something else in a list/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'behind', 'comeBehind_section_expanded', /To follow closely or to rank lower than something else in a list/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'comeBehind', /To follow closely or to rank lower than something else in a list/i, /"In the market share report, our main product comes behind theirs/i, renderPage, getCard);

// --- by ---

describe('ComeVerbPage — "by" section definitions', () => {
  it('renders definition for obtaining something rare', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To get or obtain something, especially something that is rare or hard to find/i)).toBeInTheDocument();
  });

  it('renders definition for making a short visit', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, casual visit/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'by', 'comeBy_section_expanded', /To get or obtain something, especially something that is rare or hard to find/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'comeBy', /To get or obtain something, especially something that is rare or hard to find/i, /"Experienced Senior Java Developers are hard to come by these days/i, renderPage, getCard);

// --- down ---

describe('ComeVerbPage — "down" section definitions', () => {
  it('renders definition for falling or decreasing', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fall or decrease \(prices, levels, etc\.\)/i)).toBeInTheDocument();
  });

  it('renders definition for making a firm decision', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make a firm decision or support a specific side/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'down', 'comeDown_section_expanded', /To fall or decrease \(prices, levels, etc\.\)/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'comeDown', /To fall or decrease \(prices, levels, etc\.\)/i, /"Our cloud hosting costs have finally come down this month/i, renderPage, getCard);

// --- for ---

describe('ComeVerbPage — "for" section definitions', () => {
  it('renders definition for arriving to collect someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To arrive in order to collect someone or something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'for', 'comeFor_section_expanded', /To arrive in order to collect someone or something/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'comeFor', /To arrive in order to collect someone or something/i, /"The courier will come for the signed contracts at 3:00 PM/i, renderPage, getCard);

// --- forward ---

describe('ComeVerbPage — "forward" section definitions', () => {
  it('renders definition for offering help or information', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To offer help, information, or take responsibility/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'forward', 'comeForward_section_expanded', /To offer help, information, or take responsibility/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'comeForward', /To offer help, information, or take responsibility/i, /"We need two volunteers to come forward and lead the new internal project/i, renderPage, getCard);

// --- general ---

const ALL_PARTICLES = [
  'about', 'across', 'after', 'against', 'ahead', 'apart', 'around / round',
  'away', 'back', 'behind', 'by', 'down', 'for', 'forward', 'in', 'into',
  'off', 'on', 'out', 'over', 'through', 'to', 'together', 'up', 'with', 'without',
];

describe('ComeVerbPage — general', () => {
  it('renders "Come" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Come' })).toBeInTheDocument();
  });

  it('renders all 26 section particles', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expect(screen.getByText(p)).toBeInTheDocument();
    }
  });

  it('all sections start collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To happen or occur/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To find or meet something/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To reach a total amount/i)).not.toBeInTheDocument();
  });

  it('shows badge "4" in exactly 1 section (to)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('4')).toHaveLength(1);
  });

  it('shows badge "3" in exactly 7 sections (around/round, in, on, out, through, up, to)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('3')).toHaveLength(7);
  });

  it('shows badge "2" in exactly 17 sections', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('2')).toHaveLength(17);
  });

  it('badge "1" appears in every expanded section', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(26);
  });
});

// --- in ---

describe('ComeVerbPage — "in" section definitions', () => {
  it('renders definition for entering a room or building', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a room or building/i)).toBeInTheDocument();
  });

  it('renders definition for becoming relevant or involved', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To become relevant or involved in a situation/i)).toBeInTheDocument();
  });

  it('renders definition for arriving', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive \(news, money, results\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'in', 'comeIn_section_expanded', /To enter a room or building/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'comeIn', /To enter a room or building/i, /"Please come in and take a seat/i, renderPage, getCard);

// --- into ---

describe('ComeVerbPage — "into" section definitions', () => {
  it('renders definition for inheriting money or property', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To inherit money or property/i)).toBeInTheDocument();
  });

  it('renders definition for becoming a factor or taking effect', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To become a factor or take effect/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'into', 'comeInto_section_expanded', /To inherit money or property/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'comeInto', /To inherit money or property/i, /"He came into a lot of money and started his own software firm/i, renderPage, getCard);

// --- off ---

describe('ComeVerbPage — "off" section definitions', () => {
  it('renders definition for happening successfully', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To happen successfully or go exactly as planned/i)).toBeInTheDocument();
  });

  it('renders definition for detaching or being removed', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To detach or be removed from something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'off', 'comeOff_section_expanded', /To happen successfully or go exactly as planned/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'comeOff', /To happen successfully or go exactly as planned/i, /"The software launch came off without a single major bug/i, renderPage, getCard);

// --- on ---

describe('ComeVerbPage — "on" section definitions', () => {
  it('renders definition for starting to function', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To start functioning \(machines, systems, lights\)/i)).toBeInTheDocument();
  });

  it('renders definition for making progress', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To make progress or improve/i)).toBeInTheDocument();
  });

  it('renders definition for encouraging someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/Used to encourage someone to hurry up, try harder, or stop being unreasonable/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'on', 'comeOn_section_expanded', /To start functioning \(machines, systems, lights\)/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'comeOn', /To start functioning \(machines, systems, lights\)/i, /"When the power failed, the backup servers came on automatically/i, renderPage, getCard);

// --- out ---

describe('ComeVerbPage — "out" section definitions', () => {
  it('renders definition for being published or released', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be published, released, or made available to the public/i)).toBeInTheDocument();
  });

  it('renders definition for becoming known', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To become known \(often secrets or truth\)/i)).toBeInTheDocument();
  });

  it('renders definition for being removed like a stain', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be removed \(like a stain\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'out', 'comeOut_section_expanded', /To be published, released, or made available to the public/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'comeOut', /To be published, released, or made available to the public/i, /"The next version of the Java Development Kit comes out next month/i, renderPage, getCard);

// --- over ---

describe('ComeVerbPage — "over" section definitions', () => {
  it("renders definition for visiting someone's house or office", () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To visit someone's house, office, or country/i)).toBeInTheDocument();
  });

  it('renders definition for affecting someone with a strong feeling', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To affect someone suddenly with a strong feeling/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'over', 'comeOver_section_expanded', /To visit someone's house, office, or country/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'comeOver', /To visit someone's house, office, or country/i, /"The regional manager is coming over from London next week/i, renderPage, getCard);

// --- through ---

describe('ComeVerbPage — "through" section definitions', () => {
  it('renders definition for surviving a difficult situation', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To successfully complete or survive a difficult situation/i)).toBeInTheDocument();
  });

  it('renders definition for delivering what was promised', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To deliver what was promised or expected/i)).toBeInTheDocument();
  });

  it('renders definition for being approved or arriving', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be approved or to arrive \(official documents, messages\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'through', 'comeThrough_section_expanded', /To successfully complete or survive a difficult situation/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'comeThrough', /To successfully complete or survive a difficult situation/i, /"Thanks to strong leadership, the company came through the financial crisis/i, renderPage, getCard);

// --- to ---

describe('ComeVerbPage — "to" section definitions', () => {
  it('renders definition for reaching a total amount', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reach a total amount/i)).toBeInTheDocument();
  });

  it('renders definition for reaching a state or decision', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reach a state, decision, or situation/i)).toBeInTheDocument();
  });

  it('renders definition for regaining consciousness', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To regain consciousness/i)).toBeInTheDocument();
  });

  it('renders definition for concerning a specific topic', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/Concerning a specific topic \(when it comes to\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'to', 'comeTo_section_expanded', /To reach a total amount/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'comeTo', /To reach a total amount/i, /"The total cost for the new software licenses comes to \$15,000/i, renderPage, getCard);

// --- together ---

describe('ComeVerbPage — "together" section definitions', () => {
  it('renders definition for uniting as a group', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To unite as a group for a common purpose/i)).toBeInTheDocument();
  });

  it('renders definition for forming a coherent whole', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To begin to form a coherent, successful whole/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'together', 'comeTogether_section_expanded', /To unite as a group for a common purpose/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'comeTogether', /To unite as a group for a common purpose/i, /"The entire IT department came together to resolve the server outage/i, renderPage, getCard);

// --- up ---

describe('ComeVerbPage — "up" section definitions', () => {
  it('renders definition for being mentioned in conversation', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be mentioned or discussed in conversation/i)).toBeInTheDocument();
  });

  it('renders definition for happening unexpectedly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To happen unexpectedly \(often causing a problem\)/i)).toBeInTheDocument();
  });

  it('renders definition for approaching in time', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To approach in time/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'up', 'comeUp_section_expanded', /To be mentioned or discussed in conversation/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'comeUp', /To be mentioned or discussed in conversation/i, /"The topic of remote work came up during the board meeting/i, renderPage, getCard);

// --- with ---

describe('ComeVerbPage — "with" section definitions', () => {
  it('renders definition for being included in a product or deal', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To be included as part of a product, package, or deal/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'with', 'comeWith_section_expanded', /To be included as part of a product, package, or deal/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'comeWith', /To be included as part of a product, package, or deal/i, /"The enterprise software license comes with 24\/7 technical support/i, renderPage, getCard);

// --- without ---

describe('ComeVerbPage — "without" section definitions', () => {
  it('renders definition for lacking a normally included feature', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To lack a feature or item that is normally included/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'without', 'comeWithout_section_expanded', /To lack a feature or item that is normally included/i, renderPage);

describeChevronAndColour(LABEL, 'without', renderPage);

describeDefaultImageCards(LABEL, 'without', 'comeWithout', /To lack a feature or item that is normally included/i, /"The basic version of the app comes without the advanced analytics dashboard/i, renderPage, getCard);
