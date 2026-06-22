import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around_round ---

describe('ZipVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for moving quickly around an area', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To move quickly and energetically from one place to another within an area\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    const def = screen.getByText(/To move quickly and energetically from one place to another within an area\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To move quickly and energetically from one place to another within an area\./i)).toHaveAttribute(
      'title',
      'To move quickly and energetically from one place to another within an area.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'zipAbout_section_expanded', /To move quickly and energetically from one place to another within an area\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'zipAbout', /To move quickly and energetically from one place to another within an area\./i, /She spent the entire Saturday zipping around town running errands\./i, renderPage, getCard);

// --- across ---

describe('ZipVerbPage — "across" section definitions', () => {
  it('renders definition for travelling rapidly across a space', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To travel very rapidly from one side of a space, surface, or area to the other\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    const def = screen.getByText(/To travel very rapidly from one side of a space, surface, or area to the other\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To travel very rapidly from one side of a space, surface, or area to the other\./i)).toHaveAttribute(
      'title',
      'To travel very rapidly from one side of a space, surface, or area to the other.'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'zipAcross_section_expanded', /To travel very rapidly from one side of a space, surface, or area to the other\./i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'zipAcross', /To travel very rapidly from one side of a space, surface, or area to the other\./i, /The speedboat zipped across the lake in under a minute\./i, renderPage, getCard);

// --- ahead ---

describe('ZipVerbPage — "ahead" section definitions', () => {
  it('renders definition for advancing quickly', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To advance quickly, often leaving others behind or moving to the front of a line or progression\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    const def = screen.getByText(/To advance quickly, often leaving others behind or moving to the front of a line or progression\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To advance quickly, often leaving others behind or moving to the front of a line or progression\./i)).toHaveAttribute(
      'title',
      'To advance quickly, often leaving others behind or moving to the front of a line or progression.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'zipAhead_section_expanded', /To advance quickly, often leaving others behind or moving to the front of a line or progression\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'zipAhead', /To advance quickly, often leaving others behind or moving to the front of a line or progression\./i, /He zipped ahead of the rest of the runners in the final lap\./i, renderPage, getCard);

// --- apart ---

describe('ZipVerbPage — "apart" section definitions', () => {
  it('renders definition for separating fabric using a zipper', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate two pieces of fabric or material by opening a zipper that connects them\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    const def = screen.getByText(/To separate two pieces of fabric or material by opening a zipper that connects them\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate two pieces of fabric or material by opening a zipper that connects them\./i)).toHaveAttribute(
      'title',
      'To separate two pieces of fabric or material by opening a zipper that connects them.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'zipApart_section_expanded', /To separate two pieces of fabric or material by opening a zipper that connects them\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'zipApart', /To separate two pieces of fabric or material by opening a zipper that connects them\./i, /These convertible hiking pants zip apart at the knee to become shorts\./i, renderPage, getCard);

// --- away ---

describe('ZipVerbPage — "away" section definitions', () => {
  it('renders definition for departing very rapidly', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To depart or move away very rapidly\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    const def = screen.getByText(/To depart or move away very rapidly\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To depart or move away very rapidly\./i)).toHaveAttribute(
      'title',
      'To depart or move away very rapidly.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'zipAway_section_expanded', /To depart or move away very rapidly\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'zipAway', /To depart or move away very rapidly\./i, /As soon as the light turned green, the sports car zipped away\./i, renderPage, getCard);

// --- back ---

describe('ZipVerbPage — "back" section definitions', () => {
  it('renders definition for returning quickly to a place', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a place very quickly for a short duration\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    const def = screen.getByText(/To return to a place very quickly for a short duration\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a place very quickly for a short duration\./i)).toHaveAttribute(
      'title',
      'To return to a place very quickly for a short duration.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'zipBack_section_expanded', /To return to a place very quickly for a short duration\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'zipBack', /To return to a place very quickly for a short duration\./i, /I just need to zip back to the office to grab my laptop\./i, renderPage, getCard);

// --- by ---

describe('ZipVerbPage — "by" section definitions', () => {
  it('renders definition for passing someone quickly', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To physically pass someone or something very quickly\./i)).toBeInTheDocument();
  });

  it('renders definition for time passing quickly', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/Of time: to pass very quickly\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('by');
    const defs = [
      screen.getByText(/To physically pass someone or something very quickly\./i),
      screen.getByText(/Of time: to pass very quickly\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To physically pass someone or something very quickly\./i)).toHaveAttribute(
      'title',
      'To physically pass someone or something very quickly.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/Of time: to pass very quickly\./i)).toHaveAttribute(
      'title',
      'Of time: to pass very quickly.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'zipBy_section_expanded', /To physically pass someone or something very quickly\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'zipBy', /To physically pass someone or something very quickly\./i, /A cyclist zipped by me on the trail and nearly startled me\./i, renderPage, getCard);

// --- down ---

describe('ZipVerbPage — "down" section definitions', () => {
  it('renders definition for unfastening a zipper downward', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To unfasten a zipper by moving it in a downward direction\./i)).toBeInTheDocument();
  });

  it('renders definition for travelling quickly down a path', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To travel quickly down a path, road, or digital page\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To unfasten a zipper by moving it in a downward direction\./i),
      screen.getByText(/To travel quickly down a path, road, or digital page\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To unfasten a zipper by moving it in a downward direction\./i)).toHaveAttribute(
      'title',
      'To unfasten a zipper by moving it in a downward direction.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To travel quickly down a path, road, or digital page\./i)).toHaveAttribute(
      'title',
      'To travel quickly down a path, road, or digital page.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'zipDown_section_expanded', /To unfasten a zipper by moving it in a downward direction\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'zipDown', /To unfasten a zipper by moving it in a downward direction\./i, /He zipped down his jacket because the sun came out\./i, renderPage, getCard);

// --- in ---

describe('ZipVerbPage — "in" section definitions', () => {
  it('renders definition for arriving quickly', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive or enter a place very quickly\./i)).toBeInTheDocument();
  });

  it('renders definition for attaching an inner lining', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To attach an inner lining to a larger garment using a zipper\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    const defs = [
      screen.getByText(/To arrive or enter a place very quickly\./i),
      screen.getByText(/To attach an inner lining to a larger garment using a zipper\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive or enter a place very quickly\./i)).toHaveAttribute(
      'title',
      'To arrive or enter a place very quickly.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To attach an inner lining to a larger garment using a zipper\./i)).toHaveAttribute(
      'title',
      'To attach an inner lining to a larger garment using a zipper.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'zipIn_section_expanded', /To arrive or enter a place very quickly\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'zipIn', /To arrive or enter a place very quickly\./i, /I'll zip in and grab a coffee before the meeting starts\./i, renderPage, getCard);

// --- into ---

describe('ZipVerbPage — "into" section definitions', () => {
  it('renders definition for putting on clothing rapidly', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To put on a piece of clothing rapidly\./i)).toBeInTheDocument();
  });

  it('renders definition for maneuvering into a space quickly', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To maneuver a vehicle or oneself into a space quickly\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    const defs = [
      screen.getByText(/To put on a piece of clothing rapidly\./i),
      screen.getByText(/To maneuver a vehicle or oneself into a space quickly\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To put on a piece of clothing rapidly\./i)).toHaveAttribute(
      'title',
      'To put on a piece of clothing rapidly.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To maneuver a vehicle or oneself into a space quickly\./i)).toHaveAttribute(
      'title',
      'To maneuver a vehicle or oneself into a space quickly.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'zipInto_section_expanded', /To put on a piece of clothing rapidly\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'zipInto', /To put on a piece of clothing rapidly\./i, /She zipped into her wetsuit and ran toward the ocean\./i, renderPage, getCard);

// --- off ---

describe('ZipVerbPage — "off" section definitions', () => {
  it('renders definition for leaving quickly in a hurry', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave or depart quickly in a hurry\./i)).toBeInTheDocument();
  });

  it('renders definition for detaching a removable garment part', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To detach a removable part of a garment using a zipper\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    const defs = [
      screen.getByText(/To leave or depart quickly in a hurry\./i),
      screen.getByText(/To detach a removable part of a garment using a zipper\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave or depart quickly in a hurry\./i)).toHaveAttribute(
      'title',
      'To leave or depart quickly in a hurry.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To detach a removable part of a garment using a zipper\./i)).toHaveAttribute(
      'title',
      'To detach a removable part of a garment using a zipper.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'zipOff_section_expanded', /To leave or depart quickly in a hurry\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'zipOff', /To leave or depart quickly in a hurry\./i, /I have to zip off to a dentist appointment now, but I'll call you later\./i, renderPage, getCard);

// --- on ---

describe('ZipVerbPage — "on" section definitions', () => {
  it('renders definition for attaching a garment part with a zipper', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attach a piece of fabric or a removable garment part using a zipper\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    const def = screen.getByText(/To attach a piece of fabric or a removable garment part using a zipper\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attach a piece of fabric or a removable garment part using a zipper\./i)).toHaveAttribute(
      'title',
      'To attach a piece of fabric or a removable garment part using a zipper.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'zipOn_section_expanded', /To attach a piece of fabric or a removable garment part using a zipper\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'zipOn', /To attach a piece of fabric or a removable garment part using a zipper\./i, /If it starts raining, you can just zip on the hood\./i, renderPage, getCard);

// --- out ---

describe('ZipVerbPage — "out" section definitions', () => {
  it('renders definition for going out for a quick errand', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To go outside or leave a place for a very brief, quick errand\./i)).toBeInTheDocument();
  });

  it('renders definition for removing an inner lining', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove an inner lining from a garment by unzipping it\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To go outside or leave a place for a very brief, quick errand\./i),
      screen.getByText(/To remove an inner lining from a garment by unzipping it\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To go outside or leave a place for a very brief, quick errand\./i)).toHaveAttribute(
      'title',
      'To go outside or leave a place for a very brief, quick errand.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove an inner lining from a garment by unzipping it\./i)).toHaveAttribute(
      'title',
      'To remove an inner lining from a garment by unzipping it.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'zipOut_section_expanded', /To go outside or leave a place for a very brief, quick errand\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'zipOut', /To go outside or leave a place for a very brief, quick errand\./i, /I'm going to zip out to the grocery store for some milk; I'll be back in ten minutes\./i, renderPage, getCard);

// --- over ---

describe('ZipVerbPage — "over" section definitions', () => {
  it('renders definition for travelling quickly to a nearby location', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To travel quickly to a nearby location, often someone's home or office\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    const def = screen.getByText(/To travel quickly to a nearby location, often someone's home or office\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To travel quickly to a nearby location, often someone's home or office\./i)).toHaveAttribute(
      'title',
      "To travel quickly to a nearby location, often someone's home or office."
    );
  });
});

describeSectionToggle(LABEL, 'over', 'zipOver_section_expanded', /To travel quickly to a nearby location, often someone's home or office\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'zipOver', /To travel quickly to a nearby location, often someone's home or office\./i, /I'll zip over to your place after work to drop off the tools you lent me\./i, renderPage, getCard);

// --- through ---

describe('ZipVerbPage — "through" section definitions', () => {
  it('renders definition for completing a task very quickly', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To do, read, or complete a task very quickly and with ease\./i)).toBeInTheDocument();
  });

  it('renders definition for travelling through without stopping', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To travel through a place without stopping, or to navigate a physical space rapidly\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    const defs = [
      screen.getByText(/To do, read, or complete a task very quickly and with ease\./i),
      screen.getByText(/To travel through a place without stopping, or to navigate a physical space rapidly\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To do, read, or complete a task very quickly and with ease\./i)).toHaveAttribute(
      'title',
      'To do, read, or complete a task very quickly and with ease.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To travel through a place without stopping, or to navigate a physical space rapidly\./i)).toHaveAttribute(
      'title',
      'To travel through a place without stopping, or to navigate a physical space rapidly.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'zipThrough_section_expanded', /To do, read, or complete a task very quickly and with ease\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'zipThrough', /To do, read, or complete a task very quickly and with ease\./i, /She zipped through the exam in half the allotted time\./i, renderPage, getCard);

// --- to ---

describe('ZipVerbPage — "to" section definitions', () => {
  it('renders definition for moving rapidly to a destination', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To move rapidly to a specific destination or state\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    const def = screen.getByText(/To move rapidly to a specific destination or state\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To move rapidly to a specific destination or state\./i)).toHaveAttribute(
      'title',
      'To move rapidly to a specific destination or state.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'zipTo_section_expanded', /To move rapidly to a specific destination or state\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'zipTo', /To move rapidly to a specific destination or state\./i, /Zip to the end of the video to see the surprise reveal\./i, renderPage, getCard);

// --- together ---

describe('ZipVerbPage — "together" section definitions', () => {
  it('renders definition for connecting items with interlocking zippers', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To connect two separate items using their interlocking zippers\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    const def = screen.getByText(/To connect two separate items using their interlocking zippers\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To connect two separate items using their interlocking zippers\./i)).toHaveAttribute(
      'title',
      'To connect two separate items using their interlocking zippers.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'zipTogether_section_expanded', /To connect two separate items using their interlocking zippers\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'zipTogether', /To connect two separate items using their interlocking zippers\./i, /We zipped together our two sleeping bags to make one large bed for the camping trip\./i, renderPage, getCard);

// --- up ---

describe('ZipVerbPage — "up" section definitions', () => {
  it('renders definition for closing a garment with a zipper', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To close a garment, bag, or tent completely by fastening its zipper\./i)).toBeInTheDocument();
  });

  it('renders definition for being quiet', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be quiet or stop talking \(slang\/idiomatic, often commanded as zip it\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To close a garment, bag, or tent completely by fastening its zipper\./i),
      screen.getByText(/To be quiet or stop talking \(slang\/idiomatic, often commanded as zip it\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To close a garment, bag, or tent completely by fastening its zipper\./i)).toHaveAttribute(
      'title',
      'To close a garment, bag, or tent completely by fastening its zipper.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be quiet or stop talking \(slang\/idiomatic, often commanded as zip it\)\./i)).toHaveAttribute(
      'title',
      'To be quiet or stop talking (slang/idiomatic, often commanded as zip it).'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'zipUp_section_expanded', /To close a garment, bag, or tent completely by fastening its zipper\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'zipUp', /To close a garment, bag, or tent completely by fastening its zipper\./i, /Make sure you zip up your coat; it's freezing outside!/i, renderPage, getCard);
