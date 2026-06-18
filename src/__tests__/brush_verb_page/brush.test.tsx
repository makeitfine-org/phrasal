import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'BrushVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- against ---

describe('BrushVerbPage — "against" section definitions', () => {
  it('renders definition for touching lightly while moving past', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To touch someone or something lightly while moving past them\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To touch someone or something lightly while moving past them\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To touch someone or something lightly while moving past them\./i)).toHaveAttribute(
      'title',
      'To touch someone or something lightly while moving past them.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'brushAgainst_section_expanded', /To touch someone or something lightly while moving past them\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'brushAgainst', /To touch someone or something lightly while moving past them\./i, /My shoulder brushed against the doorframe/i, renderPage, getCard);

// --- away ---

describe('BrushVerbPage — "away" section definitions', () => {
  it('renders definition for removing by sweeping', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove something by sweeping it with your hand or a brush\./i)).toBeInTheDocument();
  });

  it('renders definition for dismissing a feeling', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To quickly dismiss a feeling, thought, or fear\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove something by sweeping it with your hand or a brush\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove something by sweeping it with your hand or a brush\./i)).toHaveAttribute(
      'title',
      'To remove something by sweeping it with your hand or a brush.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'brushAway_section_expanded', /To remove something by sweeping it with your hand or a brush\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'brushAway', /To remove something by sweeping it with your hand or a brush\./i, /She brushed away the crumbs from the keyboard/i, renderPage, getCard);

// --- back ---

describe('BrushVerbPage — "back" section definitions', () => {
  it('renders definition for pushing hair away from face', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To push hair away from your face\./i)).toBeInTheDocument();
  });

  it('renders definition for forcing someone to move backward', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To force someone to move backward/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To push hair away from your face\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To push hair away from your face\./i)).toHaveAttribute(
      'title',
      'To push hair away from your face.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'brushBack_section_expanded', /To push hair away from your face\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'brushBack', /To push hair away from your face\./i, /She brushed back her hair to look closer at the screen/i, renderPage, getCard);

// --- by ---

describe('BrushVerbPage — "by" section definitions', () => {
  it('renders definition for walking past in a narrow space', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To walk past someone in a narrow space, touching them slightly\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To walk past someone in a narrow space, touching them slightly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To walk past someone in a narrow space, touching them slightly\./i)).toHaveAttribute(
      'title',
      'To walk past someone in a narrow space, touching them slightly.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'brushBy_section_expanded', /To walk past someone in a narrow space, touching them slightly\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'brushBy', /To walk past someone in a narrow space, touching them slightly\./i, /He brushed by me in the crowded hallway/i, renderPage, getCard);

// --- down ---

describe('BrushVerbPage — "down" section definitions', () => {
  it('renders definition for cleaning from top to bottom', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To clean someone or something by brushing them from top to bottom\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To clean someone or something by brushing them from top to bottom\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To clean someone or something by brushing them from top to bottom\./i)).toHaveAttribute(
      'title',
      'To clean someone or something by brushing them from top to bottom.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'brushDown_section_expanded', /To clean someone or something by brushing them from top to bottom\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'brushDown', /To clean someone or something by brushing them from top to bottom\./i, /The rider brushed down the horse after the race/i, renderPage, getCard);

// --- off ---

describe('BrushVerbPage — "off" section definitions', () => {
  it('renders definition for removing dirt with a brush', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To use your hand or a brush to remove dirt, dust, or something unwanted/i)).toBeInTheDocument();
  });

  it('renders definition for ignoring someone', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To ignore someone, refuse to listen to them/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To use your hand or a brush to remove dirt, dust, or something unwanted/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To use your hand or a brush to remove dirt, dust, or something unwanted/i)).toHaveAttribute(
      'title',
      'To use your hand or a brush to remove dirt, dust, or something unwanted from a surface.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'brushOff_section_expanded', /To use your hand or a brush to remove dirt, dust, or something unwanted/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'brushOff', /To use your hand or a brush to remove dirt, dust, or something unwanted/i, /I brushed off my suit before entering the meeting/i, renderPage, getCard);

// --- on ---

describe('BrushVerbPage — "on" section definitions', () => {
  it('renders definition for applying liquid with a brush', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To apply a liquid.*to a surface using a brush\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To apply a liquid.*to a surface using a brush\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To apply a liquid.*to a surface using a brush\./i)).toHaveAttribute(
      'title',
      'To apply a liquid (like paint, glue, or a sauce) to a surface using a brush.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'brushOn_section_expanded', /To apply a liquid.*to a surface using a brush\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'brushOn', /To apply a liquid.*to a surface using a brush\./i, /Brush on a light coat of varnish/i, renderPage, getCard);

// --- out ---

describe('BrushVerbPage — "out" section definitions', () => {
  it('renders definition for removing tangles from hair', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove tangles or dirt from hair or fur using a brush\./i)).toBeInTheDocument();
  });

  it('renders definition for cleaning the inside', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To clean the inside of something with a brush\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove tangles or dirt from hair or fur using a brush\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove tangles or dirt from hair or fur using a brush\./i)).toHaveAttribute(
      'title',
      'To remove tangles or dirt from hair or fur using a brush.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'brushOut_section_expanded', /To remove tangles or dirt from hair or fur using a brush\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'brushOut', /To remove tangles or dirt from hair or fur using a brush\./i, /brush out this dog's thick coat/i, renderPage, getCard);

// --- over ---

describe('BrushVerbPage — "over" section definitions', () => {
  it('renders definition for ignoring a problem', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore a problem or treat a topic lightly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore a problem or treat a topic lightly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore a problem or treat a topic lightly/i)).toHaveAttribute(
      'title',
      'To ignore a problem or treat a topic lightly instead of explaining it in detail.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'brushOver_section_expanded', /To ignore a problem or treat a topic lightly/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'brushOver', /To ignore a problem or treat a topic lightly/i, /brushed over the bad financial report/i, renderPage, getCard);

// --- through ---

describe('BrushVerbPage — "through" section definitions', () => {
  it('renders definition for brushing completely through hair', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To move a brush completely through hair to remove knots\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To move a brush completely through hair to remove knots\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To move a brush completely through hair to remove knots\./i)).toHaveAttribute(
      'title',
      'To move a brush completely through hair to remove knots.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'brushThrough_section_expanded', /To move a brush completely through hair to remove knots\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'brushThrough', /To move a brush completely through hair to remove knots\./i, /brush through your hair quickly before the video call/i, renderPage, getCard);

// --- up_up_on ---

describe('BrushVerbPage — "up / up on" section definitions', () => {
  it('renders definition for improving forgotten knowledge', () => {
    renderPage();
    expandSection('up / up on');
    expect(screen.getByText(/To improve your knowledge or skill in something you learned in the past/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up / up on');
    expect(screen.getByText(/To improve your knowledge or skill in something you learned in the past/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up / up on');
    expect(screen.getByText(/To improve your knowledge or skill in something you learned in the past/i)).toHaveAttribute(
      'title',
      'To improve your knowledge or skill in something you learned in the past but have partly forgotten.'
    );
  });
});

describeSectionToggle(LABEL, 'up / up on', 'brushUp_section_expanded', /To improve your knowledge or skill in something you learned in the past/i, renderPage);

describeChevronAndColour(LABEL, 'up / up on', renderPage);

describeDefaultImageCards(LABEL, 'up / up on', 'brushUp', /To improve your knowledge or skill in something you learned in the past/i, /brush up on your management skills/i, renderPage, getCard);
