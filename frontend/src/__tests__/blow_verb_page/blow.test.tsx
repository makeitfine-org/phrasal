import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around_round ---

describe('BlowVerbPage — "about / around (round)" section definitions', () => {
  it('renders definition for moving in different directions', () => {
    renderPage();
    expandSection('about / around (round)');
    expect(screen.getByText(/To move in different directions because of the wind\./i)).toBeInTheDocument();
  });

  it('renders definition for spreading rumors', () => {
    renderPage();
    expandSection('about / around (round)');
    expect(screen.getByText(/To spread rumors or stories/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around (round)');
    expect(screen.getByText(/To move in different directions because of the wind\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around (round)');
    expect(screen.getByText(/To move in different directions because of the wind\./i)).toHaveAttribute(
      'title',
      'To move in different directions because of the wind.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around (round)', 'blowAbout_section_expanded', /To move in different directions because of the wind\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around (round)', renderPage);

describeDefaultImageCards(LABEL, 'about / around (round)', 'blowAbout', /To move in different directions because of the wind\./i, /The autumn leaves are blowing around the garden/i, renderPage, getCard);

// --- apart ---

describe('BlowVerbPage — "apart" section definitions', () => {
  it('renders definition for destroying with explosion', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To completely destroy something using an explosion\./i)).toBeInTheDocument();
  });

  it('renders definition for destroying an argument', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To completely destroy an argument, idea, or plan by showing its flaws\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To completely destroy something using an explosion\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To completely destroy something using an explosion\./i)).toHaveAttribute(
      'title',
      'To completely destroy something using an explosion.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'blowApart_section_expanded', /To completely destroy something using an explosion\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'blowApart', /To completely destroy something using an explosion\./i, /The bomb blew the old building apart/i, renderPage, getCard);

// --- away ---

describe('BlowVerbPage — "away" section definitions', () => {
  it('renders definition for impressing someone', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To impress someone very much\./i)).toBeInTheDocument();
  });

  it('renders definition for moving by wind', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move something away using the wind\./i)).toBeInTheDocument();
  });

  it('renders definition for defeating competitors', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To defeat competitors easily or kill someone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To impress someone very much\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To impress someone very much\./i)).toHaveAttribute(
      'title',
      'To impress someone very much.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'blowAway_section_expanded', /To impress someone very much\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'blowAway', /To impress someone very much\./i, /completely blew me away/i, renderPage, getCard);

// --- back ---

describe('BlowVerbPage — "back" section definitions', () => {
  it('renders definition for wind pushing back', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/When the wind pushes something.*back toward you/i)).toBeInTheDocument();
  });

  it('renders definition for unexpected negative consequences', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To have unexpected negative consequences/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/When the wind pushes something.*back toward you/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/When the wind pushes something.*back toward you/i)).toHaveAttribute(
      'title',
      'When the wind pushes something (like smoke or hair) back toward you.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'blowBack_section_expanded', /When the wind pushes something.*back toward you/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'blowBack', /When the wind pushes something.*back toward you/i, /the smoke blew back into my face/i, renderPage, getCard);

// --- by ---

describe('BlowVerbPage — "by" section definitions', () => {
  it('renders definition for time passing quickly', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To pass very quickly \(usually referring to time\)\./i)).toBeInTheDocument();
  });

  it('renders definition for moving past a competitor', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To easily move past a competitor or obstacle\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To pass very quickly \(usually referring to time\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To pass very quickly \(usually referring to time\)\./i)).toHaveAttribute(
      'title',
      'To pass very quickly (usually referring to time).'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'blowBy_section_expanded', /To pass very quickly \(usually referring to time\)\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'blowBy', /To pass very quickly \(usually referring to time\)\./i, /The weekend just blew by/i, renderPage, getCard);

// --- down ---

describe('BlowVerbPage — "down" section definitions', () => {
  it('renders definition for making something fall', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make something fall to the ground using strong wind\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make something fall to the ground using strong wind\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make something fall to the ground using strong wind\./i)).toHaveAttribute(
      'title',
      'To make something fall to the ground using strong wind.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'blowDown_section_expanded', /To make something fall to the ground using strong wind\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'blowDown', /To make something fall to the ground using strong wind\./i, /The storm blew down several trees/i, renderPage, getCard);

// --- in ---

describe('BlowVerbPage — "in" section definitions', () => {
  it('renders definition for arriving unexpectedly', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive casually, suddenly, or unexpectedly\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive casually, suddenly, or unexpectedly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive casually, suddenly, or unexpectedly\./i)).toHaveAttribute(
      'title',
      'To arrive casually, suddenly, or unexpectedly.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'blowIn_section_expanded', /To arrive casually, suddenly, or unexpectedly\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'blowIn', /To arrive casually, suddenly, or unexpectedly\./i, /The CEO just blew in from London/i, renderPage, getCard);

// --- into ---

describe('BlowVerbPage — "into" section definitions', () => {
  it('renders definition for entering a room casually', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a room or building casually or loudly\./i)).toBeInTheDocument();
  });

  it('renders definition for pushing air into a device', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To push air from your mouth into a device\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a room or building casually or loudly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a room or building casually or loudly\./i)).toHaveAttribute(
      'title',
      'To enter a room or building casually or loudly.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'blowInto_section_expanded', /To enter a room or building casually or loudly\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'blowInto', /To enter a room or building casually or loudly\./i, /She blew into the office 20 minutes late/i, renderPage, getCard);

// --- off ---

describe('BlowVerbPage — "off" section definitions', () => {
  it('renders definition for ignoring someone', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To ignore someone or fail to attend an appointment\./i)).toBeInTheDocument();
  });

  it('renders definition for ignoring a task', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To ignore a responsibility or task\./i)).toBeInTheDocument();
  });

  it('renders definition for releasing pressure', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To release physical or emotional pressure/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To ignore someone or fail to attend an appointment\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To ignore someone or fail to attend an appointment\./i)).toHaveAttribute(
      'title',
      'To ignore someone or fail to attend an appointment.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'blowOff_section_expanded', /To ignore someone or fail to attend an appointment\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'blowOff', /To ignore someone or fail to attend an appointment\./i, /he blew me off/i, renderPage, getCard);

// --- out ---

describe('BlowVerbPage — "out" section definitions', () => {
  it('renders definition for extinguishing a flame', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extinguish a flame with your breath or wind\./i)).toBeInTheDocument();
  });

  it('renders definition for defeating an opponent', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To defeat an opponent very easily\./i)).toBeInTheDocument();
  });

  it("renders definition for a tire bursting", () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/When a vehicle's tire suddenly bursts\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extinguish a flame with your breath or wind\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extinguish a flame with your breath or wind\./i)).toHaveAttribute(
      'title',
      'To extinguish a flame with your breath or wind.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'blowOut_section_expanded', /To extinguish a flame with your breath or wind\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'blowOut', /To extinguish a flame with your breath or wind\./i, /blow out the candles/i, renderPage, getCard);

// --- over ---

describe('BlowVerbPage — "over" section definitions', () => {
  it('renders definition for a bad situation ending', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/When a bad situation, argument, or storm ends or is forgotten/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/When a bad situation, argument, or storm ends or is forgotten/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/When a bad situation, argument, or storm ends or is forgotten/i)).toHaveAttribute(
      'title',
      'When a bad situation, argument, or storm ends or is forgotten without causing serious damage.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'blowOver_section_expanded', /When a bad situation, argument, or storm ends or is forgotten/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'blowOver', /When a bad situation, argument, or storm ends or is forgotten/i, /wait for the PR scandal to blow over/i, renderPage, getCard);

// --- through ---

describe('BlowVerbPage — "through" section definitions', () => {
  it('renders definition for spending money quickly', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To spend money very quickly and irresponsibly\./i)).toBeInTheDocument();
  });

  it('renders definition for traveling quickly without stopping', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To travel through a place quickly without stopping\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To spend money very quickly and irresponsibly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To spend money very quickly and irresponsibly\./i)).toHaveAttribute(
      'title',
      'To spend money very quickly and irresponsibly.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'blowThrough_section_expanded', /To spend money very quickly and irresponsibly\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'blowThrough', /To spend money very quickly and irresponsibly\./i, /blew through its entire budget/i, renderPage, getCard);

// --- up ---

describe('BlowVerbPage — "up" section definitions', () => {
  it('renders definition for exploding', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To explode or be destroyed by an explosion\./i)).toBeInTheDocument();
  });

  it('renders definition for inflating', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fill something with air \(inflate\)\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming angry', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To suddenly become very angry\./i)).toBeInTheDocument();
  });

  it('renders definition for enlarging a photograph', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To enlarge a photograph or image\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming popular', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To suddenly become very popular or successful\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To explode or be destroyed by an explosion\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To explode or be destroyed by an explosion\./i)).toHaveAttribute(
      'title',
      'To explode or be destroyed by an explosion.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'blowUp_section_expanded', /To explode or be destroyed by an explosion\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'blowUp', /To explode or be destroyed by an explosion\./i, /the car blew up behind him/i, renderPage, getCard);
