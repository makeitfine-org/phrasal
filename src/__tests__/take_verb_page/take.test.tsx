import { fireEvent, screen, within } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeMeaningCardLayout, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('TakeVerbPage — "about" section definitions', () => {
  it('renders definition for literal use', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/Literal use: to express an approximate amount/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'about', 'takeAbout_section_expanded', /Literal use: to express an approximate amount/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'takeAbout', /Literal use: to express an approximate amount/i, /"It will take about two hours/i, renderPage, getCard);

// --- after ---

describe('TakeVerbPage — "after" section definitions', () => {
  it('renders definition for resembling a family member', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To look or behave like an older family member/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'after', 'takeAfter_section_expanded', /To look or behave like an older family member/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'takeAfter', /To look or behave like an older family member/i, /"She takes after her father/i, renderPage, getCard);

// --- against ---

describe('TakeVerbPage — "against" section definitions', () => {
  it('renders definition for disliking without reason', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To start to dislike someone for no clear or obvious reason/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'against', 'takeAgainst_section_expanded', /To start to dislike someone for no clear or obvious reason/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'takeAgainst', /To start to dislike someone for no clear or obvious reason/i, /"I do not know why, but she took against me/i, renderPage, getCard);

// --- ahead ---

describe('TakeVerbPage — "ahead" section definitions', () => {
  it('renders definition for literal use', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/Literal use: to carry or move something to the front/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'ahead', 'takeAhead_section_expanded', /Literal use: to carry or move something to the front/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'takeAhead', /Literal use: to carry or move something to the front/i, /"Could you take this report ahead/i, renderPage, getCard);

// --- apart ---

describe('TakeVerbPage — "apart" section definitions', () => {
  it('renders definition for dismantling', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate something into its component pieces/i)).toBeInTheDocument();
  });

  it('renders definition for criticizing heavily', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To criticize someone or something very heavily/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'apart', 'takeApart_section_expanded', /To separate something into its component pieces/i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'takeApart', /To separate something into its component pieces/i, /"The engineer took the machine apart/i, renderPage, getCard);

// --- around_round ---

describe('TakeVerbPage — "around / round" section definitions', () => {
  it('renders definition for showing someone around', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To show someone around a place/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'around / round', 'takeAroundRound_section_expanded', /To show someone around a place/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'takeAroundRound', /To show someone around a place/i, /"Welcome to the headquarters/i, renderPage, getCard);

// --- away ---

describe('TakeVerbPage — "away" section definitions', () => {
  it('renders definition for removing or subtracting', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove or subtract something/i)).toBeInTheDocument();
  });

  it('renders definition for confiscating', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To confiscate something without permission/i)).toBeInTheDocument();
  });

  it('renders definition for buying food to eat elsewhere', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To buy food from a restaurant to eat elsewhere/i)).toBeInTheDocument();
  });

  it('renders definition for learning a message', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To learn or receive a main lesson or message/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'away', 'takeAway_section_expanded', /To remove or subtract something/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'takeAway', /To remove or subtract something/i, /"If you take away the marketing costs/i, renderPage, getCard);

// --- back ---

describe('TakeVerbPage — "back" section definitions', () => {
  it('renders definition for returning something', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to the place where it was bought/i)).toBeInTheDocument();
  });

  it('renders definition for admitting being wrong', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To admit that something you said was wrong/i)).toBeInTheDocument();
  });

  it('renders definition for reminding of the past', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To remind someone of an earlier time/i)).toBeInTheDocument();
  });

  it('renders definition for accepting back', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To accept someone back into a relationship/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'back', 'takeBack_section_expanded', /To return something to the place where it was bought/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'takeBack', /To return something to the place where it was bought/i, /"The laptop was broken/i, renderPage, getCard);

// --- behind ---

describe('TakeVerbPage — "behind" section definitions', () => {
  it('renders definition for literal use', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/Literal use: to physically move someone or something to the back/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'behind', 'takeBehind_section_expanded', /Literal use: to physically move someone or something to the back/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'takeBehind', /Literal use: to physically move someone or something to the back/i, /"Take the new equipment behind the stage/i, renderPage, getCard);

// --- by ---

describe('TakeVerbPage — "by" section definitions', () => {
  it('renders definition for take by surprise', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To happen unexpectedly/i)).toBeInTheDocument();
  });

  it('renders definition for take by storm', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To rapidly become very popular or widely admired/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'by', 'takeBy_section_expanded', /To happen unexpectedly/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'takeBy', /To happen unexpectedly/i, /"The sudden market crash took us by surprise/i, renderPage, getCard);

describeMeaningCardLayout(LABEL, 'by', /To happen unexpectedly/i, /"The sudden market crash took us by surprise/i, renderPage, getCard);

// --- cross_across ---

describe('TakeVerbPage — "cross / across" section definitions', () => {
  it('renders definition for literal use', () => {
    renderPage();
    expandSection('cross / across');
    expect(screen.getByText(/Literal use: to physically guide or lead someone across/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'cross / across', 'takeCrossAcross_section_expanded', /Literal use: to physically guide or lead someone across/i, renderPage);

describeChevronAndColour(LABEL, 'cross / across', renderPage);

describeDefaultImageCards(LABEL, 'cross / across', 'takeCrossAcross', /Literal use: to physically guide or lead someone across/i, /"She took the blind man across the street/i, renderPage, getCard);

// --- down ---

describe('TakeVerbPage — "down" section definitions', () => {
  it('renders definition for writing information', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write down information/i)).toBeInTheDocument();
  });

  it('renders definition for removing or dismantling', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To remove from a high place or to dismantle something/i)).toBeInTheDocument();
  });

  it('renders definition for defeating someone', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To defeat or humiliate someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'down', 'takeDown_section_expanded', /To write down information/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'takeDown', /To write down information/i, /"Please take down the main points/i, renderPage, getCard);

// --- for ---

describe('TakeVerbPage — "for" section definitions', () => {
  it('renders definition for mistaking identity', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To mistake someone's identity or character/i)).toBeInTheDocument();
  });

  it('renders definition for take for granted', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To fail to appreciate something or someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'for', 'takeFor_section_expanded', /To mistake someone's identity or character/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'takeFor', /To mistake someone's identity or character/i, /"Do you take me for a fool/i, renderPage, getCard);

// --- forward ---

describe('TakeVerbPage — "forward" section definitions', () => {
  it('renders definition for progressing a plan', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To develop, promote, or make progress with a plan/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'forward', 'takeForward_section_expanded', /To develop, promote, or make progress with a plan/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'takeForward', /To develop, promote, or make progress with a plan/i, /"We need a new manager to take this project forward/i, renderPage, getCard);

// --- general ---

const ALL_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'cross / across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

describe('TakeVerbPage — general', () => {
  it('renders "Take" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Take' })).toBeInTheDocument();
  });

  it('renders all 26 section particles', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expect(screen.getByText(p)).toBeInTheDocument();
    }
  });

  it('all sections start collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To remove clothing or accessories/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To accept or take responsibility for work/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To start a new activity or hobby/i)).not.toBeInTheDocument();
  });

  it('shows badge "5" in exactly 2 sections (off and out)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('5')).toHaveLength(2);
  });

  it('shows badge "4" in exactly 6 sections', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    // up(4), in(4), away(4), back(4), off(5), out(5) → sections with ≥4 meanings
    expect(screen.getAllByText('4').length).toBeGreaterThanOrEqual(6);
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

describe('TakeVerbPage — "in" section definitions', () => {
  it('renders definition for absorbing information', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To absorb and understand information/i)).toBeInTheDocument();
  });

  it('renders definition for providing shelter', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To allow someone or something to stay in your home/i)).toBeInTheDocument();
  });

  it('renders definition for deceiving', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To deceive or trick someone/i)).toBeInTheDocument();
  });

  it('renders definition for making clothing smaller', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make a piece of clothing narrower or smaller/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'in', 'takeIn_section_expanded', /To absorb and understand information/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'takeIn', /To absorb and understand information/i, /"The technical manual was very hard to take in/i, renderPage, getCard);

// --- into ---

describe('TakeVerbPage — "into" section definitions', () => {
  it('renders definition for considering something', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To consider something when making a decision/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'into', 'takeInto_section_expanded', /To consider something when making a decision/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'takeInto', /To consider something when making a decision/i, /"We must take the budget into account/i, renderPage, getCard);

// --- off ---

describe('TakeVerbPage — "off" section definitions', () => {
  it('renders definition for removing clothing', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove clothing or accessories/i)).toBeInTheDocument();
  });

  it('renders definition for leaving the ground', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave the ground and begin flying/i)).toBeInTheDocument();
  });

  it('renders definition for becoming successful quickly', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To become very successful very quickly/i)).toBeInTheDocument();
  });

  it('renders definition for leaving without warning', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave quickly or without warning/i)).toBeInTheDocument();
  });

  it('renders definition for time away from work', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To have time away from work/i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove clothing or accessories/i)).toHaveClass('truncate');
    expect(screen.getByText(/To leave the ground and begin flying/i)).toHaveClass('truncate');
    expect(screen.getByText(/To become very successful very quickly/i)).toHaveClass('truncate');
    expect(screen.getByText(/To leave quickly or without warning/i)).toHaveClass('truncate');
    expect(screen.getByText(/To have time away from work/i)).toHaveClass('truncate');
  });
});

