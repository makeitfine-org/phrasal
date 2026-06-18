import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'EatVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- around_round ---

describe('EatVerbPage — "around / round" section definitions', () => {
  it('renders definition for avoiding a specific ingredient', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To consume a meal while deliberately avoiding a specific ingredient on the plate\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To consume a meal while deliberately avoiding a specific ingredient on the plate\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To consume a meal while deliberately avoiding a specific ingredient on the plate\./i)).toHaveAttribute(
      'title',
      'To consume a meal while deliberately avoiding a specific ingredient on the plate.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'eatAround_section_expanded', /To consume a meal while deliberately avoiding a specific ingredient on the plate\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'eatAround', /To consume a meal while deliberately avoiding a specific ingredient on the plate\./i, /The child absolutely hated mushrooms and carefully ate around them\./i, renderPage, getCard);

// --- away ---

describe('EatVerbPage — "away" section definitions', () => {
  it('renders definition for gradually destroying or eroding something', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually destroy, erode, or consume something over time\./i)).toBeInTheDocument();
  });

  it('renders definition for continuously bothering or distressing someone', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To continuously bother, distress, or cause anxiety for someone \(often used with "at"\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually destroy, erode, or consume something over time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually destroy, erode, or consume something over time\./i)).toHaveAttribute(
      'title',
      'To gradually destroy, erode, or consume something over time.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'eatAway_section_expanded', /To gradually destroy, erode, or consume something over time\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'eatAway', /To gradually destroy, erode, or consume something over time\./i, /Over thousands of years, the river slowly ate away the soft limestone\./i, renderPage, getCard);

// --- down ---

describe('EatVerbPage — "down" section definitions', () => {
  it('renders definition for grazing pasture until gone', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To graze pasture or grass until it is very short or completely gone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To graze pasture or grass until it is very short or completely gone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To graze pasture or grass until it is very short or completely gone\./i)).toHaveAttribute(
      'title',
      'To graze pasture or grass until it is very short or completely gone.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'eatDown_section_expanded', /To graze pasture or grass until it is very short or completely gone\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'eatDown', /To graze pasture or grass until it is very short or completely gone\./i, /The herd of sheep completely ate down the grass in the lower field\./i, renderPage, getCard);

// --- in ---

describe('EatVerbPage — "in" section definitions', () => {
  it('renders definition for eating at home', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To eat a meal at home instead of going to a restaurant\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To eat a meal at home instead of going to a restaurant\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To eat a meal at home instead of going to a restaurant\./i)).toHaveAttribute(
      'title',
      'To eat a meal at home instead of going to a restaurant.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'eatIn_section_expanded', /To eat a meal at home instead of going to a restaurant\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'eatIn', /To eat a meal at home instead of going to a restaurant\./i, /We are trying to stick to a tight budget, so we plan to eat in this weekend\./i, renderPage, getCard);

// --- into ---

describe('EatVerbPage — "into" section definitions', () => {
  it('renders definition for using up a portion of a valuable reserve', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To use up a portion of a valuable reserve, especially money or time\./i)).toBeInTheDocument();
  });

  it('renders definition for gradually damaging through corrosion', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To gradually damage or destroy a surface through chemical action or corrosion\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To use up a portion of a valuable reserve, especially money or time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To use up a portion of a valuable reserve, especially money or time\./i)).toHaveAttribute(
      'title',
      'To use up a portion of a valuable reserve, especially money or time.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'eatInto_section_expanded', /To use up a portion of a valuable reserve, especially money or time\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'eatInto', /To use up a portion of a valuable reserve, especially money or time\./i, /The unexpected plumbing repairs really ate into our vacation savings\./i, renderPage, getCard);

// --- off ---

describe('EatVerbPage — "off" section definitions', () => {
  it('renders definition for removing a layer by eating or corrosion', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove a layer or surface by eating, chewing, or chemical corrosion\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove a layer or surface by eating, chewing, or chemical corrosion\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove a layer or surface by eating, chewing, or chemical corrosion\./i)).toHaveAttribute(
      'title',
      'To remove a layer or surface by eating, chewing, or chemical corrosion.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'eatOff_section_expanded', /To remove a layer or surface by eating, chewing, or chemical corrosion\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'eatOff', /To remove a layer or surface by eating, chewing, or chemical corrosion\./i, /The dog chewed the furniture so aggressively that he ate the varnish off\./i, renderPage, getCard);

// --- on ---

describe('EatVerbPage — "on" section definitions', () => {
  it('renders definition for gradually consuming leftover food', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To gradually consume a large amount of leftover food over an extended period\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To gradually consume a large amount of leftover food over an extended period\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To gradually consume a large amount of leftover food over an extended period\./i)).toHaveAttribute(
      'title',
      'To gradually consume a large amount of leftover food over an extended period.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'eatOn_section_expanded', /To gradually consume a large amount of leftover food over an extended period\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'eatOn', /To gradually consume a large amount of leftover food over an extended period\./i, /We cooked a massive turkey for the holiday and will just eat on it for the rest of the week\./i, renderPage, getCard);

// --- out ---

describe('EatVerbPage — "out" section definitions', () => {
  it('renders definition for eating at a restaurant', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To eat a meal at a restaurant or café rather than cooking at home\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To eat a meal at a restaurant or café rather than cooking at home\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To eat a meal at a restaurant or café rather than cooking at home\./i)).toHaveAttribute(
      'title',
      'To eat a meal at a restaurant or café rather than cooking at home.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'eatOut_section_expanded', /To eat a meal at a restaurant or café rather than cooking at home\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'eatOut', /To eat a meal at a restaurant or café rather than cooking at home\./i, /I am far too exhausted to cook, so let's eat out tonight\./i, renderPage, getCard);

// --- through ---

describe('EatVerbPage — "through" section definitions', () => {
  it('renders definition for making a physical hole by eating or corroding', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To make a physical hole in something by biting, chewing, or corroding\./i)).toBeInTheDocument();
  });

  it('renders definition for exhausting a supply of money rapidly', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To exhaust or consume a massive supply of money or resources very rapidly\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To make a physical hole in something by biting, chewing, or corroding\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To make a physical hole in something by biting, chewing, or corroding\./i)).toHaveAttribute(
      'title',
      'To make a physical hole in something by biting, chewing, or corroding.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'eatThrough_section_expanded', /To make a physical hole in something by biting, chewing, or corroding\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'eatThrough', /To make a physical hole in something by biting, chewing, or corroding\./i, /During the winter, mice managed to eat through the drywall in the garage\./i, renderPage, getCard);

// --- up ---

describe('EatVerbPage — "up" section definitions', () => {
  it('renders definition for consuming food completely', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To consume a meal or food completely\./i)).toBeInTheDocument();
  });

  it('renders definition for consuming time money or resources', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To consume a large amount of time, money, or resources\./i)).toBeInTheDocument();
  });

  it('renders definition for enjoying something greatly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To enjoy something greatly, or to eagerly believe something without questioning it\./i)).toBeInTheDocument();
  });

  it('renders definition for consuming someone emotionally', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To consume someone emotionally with negative feelings like guilt or jealousy\./i)).toBeInTheDocument();
  });

  it('renders definition for absorbing or defeating a competitor', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To completely absorb, destroy, or defeat a competitor\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To consume a meal or food completely\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To consume a meal or food completely\./i)).toHaveAttribute(
      'title',
      'To consume a meal or food completely.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'eatUp_section_expanded', /To consume a meal or food completely\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'eatUp', /To consume a meal or food completely\./i, /You need to eat up your vegetables before you can have dessert\./i, renderPage, getCard);
