import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'WearVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- away ---

describe('WearVerbPage — "away" section definitions', () => {
  it('renders definition for eroding or wearing smooth through friction', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    const def = screen.getByText(/To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather\./i)).toHaveAttribute(
      'title',
      'To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'wearAway_section_expanded', /To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'wearAway', /To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather\./i, /Years of salty sea breezes have worn away the bright paint on the older coastal buildings\./i, renderPage, getCard);

// --- down ---

describe('WearVerbPage — "down" section definitions', () => {
  it('renders definition for overcoming resistance through persistent pressure', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To overcome someone's resistance, opposition, or reluctance through persistent pressure\./i)).toBeInTheDocument();
  });

  it('renders definition for reducing size or effectiveness through friction', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the size, thickness, or effectiveness of something by continuous friction or prolonged use\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To overcome someone's resistance, opposition, or reluctance through persistent pressure\./i),
      screen.getByText(/To reduce the size, thickness, or effectiveness of something by continuous friction or prolonged use\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To overcome someone's resistance, opposition, or reluctance through persistent pressure\./i)).toHaveAttribute(
      'title',
      "To overcome someone's resistance, opposition, or reluctance through persistent pressure."
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the size, thickness, or effectiveness of something by continuous friction or prolonged use\./i)).toHaveAttribute(
      'title',
      'To reduce the size, thickness, or effectiveness of something by continuous friction or prolonged use.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'wearDown_section_expanded', /To overcome someone's resistance, opposition, or reluctance through persistent pressure\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'wearDown', /To overcome someone's resistance, opposition, or reluctance through persistent pressure\./i, /The developer initially wanted a much higher salary, but the long negotiation process eventually wore them down\./i, renderPage, getCard);

// --- in ---

describe('WearVerbPage — "in" section definitions', () => {
  it('renders definition for wearing new clothing until comfortable', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    const def = screen.getByText(/To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use\./i)).toHaveAttribute(
      'title',
      'To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'wearIn_section_expanded', /To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'wearIn', /To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use\./i, /I need to walk around the apartment for a few days to wear in these new shoes before we do any serious walking\./i, renderPage, getCard);

// --- off ---

describe('WearVerbPage — "off" section definitions', () => {
  it('renders definition for gradually disappearing or fading', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug's effect, or a novelty\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    const def = screen.getByText(/To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug's effect, or a novelty\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug's effect, or a novelty\./i)).toHaveAttribute(
      'title',
      "To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug's effect, or a novelty."
    );
  });
});

describeSectionToggle(LABEL, 'off', 'wearOff_section_expanded', /To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug's effect, or a novelty\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'wearOff', /To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug's effect, or a novelty\./i, /The excitement of moving to a new country can start to wear off once the heavy paperwork begins\./i, renderPage, getCard);

// --- on ---

describe('WearVerbPage — "on" section definitions', () => {
  it('renders definition for time passing slowly or tediously', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/Of time or an event: to pass, especially when it feels slow, tedious, or prolonged\./i)).toBeInTheDocument();
  });

  it('renders definition for gradually annoying or exhausting patience', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To gradually annoy, irritate, or exhaust someone's patience over time\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/Of time or an event: to pass, especially when it feels slow, tedious, or prolonged\./i),
      screen.getByText(/To gradually annoy, irritate, or exhaust someone's patience over time\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/Of time or an event: to pass, especially when it feels slow, tedious, or prolonged\./i)).toHaveAttribute(
      'title',
      'Of time or an event: to pass, especially when it feels slow, tedious, or prolonged.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To gradually annoy, irritate, or exhaust someone's patience over time\./i)).toHaveAttribute(
      'title',
      "To gradually annoy, irritate, or exhaust someone's patience over time."
    );
  });
});

describeSectionToggle(LABEL, 'on', 'wearOn_section_expanded', /Of time or an event: to pass, especially when it feels slow, tedious, or prolonged\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'wearOn', /Of time or an event: to pass, especially when it feels slow, tedious, or prolonged\./i, /As the technical interview wore on, it became clear the applicant didn't actually have the required Java experience\./i, renderPage, getCard);

// --- out ---

describe('WearVerbPage — "out" section definitions', () => {
  it('renders definition for using something until damaged or useless', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To use something until it is damaged, broken, or completely useless\./i)).toBeInTheDocument();
  });

  it('renders definition for making someone extremely tired', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To make someone extremely physically or mentally tired; to exhaust\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To use something until it is damaged, broken, or completely useless\./i),
      screen.getByText(/To make someone extremely physically or mentally tired; to exhaust\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To use something until it is damaged, broken, or completely useless\./i)).toHaveAttribute(
      'title',
      'To use something until it is damaged, broken, or completely useless.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To make someone extremely physically or mentally tired; to exhaust\./i)).toHaveAttribute(
      'title',
      'To make someone extremely physically or mentally tired; to exhaust.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'wearOut_section_expanded', /To use something until it is damaged, broken, or completely useless\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'wearOut', /To use something until it is damaged, broken, or completely useless\./i, /I've practically worn out my laptop's keyboard from typing so many outreach messages\./i, renderPage, getCard);

// --- through ---

describe('WearVerbPage — "through" section definitions', () => {
  it('renders definition for creating a hole through continuous friction', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To create a hole in something as a result of continuous use, friction, or rubbing\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    const def = screen.getByText(/To create a hole in something as a result of continuous use, friction, or rubbing\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To create a hole in something as a result of continuous use, friction, or rubbing\./i)).toHaveAttribute(
      'title',
      'To create a hole in something as a result of continuous use, friction, or rubbing.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'wearThrough_section_expanded', /To create a hole in something as a result of continuous use, friction, or rubbing\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'wearThrough', /To create a hole in something as a result of continuous use, friction, or rubbing\./i, /She leaned on her desk so much that she completely wore through the elbows of her favourite sweater\./i, renderPage, getCard);
