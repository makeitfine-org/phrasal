import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'ThrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around_round ---

describe('ThrowVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for scattering things untidily', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To scatter things untidily\./i)).toBeInTheDocument();
  });

  it('renders definition for discussing ideas casually', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To discuss ideas or suggestions casually\./i)).toBeInTheDocument();
  });

  it('renders definition for using power aggressively', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To use power, money, or authority aggressively or recklessly/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    const defs = [
      screen.getByText(/To scatter things untidily\./i),
      screen.getByText(/To discuss ideas or suggestions casually\./i),
      screen.getByText(/To use power, money, or authority aggressively or recklessly/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To scatter things untidily\./i)).toHaveAttribute(
      'title',
      'To scatter things untidily.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To discuss ideas or suggestions casually\./i)).toHaveAttribute(
      'title',
      'To discuss ideas or suggestions casually.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To use power, money, or authority aggressively or recklessly/i)).toHaveAttribute(
      'title',
      'To use power, money, or authority aggressively or recklessly (often "throw one\'s weight around").'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'throwAbout_section_expanded', /To scatter things untidily\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'throwAbout', /To scatter things untidily\./i, /Clothes and books were thrown about the messy room\./i, renderPage, getCard);

// --- away ---

describe('ThrowVerbPage — "away" section definitions', () => {
  it('renders definition for discarding as trash', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To discard as trash\./i)).toBeInTheDocument();
  });

  it('renders definition for wasting an opportunity', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To waste or fail to make use of an opportunity or advantage\./i)).toBeInTheDocument();
  });

  it('renders definition for speaking casually or unintentionally', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To speak casually or unintentionally/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    const defs = [
      screen.getByText(/To discard as trash\./i),
      screen.getByText(/To waste or fail to make use of an opportunity or advantage\./i),
      screen.getByText(/To speak casually or unintentionally/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To discard as trash\./i)).toHaveAttribute(
      'title',
      'To discard as trash.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To waste or fail to make use of an opportunity or advantage\./i)).toHaveAttribute(
      'title',
      'To waste or fail to make use of an opportunity or advantage.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To speak casually or unintentionally/i)).toHaveAttribute(
      'title',
      'To speak casually or unintentionally (a "throwaway" comment).'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'throwAway_section_expanded', /To discard as trash\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'throwAway', /To discard as trash\./i, /Don't throw away that receipt; you might need it\./i, renderPage, getCard);

// --- back ---

describe('ThrowVerbPage — "back" section definitions', () => {
  it('renders definition for drinking something quickly', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To drink something quickly/i)).toBeInTheDocument();
  });

  it('renders definition for reverting to an earlier time or type', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To revert to or resemble an earlier time or type/i)).toBeInTheDocument();
  });

  it('renders definition for delaying or impeding progress', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To delay or impede progress\./i)).toBeInTheDocument();
  });

  it('renders definition for being forced to rely on something', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To be forced to rely on something/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    const defs = [
      screen.getByText(/To drink something quickly/i),
      screen.getByText(/To revert to or resemble an earlier time or type/i),
      screen.getByText(/To delay or impede progress\./i),
      screen.getByText(/To be forced to rely on something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To drink something quickly/i)).toHaveAttribute(
      'title',
      'To drink something quickly (usually alcohol).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To revert to or resemble an earlier time or type/i)).toHaveAttribute(
      'title',
      'To revert to or resemble an earlier time or type (often a noun: "throwback").'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To delay or impede progress\./i)).toHaveAttribute(
      'title',
      'To delay or impede progress.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To be forced to rely on something/i)).toHaveAttribute(
      'title',
      'To be forced to rely on something (often "throw back on").'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'throwBack_section_expanded', /To drink something quickly/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'throwBack', /To drink something quickly/i, /He threw back a shot of whiskey and left the bar\./i, renderPage, getCard);

// --- down ---

describe('ThrowVerbPage — "down" section definitions', () => {
  it('renders definition for dropping something to the ground violently', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To drop or push someone or something to the ground violently or abruptly\./i)).toBeInTheDocument();
  });

  it('renders definition for issuing a challenge', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To issue a challenge/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To drop or push someone or something to the ground violently or abruptly\./i),
      screen.getByText(/To issue a challenge/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To drop or push someone or something to the ground violently or abruptly\./i)).toHaveAttribute(
      'title',
      'To drop or push someone or something to the ground violently or abruptly.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To issue a challenge/i)).toHaveAttribute(
      'title',
      'To issue a challenge (often "throw down the gauntlet").'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'throwDown_section_expanded', /To drop or push someone or something to the ground violently or abruptly\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'throwDown', /To drop or push someone or something to the ground violently or abruptly\./i, /He threw down his pen in frustration and walked out\./i, renderPage, getCard);

// --- in ---

