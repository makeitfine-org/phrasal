import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('BringVerbPage — "about" section definitions', () => {
  it('renders definition for causing something to happen', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To cause something to happen/i)).toBeInTheDocument();
  });

  it('renders definition for causing a ship to change direction', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/\(Nautical\) To cause a ship to change direction/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To cause something to happen/i)).toHaveClass('truncate');
    expect(screen.getByText(/\(Nautical\) To cause a ship to change direction/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To cause something to happen/i)).toHaveAttribute(
      'title',
      'To cause something to happen.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'bringAbout_section_expanded', /To cause something to happen/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'bringAbout', /To cause something to happen/i, /The new management structure brought about/i, renderPage, getCard);

// --- around_round ---

describe('BringVerbPage — "around / round" section definitions', () => {
  it('renders definition for persuading someone to agree', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To persuade someone to agree with your point of view/i)).toBeInTheDocument();
  });

  it('renders definition for restoring someone to consciousness', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To restore someone to consciousness/i)).toBeInTheDocument();
  });

  it('renders definition for bringing something to a place', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To bring someone or something to a place/i)).toBeInTheDocument();
  });

  it('renders definition for introducing a topic into conversation', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To gradually introduce a specific topic into a conversation/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To persuade someone to agree with your point of view/i)).toHaveClass('truncate');
    expect(screen.getByText(/To restore someone to consciousness/i)).toHaveClass('truncate');
    expect(screen.getByText(/To bring someone or something to a place/i)).toHaveClass('truncate');
    expect(screen.getByText(/To gradually introduce a specific topic into a conversation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To persuade someone to agree with your point of view/i)).toHaveAttribute(
      'title',
      'To persuade someone to agree with your point of view.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'bringAround_section_expanded', /To persuade someone to agree with your point of view/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'bringAround', /To persuade someone to agree with your point of view/i, /He didn't want to use the new software/i, renderPage, getCard);

// --- away ---

describe('BringVerbPage — "away" section definitions', () => {
  it('renders definition for gaining a lesson from an experience', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To learn or gain an impression, memory, or lesson from an experience/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To learn or gain an impression, memory, or lesson from an experience/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To learn or gain an impression, memory, or lesson from an experience/i)).toHaveAttribute(
      'title',
      'To learn or gain an impression, memory, or lesson from an experience.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'bringAway_section_expanded', /To learn or gain an impression, memory, or lesson from an experience/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'bringAway', /To learn or gain an impression, memory, or lesson from an experience/i, /The main insight I brought away from the tech conference/i, renderPage, getCard);

// --- back ---

describe('BringVerbPage — "back" section definitions', () => {
  it('renders definition for returning something to its original place', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to its original place or owner/i)).toBeInTheDocument();
  });

  it('renders definition for causing someone to remember the past', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To cause someone to remember something from the past/i)).toBeInTheDocument();
  });

  it('renders definition for reintroducing something', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reintroduce something or start doing something again/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to its original place or owner/i)).toHaveClass('truncate');
    expect(screen.getByText(/To cause someone to remember something from the past/i)).toHaveClass('truncate');
    expect(screen.getByText(/To reintroduce something or start doing something again/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to its original place or owner/i)).toHaveAttribute(
      'title',
      'To return something to its original place or owner.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'bringBack_section_expanded', /To return something to its original place or owner/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'bringBack', /To return something to its original place or owner/i, /Please bring back the laptop/i, renderPage, getCard);

// --- by ---

describe('BringVerbPage — "by" section definitions', () => {
  it('renders definition for visiting briefly to deliver something', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To visit someone briefly in order to deliver something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To visit someone briefly in order to deliver something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To visit someone briefly in order to deliver something/i)).toHaveAttribute(
      'title',
      'To visit someone briefly in order to deliver something.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'bringBy_section_expanded', /To visit someone briefly in order to deliver something/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'bringBy', /To visit someone briefly in order to deliver something/i, /I'll bring the signed contracts by the office/i, renderPage, getCard);

// --- down ---

describe('BringVerbPage — "down" section definitions', () => {
  it('renders definition for reducing a level or amount', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce a level, rate, or amount/i)).toBeInTheDocument();
  });

  it('renders definition for causing a government to lose power', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To cause a government or leader to lose power/i)).toBeInTheDocument();
  });

  it('renders definition for making someone feel sad', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make someone feel sad, depressed, or less energetic/i)).toBeInTheDocument();
  });

  it('renders definition for causing an aircraft to fall', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To cause an aircraft or an animal to fall to the ground/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce a level, rate, or amount/i)).toHaveClass('truncate');
    expect(screen.getByText(/To cause a government or leader to lose power/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make someone feel sad, depressed, or less energetic/i)).toHaveClass('truncate');
    expect(screen.getByText(/To cause an aircraft or an animal to fall to the ground/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce a level, rate, or amount/i)).toHaveAttribute(
      'title',
      'To reduce a level, rate, or amount.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'bringDown_section_expanded', /To reduce a level, rate, or amount/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'bringDown', /To reduce a level, rate, or amount/i, /We need to bring down our time-to-hire/i, renderPage, getCard);

// --- forward ---

describe('BringVerbPage — "forward" section definitions', () => {
  it('renders definition for changing an event to an earlier date', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To change the date or time of an event so that it happens earlier/i)).toBeInTheDocument();
  });

  it('renders definition for introducing a plan for discussion', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To introduce a plan, proposal, or argument for discussion/i)).toBeInTheDocument();
  });

  it('renders definition for transferring a total in accounting', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/\(Accounting\) To transfer a total from the bottom of one page/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To change the date or time of an event so that it happens earlier/i)).toHaveClass('truncate');
    expect(screen.getByText(/To introduce a plan, proposal, or argument for discussion/i)).toHaveClass('truncate');
    expect(screen.getByText(/\(Accounting\) To transfer a total from the bottom of one page/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To change the date or time of an event so that it happens earlier/i)).toHaveAttribute(
      'title',
      'To change the date or time of an event so that it happens earlier.'
    );
  });
});

