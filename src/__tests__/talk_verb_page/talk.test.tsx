import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('TalkVerbPage — "about" section definitions', () => {
  it('renders definition for discussing a specific topic', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To discuss a specific topic, person, or idea\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To discuss a specific topic, person, or idea\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To discuss a specific topic, person, or idea\./i)).toHaveAttribute(
      'title',
      'To discuss a specific topic, person, or idea.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'talkAbout_section_expanded', /To discuss a specific topic, person, or idea\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'talkAbout', /To discuss a specific topic, person, or idea\./i, /We need to talk about the new software update\./i, renderPage, getCard);

// --- across ---

describe('TalkVerbPage — "across" section definitions', () => {
  it('renders definition for speaking at the same time as someone else', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To speak at the same time as someone else/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To speak at the same time as someone else/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To speak at the same time as someone else/i)).toHaveAttribute(
      'title',
      'To speak at the same time as someone else, often in a confusing way where people are not listening to each other.'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'talkAcross_section_expanded', /To speak at the same time as someone else/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'talkAcross', /To speak at the same time as someone else/i, /The meeting was a mess because everyone was talking across each other\./i, renderPage, getCard);

// --- against ---

describe('TalkVerbPage — "against" section definitions', () => {
  it('renders definition for speaking in opposition', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To speak in opposition to an idea, plan, or person\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To speak in opposition to an idea, plan, or person\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To speak in opposition to an idea, plan, or person\./i)).toHaveAttribute(
      'title',
      'To speak in opposition to an idea, plan, or person.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'talkAgainst_section_expanded', /To speak in opposition to an idea, plan, or person\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'talkAgainst', /To speak in opposition to an idea, plan, or person\./i, /Several managers talked against the proposed budget cuts\./i, renderPage, getCard);

// --- around_round ---

describe('TalkVerbPage — "around / round" section definitions', () => {
  it('renders definition for avoiding the main issue', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To avoid speaking directly about the main issue\./i)).toBeInTheDocument();
  });

  it('renders definition for persuading someone to change their mind', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To persuade someone to agree with you or change their mind\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round');
    const defs = [
      screen.getByText(/To avoid speaking directly about the main issue\./i),
      screen.getByText(/To persuade someone to agree with you or change their mind\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To avoid speaking directly about the main issue\./i)).toHaveAttribute(
      'title',
      'To avoid speaking directly about the main issue.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To persuade someone to agree with you or change their mind\./i)).toHaveAttribute(
      'title',
      'To persuade someone to agree with you or change their mind.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'talkAround_section_expanded', /To avoid speaking directly about the main issue\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'talkAround', /To avoid speaking directly about the main issue\./i, /Stop talking around the problem and tell me what is wrong\./i, renderPage, getCard);

// --- away ---

describe('TalkVerbPage — "away" section definitions', () => {
  it('renders definition for continuing talking for a long time', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To continue talking for a long time, often in a relaxed manner\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To continue talking for a long time, often in a relaxed manner\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To continue talking for a long time, often in a relaxed manner\./i)).toHaveAttribute(
      'title',
      'To continue talking for a long time, often in a relaxed manner.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'talkAway_section_expanded', /To continue talking for a long time, often in a relaxed manner\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'talkAway', /To continue talking for a long time, often in a relaxed manner\./i, /We sat in the cafe, talking away for hours\./i, renderPage, getCard);

// --- back ---

describe('TalkVerbPage — "back" section definitions', () => {
  it('renders definition for replying rudely to someone in authority', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reply rudely to someone in a position of authority/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reply rudely to someone in a position of authority/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reply rudely to someone in a position of authority/i)).toHaveAttribute(
      'title',
      'To reply rudely to someone in a position of authority (like a parent, teacher, or boss).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'talkBack_section_expanded', /To reply rudely to someone in a position of authority/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'talkBack', /To reply rudely to someone in a position of authority/i, /The student was sent to the principal for talking back to his teacher\./i, renderPage, getCard);

// --- down ---

describe('TalkVerbPage — "down" section definitions', () => {
  it('renders definition for speaking condescendingly', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To speak to someone as if they are less intelligent/i)).toBeInTheDocument();
  });

  it('renders definition for negotiating a lower price', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To negotiate a lower price for something\./i)).toBeInTheDocument();
  });

  it('renders definition for guiding an aircraft to land', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To guide an aircraft to a safe landing using radio instructions\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To speak to someone as if they are less intelligent/i),
      screen.getByText(/To negotiate a lower price for something\./i),
      screen.getByText(/To guide an aircraft to a safe landing using radio instructions\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To speak to someone as if they are less intelligent/i)).toHaveAttribute(
      'title',
      'To speak to someone as if they are less intelligent or less important than you (talk down to).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To negotiate a lower price for something\./i)).toHaveAttribute(
      'title',
      'To negotiate a lower price for something.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To guide an aircraft to a safe landing using radio instructions\./i)).toHaveAttribute(
      'title',
      'To guide an aircraft to a safe landing using radio instructions.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'talkDown_section_expanded', /To speak to someone as if they are less intelligent/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'talkDown', /To speak to someone as if they are less intelligent/i, /A good leader never talks down to their team members\./i, renderPage, getCard);

// --- for ---

describe('TalkVerbPage — "for" section definitions', () => {
  it('renders definition for speaking on behalf of someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To speak on behalf of someone else or a group\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To speak on behalf of someone else or a group\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To speak on behalf of someone else or a group\./i)).toHaveAttribute(
      'title',
      'To speak on behalf of someone else or a group.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'talkFor_section_expanded', /To speak on behalf of someone else or a group\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'talkFor', /To speak on behalf of someone else or a group\./i, /I can only talk for myself, not the whole department\./i, renderPage, getCard);

// --- into ---

describe('TalkVerbPage — "into" section definitions', () => {
  it('renders definition for persuading someone to do something', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To persuade someone to do something they initially did not want to do\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To persuade someone to do something they initially did not want to do\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To persuade someone to do something they initially did not want to do\./i)).toHaveAttribute(
      'title',
      'To persuade someone to do something they initially did not want to do.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'talkInto_section_expanded', /To persuade someone to do something they initially did not want to do\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'talkInto', /To persuade someone to do something they initially did not want to do\./i, /She talked me into taking the management course\./i, renderPage, getCard);

// --- on ---

describe('TalkVerbPage — "on" section definitions', () => {
  it('renders definition for continuing to talk for a long time', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue talking, often for a long time or in a boring way\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue talking, often for a long time or in a boring way\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue talking, often for a long time or in a boring way\./i)).toHaveAttribute(
      'title',
      'To continue talking, often for a long time or in a boring way.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'talkOn_section_expanded', /To continue talking, often for a long time or in a boring way\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'talkOn', /To continue talking, often for a long time or in a boring way\./i, /He talked on and on about his holiday\./i, renderPage, getCard);

// --- out ---

describe('TalkVerbPage — "out" section definitions', () => {
  it('renders definition for discussing a problem until resolved', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discuss a problem thoroughly until it is completely resolved\./i)).toBeInTheDocument();
  });

  it('renders definition for persuading someone not to do something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To persuade someone not to do something/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To discuss a problem thoroughly until it is completely resolved\./i),
      screen.getByText(/To persuade someone not to do something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discuss a problem thoroughly until it is completely resolved\./i)).toHaveAttribute(
      'title',
      'To discuss a problem thoroughly until it is completely resolved.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To persuade someone not to do something/i)).toHaveAttribute(
      'title',
      'To persuade someone not to do something (talk out of).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'talkOut_section_expanded', /To discuss a problem thoroughly until it is completely resolved\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'talkOut', /To discuss a problem thoroughly until it is completely resolved\./i, /We had a disagreement, but we sat down and talked it out\./i, renderPage, getCard);

// --- over ---

describe('TalkVerbPage — "over" section definitions', () => {
  it('renders definition for discussing a plan carefully', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To discuss a plan or problem carefully before making a decision\./i)).toBeInTheDocument();
  });

  it('renders definition for speaking louder than someone else', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To speak louder than someone else to interrupt them\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To discuss a plan or problem carefully before making a decision\./i),
      screen.getByText(/To speak louder than someone else to interrupt them\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To discuss a plan or problem carefully before making a decision\./i)).toHaveAttribute(
      'title',
      'To discuss a plan or problem carefully before making a decision.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To speak louder than someone else to interrupt them\./i)).toHaveAttribute(
      'title',
      'To speak louder than someone else to interrupt them.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'talkOver_section_expanded', /To discuss a plan or problem carefully before making a decision\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'talkOver', /To discuss a plan or problem carefully before making a decision\./i, /Let's talk over the contract before we sign it\./i, renderPage, getCard);

// --- through ---

describe('TalkVerbPage — "through" section definitions', () => {
  it('renders definition for explaining a process step by step', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To explain a process or idea to someone step by step\./i)).toBeInTheDocument();
  });

  it('renders definition for discussing a problem in detail', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To discuss a problem in detail to find a solution\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    const defs = [
      screen.getByText(/To explain a process or idea to someone step by step\./i),
      screen.getByText(/To discuss a problem in detail to find a solution\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To explain a process or idea to someone step by step\./i)).toHaveAttribute(
      'title',
      'To explain a process or idea to someone step by step.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To discuss a problem in detail to find a solution\./i)).toHaveAttribute(
      'title',
      'To discuss a problem in detail to find a solution.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'talkThrough_section_expanded', /To explain a process or idea to someone step by step\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'talkThrough', /To explain a process or idea to someone step by step\./i, /Can you talk me through how to use this Java framework\?/i, renderPage, getCard);

// --- to ---

describe('TalkVerbPage — "to" section definitions', () => {
  it('renders definition for having a conversation with someone', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To have a conversation with someone\./i)).toBeInTheDocument();
  });

  it('renders definition for reprimanding someone', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reprimand or scold someone for doing something wrong\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To have a conversation with someone\./i),
      screen.getByText(/To reprimand or scold someone for doing something wrong\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To have a conversation with someone\./i)).toHaveAttribute(
      'title',
      'To have a conversation with someone.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reprimand or scold someone for doing something wrong\./i)).toHaveAttribute(
      'title',
      'To reprimand or scold someone for doing something wrong.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'talkTo_section_expanded', /To have a conversation with someone\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'talkTo', /To have a conversation with someone\./i, /I need to talk to the client tomorrow\./i, renderPage, getCard);

// --- together ---

describe('TalkVerbPage — "together" section definitions', () => {
  it('renders definition for conversing with one another', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To converse with one another \(literal meaning\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To converse with one another \(literal meaning\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To converse with one another \(literal meaning\)\./i)).toHaveAttribute(
      'title',
      'To converse with one another (literal meaning).'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'talkTogether_section_expanded', /To converse with one another \(literal meaning\)\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'talkTogether', /To converse with one another \(literal meaning\)\./i, /The two developers talked together quietly in the corner\./i, renderPage, getCard);

// --- up ---

describe('TalkVerbPage — "up" section definitions', () => {
  it('renders definition for praising or promoting something', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To praise or promote something to make it sound very good or exciting\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To praise or promote something to make it sound very good or exciting\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To praise or promote something to make it sound very good or exciting\./i)).toHaveAttribute(
      'title',
      'To praise or promote something to make it sound very good or exciting.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'talkUp_section_expanded', /To praise or promote something to make it sound very good or exciting\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'talkUp', /To praise or promote something to make it sound very good or exciting\./i, /They are really talking up the new product launch\./i, renderPage, getCard);

// --- with ---

describe('TalkVerbPage — "with" section definitions', () => {
  it('renders definition for having a two-way discussion with someone', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To have a discussion with someone, often implying a more equal, two-way conversation\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To have a discussion with someone, often implying a more equal, two-way conversation\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To have a discussion with someone, often implying a more equal, two-way conversation\./i)).toHaveAttribute(
      'title',
      'To have a discussion with someone, often implying a more equal, two-way conversation.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'talkWith_section_expanded', /To have a discussion with someone, often implying a more equal, two-way conversation\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'talkWith', /To have a discussion with someone, often implying a more equal, two-way conversation\./i, /I enjoyed talking with you at the conference\./i, renderPage, getCard);
