import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('TurnVerbPage — "about" section definitions', () => {
  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about');
    const defs = [screen.getByText(/To physically turn to face the opposite direction\./i)];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To physically turn to face the opposite direction\./i)).toHaveAttribute(
      'title',
      'To physically turn to face the opposite direction.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'turnAbout_section_expanded', /To physically turn to face the opposite direction\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'turnAbout', /To physically turn to face the opposite direction\./i, /The soldier turned about and marched away\./i, renderPage, getCard);

// --- against ---

describe('TurnVerbPage — "against" section definitions', () => {
  it('renders definition for becoming hostile', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To suddenly become hostile toward someone or something\./i)).toBeInTheDocument();
  });

  it('renders definition for causing hostility', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To cause someone to be hostile toward another person\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('against');
    const defs = [
      screen.getByText(/To suddenly become hostile toward someone or something\./i),
      screen.getByText(/To cause someone to be hostile toward another person\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To suddenly become hostile toward someone or something\./i)).toHaveAttribute(
      'title',
      'To suddenly become hostile toward someone or something.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To cause someone to be hostile toward another person\./i)).toHaveAttribute(
      'title',
      'To cause someone to be hostile toward another person.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'turnAgainst_section_expanded', /To suddenly become hostile toward someone or something\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'turnAgainst', /To suddenly become hostile toward someone or something\./i, /The public turned against the mayor after the scandal broke\./i, renderPage, getCard);

// --- around_round ---

describe('TurnVerbPage — "around / round" section definitions', () => {
  it('renders definition for changing direction', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To change direction and face the opposite way\./i)).toBeInTheDocument();
  });

  it('renders definition for improving a bad situation', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To dramatically improve a bad situation or make a failing business successful\./i)).toBeInTheDocument();
  });

  it('renders definition for completing work within a timeframe', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To complete a piece of work or fulfill a request within a specific timeframe\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round');
    const defs = [
      screen.getByText(/To change direction and face the opposite way\./i),
      screen.getByText(/To dramatically improve a bad situation or make a failing business successful\./i),
      screen.getByText(/To complete a piece of work or fulfill a request within a specific timeframe\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To change direction and face the opposite way\./i)).toHaveAttribute(
      'title',
      'To change direction and face the opposite way.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To dramatically improve a bad situation or make a failing business successful\./i)).toHaveAttribute(
      'title',
      'To dramatically improve a bad situation or make a failing business successful.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To complete a piece of work or fulfill a request within a specific timeframe\./i)).toHaveAttribute(
      'title',
      'To complete a piece of work or fulfill a request within a specific timeframe.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'turnAround_section_expanded', /To change direction and face the opposite way\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'turnAround', /To change direction and face the opposite way\./i, /Turn around and look at the camera\./i, renderPage, getCard);

// --- away ---

describe('TurnVerbPage — "away" section definitions', () => {
  it('renders definition for refusing entry', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To refuse someone entry or admittance\./i)).toBeInTheDocument();
  });

  it('renders definition for looking in a different direction', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To look in a different direction, often out of disgust, shame, or lack of interest\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    const defs = [
      screen.getByText(/To refuse someone entry or admittance\./i),
      screen.getByText(/To look in a different direction, often out of disgust, shame, or lack of interest\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To refuse someone entry or admittance\./i)).toHaveAttribute(
      'title',
      'To refuse someone entry or admittance.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To look in a different direction, often out of disgust, shame, or lack of interest\./i)).toHaveAttribute(
      'title',
      'To look in a different direction, often out of disgust, shame, or lack of interest.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'turnAway_section_expanded', /To refuse someone entry or admittance\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'turnAway', /To refuse someone entry or admittance\./i, /The bouncer turned us away because the club was at full capacity\./i, renderPage, getCard);

// --- back ---

describe('TurnVerbPage — "back" section definitions', () => {
  it('renders definition for returning because of a problem', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return the way you came, usually because of a problem\./i)).toBeInTheDocument();
  });

  it('renders definition for reversing a process', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reverse a process or return to a previous state\./i)).toBeInTheDocument();
  });

  it('renders definition for folding back a cover', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To fold back a cover or page\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    const defs = [
      screen.getByText(/To return the way you came, usually because of a problem\./i),
      screen.getByText(/To reverse a process or return to a previous state\./i),
      screen.getByText(/To fold back a cover or page\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return the way you came, usually because of a problem\./i)).toHaveAttribute(
      'title',
      'To return the way you came, usually because of a problem.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reverse a process or return to a previous state\./i)).toHaveAttribute(
      'title',
      'To reverse a process or return to a previous state.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To fold back a cover or page\./i)).toHaveAttribute(
      'title',
      'To fold back a cover or page.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'turnBack_section_expanded', /To return the way you came, usually because of a problem\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'turnBack', /To return the way you came, usually because of a problem\./i, /The snowstorm was so heavy that we had to turn back\./i, renderPage, getCard);

// --- down ---

describe('TurnVerbPage — "down" section definitions', () => {
  it('renders definition for decreasing volume or power', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To decrease the volume, heat, or power of a device\./i)).toBeInTheDocument();
  });

  it('renders definition for rejecting an offer', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reject or refuse an offer, request, or person\./i)).toBeInTheDocument();
  });

  it('renders definition for folding down bed covers', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fold down the covers of a bed in preparation for sleep\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To decrease the volume, heat, or power of a device\./i),
      screen.getByText(/To reject or refuse an offer, request, or person\./i),
      screen.getByText(/To fold down the covers of a bed in preparation for sleep\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To decrease the volume, heat, or power of a device\./i)).toHaveAttribute(
      'title',
      'To decrease the volume, heat, or power of a device.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reject or refuse an offer, request, or person\./i)).toHaveAttribute(
      'title',
      'To reject or refuse an offer, request, or person.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fold down the covers of a bed in preparation for sleep\./i)).toHaveAttribute(
      'title',
      'To fold down the covers of a bed in preparation for sleep.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'turnDown_section_expanded', /To decrease the volume, heat, or power of a device\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'turnDown', /To decrease the volume, heat, or power of a device\./i, /Please turn down the music/i, renderPage, getCard);

// --- in ---

describe('TurnVerbPage — "in" section definitions', () => {
  it('renders definition for submitting a document', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To submit an assignment, report, or document\./i)).toBeInTheDocument();
  });

  it('renders definition for going to bed', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To go to bed \(informal\)\./i)).toBeInTheDocument();
  });

  it('renders definition for surrendering to authorities', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To surrender to the authorities or police\./i)).toBeInTheDocument();
  });

  it('renders definition for producing a performance', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To produce a particular amount or degree of something/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    const defs = [
      screen.getByText(/To submit an assignment, report, or document\./i),
      screen.getByText(/To go to bed \(informal\)\./i),
      screen.getByText(/To surrender to the authorities or police\./i),
      screen.getByText(/To produce a particular amount or degree of something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To submit an assignment, report, or document\./i)).toHaveAttribute(
      'title',
      'To submit an assignment, report, or document.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To go to bed \(informal\)\./i)).toHaveAttribute(
      'title',
      'To go to bed (informal).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To surrender to the authorities or police\./i)).toHaveAttribute(
      'title',
      'To surrender to the authorities or police.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To produce a particular amount or degree of something/i)).toHaveAttribute(
      'title',
      'To produce a particular amount or degree of something (like a performance).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'turnIn_section_expanded', /To submit an assignment, report, or document\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'turnIn', /To submit an assignment, report, or document\./i, /Don't forget to turn in your paperwork/i, renderPage, getCard);

// --- into ---

describe('TurnVerbPage — "into" section definitions', () => {
  it('renders definition for transforming into something different', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To transform or change into something completely different\./i)).toBeInTheDocument();
  });

  it('renders definition for directing a vehicle', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To direct a vehicle into a specific space or road\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    const defs = [
      screen.getByText(/To transform or change into something completely different\./i),
      screen.getByText(/To direct a vehicle into a specific space or road\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To transform or change into something completely different\./i)).toHaveAttribute(
      'title',
      'To transform or change into something completely different.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To direct a vehicle into a specific space or road\./i)).toHaveAttribute(
      'title',
      'To direct a vehicle into a specific space or road.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'turnInto_section_expanded', /To transform or change into something completely different\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'turnInto', /To transform or change into something completely different\./i, /The caterpillar turned into a beautiful butterfly\./i, renderPage, getCard);

// --- off ---

describe('TurnVerbPage — "off" section definitions', () => {
  it('renders definition for stopping a device', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop a machine, device, or flow of power\./i)).toBeInTheDocument();
  });

  it('renders definition for causing loss of interest', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cause someone to lose interest, enthusiasm, or sexual arousal\./i)).toBeInTheDocument();
  });

  it('renders definition for leaving a road', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a road or path to go onto another\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    const defs = [
      screen.getByText(/To stop a machine, device, or flow of power\./i),
      screen.getByText(/To cause someone to lose interest, enthusiasm, or sexual arousal\./i),
      screen.getByText(/To leave a road or path to go onto another\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop a machine, device, or flow of power\./i)).toHaveAttribute(
      'title',
      'To stop a machine, device, or flow of power.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cause someone to lose interest, enthusiasm, or sexual arousal\./i)).toHaveAttribute(
      'title',
      'To cause someone to lose interest, enthusiasm, or sexual arousal.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a road or path to go onto another\./i)).toHaveAttribute(
      'title',
      'To leave a road or path to go onto another.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'turnOff_section_expanded', /To stop a machine, device, or flow of power\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'turnOff', /To stop a machine, device, or flow of power\./i, /Remember to turn off the lights when you leave the room\./i, renderPage, getCard);

// --- on ---

describe('TurnVerbPage — "on" section definitions', () => {
  it('renders definition for starting a device', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To start a machine, device, or flow of power\./i)).toBeInTheDocument();
  });

  it('renders definition for attacking someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To suddenly and unexpectedly attack someone, physically or verbally\./i)).toBeInTheDocument();
  });

  it('renders definition for causing excitement', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To cause someone to feel excited or sexually aroused\./i)).toBeInTheDocument();
  });

  it('renders definition for depending on a detail', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To depend or hinge entirely on a specific detail\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/To start a machine, device, or flow of power\./i),
      screen.getByText(/To suddenly and unexpectedly attack someone, physically or verbally\./i),
      screen.getByText(/To cause someone to feel excited or sexually aroused\./i),
      screen.getByText(/To depend or hinge entirely on a specific detail\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To start a machine, device, or flow of power\./i)).toHaveAttribute(
      'title',
      'To start a machine, device, or flow of power.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To suddenly and unexpectedly attack someone, physically or verbally\./i)).toHaveAttribute(
      'title',
      'To suddenly and unexpectedly attack someone, physically or verbally.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To cause someone to feel excited or sexually aroused\./i)).toHaveAttribute(
      'title',
      'To cause someone to feel excited or sexually aroused.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To depend or hinge entirely on a specific detail\./i)).toHaveAttribute(
      'title',
      'To depend or hinge entirely on a specific detail.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'turnOn_section_expanded', /To start a machine, device, or flow of power\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'turnOn', /To start a machine, device, or flow of power\./i, /Can you turn on the air conditioning\?/i, renderPage, getCard);

// --- out ---

describe('TurnVerbPage — "out" section definitions', () => {
  it('renders definition for ending up a particular way', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To end up or result in a particular way\./i)).toBeInTheDocument();
  });

  it('renders definition for attending an event', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To attend an event or gather as a crowd\./i)).toBeInTheDocument();
  });

  it('renders definition for extinguishing a light', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extinguish a light\./i)).toBeInTheDocument();
  });

  it('renders definition for producing something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To produce or manufacture something\./i)).toBeInTheDocument();
  });

  it('renders definition for emptying pockets', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To empty one's pockets or a receptacle\./i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To end up or result in a particular way\./i),
      screen.getByText(/To attend an event or gather as a crowd\./i),
      screen.getByText(/To extinguish a light\./i),
      screen.getByText(/To produce or manufacture something\./i),
      screen.getByText(/To empty one's pockets or a receptacle\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To end up or result in a particular way\./i)).toHaveAttribute(
      'title',
      'To end up or result in a particular way.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To attend an event or gather as a crowd\./i)).toHaveAttribute(
      'title',
      'To attend an event or gather as a crowd.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extinguish a light\./i)).toHaveAttribute(
      'title',
      'To extinguish a light.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To produce or manufacture something\./i)).toHaveAttribute(
      'title',
      'To produce or manufacture something.'
    );
  });

  it('fifth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To empty one's pockets or a receptacle\./i)).toHaveAttribute(
      'title',
      "To empty one's pockets or a receptacle."
    );
  });
});