describe('ThrowVerbPage — "in" section definitions', () => {
  it('renders definition for including something extra for free', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include something extra for free with a purchase\./i)).toBeInTheDocument();
  });

  it('renders definition for interjecting a remark', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interject or add a remark to a conversation\./i)).toBeInTheDocument();
  });

  it('renders definition for surrendering or giving up', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To surrender or give up/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    const defs = [
      screen.getByText(/To include something extra for free with a purchase\./i),
      screen.getByText(/To interject or add a remark to a conversation\./i),
      screen.getByText(/To surrender or give up/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include something extra for free with a purchase\./i)).toHaveAttribute(
      'title',
      'To include something extra for free with a purchase.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interject or add a remark to a conversation\./i)).toHaveAttribute(
      'title',
      'To interject or add a remark to a conversation.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To surrender or give up/i)).toHaveAttribute(
      'title',
      'To surrender or give up (often "throw in the towel").'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'throwIn_section_expanded', /To include something extra for free with a purchase\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'throwIn', /To include something extra for free with a purchase\./i, /If you buy the laptop today, we'll throw in a carrying case\./i, renderPage, getCard);

// --- into ---

describe('ThrowVerbPage — "into" section definitions', () => {
  it('renders definition for forcing into a negative condition', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To force a person, group, or place into a specific, usually negative, condition\./i)).toBeInTheDocument();
  });

  it('renders definition for engaging enthusiastically in a task', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To engage enthusiastically in a task/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    const defs = [
      screen.getByText(/To force a person, group, or place into a specific, usually negative, condition\./i),
      screen.getByText(/To engage enthusiastically in a task/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To force a person, group, or place into a specific, usually negative, condition\./i)).toHaveAttribute(
      'title',
      'To force a person, group, or place into a specific, usually negative, condition.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To engage enthusiastically in a task/i)).toHaveAttribute(
      'title',
      'To engage enthusiastically in a task (usually "throw oneself into").'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'throwInto_section_expanded', /To force a person, group, or place into a specific, usually negative, condition\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'throwInto', /To force a person, group, or place into a specific, usually negative, condition\./i, /The sudden power outage threw the entire city into chaos\./i, renderPage, getCard);

// --- off ---

describe('ThrowVerbPage — "off" section definitions', () => {
  it('renders definition for removing clothing quickly', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove quickly or carelessly/i)).toBeInTheDocument();
  });

  it('renders definition for freeing oneself from something negative', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To free oneself from something negative/i)).toBeInTheDocument();
  });

  it('renders definition for confusing or misleading someone', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To confuse, distract, or mislead someone\./i)).toBeInTheDocument();
  });

  it('renders definition for emitting or radiating', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To emit or radiate/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    const defs = [
      screen.getByText(/To remove quickly or carelessly/i),
      screen.getByText(/To free oneself from something negative/i),
      screen.getByText(/To confuse, distract, or mislead someone\./i),
      screen.getByText(/To emit or radiate/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove quickly or carelessly/i)).toHaveAttribute(
      'title',
      'To remove quickly or carelessly (clothing).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To free oneself from something negative/i)).toHaveAttribute(
      'title',
      'To free oneself from something negative (illness, trouble, restraint).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To confuse, distract, or mislead someone\./i)).toHaveAttribute(
      'title',
      'To confuse, distract, or mislead someone.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To emit or radiate/i)).toHaveAttribute(
      'title',
      'To emit or radiate (heat, light, smell).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'throwOff_section_expanded', /To remove quickly or carelessly/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'throwOff', /To remove quickly or carelessly/i, /She threw off her heavy winter coat as soon as she entered the house\./i, renderPage, getCard);

// --- on ---

describe('ThrowVerbPage — "on" section definitions', () => {
  it('renders definition for putting on clothing quickly', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on quickly or hastily/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on quickly or hastily/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on quickly or hastily/i)).toHaveAttribute(
      'title',
      'To put on quickly or hastily (clothing).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'throwOn_section_expanded', /To put on quickly or hastily/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'throwOn', /To put on quickly or hastily/i, /I just threw on a pair of jeans and ran to the grocery store\./i, renderPage, getCard);

// --- out ---

describe('ThrowVerbPage — "out" section definitions', () => {
  it('renders definition for discarding as trash', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discard or dispose of something as trash\./i)).toBeInTheDocument();
  });

  it('renders definition for evicting someone', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To evict or expel someone from a place\./i)).toBeInTheDocument();
  });

  it('renders definition for rejecting or dismissing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To reject or dismiss/i)).toBeInTheDocument();
  });

  it('renders definition for emitting or radiating', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To emit or radiate/i)).toBeInTheDocument();
  });

  it('renders definition for offering an idea for consideration', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To offer an idea or suggestion for consideration\./i)).toBeInTheDocument();
  });

  it('renders definition for confusing someone causing a mistake', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To confuse someone or cause them to make a mistake/i)).toBeInTheDocument();
  });

  it('all 6 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To discard or dispose of something as trash\./i),
      screen.getByText(/To evict or expel someone from a place\./i),
      screen.getByText(/To reject or dismiss/i),
      screen.getByText(/To emit or radiate/i),
      screen.getByText(/To offer an idea or suggestion for consideration\./i),
      screen.getByText(/To confuse someone or cause them to make a mistake/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discard or dispose of something as trash\./i)).toHaveAttribute(
      'title',
      'To discard or dispose of something as trash.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To evict or expel someone from a place\./i)).toHaveAttribute(
      'title',
      'To evict or expel someone from a place.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To reject or dismiss/i)).toHaveAttribute(
      'title',
      'To reject or dismiss (a plan, idea, or legal case).'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To emit or radiate/i)).toHaveAttribute(
      'title',
      'To emit or radiate (light, heat, smoke).'
    );
  });

  it('fifth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To offer an idea or suggestion for consideration\./i)).toHaveAttribute(
      'title',
      'To offer an idea or suggestion for consideration.'
    );
  });

  it('sixth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To confuse someone or cause them to make a mistake/i)).toHaveAttribute(
      'title',
      'To confuse someone or cause them to make a mistake (chiefly British).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'throwOut_section_expanded', /To discard or dispose of something as trash\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'throwOut', /To discard or dispose of something as trash\./i, /It's time to throw out all these old magazines\./i, renderPage, getCard);

