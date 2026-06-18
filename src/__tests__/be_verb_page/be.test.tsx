import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('BeVerbPage — "about" section definitions', () => {
  it('renders definition for something happening very soon', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To be going to happen very soon/i)).toBeInTheDocument();
  });

  it('renders definition for meaning or consisting of something', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To mean or consist of \(what something is about\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To be going to happen very soon/i)).toHaveClass('truncate');
    expect(screen.getByText(/To mean or consist of \(what something is about\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To be going to happen very soon/i)).toHaveAttribute(
      'title',
      'To be going to happen very soon (be about to).'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'beAbout_section_expanded', /To be going to happen very soon/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'beAbout', /To be going to happen very soon/i, /Save your work; the system is about to restart/i, renderPage, getCard);

// --- across ---

describe('BeVerbPage — "across" section definitions', () => {
  it('renders definition for being familiar with a topic', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To be fully familiar with or understand a topic\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To be fully familiar with or understand a topic\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To be fully familiar with or understand a topic\./i)).toHaveAttribute(
      'title',
      'To be fully familiar with or understand a topic.'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'beAcross_section_expanded', /To be fully familiar with or understand a topic\./i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'beAcross', /To be fully familiar with or understand a topic\./i, /I need to be across all the new data privacy laws/i, renderPage, getCard);

// --- after ---

describe('BeVerbPage — "after" section definitions', () => {
  it('renders definition for wanting or seeking something', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To want, try to get, or look for something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To want, try to get, or look for something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To want, try to get, or look for something\./i)).toHaveAttribute(
      'title',
      'To want, try to get, or look for something.'
    );
  });
});

describeSectionToggle(LABEL, 'after', 'beAfter_section_expanded', /To want, try to get, or look for something\./i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'beAfter', /To want, try to get, or look for something\./i, /What exactly are you after in this contract negotiation/i, renderPage, getCard);

// --- against ---

describe('BeVerbPage — "against" section definitions', () => {
  it('renders definition for opposing something', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose someone or something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose someone or something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose someone or something\./i)).toHaveAttribute(
      'title',
      'To oppose someone or something.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'beAgainst_section_expanded', /To oppose someone or something\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'beAgainst', /To oppose someone or something\./i, /Many users are against the new interface changes/i, renderPage, getCard);

// --- ahead ---

describe('BeVerbPage — "ahead" section definitions', () => {
  it('renders definition for being further advanced', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To be winning or further advanced than expected\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To be winning or further advanced than expected\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To be winning or further advanced than expected\./i)).toHaveAttribute(
      'title',
      'To be winning or further advanced than expected.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'beAhead_section_expanded', /To be winning or further advanced than expected\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'beAhead', /To be winning or further advanced than expected\./i, /Our development team is ahead of schedule/i, renderPage, getCard);

// --- apart ---

describe('BeVerbPage — "apart" section definitions', () => {
  it('renders definition for being separated', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be separated physically or emotionally\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be separated physically or emotionally\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be separated physically or emotionally\./i)).toHaveAttribute(
      'title',
      'To be separated physically or emotionally.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'beApart_section_expanded', /To be separated physically or emotionally\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'beApart', /To be separated physically or emotionally\./i, /The two microservices must be apart/i, renderPage, getCard);

// --- around_round ---

describe('BeVerbPage — "around / round" section definitions', () => {
  it('renders definition for being present or available', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To be present or available\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To be present or available\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To be present or available\./i)).toHaveAttribute('title', 'To be present or available.');
  });
});

describeSectionToggle(LABEL, 'around / round', 'beAround_section_expanded', /To be present or available\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'beAround', /To be present or available\./i, /Will you be around for a code review/i, renderPage, getCard);

// --- away ---

describe('BeVerbPage — "away" section definitions', () => {
  it('renders definition for being absent on a trip', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To be absent or on a trip\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To be absent or on a trip\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To be absent or on a trip\./i)).toHaveAttribute('title', 'To be absent or on a trip.');
  });
});

describeSectionToggle(LABEL, 'away', 'beAway_section_expanded', /To be absent or on a trip\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'beAway', /To be absent or on a trip\./i, /He is away on a business trip to London/i, renderPage, getCard);

// --- back ---

describe('BeVerbPage — "back" section definitions', () => {
  it('renders definition for returning', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return\./i)).toHaveAttribute('title', 'To return.');
  });
});

describeSectionToggle(LABEL, 'back', 'beBack_section_expanded', /To return\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'beBack', /To return\./i, /I will be back at my desk in ten minutes/i, renderPage, getCard);

// --- behind ---

describe('BeVerbPage — "behind" section definitions', () => {
  it('renders definition for being late or delayed', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To be late or delayed\./i)).toBeInTheDocument();
  });

  it('renders definition for supporting someone', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To support someone or something\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To be late or delayed\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To support someone or something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To be late or delayed\./i)).toHaveAttribute('title', 'To be late or delayed.');
  });
});

