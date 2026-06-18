import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- apart ---

describe('PickVerbPage — "apart" section definitions', () => {
  it('renders definition for pulling something into separate physical pieces', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To pull something into separate physical pieces/i)).toBeInTheDocument();
  });

  it('renders definition for finding mistakes or flaws in an idea', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To find all the mistakes or flaws in an idea or argument/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To pull something into separate physical pieces/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To pull something into separate physical pieces/i)).toHaveAttribute(
      'title',
      'To pull something into separate physical pieces.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'pickApart_section_expanded', /To pull something into separate physical pieces/i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'pickApart', /To pull something into separate physical pieces/i, /The birds picked the piece of bread apart\./i, renderPage, getCard);

// --- away ---

describe('PickVerbPage — "away" section definitions', () => {
  it('renders definition for removing small pieces of something slowly', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove small pieces of something slowly/i)).toBeInTheDocument();
  });

  it('renders definition for slowly reducing or destroying something', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To slowly reduce or destroy something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove small pieces of something slowly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove small pieces of something slowly/i)).toHaveAttribute(
      'title',
      'To remove small pieces of something slowly.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'pickAway_section_expanded', /To remove small pieces of something slowly/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'pickAway', /To remove small pieces of something slowly/i, /He picked away the old paint from the wall\./i, renderPage, getCard);

// --- off ---

describe('PickVerbPage — "off" section definitions', () => {
  it('renders definition for targeting or shooting one by one', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To target or shoot one by one/i)).toBeInTheDocument();
  });

  it('renders definition for removing something by pulling it', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove something by pulling it/i)).toBeInTheDocument();
  });

  it('renders definition for intercepting in sports', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To intercept \(often in sports\)/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To target or shoot one by one/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To target or shoot one by one/i)).toHaveAttribute(
      'title',
      'To target or shoot one by one.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'pickOff_section_expanded', /To target or shoot one by one/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'pickOff', /To target or shoot one by one/i, /The sniper picked off the enemy guards from a distance\./i, renderPage, getCard);

// --- on ---

describe('PickVerbPage — "on" section definitions', () => {
  it('renders definition for bullying or treating someone unfairly', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To bully or treat someone unfairly/i)).toBeInTheDocument();
  });

  it('renders definition for choosing someone to do a task', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To choose someone to do a task or answer a question/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To bully or treat someone unfairly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To bully or treat someone unfairly/i)).toHaveAttribute(
      'title',
      'To bully or treat someone unfairly.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'pickOn_section_expanded', /To bully or treat someone unfairly/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'pickOn', /To bully or treat someone unfairly/i, /The older children always picked on him at school\./i, renderPage, getCard);

// --- out ---

describe('PickVerbPage — "out" section definitions', () => {
  it('renders definition for choosing or selecting carefully', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To choose or select carefully/i)).toBeInTheDocument();
  });

  it('renders definition for recognizing someone in a group', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To recognize someone or something in a group/i)).toBeInTheDocument();
  });

  it('renders definition for playing a tune slowly or with difficulty', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To play a tune on an instrument slowly or with difficulty/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To choose or select carefully/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To choose or select carefully/i)).toHaveAttribute(
      'title',
      'To choose or select carefully.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'pickOut_section_expanded', /To choose or select carefully/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'pickOut', /To choose or select carefully/i, /We need to pick out a good candidate for the management role\./i, renderPage, getCard);

// --- over ---

describe('PickVerbPage — "over" section definitions', () => {
  it('renders definition for examining things to select the best ones', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To carefully examine a group of things to select the best ones/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To carefully examine a group of things to select the best ones/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To carefully examine a group of things to select the best ones/i)).toHaveAttribute(
      'title',
      'To carefully examine a group of things to select the best ones.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'pickOver_section_expanded', /To carefully examine a group of things to select the best ones/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'pickOver', /To carefully examine a group of things to select the best ones/i, /By the time I arrived at the market, the best fruit had already been picked over\./i, renderPage, getCard);

// --- through ---

describe('PickVerbPage — "through" section definitions', () => {
  it('renders definition for searching carefully among a pile of items', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To search carefully among a pile or collection of items/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To search carefully among a pile or collection of items/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To search carefully among a pile or collection of items/i)).toHaveAttribute(
      'title',
      'To search carefully among a pile or collection of items.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'pickThrough_section_expanded', /To search carefully among a pile or collection of items/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'pickThrough', /To search carefully among a pile or collection of items/i, /The team picked through the raw data looking for helpful trends\./i, renderPage, getCard);

// --- up ---

describe('PickVerbPage — "up" section definitions', () => {
  it('renders definition for lifting something from a surface', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To lift something from a surface/i)).toBeInTheDocument();
  });

  it('renders definition for collecting someone in a vehicle', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To collect someone in a vehicle/i)).toBeInTheDocument();
  });

  it('renders definition for learning a skill casually', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To learn a skill casually, without formal training/i)).toBeInTheDocument();
  });

  it('renders definition for improving or increasing', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To improve or increase/i)).toBeInTheDocument();
  });

  it('renders definition for catching an illness', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To catch an illness/i)).toBeInTheDocument();
  });

  it('renders definition for resuming an activity', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To resume an activity/i)).toBeInTheDocument();
  });

  it('renders definition for paying a bill', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To pay a bill/i)).toBeInTheDocument();
  });

  it('renders definition for noticing or detecting something', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To notice or detect something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To lift something from a surface/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To lift something from a surface/i)).toHaveAttribute(
      'title',
      'To lift something from a surface.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'pickUp_section_expanded', /To lift something from a surface/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'pickUp', /To lift something from a surface/i, /Please pick up your clothes from the floor\./i, renderPage, getCard);