describeSectionToggle(LABEL, 'forward', 'bringForward_section_expanded', /To change the date or time of an event so that it happens earlier/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'bringForward', /To change the date or time of an event so that it happens earlier/i, /the interview was brought forward to 10:00 AM/i, renderPage, getCard);

// --- in ---

describe('BringVerbPage — "in" section definitions', () => {
  it('renders definition for involving an expert in a project', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To involve someone new in a project or situation \(often an expert\)/i)).toBeInTheDocument();
  });

  it('renders definition for earning money', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To earn or produce money/i)).toBeInTheDocument();
  });

  it('renders definition for introducing a new law or system', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To introduce a new law, rule, or system/i)).toBeInTheDocument();
  });

  it('renders definition for taking someone to a police station', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To take someone to a police station for questioning or arrest/i)).toBeInTheDocument();
  });

  it('renders definition for announcing a verdict in court', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/\(Legal\) To yield or announce a verdict in court/i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To involve someone new in a project or situation \(often an expert\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To earn or produce money/i)).toHaveClass('truncate');
    expect(screen.getByText(/To introduce a new law, rule, or system/i)).toHaveClass('truncate');
    expect(screen.getByText(/To take someone to a police station for questioning or arrest/i)).toHaveClass('truncate');
    expect(screen.getByText(/\(Legal\) To yield or announce a verdict in court/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To involve someone new in a project or situation \(often an expert\)/i)).toHaveAttribute(
      'title',
      'To involve someone new in a project or situation (often an expert).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'bringIn_section_expanded', /To involve someone new in a project or situation \(often an expert\)/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'bringIn', /To involve someone new in a project or situation \(often an expert\)/i, /We had to bring in a senior DevOps consultant/i, renderPage, getCard);

// --- into ---

describe('BringVerbPage — "into" section definitions', () => {
  it('renders definition for causing involvement in a situation', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To cause someone or something to become involved in a specific situation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To cause someone or something to become involved in a specific situation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To cause someone or something to become involved in a specific situation/i)).toHaveAttribute(
      'title',
      'To cause someone or something to become involved in a specific situation, state, or condition.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'bringInto_section_expanded', /To cause someone or something to become involved in a specific situation/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'bringInto', /To cause someone or something to become involved in a specific situation/i, /Please don't bring me into your argument/i, renderPage, getCard);

// --- off ---

describe('BringVerbPage — "off" section definitions', () => {
  it('renders definition for succeeding in something difficult', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something very difficult, often unexpectedly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something very difficult, often unexpectedly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something very difficult, often unexpectedly/i)).toHaveAttribute(
      'title',
      'To succeed in doing something very difficult, often unexpectedly.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'bringOff_section_expanded', /To succeed in doing something very difficult, often unexpectedly/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'bringOff', /To succeed in doing something very difficult, often unexpectedly/i, /Negotiating that salary package with a tight budget/i, renderPage, getCard);

// --- on ---

describe('BringVerbPage — "on" section definitions', () => {
  it('renders definition for causing something negative to happen', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To cause something to happen \(usually something negative/i)).toBeInTheDocument();
  });

  it('renders definition for helping someone develop or improve', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To help someone develop or improve, especially in their career/i)).toBeInTheDocument();
  });

  it('renders definition for sending a player onto the field', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To send a player onto the field during a sports match/i)).toBeInTheDocument();
  });

  it('renders definition for showing readiness for a challenge', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/Used as an exclamation.*to show you are prepared for a challenge/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To cause something to happen \(usually something negative/i)).toHaveClass('truncate');
    expect(screen.getByText(/To help someone develop or improve, especially in their career/i)).toHaveClass('truncate');
    expect(screen.getByText(/To send a player onto the field during a sports match/i)).toHaveClass('truncate');
    expect(screen.getByText(/Used as an exclamation.*to show you are prepared for a challenge/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To cause something to happen \(usually something negative/i)).toHaveAttribute(
      'title',
      'To cause something to happen (usually something negative, like an illness or bad situation).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'bringOn_section_expanded', /To cause something to happen \(usually something negative/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'bringOn', /To cause something to happen \(usually something negative/i, /I think the sudden change in weather brought on my cold/i, renderPage, getCard);

// --- out ---

describe('BringVerbPage — "out" section definitions', () => {
  it('renders definition for producing a new product', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To produce a new product and start selling it/i)).toBeInTheDocument();
  });

  it('renders definition for highlighting a quality', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To highlight or make a particular quality noticeable/i)).toBeInTheDocument();
  });

  it('renders definition for causing a skin reaction', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To cause a physical reaction on the skin \(like a rash\)/i)).toBeInTheDocument();
  });

  it('renders definition for making a shy person more confident', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/\(Bring someone out of their shell\) To make a shy person more confident/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To produce a new product and start selling it/i)).toHaveClass('truncate');
    expect(screen.getByText(/To highlight or make a particular quality noticeable/i)).toHaveClass('truncate');
    expect(screen.getByText(/To cause a physical reaction on the skin \(like a rash\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/\(Bring someone out of their shell\) To make a shy person more confident/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To produce a new product and start selling it/i)).toHaveAttribute(
      'title',
      'To produce a new product and start selling it, or to publish something.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'bringOut_section_expanded', /To produce a new product and start selling it/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'bringOut', /To produce a new product and start selling it/i, /Apple is bringing out a new iPhone model/i, renderPage, getCard);

// --- over ---

describe('BringVerbPage — "over" section definitions', () => {
  it('renders definition for bringing something from one place to another', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To bring someone or something from one place to another/i)).toBeInTheDocument();
  });

  it('renders definition for persuading someone to change sides', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To persuade someone to change to your side or opinion/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To bring someone or something from one place to another/i)).toHaveClass('truncate');
    expect(screen.getByText(/To persuade someone to change to your side or opinion/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To bring someone or something from one place to another/i)).toHaveAttribute(
      'title',
      "To bring someone or something from one place to another (especially to someone's home)."
    );
  });
});