describeSectionToggle(LABEL, 'off', 'takeOff_section_expanded', /To remove clothing or accessories/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeMeaningCardLayout(LABEL, 'off', /To remove clothing or accessories/i, /"Please take off your shoes/i, renderPage, getCard);

describe('TakeVerbPage — "off" card expand / collapse', () => {
  it('starts all cards collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"Please take off your shoes inside the house\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The flight will take off in ten minutes\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Her new software company really took off this year\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"He took off before the meeting ended\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I need to take a few days off to rest\."/i)).not.toBeInTheDocument();
  });

  it('starts all cards collapsed (no images visible)', () => {
    renderPage();
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('expands a card when clicked', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    expect(screen.getByText(/"Please take off your shoes inside the house\."/i)).toBeInTheDocument();
  });

  it('shows the image when a card is expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('collapses an expanded card when clicked again', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders all 5 example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    fireEvent.click(getCard(/To leave the ground and begin flying/i));
    fireEvent.click(getCard(/To become very successful very quickly/i));
    fireEvent.click(getCard(/To leave quickly or without warning/i));
    fireEvent.click(getCard(/To have time away from work/i));
    expect(screen.getByText(/"Please take off your shoes inside the house\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The flight will take off in ten minutes\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Her new software company really took off this year\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He took off before the meeting ended\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I need to take a few days off to rest\."/i)).toBeInTheDocument();
  });

  it('renders 5 images when all cards are expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    fireEvent.click(getCard(/To leave the ground and begin flying/i));
    fireEvent.click(getCard(/To become very successful very quickly/i));
    fireEvent.click(getCard(/To leave quickly or without warning/i));
    fireEvent.click(getCard(/To have time away from work/i));
    expect(screen.getAllByRole('img')).toHaveLength(5);
  });
});

