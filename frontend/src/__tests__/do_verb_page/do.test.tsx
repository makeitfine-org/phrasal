import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('DoVerbPage — "about" section definitions', () => {
  it('renders definition for taking action to fix a problem', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To take action to fix a problem\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To take action to fix a problem\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To take action to fix a problem\./i)).toHaveAttribute(
      'title',
      'To take action to fix a problem.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'doAbout_section_expanded', /To take action to fix a problem\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'doAbout', /To take action to fix a problem\./i, /what are we going to do about it/i, renderPage, getCard);

// --- away ---

describe('DoVerbPage — "away" section definitions', () => {
  it('renders definition for abolishing or getting rid of something', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To abolish, get rid of, or stop using something\./i)).toBeInTheDocument();
  });

  it('renders definition for killing someone or an animal', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To kill someone or an animal \(informal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To abolish, get rid of, or stop using something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To abolish, get rid of, or stop using something\./i)).toHaveAttribute(
      'title',
      'To abolish, get rid of, or stop using something.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'doAway_section_expanded', /To abolish, get rid of, or stop using something\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'doAway', /To abolish, get rid of, or stop using something\./i, /do away with paper receipts/i, renderPage, getCard);

// --- by ---

describe('DoVerbPage — "by" section definitions', () => {
  it('renders definition for treating someone in a particular way', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To treat someone in a particular way/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To treat someone in a particular way/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To treat someone in a particular way/i)).toHaveAttribute(
      'title',
      'To treat someone in a particular way (almost always used in the phrase "do right by" or "do well by" someone).'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'doBy_section_expanded', /To treat someone in a particular way/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'doBy', /To treat someone in a particular way/i, /do right by your team members/i, renderPage, getCard);

// --- down ---

describe('DoVerbPage — "down" section definitions', () => {
  it('renders definition for criticizing someone unfairly', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To criticize someone unfairly, making them or yourself seem less successful or important\./i)).toBeInTheDocument();
  });

  it('renders definition for cheating someone in a business deal', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To cheat someone, usually in a business deal\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To criticize someone unfairly, making them or yourself seem less successful or important\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To criticize someone unfairly, making them or yourself seem less successful or important\./i)).toHaveAttribute(
      'title',
      'To criticize someone unfairly, making them or yourself seem less successful or important.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'doDown_section_expanded', /To criticize someone unfairly, making them or yourself seem less successful or important\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'doDown', /To criticize someone unfairly, making them or yourself seem less successful or important\./i, /Stop doing yourself down/i, renderPage, getCard);

// --- for ---

describe('DoVerbPage — "for" section definitions', () => {
  it('renders definition for severely damaging or ruining', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To severely damage, ruin, or kill/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To severely damage, ruin, or kill/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To severely damage, ruin, or kill/i)).toHaveAttribute(
      'title',
      'To severely damage, ruin, or kill (usually used in the passive "be done for").'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'doFor_section_expanded', /To severely damage, ruin, or kill/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'doFor', /To severely damage, ruin, or kill/i, /we are done for/i, renderPage, getCard);

// --- in ---

describe('DoVerbPage — "in" section definitions', () => {
  it('renders definition for making someone extremely tired', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make someone extremely tired \(exhaust\)\./i)).toBeInTheDocument();
  });

  it('renders definition for injuring a body part', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To injure a body part\./i)).toBeInTheDocument();
  });

  it('renders definition for killing or murdering', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To kill or murder \(informal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make someone extremely tired \(exhaust\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make someone extremely tired \(exhaust\)\./i)).toHaveAttribute(
      'title',
      'To make someone extremely tired (exhaust).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'doIn_section_expanded', /To make someone extremely tired \(exhaust\)\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'doIn', /To make someone extremely tired \(exhaust\)\./i, /That 10-kilometer run really did me in/i, renderPage, getCard);

// --- into ---

describe('DoVerbPage — "into" section definitions', () => {
  it('renders definition for translating a text into another language', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To translate a piece of text into another language/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To translate a piece of text into another language/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To translate a piece of text into another language/i)).toHaveAttribute(
      'title',
      'To translate a piece of text into another language (formal and slightly old-fashioned).'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'doInto_section_expanded', /To translate a piece of text into another language/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'doInto', /To translate a piece of text into another language/i, /done into English by a famous scholar/i, renderPage, getCard);

// --- out ---

describe('DoVerbPage — "out" section definitions', () => {
  it('renders definition for cleaning or decorating a room thoroughly', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To clean or decorate a room thoroughly\./i)).toBeInTheDocument();
  });

  it('renders definition for cheating someone to take something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To cheat someone in order to take something from them/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To clean or decorate a room thoroughly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To clean or decorate a room thoroughly\./i)).toHaveAttribute(
      'title',
      'To clean or decorate a room thoroughly.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'doOut_section_expanded', /To clean or decorate a room thoroughly\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'doOut', /To clean or decorate a room thoroughly\./i, /do out the kitchen cupboards/i, renderPage, getCard);

// --- over ---

describe('DoVerbPage — "over" section definitions', () => {
  it('renders definition for doing something again because it was wrong', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To do something again because it was wrong the first time/i)).toBeInTheDocument();
  });

  it('renders definition for attacking and beating someone up', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To attack and beat someone up \(UK informal\)\./i)).toBeInTheDocument();
  });

  it('renders definition for burgling or robbing a place', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To burgle or rob a place \(UK informal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To do something again because it was wrong the first time/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To do something again because it was wrong the first time/i)).toHaveAttribute(
      'title',
      'To do something again because it was wrong the first time (mainly US English).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'doOver_section_expanded', /To do something again because it was wrong the first time/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'doOver', /To do something again because it was wrong the first time/i, /you need to do it over/i, renderPage, getCard);

// --- to ---

describe('DoVerbPage — "to" section definitions', () => {
  it('renders definition for treating someone in a certain way', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To treat someone in a certain way, usually causing harm, damage, or change\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To treat someone in a certain way, usually causing harm, damage, or change\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To treat someone in a certain way, usually causing harm, damage, or change\./i)).toHaveAttribute(
      'title',
      'To treat someone in a certain way, usually causing harm, damage, or change.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'doTo_section_expanded', /To treat someone in a certain way, usually causing harm, damage, or change\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'doTo', /To treat someone in a certain way, usually causing harm, damage, or change\./i, /what the hairdresser did to my hair/i, renderPage, getCard);

// --- up ---

describe('DoVerbPage — "up" section definitions', () => {
  it('renders definition for fastening clothes or seatbelts', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fasten or tie clothes, shoelaces, or seatbelts\./i)).toBeInTheDocument();
  });

  it('renders definition for repairing or renovating a building', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To repair, decorate, or renovate a building or room\./i)).toBeInTheDocument();
  });

  it('renders definition for wrapping a parcel or gift', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To wrap a parcel or gift\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fasten or tie clothes, shoelaces, or seatbelts\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fasten or tie clothes, shoelaces, or seatbelts\./i)).toHaveAttribute(
      'title',
      'To fasten or tie clothes, shoelaces, or seatbelts.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'doUp_section_expanded', /To fasten or tie clothes, shoelaces, or seatbelts\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'doUp', /To fasten or tie clothes, shoelaces, or seatbelts\./i, /make sure to do up your coat/i, renderPage, getCard);

// --- with ---

describe('DoVerbPage — "with" section definitions', () => {
  it('renders definition for needing or wanting something', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To need or want something/i)).toBeInTheDocument();
  });

  it('renders definition for having a connection or relationship with', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To have a connection or relationship with/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To need or want something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To need or want something/i)).toHaveAttribute(
      'title',
      'To need or want something (always used with "could" or "can").'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'doWith_section_expanded', /To need or want something/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'doWith', /To need or want something/i, /I could really do with a hot cup of coffee/i, renderPage, getCard);

// --- without ---

describe('DoVerbPage — "without" section definitions', () => {
  it('renders definition for managing to survive without something needed', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To manage to survive or continue even when you do not have something you need\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To manage to survive or continue even when you do not have something you need\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To manage to survive or continue even when you do not have something you need\./i)).toHaveAttribute(
      'title',
      'To manage to survive or continue even when you do not have something you need.'
    );
  });
});

describeSectionToggle(LABEL, 'without', 'doWithout_section_expanded', /To manage to survive or continue even when you do not have something you need\./i, renderPage);

describeChevronAndColour(LABEL, 'without', renderPage);

describeDefaultImageCards(LABEL, 'without', 'doWithout', /To manage to survive or continue even when you do not have something you need\./i, /we will just have to do without/i, renderPage, getCard);
