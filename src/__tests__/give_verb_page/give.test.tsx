import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GiveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- away ---

describe('GiveVerbPage — "away" section definitions', () => {
  it('renders definition for providing something for free', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To provide something for free/i)).toBeInTheDocument();
  });

  it('renders definition for revealing a secret', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To reveal a secret or hidden information/i)).toBeInTheDocument();
  });

  it('renders definition for betraying someone', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To betray someone or accidentally show their true identity/i)).toBeInTheDocument();
  });

  it('renders definition for handing over a bride', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To formally hand over a bride at a wedding/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'away', 'giveAway_section_expanded', /To provide something for free/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'giveAway', /To provide something for free/i, /"The software company is giving away free trials/i, renderPage, getCard);

// --- back ---

describe('GiveVerbPage — "back" section definitions', () => {
  it('renders definition for returning something to its owner', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to its original owner/i)).toBeInTheDocument();
  });

  it('renders definition for contributing to society', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To contribute to society or a community/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'back', 'giveBack_section_expanded', /To return something to its original owner/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'giveBack', /To return something to its original owner/i, /"You must give back the company laptop/i, renderPage, getCard);

// --- general ---

const ALL_PARTICLES = [
  'away', 'back', 'in', 'in to', 'off', 'on / onto', 'out', 'over', 'up', '(it) up for', 'with',
];

describe('GiveVerbPage — general', () => {
  it('renders "Give" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Give' })).toBeInTheDocument();
  });

  it('renders all 11 section particles', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expect(screen.getByText(p)).toBeInTheDocument();
    }
  });

  it('all sections start collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To provide something for free/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To stop trying to do something or accept defeat/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To distribute something to a group/i)).not.toBeInTheDocument();
  });

  it('shows badge "4" in exactly 2 sections (away and up)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('4')).toHaveLength(2);
  });

  it('shows badge "3" in exactly 4 sections (away, out, over, up)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('3')).toHaveLength(4);
  });

  it('shows badge "2" in at least 6 sections', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('2').length).toBeGreaterThanOrEqual(6);
  });

  it('badge "1" appears in every expanded section', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(11);
  });
});

// --- in ---

describe('GiveVerbPage — "in" section definitions', () => {
  it('renders definition for yielding/surrendering', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To finally agree to what someone wants after initially refusing/i)).toBeInTheDocument();
  });

  it('renders definition for submitting a document', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hand over or submit a document/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'in', 'giveIn_section_expanded', /To finally agree to what someone wants after initially refusing/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'giveIn', /To finally agree to what someone wants after initially refusing/i, /"Management finally gave in to the workers/i, renderPage, getCard);

// --- in_to ---

describe('GiveVerbPage — "in to" section definitions', () => {
  it('renders definition for stopping resistance to a feeling', () => {
    renderPage();
    expandSection('in to');
    expect(screen.getByText(/To stop resisting a feeling, desire, or pressure/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'in to', 'giveInTo_section_expanded', /To stop resisting a feeling, desire, or pressure/i, renderPage);

describeChevronAndColour(LABEL, 'in to', renderPage);

describeDefaultImageCards(LABEL, 'in to', 'giveInTo', /To stop resisting a feeling, desire, or pressure/i, /"The company gave in to market pressure/i, renderPage, getCard);

// --- it_up_for ---

describe('GiveVerbPage — "(it) up for" section definitions', () => {
  it('renders definition for applauding someone', () => {
    renderPage();
    expandSection('(it) up for');
    expect(screen.getByText(/To applaud or clap for someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, '(it) up for', 'giveItUpFor_section_expanded', /To applaud or clap for someone/i, renderPage);

describeChevronAndColour(LABEL, '(it) up for', renderPage);

describeDefaultImageCards(LABEL, '(it) up for', 'giveItUpFor', /To applaud or clap for someone/i, /"Let's give it up for our keynote speaker/i, renderPage, getCard);

// --- off ---

describe('GiveVerbPage — "off" section definitions', () => {
  it('renders definition for producing/emitting something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To produce or emit something physical/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'off', 'giveOff_section_expanded', /To produce or emit something physical/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'giveOff', /To produce or emit something physical/i, /"The server room gives off a lot of heat/i, renderPage, getCard);

// --- on_onto ---

describe('GiveVerbPage — "on / onto" section definitions', () => {
  it('renders definition for opening toward a view', () => {
    renderPage();
    expandSection('on / onto');
    expect(screen.getByText(/To open in the direction of, or provide a view of/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'on / onto', 'giveOnOnto_section_expanded', /To open in the direction of, or provide a view of/i, renderPage);

describeChevronAndColour(LABEL, 'on / onto', renderPage);

describeDefaultImageCards(LABEL, 'on / onto', 'giveOnOnto', /To open in the direction of, or provide a view of/i, /"The CEO's office has large windows/i, renderPage, getCard);

// --- out ---

describe('GiveVerbPage — "out" section definitions', () => {
  it('renders definition for distributing to a group', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to a group of people/i)).toBeInTheDocument();
  });

  it('renders definition for stopping working or failing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop working or fail completely/i)).toBeInTheDocument();
  });

  it('renders definition for making information public', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To make information public/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'out', 'giveOut_section_expanded', /To distribute something to a group of people/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'giveOut', /To distribute something to a group of people/i, /"They were giving out informational flyers/i, renderPage, getCard);

// --- over ---

describe('GiveVerbPage — "over" section definitions', () => {
  it('renders definition for handing over control', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To hand over control, responsibility, or possession/i)).toBeInTheDocument();
  });

  it('renders definition for dedicating time or space', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To dedicate time or space to a specific purpose/i)).toBeInTheDocument();
  });

  it('renders definition for stopping something annoying', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop doing something annoying/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'over', 'giveOver_section_expanded', /To hand over control, responsibility, or possession/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'giveOver', /To hand over control, responsibility, or possession/i, /"The founder gave over control/i, renderPage, getCard);

// --- up ---

describe('GiveVerbPage — "up" section definitions', () => {
  it('renders definition for stopping trying / accepting defeat', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop trying to do something or accept defeat/i)).toBeInTheDocument();
  });

  it('renders definition for stopping a regular habit', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop doing a regular habit/i)).toBeInTheDocument();
  });

  it('renders definition for parting with something valuable', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To part with something valuable or give away your time/i)).toBeInTheDocument();
  });

  it('renders definition for surrendering to authorities', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To surrender yourself to the authorities/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'up', 'giveUp_section_expanded', /To stop trying to do something or accept defeat/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'giveUp', /To stop trying to do something or accept defeat/i, /"The coding problem was incredibly difficult/i, renderPage, getCard);

// --- with ---

describe('GiveVerbPage — "with" section definitions', () => {
  it('renders definition for providing information informally', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To provide or tell information/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'with', 'giveWith_section_expanded', /To provide or tell information/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'giveWith', /To provide or tell information/i, /"Come on, give with the details/i, renderPage, getCard);