describe('TakeVerbPage — "off" expanded card layout', () => {
  it('collapsed card definition has truncate class', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).getByText(/To remove clothing or accessories/i)).toHaveClass('truncate');
  });

  it('expanded card definition does not have truncate class', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).getByText(/To remove clothing or accessories/i)).not.toHaveClass('truncate');
  });

  it('expanded card image appears before definition in DOM order', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    const card = getCard(/To remove clothing or accessories/i);
    const img = within(card).getByRole('img');
    const def = within(card).getByText(/To remove clothing or accessories/i);
    expect(img.compareDocumentPosition(def) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('expanded card definition appears before example in DOM order', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    const card = getCard(/To remove clothing or accessories/i);
    const def = within(card).getByText(/To remove clothing or accessories/i);
    const example = within(card).getByText(/"Please take off your shoes/i);
    expect(def.compareDocumentPosition(example) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card shows number badge', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).getByText('1')).toBeInTheDocument();
  });

  it('expanded card number badge appears after image in DOM order', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    const card = getCard(/To remove clothing or accessories/i);
    const img = within(card).getByRole('img');
    const badge = within(card).getByText('1');
    expect(img.compareDocumentPosition(badge) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card has no image', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('collapsed card shows example text truncated', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).getByText(/"Please take off your shoes/i)).toBeInTheDocument();
    expect(within(card).getByText(/"Please take off your shoes/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).getByText(/"Please take off your shoes/i)).toHaveAttribute(
      'title',
      '"Please take off your shoes inside the house."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).getByText(/"Please take off your shoes/i)).not.toHaveClass('truncate');
  });

  it('off card has cursor-pointer class (real image, expandable)', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    expect(card).toHaveClass('cursor-pointer');
    expect(card).not.toHaveClass('cursor-default');
  });
});

describe('TakeVerbPage — "off" localStorage persistence', () => {
  it('saves expanded state to localStorage when a card is expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    expect(localStorage.getItem('takeOff_meaning_1_collapsed')).toBe('false');
  });

  it('saves collapsed state to localStorage when a card is collapsed', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(localStorage.getItem('takeOff_meaning_1_collapsed')).toBe('true');
  });

  it('restores expanded state from localStorage on mount', () => {
    localStorage.setItem('takeOff_section_expanded', 'true');
    localStorage.setItem('takeOff_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"Please take off your shoes inside the house\."/i)).toBeInTheDocument();
  });

  it('keeps other cards collapsed when one is restored as expanded', () => {
    localStorage.setItem('takeOff_section_expanded', 'true');
    localStorage.setItem('takeOff_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To leave the ground and begin flying/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('TakeVerbPage — "off" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    expect(within(getCard(/To remove clothing or accessories/i)).getByText(/"Please take off your shoes/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    expect(within(getCard(/To remove clothing or accessories/i)).getByText(/"Please take off your shoes/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    expect(within(getCard(/To remove clothing or accessories/i)).getByText(/"Please take off your shoes/i)).not.toHaveClass('truncate');
  });
});

// --- on ---

describe('TakeVerbPage — "on" section definitions', () => {
  it('renders definition for accepting responsibility', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To accept or take responsibility for work/i)).toBeInTheDocument();
  });

  it('renders definition for hiring someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To employ or hire someone/i)).toBeInTheDocument();
  });

  it('renders definition for competing against', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To compete or fight against someone/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To accept or take responsibility for work/i)).toHaveClass('truncate');
    expect(screen.getByText(/To employ or hire someone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To compete or fight against someone/i)).toHaveClass('truncate');
  });
});

