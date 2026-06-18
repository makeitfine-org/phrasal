import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around ---

describe('StandVerbPage — "about / around" section definitions', () => {
  it('renders definition for spending time doing nothing or waiting', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To spend time in a place doing nothing or waiting\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To spend time in a place doing nothing or waiting\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To spend time in a place doing nothing or waiting\./i)).toHaveAttribute(
      'title',
      'To spend time in a place doing nothing or waiting.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around', 'standAbout_section_expanded', /To spend time in a place doing nothing or waiting\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around', renderPage);

describeDefaultImageCards(LABEL, 'about / around', 'standAbout', /To spend time in a place doing nothing or waiting\./i, /We were just standing around waiting for the meeting to start\./i, renderPage, getCard);

// --- against ---

describe('StandVerbPage — "against" section definitions', () => {
  it('renders definition for opposing someone or something', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose or fight against someone or something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose or fight against someone or something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose or fight against someone or something\./i)).toHaveAttribute(
      'title',
      'To oppose or fight against someone or something.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'standAgainst_section_expanded', /To oppose or fight against someone or something\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'standAgainst', /To oppose or fight against someone or something\./i, /The team leader stood against the new policy because it was bad for productivity\./i, renderPage, getCard);

// --- apart ---

describe('StandVerbPage — "apart" section definitions', () => {
  it('renders definition for being separate or isolated from others', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be separate or isolated from others\./i)).toBeInTheDocument();
  });

  it('renders definition for being noticeably different or better', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be noticeably different or better than others\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be separate or isolated from others\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be noticeably different or better than others\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be separate or isolated from others\./i)).toHaveAttribute(
      'title',
      'To be separate or isolated from others.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'standApart_section_expanded', /To be separate or isolated from others\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'standApart', /To be separate or isolated from others\./i, /The two servers stand apart in the data center for security reasons\./i, renderPage, getCard);

// --- away ---

describe('StandVerbPage — "away" section definitions', () => {
  it('renders definition for moving backwards or keeping a distance', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move backwards or keep a distance from something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move backwards or keep a distance from something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move backwards or keep a distance from something/i)).toHaveAttribute(
      'title',
      'To move backwards or keep a distance from something (mostly literal).'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'standAway_section_expanded', /To move backwards or keep a distance from something/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'standAway', /To move backwards or keep a distance from something/i, /Please stand away from the servers while they are restarting\./i, renderPage, getCard);

// --- back ---

describe('StandVerbPage — "back" section definitions', () => {
  it('renders definition for moving a short distance away', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To move a short distance away or backwards\./i)).toBeInTheDocument();
  });

  it('renders definition for viewing a situation objectively', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To view a situation objectively, from a wider perspective\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To move a short distance away or backwards\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To view a situation objectively, from a wider perspective\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To move a short distance away or backwards\./i)).toHaveAttribute(
      'title',
      'To move a short distance away or backwards.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'standBack_section_expanded', /To move a short distance away or backwards\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'standBack', /To move a short distance away or backwards\./i, /The firefighters told everyone to stand back\./i, renderPage, getCard);

// --- behind ---

describe('StandVerbPage — "behind" section definitions', () => {
  it('renders definition for supporting someone or guaranteeing quality', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To support someone or guarantee the quality of something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To support someone or guarantee the quality of something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To support someone or guarantee the quality of something\./i)).toHaveAttribute(
      'title',
      'To support someone or guarantee the quality of something.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'standBehind_section_expanded', /To support someone or guarantee the quality of something\./i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'standBehind', /To support someone or guarantee the quality of something\./i, /We stand behind the quality of our Java software products\./i, renderPage, getCard);

// --- by ---

describe('StandVerbPage — "by" section definitions', () => {
  it('renders definition for being ready for action', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be ready for action\./i)).toBeInTheDocument();
  });

  it('renders definition for remaining loyal to someone', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To remain loyal to someone in a difficult situation\./i)).toBeInTheDocument();
  });

  it('renders definition for adhering to a promise', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To adhere to a promise, decision, or belief\./i)).toBeInTheDocument();
  });

  it('renders definition for watching without helping', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To watch something bad happen without trying to help\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be ready for action\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To remain loyal to someone in a difficult situation\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To adhere to a promise, decision, or belief\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To watch something bad happen without trying to help\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be ready for action\./i)).toHaveAttribute(
      'title',
      'To be ready for action.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'standBy_section_expanded', /To be ready for action\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'standBy', /To be ready for action\./i, /The IT support team is standing by to fix the network issue\./i, renderPage, getCard);

// --- down ---

describe('StandVerbPage — "down" section definitions', () => {
  it('renders definition for resigning from leadership', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To resign or leave a position of leadership\./i)).toBeInTheDocument();
  });

  it('renders definition for relaxing from security readiness', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To relax from a state of military or security readiness\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To resign or leave a position of leadership\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To relax from a state of military or security readiness\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To resign or leave a position of leadership\./i)).toHaveAttribute(
      'title',
      'To resign or leave a position of leadership.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'standDown_section_expanded', /To resign or leave a position of leadership\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'standDown', /To resign or leave a position of leadership\./i, /The CEO agreed to stand down after ten years in charge\./i, renderPage, getCard);

// --- for ---

describe('StandVerbPage — "for" section definitions', () => {
  it('renders definition for representing a word or idea', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To represent a word or idea/i)).toBeInTheDocument();
  });

  it('renders definition for tolerating or accepting', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To tolerate or accept/i)).toBeInTheDocument();
  });

  it('renders definition for supporting a cause or principle', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support a cause or principle\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To represent a word or idea/i)).toHaveClass('truncate');
    expect(screen.getByText(/To tolerate or accept/i)).toHaveClass('truncate');
    expect(screen.getByText(/To support a cause or principle\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To represent a word or idea/i)).toHaveAttribute(
      'title',
      'To represent a word or idea (for abbreviations).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'standFor_section_expanded', /To represent a word or idea/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'standFor', /To represent a word or idea/i, /In software development, API stands for Application Programming Interface\./i, renderPage, getCard);

// --- in ---

describe('StandVerbPage — "in" section definitions', () => {
  it('renders definition for temporarily replacing someone', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To temporarily replace or substitute for someone who is absent/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To temporarily replace or substitute for someone who is absent/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To temporarily replace or substitute for someone who is absent/i)).toHaveAttribute(
      'title',
      'To temporarily replace or substitute for someone who is absent (often "stand in for").'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'standIn_section_expanded', /To temporarily replace or substitute for someone who is absent/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'standIn', /To temporarily replace or substitute for someone who is absent/i, /I will stand in for the manager while she is on a business trip\./i, renderPage, getCard);

// --- into ---

describe('StandVerbPage — "into" section definitions', () => {
  it('renders definition for sailing toward danger', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To sail or move toward danger/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To sail or move toward danger/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To sail or move toward danger/i)).toHaveAttribute(
      'title',
      'To sail or move toward danger (rare, old nautical term).'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'standInto_section_expanded', /To sail or move toward danger/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'standInto', /To sail or move toward danger/i, /The ship was standing into the storm\./i, renderPage, getCard);

// --- off ---

describe('StandVerbPage — "off" section definitions', () => {
  it('renders definition for keeping at a distance', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To keep at a distance, or to keep someone away\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To keep at a distance, or to keep someone away\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To keep at a distance, or to keep someone away\./i)).toHaveAttribute(
      'title',
      'To keep at a distance, or to keep someone away.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'standOff_section_expanded', /To keep at a distance, or to keep someone away\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'standOff', /To keep at a distance, or to keep someone away\./i, /The police managed to stand off the angry crowd\./i, renderPage, getCard);

// --- on ---

describe('StandVerbPage — "on" section definitions', () => {
  it('renders definition for insisting on strict rules or formalities', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To insist on strict rules or formalities\./i)).toBeInTheDocument();
  });

  it('renders definition for relying on or being based on', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To rely on or be based on\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To insist on strict rules or formalities\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To rely on or be based on\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To insist on strict rules or formalities\./i)).toHaveAttribute(
      'title',
      'To insist on strict rules or formalities.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'standOn_section_expanded', /To insist on strict rules or formalities\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'standOn', /To insist on strict rules or formalities\./i, /We don't need to stand on ceremony; just call me by my first name\./i, renderPage, getCard);

// --- out ---

describe('StandVerbPage — "out" section definitions', () => {
  it('renders definition for being easy to see or notice', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be very easy to see or notice\./i)).toBeInTheDocument();
  });

  it('renders definition for being much better than others', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be much better than others\./i)).toBeInTheDocument();
  });

  it('renders definition for stubbornly resisting', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stubbornly resist or hold out for a better offer\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be very easy to see or notice\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be much better than others\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To stubbornly resist or hold out for a better offer\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be very easy to see or notice\./i)).toHaveAttribute(
      'title',
      'To be very easy to see or notice.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'standOut_section_expanded', /To be very easy to see or notice\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'standOut', /To be very easy to see or notice\./i, /The red button stands out against the dark background of the app\./i, renderPage, getCard);

// --- over ---

describe('StandVerbPage — "over" section definitions', () => {
  it('renders definition for watching someone closely', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To watch someone closely, often in an intimidating or annoying way\./i)).toBeInTheDocument();
  });

  it('renders definition for being postponed', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To be postponed or delayed to a later time\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To watch someone closely, often in an intimidating or annoying way\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be postponed or delayed to a later time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To watch someone closely, often in an intimidating or annoying way\./i)).toHaveAttribute(
      'title',
      'To watch someone closely, often in an intimidating or annoying way.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'standOver_section_expanded', /To watch someone closely, often in an intimidating or annoying way\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'standOver', /To watch someone closely, often in an intimidating or annoying way\./i, /I can't write code well if the boss is standing over me\./i, renderPage, getCard);