describeSectionToggle(LABEL, 'behind', 'beBehind_section_expanded', /To be late or delayed\./i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'beBehind', /To be late or delayed\./i, /We are two weeks behind schedule on this project/i, renderPage, getCard);

// --- by ---

describe('BeVerbPage — "by" section definitions', () => {
  it('renders definition for being physically near', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be physically near\./i)).toBeInTheDocument();
  });

  it('renders definition for being the work of someone', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be the work of someone \(passive sense\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be physically near\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be the work of someone \(passive sense\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be physically near\./i)).toHaveAttribute('title', 'To be physically near.');
  });
});

describeSectionToggle(LABEL, 'by', 'beBy_section_expanded', /To be physically near\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'beBy', /To be physically near\./i, /The server room is by the elevator/i, renderPage, getCard);

// --- down ---

describe('BeVerbPage — "down" section definitions', () => {
  it('renders definition for a system not working', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(for systems or machines\)\./i)).toBeInTheDocument();
  });

  it('renders definition for decreasing', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To decrease\./i)).toBeInTheDocument();
  });

  it('renders definition for feeling sad', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To feel sad or depressed\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(for systems or machines\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To decrease\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To feel sad or depressed\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(for systems or machines\)\./i)).toHaveAttribute(
      'title',
      'To stop working (for systems or machines).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'beDown_section_expanded', /To stop working \(for systems or machines\)\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'beDown', /To stop working \(for systems or machines\)\./i, /The production environment is down right now/i, renderPage, getCard);

// --- for ---

describe('BeVerbPage — "for" section definitions', () => {
  it('renders definition for supporting something', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support or be in favor of\./i)).toBeInTheDocument();
  });

  it('renders definition for being intended for', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be intended for\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support or be in favor of\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be intended for\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support or be in favor of\./i)).toHaveAttribute(
      'title',
      'To support or be in favor of.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'beFor_section_expanded', /To support or be in favor of\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'beFor', /To support or be in favor of\./i, /We are for the new flexible working hours/i, renderPage, getCard);

// --- forward ---

describe('BeVerbPage — "forward" section definitions', () => {
  it('renders definition for acting too confidently', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To act presumptuously or too confidently\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To act presumptuously or too confidently\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To act presumptuously or too confidently\./i)).toHaveAttribute(
      'title',
      'To act presumptuously or too confidently.'
    );
  });
});

describeSectionToggle(LABEL, 'forward', 'beForward_section_expanded', /To act presumptuously or too confidently\./i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'beForward', /To act presumptuously or too confidently\./i, /I do not want to be forward/i, renderPage, getCard);

// --- in ---

describe('BeVerbPage — "in" section definitions', () => {
  it('renders definition for being at home or work', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be at home or in the office\./i)).toBeInTheDocument();
  });

  it('renders definition for being submitted', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be submitted\./i)).toBeInTheDocument();
  });

  it('renders definition for being fashionable', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be fashionable or popular\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be at home or in the office\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be submitted\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be fashionable or popular\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be at home or in the office\./i)).toHaveAttribute(
      'title',
      'To be at home or in the office.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'beIn_section_expanded', /To be at home or in the office\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'beIn', /To be at home or in the office\./i, /The CEO will be in at 9:00 AM/i, renderPage, getCard);

// --- into ---

describe('BeVerbPage — "into" section definitions', () => {
  it('renders definition for being very interested in something', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be very interested in something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be very interested in something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be very interested in something\./i)).toHaveAttribute(
      'title',
      'To be very interested in something.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'beInto_section_expanded', /To be very interested in something\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'beInto', /To be very interested in something\./i, /She is really into software architecture/i, renderPage, getCard);

// --- off ---

describe('BeVerbPage — "off" section definitions', () => {
  it('renders definition for leaving', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave\./i)).toBeInTheDocument();
  });

  it('renders definition for being canceled', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To be canceled\./i)).toBeInTheDocument();
  });

  it('renders definition for being absent from work', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To be absent from work\./i)).toBeInTheDocument();
  });

  it('renders definition for going bad (food)', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To go bad \(for food\)\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be canceled\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be absent from work\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To go bad \(for food\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave\./i)).toHaveAttribute('title', 'To leave.');
  });
});

describeSectionToggle(LABEL, 'off', 'beOff_section_expanded', /To leave\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'beOff', /To leave\./i, /I am off to the management conference now/i, renderPage, getCard);

// --- on ---

describe('BeVerbPage — "on" section definitions', () => {
  it('renders definition for happening as planned', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To happen as planned\./i)).toBeInTheDocument();
  });

  it('renders definition for functioning', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To function or operate \(for machines or devices\)\./i)).toBeInTheDocument();
  });

  it('renders definition for taking medication', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To take medication\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To happen as planned\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To function or operate \(for machines or devices\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To take medication\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To happen as planned\./i)).toHaveAttribute('title', 'To happen as planned.');
  });
});

describeSectionToggle(LABEL, 'on', 'beOn_section_expanded', /To happen as planned\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'beOn', /To happen as planned\./i, /Is the team meeting still on for tomorrow/i, renderPage, getCard);