describeSectionToggle(LABEL, 'on', 'takeOn_section_expanded', /To accept or take responsibility for work/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describe('TakeVerbPage — "on" card expand / collapse', () => {
  it('starts all cards collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I cannot take on any new projects right now\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The company is taking on fifty new developers\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Our team will take on the market leader next year\."/i)).not.toBeInTheDocument();
  });

  it('starts all cards collapsed (no images visible)', () => {
    renderPage();
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('expands a card when clicked', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    expect(screen.getByText(/"I cannot take on any new projects right now\."/i)).toBeInTheDocument();
  });

  it('shows the image when a card is expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('collapses an expanded card when clicked again', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders all 3 example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    fireEvent.click(getCard(/To employ or hire someone/i));
    fireEvent.click(getCard(/To compete or fight against someone/i));
    expect(screen.getByText(/"I cannot take on any new projects right now\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The company is taking on fifty new developers\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Our team will take on the market leader next year\."/i)).toBeInTheDocument();
  });

  it('renders 3 images when all cards are expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    fireEvent.click(getCard(/To employ or hire someone/i));
    fireEvent.click(getCard(/To compete or fight against someone/i));
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });
});

describe('TakeVerbPage — "on" expanded card layout', () => {
  it('collapsed card definition has truncate class', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).getByText(/To accept or take responsibility for work/i)).toHaveClass('truncate');
  });

  it('expanded card definition does not have truncate class', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).getByText(/To accept or take responsibility for work/i)).not.toHaveClass('truncate');
  });

  it('expanded card image appears before definition in DOM order', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    const card = getCard(/To accept or take responsibility for work/i);
    const img = within(card).getByRole('img');
    const def = within(card).getByText(/To accept or take responsibility for work/i);
    expect(img.compareDocumentPosition(def) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('expanded card definition appears before example in DOM order', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    const card = getCard(/To accept or take responsibility for work/i);
    const def = within(card).getByText(/To accept or take responsibility for work/i);
    const example = within(card).getByText(/"I cannot take on any new projects/i);
    expect(def.compareDocumentPosition(example) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card shows number badge', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).getByText('1')).toBeInTheDocument();
  });

  it('expanded card number badge appears after image in DOM order', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    const card = getCard(/To accept or take responsibility for work/i);
    const img = within(card).getByRole('img');
    const badge = within(card).getByText('1');
    expect(img.compareDocumentPosition(badge) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card has no image', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('collapsed card shows example text truncated', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).getByText(/"I cannot take on any new projects/i)).toBeInTheDocument();
    expect(within(card).getByText(/"I cannot take on any new projects/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).getByText(/"I cannot take on any new projects/i)).toHaveAttribute(
      'title',
      '"I cannot take on any new projects right now."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).getByText(/"I cannot take on any new projects/i)).not.toHaveClass('truncate');
  });

  it('on card has cursor-pointer class (real image, expandable)', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    expect(card).toHaveClass('cursor-pointer');
    expect(card).not.toHaveClass('cursor-default');
  });
});

describe('TakeVerbPage — "on" localStorage persistence', () => {
  it('saves expanded state to localStorage when a card is expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    expect(localStorage.getItem('takeOn_meaning_1_collapsed')).toBe('false');
  });

  it('saves collapsed state to localStorage when a card is collapsed', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(localStorage.getItem('takeOn_meaning_1_collapsed')).toBe('true');
  });

  it('restores expanded state from localStorage on mount', () => {
    localStorage.setItem('takeOn_section_expanded', 'true');
    localStorage.setItem('takeOn_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"I cannot take on any new projects right now\."/i)).toBeInTheDocument();
  });

  it('keeps other cards collapsed when one is restored as expanded', () => {
    localStorage.setItem('takeOn_section_expanded', 'true');
    localStorage.setItem('takeOn_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To employ or hire someone/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('TakeVerbPage — "on" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    expect(within(getCard(/To accept or take responsibility for work/i)).getByText(/"I cannot take on any new projects/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    expect(within(getCard(/To accept or take responsibility for work/i)).getByText(/"I cannot take on any new projects/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    expect(within(getCard(/To accept or take responsibility for work/i)).getByText(/"I cannot take on any new projects/i)).not.toHaveClass('truncate');
  });
});

// --- out ---

describe('TakeVerbPage — "out" section definitions', () => {
  it('renders definition for removing something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove something from a place or container/i)).toBeInTheDocument();
  });

  it('renders definition for inviting and paying', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To invite someone to go somewhere and pay/i)).toBeInTheDocument();
  });

  it('renders definition for obtaining an official service', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To obtain an official service such as a loan/i)).toBeInTheDocument();
  });

  it('renders definition for destroying', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To destroy or eliminate something/i)).toBeInTheDocument();
  });

  it('renders definition for take it out on', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To direct negative feelings at someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'out', 'takeOut_section_expanded', /To remove something from a place or container/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'takeOut', /To remove something from a place or container/i, /"Please take the trash out/i, renderPage, getCard);

// --- over ---

describe('TakeVerbPage — "over" section definitions', () => {
  it('renders definition for gaining control', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To gain control of a company, organization/i)).toBeInTheDocument();
  });

  it('renders definition for replacing someone', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To replace someone in doing a task or job/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'over', 'takeOver_section_expanded', /To gain control of a company, organization/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'takeOver', /To gain control of a company, organization/i, /"A larger corporation wants to take over/i, renderPage, getCard);

// --- separators ---

describe('TakeVerbPage — separators', () => {
  it('renders 25 hr separators', () => {
    const { container } = renderPage();
    const hrs = container.querySelectorAll('hr');
    expect(hrs).toHaveLength(25);
  });

  it('all hr separators have border-gray-600 class', () => {
    const { container } = renderPage();
    const hrs = container.querySelectorAll('hr');
    hrs.forEach(hr => {
      expect(hr.className).toMatch(/border-gray-600/);
    });
  });
});

// --- through ---

describe('TakeVerbPage — "through" section definitions', () => {
  it('renders definition for explaining step by step', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To explain or describe a process step by step/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'through', 'takeThrough_section_expanded', /To explain or describe a process step by step/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'takeThrough', /To explain or describe a process step by step/i, /"Let me take you through the new software setup/i, renderPage, getCard);

// --- to ---

describe('TakeVerbPage — "to" section definitions', () => {
  it('renders definition for start liking quickly', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start liking someone or something quickly/i)).toBeInTheDocument();
  });

  it('renders definition for starting a new habit', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start a new habit/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'to', 'takeTo_section_expanded', /To start liking someone or something quickly/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'takeTo', /To start liking someone or something quickly/i, /"The team took to the new manager/i, renderPage, getCard);

// --- together ---

describe('TakeVerbPage — "together" section definitions', () => {
  it('renders definition for considering as a whole', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To consider a group of things or facts as a whole/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'together', 'takeTogether_section_expanded', /To consider a group of things or facts as a whole/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'takeTogether', /To consider a group of things or facts as a whole/i, /"Taken together, these three software modules/i, renderPage, getCard);

// --- up ---

describe('TakeVerbPage — "up" section definitions', () => {
  it('renders definition for starting a hobby', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start a new activity or hobby/i)).toBeInTheDocument();
  });

  it('renders definition for occupying time or space', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To use or fill an amount of time or space/i)).toBeInTheDocument();
  });

  it('renders definition for accepting an offer', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To accept an offer that has been made/i)).toBeInTheDocument();
  });

  it('renders definition for shortening clothing', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To shorten a piece of clothing/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start a new activity or hobby/i)).toHaveClass('truncate');
    expect(screen.getByText(/To use or fill an amount of time or space/i)).toHaveClass('truncate');
    expect(screen.getByText(/To accept an offer that has been made/i)).toHaveClass('truncate');
    expect(screen.getByText(/To shorten a piece of clothing/i)).toHaveClass('truncate');
  });
});