// --- over ---

describe('ThrowVerbPage — "over" section definitions', () => {
  it('renders definition for abandoning a romantic partner', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To abandon, reject, or leave someone/i)).toBeInTheDocument();
  });

  it('renders definition for abandoning a plan or idea', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To abandon a plan or idea\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To abandon, reject, or leave someone/i),
      screen.getByText(/To abandon a plan or idea\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To abandon, reject, or leave someone/i)).toHaveAttribute(
      'title',
      'To abandon, reject, or leave someone (especially a romantic partner).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To abandon a plan or idea\./i)).toHaveAttribute(
      'title',
      'To abandon a plan or idea.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'throwOver_section_expanded', /To abandon, reject, or leave someone/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'throwOver', /To abandon, reject, or leave someone/i, /She threw him over for a wealthy businessman\./i, renderPage, getCard);

// --- together ---

describe('ThrowVerbPage — "together" section definitions', () => {
  it('renders definition for assembling something quickly', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To make, prepare, or assemble something quickly or hastily\./i)).toBeInTheDocument();
  });

  it('renders definition for forcing people to associate due to circumstances', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To force people to associate with each other due to circumstances\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('together');
    const defs = [
      screen.getByText(/To make, prepare, or assemble something quickly or hastily\./i),
      screen.getByText(/To force people to associate with each other due to circumstances\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To make, prepare, or assemble something quickly or hastily\./i)).toHaveAttribute(
      'title',
      'To make, prepare, or assemble something quickly or hastily.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To force people to associate with each other due to circumstances\./i)).toHaveAttribute(
      'title',
      'To force people to associate with each other due to circumstances.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'throwTogether_section_expanded', /To make, prepare, or assemble something quickly or hastily\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'throwTogether', /To make, prepare, or assemble something quickly or hastily\./i, /I didn't have much time, so I just threw together a quick salad\./i, renderPage, getCard);

// --- up ---

describe('ThrowVerbPage — "up" section definitions', () => {
  it('renders definition for vomiting', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To vomit\./i)).toBeInTheDocument();
  });

  it('renders definition for producing or revealing something', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To produce, reveal, or bring to light/i)).toBeInTheDocument();
  });

  it('renders definition for building something hastily', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To build or construct something hastily\./i)).toBeInTheDocument();
  });

  it('renders definition for quitting or abandoning suddenly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To quit or abandon/i)).toBeInTheDocument();
  });

  it('renders definition for causing something to rise into the air', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To cause something/i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To vomit\./i),
      screen.getByText(/To produce, reveal, or bring to light/i),
      screen.getByText(/To build or construct something hastily\./i),
      screen.getByText(/To quit or abandon/i),
      screen.getByText(/To cause something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To vomit\./i)).toHaveAttribute(
      'title',
      'To vomit.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To produce, reveal, or bring to light/i)).toHaveAttribute(
      'title',
      'To produce, reveal, or bring to light (ideas, problems, results).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To build or construct something hastily\./i)).toHaveAttribute(
      'title',
      'To build or construct something hastily.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To quit or abandon/i)).toHaveAttribute(
      'title',
      'To quit or abandon (a job or position) suddenly.'
    );
  });

  it('fifth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To cause something/i)).toHaveAttribute(
      'title',
      'To cause something (like dust or water) to rise into the air.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'throwUp_section_expanded', /To vomit\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'throwUp', /To vomit\./i, /The turbulent flight made him throw up\./i, renderPage, getCard);