describeSectionToggle(LABEL, 'out', 'turnOut_section_expanded', /To end up or result in a particular way\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'turnOut', /To end up or result in a particular way\./i, /Despite the rain, the outdoor party turned out to be a great success\./i, renderPage, getCard);

// --- over ---

describe('TurnVerbPage — "over" section definitions', () => {
  it('renders definition for flipping something', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To flip something so the other side faces up\./i)).toBeInTheDocument();
  });

  it('renders definition for transferring control', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To transfer control, responsibility, or possession to someone else\./i)).toBeInTheDocument();
  });

  it('renders definition for starting an engine', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To start an engine \(referring to the mechanical rotation\)\./i)).toBeInTheDocument();
  });

  it('renders definition for generating revenue', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To generate a specific amount of revenue in a business\./i)).toBeInTheDocument();
  });

  it('renders definition for thinking carefully', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To think about a concept or idea carefully\./i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To flip something so the other side faces up\./i),
      screen.getByText(/To transfer control, responsibility, or possession to someone else\./i),
      screen.getByText(/To start an engine \(referring to the mechanical rotation\)\./i),
      screen.getByText(/To generate a specific amount of revenue in a business\./i),
      screen.getByText(/To think about a concept or idea carefully\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To flip something so the other side faces up\./i)).toHaveAttribute(
      'title',
      'To flip something so the other side faces up.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To transfer control, responsibility, or possession to someone else\./i)).toHaveAttribute(
      'title',
      'To transfer control, responsibility, or possession to someone else.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To start an engine \(referring to the mechanical rotation\)\./i)).toHaveAttribute(
      'title',
      'To start an engine (referring to the mechanical rotation).'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To generate a specific amount of revenue in a business\./i)).toHaveAttribute(
      'title',
      'To generate a specific amount of revenue in a business.'
    );
  });

  it('fifth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To think about a concept or idea carefully\./i)).toHaveAttribute(
      'title',
      'To think about a concept or idea carefully.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'turnOver_section_expanded', /To flip something so the other side faces up\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'turnOver', /To flip something so the other side faces up\./i, /If your pancakes are bubbling/i, renderPage, getCard);

// --- to ---

describe('TurnVerbPage — "to" section definitions', () => {
  it('renders definition for seeking help or comfort', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To go to someone or something for help, advice, or comfort\./i)).toBeInTheDocument();
  });

  it('renders definition for starting a coping habit', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start doing a particular activity or habit, often a negative one, to cope with stress\./i)).toBeInTheDocument();
  });

  it('renders definition for directing attention', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To direct your attention to a new topic or to a specific page\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To go to someone or something for help, advice, or comfort\./i),
      screen.getByText(/To start doing a particular activity or habit, often a negative one, to cope with stress\./i),
      screen.getByText(/To direct your attention to a new topic or to a specific page\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To go to someone or something for help, advice, or comfort\./i)).toHaveAttribute(
      'title',
      'To go to someone or something for help, advice, or comfort.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start doing a particular activity or habit, often a negative one, to cope with stress\./i)).toHaveAttribute(
      'title',
      'To start doing a particular activity or habit, often a negative one, to cope with stress.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To direct your attention to a new topic or to a specific page\./i)).toHaveAttribute(
      'title',
      'To direct your attention to a new topic or to a specific page.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'turnTo_section_expanded', /To go to someone or something for help, advice, or comfort\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'turnTo', /To go to someone or something for help, advice, or comfort\./i, /When I have a problem, I always turn to my best friend\./i, renderPage, getCard);

// --- up ---

describe('TurnVerbPage — "up" section definitions', () => {
  it('renders definition for increasing volume or power', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To increase the volume, heat, or power of a device\./i)).toBeInTheDocument();
  });

  it('renders definition for appearing unexpectedly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To appear unexpectedly or arrive, sometimes late\./i)).toBeInTheDocument();
  });

  it('renders definition for being found after being lost', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be found, usually by accident, after being lost\./i)).toBeInTheDocument();
  });

  it('renders definition for shortening a garment', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To shorten a garment by folding the hem upward\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To increase the volume, heat, or power of a device\./i),
      screen.getByText(/To appear unexpectedly or arrive, sometimes late\./i),
      screen.getByText(/To be found, usually by accident, after being lost\./i),
      screen.getByText(/To shorten a garment by folding the hem upward\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To increase the volume, heat, or power of a device\./i)).toHaveAttribute(
      'title',
      'To increase the volume, heat, or power of a device.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To appear unexpectedly or arrive, sometimes late\./i)).toHaveAttribute(
      'title',
      'To appear unexpectedly or arrive, sometimes late.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be found, usually by accident, after being lost\./i)).toHaveAttribute(
      'title',
      'To be found, usually by accident, after being lost.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To shorten a garment by folding the hem upward\./i)).toHaveAttribute(
      'title',
      'To shorten a garment by folding the hem upward.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'turnUp_section_expanded', /To increase the volume, heat, or power of a device\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'turnUp', /To increase the volume, heat, or power of a device\./i, /Can you turn up the radio\?/i, renderPage, getCard);
