import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- apart ---

describe('GrowVerbPage — "apart" section definitions', () => {
  it('renders definition for gradually becoming less close in a relationship', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To gradually become less close in a relationship over time\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To gradually become less close in a relationship over time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To gradually become less close in a relationship over time\./i)).toHaveAttribute(
      'title',
      'To gradually become less close in a relationship over time.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'growApart_section_expanded', /To gradually become less close in a relationship over time\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'growApart', /To gradually become less close in a relationship over time\./i, /The co-founders grew apart over the years and eventually split the business\./i, renderPage, getCard);

// --- away ---

describe('GrowVerbPage — "away" section definitions', () => {
  it('renders definition for gradually becoming less connected', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually become less connected to someone or something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually become less connected to someone or something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually become less connected to someone or something/i)).toHaveAttribute(
      'title',
      'To gradually become less connected to someone or something, or to stop supporting a past habit or idea.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'growAway_section_expanded', /To gradually become less connected to someone or something/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'growAway', /To gradually become less connected to someone or something/i, /As the startup expanded, we naturally grew away from our original/i, renderPage, getCard);

// --- back ---

describe('GrowVerbPage — "back" section definitions', () => {
  it('renders definition for growing again after being cut or damaged', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To grow again after being cut, broken, or damaged/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To grow again after being cut, broken, or damaged/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To grow again after being cut, broken, or damaged/i)).toHaveAttribute(
      'title',
      'To grow again after being cut, broken, or damaged (usually referring to plants or hair).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'growBack_section_expanded', /To grow again after being cut, broken, or damaged/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'growBack', /To grow again after being cut, broken, or damaged/i, /We had to cut down the tree, but the branches are starting to grow back\./i, renderPage, getCard);

// --- in ---

describe('GrowVerbPage — "in" section definitions', () => {
  it('renders definition for filling an empty space by growing', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To fill an empty space by growing/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To fill an empty space by growing/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To fill an empty space by growing/i)).toHaveAttribute(
      'title',
      'To fill an empty space by growing (often used for hair or plants).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'growIn_section_expanded', /To fill an empty space by growing/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'growIn', /To fill an empty space by growing/i, /We planted new seeds in the garden, and the grass is finally growing in\./i, renderPage, getCard);

// --- into ---

describe('GrowVerbPage — "into" section definitions', () => {
  it('renders definition for developing skills for a new role', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To develop the skills and confidence needed for a new role or responsibility\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming large enough to fit clothing', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To become large enough to fit into clothing\./i)).toBeInTheDocument();
  });

  it('renders definition for developing into a different or larger state', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To develop into a different or larger state\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To develop the skills and confidence needed for a new role or responsibility\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To develop the skills and confidence needed for a new role or responsibility\./i)).toHaveAttribute(
      'title',
      'To develop the skills and confidence needed for a new role or responsibility.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'growInto_section_expanded', /To develop the skills and confidence needed for a new role or responsibility\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'growInto', /To develop the skills and confidence needed for a new role or responsibility\./i, /It was a big promotion, but she quickly grew into her position as a team leader\./i, renderPage, getCard);

// --- on ---

describe('GrowVerbPage — "on" section definitions', () => {
  it('renders definition for becoming increasingly liked over time', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To become increasingly liked or appreciated by someone over time\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To become increasingly liked or appreciated by someone over time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To become increasingly liked or appreciated by someone over time\./i)).toHaveAttribute(
      'title',
      'To become increasingly liked or appreciated by someone over time.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'growOn_section_expanded', /To become increasingly liked or appreciated by someone over time\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'growOn', /To become increasingly liked or appreciated by someone over time\./i, /I didn't like the new management software at first/i, renderPage, getCard);

// --- out_out_of ---

describe('GrowVerbPage — "out / out of" section definitions', () => {
  it('renders definition for allowing hair to grow back', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To allow hair to grow back to its natural style or color\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming too big for a space', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To become too big for a physical space or piece of clothing\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping something as you become more mature', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To stop doing something as you become older or more mature\./i)).toBeInTheDocument();
  });

  it('renders definition for developing as a direct result of something', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To develop or happen as a direct result of something else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To allow hair to grow back to its natural style or color\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To allow hair to grow back to its natural style or color\./i)).toHaveAttribute(
      'title',
      'To allow hair to grow back to its natural style or color.'
    );
  });
});

describeSectionToggle(LABEL, 'out / out of', 'growOut_section_expanded', /To allow hair to grow back to its natural style or color\./i, renderPage);

describeChevronAndColour(LABEL, 'out / out of', renderPage);

describeDefaultImageCards(LABEL, 'out / out of', 'growOut', /To allow hair to grow back to its natural style or color\./i, /She is growing out her dyed blonde hair\./i, renderPage, getCard);

// --- over ---

describe('GrowVerbPage — "over" section definitions', () => {
  it('renders definition for becoming covered with growing plants', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To become covered with growing plants/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To become covered with growing plants/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To become covered with growing plants/i)).toHaveAttribute(
      'title',
      'To become covered with growing plants (like vines, moss, or grass).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'growOver_section_expanded', /To become covered with growing plants/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'growOver', /To become covered with growing plants/i, /The old, abandoned factory was eventually grown over by ivy\./i, renderPage, getCard);

// --- to ---

describe('GrowVerbPage — "to" section definitions', () => {
  it('renders definition for gradually beginning to experience a feeling', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To gradually begin to experience a feeling or an action/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To gradually begin to experience a feeling or an action/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To gradually begin to experience a feeling or an action/i)).toHaveAttribute(
      'title',
      'To gradually begin to experience a feeling or an action (usually followed by another verb, like like, love, realize, understand).'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'growTo_section_expanded', /To gradually begin to experience a feeling or an action/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'growTo', /To gradually begin to experience a feeling or an action/i, /After working with him for a year, I grew to respect his leadership style\./i, renderPage, getCard);

// --- together ---

describe('GrowVerbPage — "together" section definitions', () => {
  it('renders definition for becoming closely united', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To become closely united or emotionally connected\./i)).toBeInTheDocument();
  });

  it('renders definition for fusing or joining while growing', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To fuse or join while growing/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To become closely united or emotionally connected\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To become closely united or emotionally connected\./i)).toHaveAttribute(
      'title',
      'To become closely united or emotionally connected.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'growTogether_section_expanded', /To become closely united or emotionally connected\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'growTogether', /To become closely united or emotionally connected\./i, /After the merger, the two departments slowly grew together to form one strong team\./i, renderPage, getCard);

// --- up ---

describe('GrowVerbPage — "up" section definitions', () => {
  it('renders definition for changing from child to adult', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To change from being a child to being an adult\./i)).toBeInTheDocument();
  });

  it('renders definition for behaving in a mature adult way', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To behave in a mature, adult way/i)).toBeInTheDocument();
  });

  it('renders definition for slowly developing or establishing itself', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To slowly develop, arise, or establish itself/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To change from being a child to being an adult\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To change from being a child to being an adult\./i)).toHaveAttribute(
      'title',
      'To change from being a child to being an adult.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'growUp_section_expanded', /To change from being a child to being an adult\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'growUp', /To change from being a child to being an adult\./i, /He grew up in Poland and later moved abroad to study software engineering\./i, renderPage, getCard);

// --- with ---

describe('GrowVerbPage — "with" section definitions', () => {
  it('renders definition for expanding proportionally alongside something else', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To expand, develop, or change proportionally alongside something else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To expand, develop, or change proportionally alongside something else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To expand, develop, or change proportionally alongside something else\./i)).toHaveAttribute(
      'title',
      'To expand, develop, or change proportionally alongside something else.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'growWith_section_expanded', /To expand, develop, or change proportionally alongside something else\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'growWith', /To expand, develop, or change proportionally alongside something else\./i, /You need a server architecture that can grow with your business needs\./i, renderPage, getCard);