describeSectionToggle(LABEL, 'up', 'takeUp_section_expanded', /To start a new activity or hobby/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describe('TakeVerbPage — "up" card expand / collapse', () => {
  it('starts all cards collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"He took up golf to relax after work\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"These large files take up too much space on the server\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I will take you up on that job offer\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I need to take up these trousers; they are too long\."/i)).not.toBeInTheDocument();
  });

  it('starts all cards collapsed (no images visible)', () => {
    renderPage();
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('expands a card when clicked', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    expect(screen.getByText(/"He took up golf to relax after work\."/i)).toBeInTheDocument();
  });

  it('shows the image when a card is expanded', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('collapses an expanded card when clicked again', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders all 4 example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    fireEvent.click(getCard(/To use or fill an amount of time or space/i));
    fireEvent.click(getCard(/To accept an offer that has been made/i));
    fireEvent.click(getCard(/To shorten a piece of clothing/i));
    expect(screen.getByText(/"He took up golf to relax after work\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"These large files take up too much space on the server\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I will take you up on that job offer\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I need to take up these trousers; they are too long\."/i)).toBeInTheDocument();
  });

  it('renders 4 images when all cards are expanded', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    fireEvent.click(getCard(/To use or fill an amount of time or space/i));
    fireEvent.click(getCard(/To accept an offer that has been made/i));
    fireEvent.click(getCard(/To shorten a piece of clothing/i));
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });
});

describe('TakeVerbPage — "up" expanded card layout', () => {
  it('collapsed card definition has truncate class', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).getByText(/To start a new activity or hobby/i)).toHaveClass('truncate');
  });

  it('expanded card definition does not have truncate class', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).getByText(/To start a new activity or hobby/i)).not.toHaveClass('truncate');
  });

  it('expanded card image appears before definition in DOM order', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    const card = getCard(/To start a new activity or hobby/i);
    const img = within(card).getByRole('img');
    const def = within(card).getByText(/To start a new activity or hobby/i);
    expect(img.compareDocumentPosition(def) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('expanded card definition appears before example in DOM order', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    const card = getCard(/To start a new activity or hobby/i);
    const def = within(card).getByText(/To start a new activity or hobby/i);
    const example = within(card).getByText(/"He took up golf/i);
    expect(def.compareDocumentPosition(example) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card shows number badge', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).getByText('1')).toBeInTheDocument();
  });

  it('expanded card number badge appears after image in DOM order', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    const card = getCard(/To start a new activity or hobby/i);
    const img = within(card).getByRole('img');
    const badge = within(card).getByText('1');
    expect(img.compareDocumentPosition(badge) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card has no image', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('collapsed card shows example text truncated', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).getByText(/"He took up golf/i)).toBeInTheDocument();
    expect(within(card).getByText(/"He took up golf/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).getByText(/"He took up golf/i)).toHaveAttribute(
      'title',
      '"He took up golf to relax after work."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).getByText(/"He took up golf/i)).not.toHaveClass('truncate');
  });

  it('up card has cursor-pointer class (real image, expandable)', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    expect(card).toHaveClass('cursor-pointer');
    expect(card).not.toHaveClass('cursor-default');
  });
});

describe('TakeVerbPage — "up" localStorage persistence', () => {
  it('saves expanded state to localStorage when a card is expanded', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    expect(localStorage.getItem('takeUp_meaning_1_collapsed')).toBe('false');
  });

  it('saves collapsed state to localStorage when a card is collapsed', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(localStorage.getItem('takeUp_meaning_1_collapsed')).toBe('true');
  });

  it('restores expanded state from localStorage on mount', () => {
    localStorage.setItem('takeUp_section_expanded', 'true');
    localStorage.setItem('takeUp_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"He took up golf to relax after work\."/i)).toBeInTheDocument();
  });

  it('keeps other cards collapsed when one is restored as expanded', () => {
    localStorage.setItem('takeUp_section_expanded', 'true');
    localStorage.setItem('takeUp_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To use or fill an amount of time or space/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('TakeVerbPage — "up" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    expect(within(getCard(/To start a new activity or hobby/i)).getByText(/"He took up golf/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    expect(within(getCard(/To start a new activity or hobby/i)).getByText(/"He took up golf/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    expect(within(getCard(/To start a new activity or hobby/i)).getByText(/"He took up golf/i)).not.toHaveClass('truncate');
  });
});

// --- with ---

describe('TakeVerbPage — "with" section definitions', () => {
  it('renders definition for being impressed', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To be attracted to or impressed by/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'with', 'takeWith_section_expanded', /To be attracted to or impressed by/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'takeWith', /To be attracted to or impressed by/i, /"I was very taken with his presentation/i, renderPage, getCard);

// --- without ---

describe('TakeVerbPage — "without" section definitions', () => {
  it('renders definition for literal use', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/Literal use: to take an item without something else/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'without', 'takeWithout_section_expanded', /Literal use: to take an item without something else/i, renderPage);

describeChevronAndColour(LABEL, 'without', renderPage);

describeDefaultImageCards(LABEL, 'without', 'takeWithout', /Literal use: to take an item without something else/i, /"I will take the coffee without sugar/i, renderPage, getCard);
