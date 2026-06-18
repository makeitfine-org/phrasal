import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around_round ---

describe('KnockVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for discussing casually', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To talk about ideas in an informal way\./i)).toBeInTheDocument();
  });

  it('renders definition for spending time without a plan', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To relax or travel without a strict schedule\./i)).toBeInTheDocument();
  });

  it('renders definition for existing somewhere', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/When an object is somewhere in a room but not organised\./i)).toBeInTheDocument();
  });

  it('renders definition for treating violently', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To hit someone repeatedly\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To talk about ideas in an informal way\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To talk about ideas in an informal way\./i)).toHaveAttribute(
      'title',
      'To talk about ideas in an informal way.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'knockAbout_section_expanded', /To talk about ideas in an informal way\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'knockAbout', /To talk about ideas in an informal way\./i, /We knocked a few new software features around during the meeting\./i, renderPage, getCard);

// --- against ---

describe('KnockVerbPage — "against" section definitions', () => {
  it('renders definition for accidentally hitting something', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To accidentally hit something while moving\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To accidentally hit something while moving\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To accidentally hit something while moving\./i)).toHaveAttribute(
      'title',
      'To accidentally hit something while moving.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'knockAgainst_section_expanded', /To accidentally hit something while moving\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'knockAgainst', /To accidentally hit something while moving\./i, /I knocked against the server rack and unplugged a cable\./i, renderPage, getCard);

// --- apart ---

describe('KnockVerbPage — "apart" section definitions', () => {
  it('renders definition for hitting something into pieces', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To hit something so hard it breaks into pieces\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To hit something so hard it breaks into pieces\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To hit something so hard it breaks into pieces\./i)).toHaveAttribute(
      'title',
      'To hit something so hard it breaks into pieces.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'knockApart_section_expanded', /To hit something so hard it breaks into pieces\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'knockApart', /To hit something so hard it breaks into pieces\./i, /The storm knocked the old warehouse apart\./i, renderPage, getCard);

// --- back ---

describe('KnockVerbPage — "back" section definitions', () => {
  it('renders definition for rejecting an offer', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reject an offer or application\./i)).toBeInTheDocument();
  });

  it('renders definition for costing money', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To cost someone a large amount of money\./i)).toBeInTheDocument();
  });

  it('renders definition for consuming a drink quickly', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To consume an alcoholic drink quickly\./i)).toBeInTheDocument();
  });

  it('renders definition for surprising or shocking', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To surprise or shock someone; to leave someone amazed or stunned\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reject an offer or application\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reject an offer or application\./i)).toHaveAttribute(
      'title',
      'To reject an offer or application.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'knockBack_section_expanded', /To reject an offer or application\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'knockBack', /To reject an offer or application\./i, /The investors knocked back our business proposal\./i, renderPage, getCard);

// --- down ---

describe('KnockVerbPage — "down" section definitions', () => {
  it('renders definition for destroying a building', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To destroy a building completely\./i)).toBeInTheDocument();
  });

  it('renders definition for reducing cost', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the cost of an item\./i)).toBeInTheDocument();
  });

  it('renders definition for negotiating a discount', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To successfully negotiate a discount\./i)).toBeInTheDocument();
  });

  it('renders definition for striking someone with a vehicle', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To strike someone with a vehicle so they fall\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To destroy a building completely\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To destroy a building completely\./i)).toHaveAttribute(
      'title',
      'To destroy a building completely.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'knockDown_section_expanded', /To destroy a building completely\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'knockDown', /To destroy a building completely\./i, /They knocked down the old office to build a new one\./i, renderPage, getCard);

// --- in ---

describe('KnockVerbPage — "in" section definitions', () => {
  it('renders definition for hitting a nail into a surface', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hit a nail or object so it goes into a surface\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hit a nail or object so it goes into a surface\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hit a nail or object so it goes into a surface\./i)).toHaveAttribute(
      'title',
      'To hit a nail or object so it goes into a surface.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'knockIn_section_expanded', /To hit a nail or object so it goes into a surface\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'knockIn', /To hit a nail or object so it goes into a surface\./i, /He knocked the nail in with a hammer\./i, renderPage, getCard);

// --- into ---

describe('KnockVerbPage — "into" section definitions', () => {
  it('renders definition for unexpectedly meeting someone', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To unexpectedly meet someone you know\./i)).toBeInTheDocument();
  });

  it('renders definition for walking into something by accident', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To walk into something by accident\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To unexpectedly meet someone you know\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To unexpectedly meet someone you know\./i)).toHaveAttribute(
      'title',
      'To unexpectedly meet someone you know.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'knockInto_section_expanded', /To unexpectedly meet someone you know\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'knockInto', /To unexpectedly meet someone you know\./i, /I knocked into my old project manager at the tech conference\./i, renderPage, getCard);

// --- off ---

describe('KnockVerbPage — "off" section definitions', () => {
  it('renders definition for finishing workday', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To finish your workday\./i)).toBeInTheDocument();
  });

  it('renders definition for removing an amount from a total', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove an amount from a total\./i)).toBeInTheDocument();
  });

  it('renders definition for producing work quickly', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To produce a piece of work very quickly\./i)).toBeInTheDocument();
  });

  it('renders definition for making a cheap imitation', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To make a cheap imitation of a product illegally\./i)).toBeInTheDocument();
  });

  it('renders definition for robbing a place', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To rob a place \(informal\)\./i)).toBeInTheDocument();
  });

  it('renders definition for killing someone', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To kill someone \(informal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To finish your workday\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To finish your workday\./i)).toHaveAttribute(
      'title',
      'To finish your workday.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'knockOff_section_expanded', /To finish your workday\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'knockOff', /To finish your workday\./i, /Let's knock off early today and go home\./i, renderPage, getCard);

