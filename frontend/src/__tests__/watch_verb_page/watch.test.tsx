import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'WatchVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- back ---

describe('WatchVerbPage — "back" section definitions', () => {
  it('renders definition for viewing a recording for review', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To view a video, film, or recording of a previous event, often for review or analysis\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    const def = screen.getByText(/To view a video, film, or recording of a previous event, often for review or analysis\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To view a video, film, or recording of a previous event, often for review or analysis\./i)).toHaveAttribute(
      'title',
      'To view a video, film, or recording of a previous event, often for review or analysis.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'watchBack_section_expanded', /To view a video, film, or recording of a previous event, often for review or analysis\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'watchBack', /To view a video, film, or recording of a previous event, often for review or analysis\./i, /We recorded the interview so we could watch it back later and take notes\./i, renderPage, getCard);

// --- for ---

describe('WatchVerbPage — "for" section definitions', () => {
  it('renders definition for looking actively for something to happen', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To look actively for a sign, event, or specific thing to happen\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    const def = screen.getByText(/To look actively for a sign, event, or specific thing to happen\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To look actively for a sign, event, or specific thing to happen\./i)).toHaveAttribute(
      'title',
      'To look actively for a sign, event, or specific thing to happen.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'watchFor_section_expanded', /To look actively for a sign, event, or specific thing to happen\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'watchFor', /To look actively for a sign, event, or specific thing to happen\./i, /Keep driving, and watch for the exit sign just past the bridge\./i, renderPage, getCard);

// --- on ---

describe('WatchVerbPage — "on" section definitions', () => {
  it('renders definition for observing without becoming involved', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To observe something happening, often dramatic or serious, without becoming actively involved\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    const def = screen.getByText(/To observe something happening, often dramatic or serious, without becoming actively involved\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To observe something happening, often dramatic or serious, without becoming actively involved\./i)).toHaveAttribute(
      'title',
      'To observe something happening, often dramatic or serious, without becoming actively involved.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'watchOn_section_expanded', /To observe something happening, often dramatic or serious, without becoming actively involved\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'watchOn', /To observe something happening, often dramatic or serious, without becoming actively involved\./i, /A large crowd gathered and watched on in shock as the building burned\./i, renderPage, getCard);

// --- out ---

describe('WatchVerbPage — "out" section definitions', () => {
  it('renders definition for being careful about immediate danger', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be careful and pay attention to immediate danger \(usually used as an exclamation or warning\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    const def = screen.getByText(/To be careful and pay attention to immediate danger \(usually used as an exclamation or warning\)\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be careful and pay attention to immediate danger \(usually used as an exclamation or warning\)\./i)).toHaveAttribute(
      'title',
      'To be careful and pay attention to immediate danger (usually used as an exclamation or warning).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'watchOut_section_expanded', /To be careful and pay attention to immediate danger \(usually used as an exclamation or warning\)\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'watchOut', /To be careful and pay attention to immediate danger \(usually used as an exclamation or warning\)\./i, /Watch out! There is a car coming right at us\./i, renderPage, getCard);

// --- out_for ---

describe('WatchVerbPage — "out for" section definitions', () => {
  it('renders definition for being alert to danger or presence', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To be alert to the danger or presence of something or someone\./i)).toBeInTheDocument();
  });

  it('renders definition for protecting someone', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To protect someone or look after their best interests\./i)).toBeInTheDocument();
  });

  it('renders definition for waiting expectantly for something', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To wait expectantly for something to arrive or appear\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out for');
    const defs = [
      screen.getByText(/To be alert to the danger or presence of something or someone\./i),
      screen.getByText(/To protect someone or look after their best interests\./i),
      screen.getByText(/To wait expectantly for something to arrive or appear\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To be alert to the danger or presence of something or someone\./i)).toHaveAttribute(
      'title',
      'To be alert to the danger or presence of something or someone.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To protect someone or look after their best interests\./i)).toHaveAttribute(
      'title',
      'To protect someone or look after their best interests.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To wait expectantly for something to arrive or appear\./i)).toHaveAttribute(
      'title',
      'To wait expectantly for something to arrive or appear.'
    );
  });
});

describeSectionToggle(LABEL, 'out for', 'watchOutFor_section_expanded', /To be alert to the danger or presence of something or someone\./i, renderPage);

describeChevronAndColour(LABEL, 'out for', renderPage);

describeDefaultImageCards(LABEL, 'out for', 'watchOutFor', /To be alert to the danger or presence of something or someone\./i, /If you go hiking in those woods, watch out for bears\./i, renderPage, getCard);

// --- over ---

describe('WatchVerbPage — "over" section definitions', () => {
  it('renders definition for protecting or caring for someone', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To protect, guard, or care for someone or something\./i)).toBeInTheDocument();
  });

  it('renders definition for strictly supervising someone', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To strictly supervise someone or an activity to ensure it is done correctly\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To protect, guard, or care for someone or something\./i),
      screen.getByText(/To strictly supervise someone or an activity to ensure it is done correctly\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To protect, guard, or care for someone or something\./i)).toHaveAttribute(
      'title',
      'To protect, guard, or care for someone or something.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To strictly supervise someone or an activity to ensure it is done correctly\./i)).toHaveAttribute(
      'title',
      'To strictly supervise someone or an activity to ensure it is done correctly.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'watchOver_section_expanded', /To protect, guard, or care for someone or something\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'watchOver', /To protect, guard, or care for someone or something\./i, /The shepherd watched over his flock of sheep through the night\./i, renderPage, getCard);

// --- through ---

describe('WatchVerbPage — "through" section definitions', () => {
  it('renders definition for watching something entirely from beginning to end', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To watch a program, movie, or series entirely from beginning to end\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    const def = screen.getByText(/To watch a program, movie, or series entirely from beginning to end\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To watch a program, movie, or series entirely from beginning to end\./i)).toHaveAttribute(
      'title',
      'To watch a program, movie, or series entirely from beginning to end.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'watchThrough_section_expanded', /To watch a program, movie, or series entirely from beginning to end\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'watchThrough', /To watch a program, movie, or series entirely from beginning to end\./i, /It took me a whole weekend, but I finally watched the series through\./i, renderPage, getCard);