describeSectionToggle(LABEL, 'over', 'bringOver_section_expanded', /To bring someone or something from one place to another/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'bringOver', /To bring someone or something from one place to another/i, /I'll bring over my notes/i, renderPage, getCard);

// --- through ---

describe('BringVerbPage — "through" section definitions', () => {
  it('renders definition for helping someone survive a difficult situation', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To help someone successfully survive a very difficult/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To help someone successfully survive a very difficult/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To help someone successfully survive a very difficult/i)).toHaveAttribute(
      'title',
      'To help someone successfully survive a very difficult, dangerous, or life-threatening situation.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'bringThrough_section_expanded', /To help someone successfully survive a very difficult/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'bringThrough', /To help someone successfully survive a very difficult/i, /The incredible medical team brought him through/i, renderPage, getCard);

// --- to ---

describe('BringVerbPage — "to" section definitions', () => {
  it('renders definition for making someone conscious again', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To make someone conscious again after they have fainted/i)).toBeInTheDocument();
  });

  it('renders definition for reaching a mathematical total', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reach a mathematical total/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To make someone conscious again after they have fainted/i)).toHaveClass('truncate');
    expect(screen.getByText(/To reach a mathematical total/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To make someone conscious again after they have fainted/i)).toHaveAttribute(
      'title',
      'To make someone conscious again after they have fainted.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'bringTo_section_expanded', /To make someone conscious again after they have fainted/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'bringTo', /To make someone conscious again after they have fainted/i, /The paramedics used smelling salts/i, renderPage, getCard);

// --- together ---

describe('BringVerbPage — "together" section definitions', () => {
  it('renders definition for uniting people or groups', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To help people or groups to become friendly, collaborate, or unite/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To help people or groups to become friendly, collaborate, or unite/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To help people or groups to become friendly, collaborate, or unite/i)).toHaveAttribute(
      'title',
      'To help people or groups to become friendly, collaborate, or unite.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'bringTogether_section_expanded', /To help people or groups to become friendly, collaborate, or unite/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'bringTogether', /To help people or groups to become friendly, collaborate, or unite/i, /The project brought together software developers/i, renderPage, getCard);

// --- up ---

describe('BringVerbPage — "up" section definitions', () => {
  it('renders definition for raising a child', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To care for and raise a child until they are an adult/i)).toBeInTheDocument();
  });

  it('renders definition for mentioning a subject', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To mention a subject or start talking about a specific topic/i)).toBeInTheDocument();
  });

  it('renders definition for making something appear on screen', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make something appear on a computer screen/i)).toBeInTheDocument();
  });

  it('renders definition for vomiting', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To vomit/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To care for and raise a child until they are an adult/i)).toHaveClass('truncate');
    expect(screen.getByText(/To mention a subject or start talking about a specific topic/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make something appear on a computer screen/i)).toHaveClass('truncate');
    expect(screen.getByText(/To vomit/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To care for and raise a child until they are an adult/i)).toHaveAttribute(
      'title',
      'To care for and raise a child until they are an adult.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'bringUp_section_expanded', /To care for and raise a child until they are an adult/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'bringUp', /To care for and raise a child until they are an adult/i, /She was brought up in a bilingual household/i, renderPage, getCard);