// --- on ---

describe('KnockVerbPage — "on" section definitions', () => {
  it('renders definition for hitting a door repeatedly', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To hit a door repeatedly\./i)).toBeInTheDocument();
  });

  it('renders definition for knock-on effect', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/Used as "knock-on effect" to describe how one event causes another\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To hit a door repeatedly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To hit a door repeatedly\./i)).toHaveAttribute(
      'title',
      'To hit a door repeatedly.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'knockOn_section_expanded', /To hit a door repeatedly\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'knockOn', /To hit a door repeatedly\./i, /I knocked on, but no one answered the door\./i, renderPage, getCard);

// --- out ---

describe('KnockVerbPage — "out" section definitions', () => {
  it('renders definition for hitting someone unconscious', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To hit someone so hard they become unconscious\./i)).toBeInTheDocument();
  });

  it('renders definition for removing from a competition', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove a person or team from a competition\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping a system', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop a system from working\./i)).toBeInTheDocument();
  });

  it('renders definition for creating at high speed', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To create something at high speed\./i)).toBeInTheDocument();
  });

  it('renders definition for greatly impressing someone', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To greatly impress someone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To hit someone so hard they become unconscious\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To hit someone so hard they become unconscious\./i)).toHaveAttribute(
      'title',
      'To hit someone so hard they become unconscious.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'knockOut_section_expanded', /To hit someone so hard they become unconscious\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'knockOut', /To hit someone so hard they become unconscious\./i, /The boxer knocked his opponent out in the first round\./i, renderPage, getCard);

// --- over ---

describe('KnockVerbPage — "over" section definitions', () => {
  it('renders definition for hitting something so it falls', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To hit something so it falls on its side\./i)).toBeInTheDocument();
  });

  it('renders definition for stealing from a business', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To steal from a business \(informal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To hit something so it falls on its side\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To hit something so it falls on its side\./i)).toHaveAttribute(
      'title',
      'To hit something so it falls on its side.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'knockOver_section_expanded', /To hit something so it falls on its side\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'knockOver', /To hit something so it falls on its side\./i, /I accidentally knocked over my coffee onto the keyboard\./i, renderPage, getCard);

// --- through ---

describe('KnockVerbPage — "through" section definitions', () => {
  it('renders definition for removing a wall to connect rooms', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To remove a wall between two spaces to connect rooms\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To remove a wall between two spaces to connect rooms\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To remove a wall between two spaces to connect rooms\./i)).toHaveAttribute(
      'title',
      'To remove a wall between two spaces to connect rooms.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'knockThrough_section_expanded', /To remove a wall between two spaces to connect rooms\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'knockThrough', /To remove a wall between two spaces to connect rooms\./i, /We knocked through the wall to create an open-plan office\./i, renderPage, getCard);

// --- together ---

describe('KnockVerbPage — "together" section definitions', () => {
  it('renders definition for creating something quickly', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To create something quickly using whatever is available\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To create something quickly using whatever is available\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To create something quickly using whatever is available\./i)).toHaveAttribute(
      'title',
      'To create something quickly using whatever is available.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'knockTogether_section_expanded', /To create something quickly using whatever is available\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'knockTogether', /To create something quickly using whatever is available\./i, /I knocked together a quick test environment for the new app\./i, renderPage, getCard);

// --- up ---

describe('KnockVerbPage — "up" section definitions', () => {
  it('renders definition for making something quickly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a meal or item in a short time\./i)).toBeInTheDocument();
  });

  it('renders definition for knocking on a door to wake someone', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To knock on a door to wake someone \(UK English\)\./i)).toBeInTheDocument();
  });

  it('renders definition for making someone pregnant', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make someone pregnant \(informal\/slang\)\./i)).toBeInTheDocument();
  });

  it('renders definition for warming up for tennis', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To warm up for tennis by hitting the ball before a match\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a meal or item in a short time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a meal or item in a short time\./i)).toHaveAttribute(
      'title',
      'To make a meal or item in a short time.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'knockUp_section_expanded', /To make a meal or item in a short time\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'knockUp', /To make a meal or item in a short time\./i, /Let me knock up a quick presentation for the client\./i, renderPage, getCard);