// --- out ---

describe('BeVerbPage — "out" section definitions', () => {
  it('renders definition for being absent', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be absent from home or the office\./i)).toBeInTheDocument();
  });

  it('renders definition for being published', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be published or released\./i)).toBeInTheDocument();
  });

  it('renders definition for a secret being revealed', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be revealed \(for a secret\)\./i)).toBeInTheDocument();
  });

  it('renders definition for being unacceptable', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be impossible or unacceptable\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be absent from home or the office\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be published or released\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be revealed \(for a secret\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be impossible or unacceptable\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be absent from home or the office\./i)).toHaveAttribute(
      'title',
      'To be absent from home or the office.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'beOut_section_expanded', /To be absent from home or the office\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'beOut', /To be absent from home or the office\./i, /The manager is out until next week/i, renderPage, getCard);

// --- over ---

describe('BeVerbPage — "over" section definitions', () => {
  it('renders definition for being finished', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To be finished\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To be finished\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To be finished\./i)).toHaveAttribute('title', 'To be finished.');
  });
});

describeSectionToggle(LABEL, 'over', 'beOver_section_expanded', /To be finished\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'beOver', /To be finished\./i, /The sprint planning meeting is over/i, renderPage, getCard);

// --- through ---

describe('BeVerbPage — "through" section definitions', () => {
  it('renders definition for being finished with something', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be finished doing something or to end a relationship\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be finished doing something or to end a relationship\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be finished doing something or to end a relationship\./i)).toHaveAttribute(
      'title',
      'To be finished doing something or to end a relationship.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'beThrough_section_expanded', /To be finished doing something or to end a relationship\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'beThrough', /To be finished doing something or to end a relationship\./i, /I am through with using this outdated software/i, renderPage, getCard);

// --- to ---

describe('BeVerbPage — "to" section definitions', () => {
  it('renders definition for being required to do something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To be required or scheduled to do something \(formal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To be required or scheduled to do something \(formal\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To be required or scheduled to do something \(formal\)\./i)).toHaveAttribute(
      'title',
      'To be required or scheduled to do something (formal).'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'beTo_section_expanded', /To be required or scheduled to do something \(formal\)\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'beTo', /To be required or scheduled to do something \(formal\)\./i, /You are to report directly to the IT director/i, renderPage, getCard);

// --- together ---

describe('BeVerbPage — "together" section definitions', () => {
  it('renders definition for being unified', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To be unified or in a relationship\./i)).toBeInTheDocument();
  });

  it('renders definition for being organized', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To be organized \(have it together\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To be unified or in a relationship\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be organized \(have it together\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To be unified or in a relationship\./i)).toHaveAttribute(
      'title',
      'To be unified or in a relationship.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'beTogether_section_expanded', /To be unified or in a relationship\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'beTogether', /To be unified or in a relationship\./i, /The leadership team needs to be together on this decision/i, renderPage, getCard);

// --- up ---

describe('BeVerbPage — "up" section definitions', () => {
  it('renders definition for being awake', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be awake and out of bed\./i)).toBeInTheDocument();
  });

  it('renders definition for increasing', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To increase\./i)).toBeInTheDocument();
  });

  it('renders definition for being next in turn', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be next in turn\./i)).toBeInTheDocument();
  });

  it('renders definition for expiring', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To expire \(for time\)\./i)).toBeInTheDocument();
  });

  it('renders definition for something happening informally', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To happen \(informal\)\./i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be awake and out of bed\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To increase\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be next in turn\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To expire \(for time\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To happen \(informal\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be awake and out of bed\./i)).toHaveAttribute('title', 'To be awake and out of bed.');
  });
});

describeSectionToggle(LABEL, 'up', 'beUp_section_expanded', /To be awake and out of bed\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'beUp', /To be awake and out of bed\./i, /I was up all night fixing the Java code/i, renderPage, getCard);

// --- with ---

describe('BeVerbPage — "with" section definitions', () => {
  it('renders definition for supporting someone', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To support someone\./i)).toBeInTheDocument();
  });

  it('renders definition for understanding someone', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To understand someone\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To support someone\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To understand someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To support someone\./i)).toHaveAttribute('title', 'To support someone.');
  });
});

describeSectionToggle(LABEL, 'with', 'beWith_section_expanded', /To support someone\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'beWith', /To support someone\./i, /I am with you on this proposal/i, renderPage, getCard);

// --- without ---

describe('BeVerbPage — "without" section definitions', () => {
  it('renders definition for lacking something', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To lack something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To lack something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To lack something\./i)).toHaveAttribute('title', 'To lack something.');
  });
});

describeSectionToggle(LABEL, 'without', 'beWithout_section_expanded', /To lack something\./i, renderPage);

describeChevronAndColour(LABEL, 'without', renderPage);

describeDefaultImageCards(LABEL, 'without', 'beWithout', /To lack something\./i, /We are without internet access at the moment/i, renderPage, getCard);