// --- to ---

describe('StandVerbPage — "to" section definitions', () => {
  it('renders definition for taking up defensive positions', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To take up defensive positions/i)).toBeInTheDocument();
  });

  it('renders definition for being likely to gain or lose something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To be in a position where you are likely to gain or lose something\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To take up defensive positions/i)).toHaveClass('truncate');
    expect(screen.getByText(/To be in a position where you are likely to gain or lose something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To take up defensive positions/i)).toHaveAttribute(
      'title',
      'To take up defensive positions (military).'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'standTo_section_expanded', /To take up defensive positions/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'standTo', /To take up defensive positions/i, /The soldiers were ordered to stand to\./i, renderPage, getCard);

// --- together ---

describe('StandVerbPage — "together" section definitions', () => {
  it('renders definition for remaining united', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain united and support each other\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain united and support each other\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain united and support each other\./i)).toHaveAttribute(
      'title',
      'To remain united and support each other.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'standTogether_section_expanded', /To remain united and support each other\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'standTogether', /To remain united and support each other\./i, /The team must stand together during this difficult transition period\./i, renderPage, getCard);

// --- up ---

describe('StandVerbPage — "up" section definitions', () => {
  it('renders definition for rising to your feet', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rise to your feet\./i)).toBeInTheDocument();
  });

  it('renders definition for remaining valid or strong when tested', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To remain valid, true, or strong when tested\./i)).toBeInTheDocument();
  });

  it('renders definition for failing to keep an appointment', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fail to keep an appointment or date with someone\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rise to your feet\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To remain valid, true, or strong when tested\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To fail to keep an appointment or date with someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rise to your feet\./i)).toHaveAttribute(
      'title',
      'To rise to your feet.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'standUp_section_expanded', /To rise to your feet\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'standUp', /To rise to your feet\./i, /Please stand up when the clients enter the room\./i, renderPage, getCard);

// --- with ---

describe('StandVerbPage — "with" section definitions', () => {
  it('renders definition for expressing solidarity or support', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To express solidarity or support for someone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To express solidarity or support for someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To express solidarity or support for someone\./i)).toHaveAttribute(
      'title',
      'To express solidarity or support for someone.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'standWith_section_expanded', /To express solidarity or support for someone\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'standWith', /To express solidarity or support for someone\./i, /We stand with our colleagues in the overseas office during their difficult time\./i, renderPage, getCard);
