import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'WarmVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- down ---

describe('WarmVerbPage — "down" section definitions', () => {
  it('renders definition for warming down after exercise', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To perform gentle exercises or stretches after vigorous physical activity to help the body recover \(British English\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    const def = screen.getByText(/To perform gentle exercises or stretches after vigorous physical activity to help the body recover \(British English\)\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To perform gentle exercises or stretches after vigorous physical activity to help the body recover \(British English\)\./i)).toHaveAttribute(
      'title',
      'To perform gentle exercises or stretches after vigorous physical activity to help the body recover (British English).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'warmDown_section_expanded', /To perform gentle exercises or stretches after vigorous physical activity to help the body recover \(British English\)\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'warmDown', /To perform gentle exercises or stretches after vigorous physical activity to help the body recover \(British English\)\./i, /After testing out the new 20-inch bike on the trail, make sure to walk for a bit to warm down\./i, renderPage, getCard);

// --- over ---

describe('WarmVerbPage — "over" section definitions', () => {
  it('renders definition for reheating food', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To reheat cooked food \(North American English, synonymous with warm up\)\./i)).toBeInTheDocument();
  });

  it('renders definition for presenting an old idea as new', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To present an old idea or strategy as if it were new or original, usually with a negative connotation \(as the adjective warmed-over\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To reheat cooked food \(North American English, synonymous with warm up\)\./i),
      screen.getByText(/To present an old idea or strategy as if it were new or original, usually with a negative connotation \(as the adjective warmed-over\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To reheat cooked food \(North American English, synonymous with warm up\)\./i)).toHaveAttribute(
      'title',
      'To reheat cooked food (North American English, synonymous with warm up).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To present an old idea or strategy as if it were new or original, usually with a negative connotation \(as the adjective warmed-over\)\./i)).toHaveAttribute(
      'title',
      'To present an old idea or strategy as if it were new or original, usually with a negative connotation (as the adjective warmed-over).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'warmOver_section_expanded', /To reheat cooked food \(North American English, synonymous with warm up\)\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'warmOver', /To reheat cooked food \(North American English, synonymous with warm up\)\./i, /We can just warm over last night's dinner\./i, renderPage, getCard);

// --- through ---

describe('WarmVerbPage — "through" section definitions', () => {
  it('renders definition for heating food to the middle', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To heat food gently until it is warm right to the middle without cooking it further or changing its texture\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    const def = screen.getByText(/To heat food gently until it is warm right to the middle without cooking it further or changing its texture\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To heat food gently until it is warm right to the middle without cooking it further or changing its texture\./i)).toHaveAttribute(
      'title',
      'To heat food gently until it is warm right to the middle without cooking it further or changing its texture.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'warmThrough_section_expanded', /To heat food gently until it is warm right to the middle without cooking it further or changing its texture\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'warmThrough', /To heat food gently until it is warm right to the middle without cooking it further or changing its texture\./i, /Just put the tortillas in the oven for a few minutes to warm through\./i, renderPage, getCard);

// --- to ---

describe('WarmVerbPage — "to" section definitions', () => {
  it('renders definition for beginning to like something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To begin to like someone or something after initial hesitation or doubt \(often warm up to\)\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming interested in an idea', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become interested in or enthusiastic about an idea or topic\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To begin to like someone or something after initial hesitation or doubt \(often warm up to\)\./i),
      screen.getByText(/To become interested in or enthusiastic about an idea or topic\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To begin to like someone or something after initial hesitation or doubt \(often warm up to\)\./i)).toHaveAttribute(
      'title',
      'To begin to like someone or something after initial hesitation or doubt (often warm up to).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become interested in or enthusiastic about an idea or topic\./i)).toHaveAttribute(
      'title',
      'To become interested in or enthusiastic about an idea or topic.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'warmTo_section_expanded', /To begin to like someone or something after initial hesitation or doubt \(often warm up to\)\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'warmTo', /To begin to like someone or something after initial hesitation or doubt \(often warm up to\)\./i, /I wasn't sure about the Adizes PAEI management model at first, but I'm really warming to it\./i, renderPage, getCard);

// --- up ---

describe('WarmVerbPage — "up" section definitions', () => {
  it('renders definition for increasing temperature', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To increase in temperature or make someone or something warmer\./i)).toBeInTheDocument();
  });

  it('renders definition for preparing through practice', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To prepare for an activity, event, or performance by practicing or doing gentle exercises\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming more animated in a setting', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To become more animated, relaxed, or friendly in a social or professional setting\./i)).toBeInTheDocument();
  });

  it('renders definition for reheating cooked food', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To reheat food that has already been cooked\./i)).toBeInTheDocument();
  });

  it('renders definition for leaving a machine running', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To leave a machine running for a short time until it reaches its optimal operating temperature\./i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To increase in temperature or make someone or something warmer\./i),
      screen.getByText(/To prepare for an activity, event, or performance by practicing or doing gentle exercises\./i),
      screen.getByText(/To become more animated, relaxed, or friendly in a social or professional setting\./i),
      screen.getByText(/To reheat food that has already been cooked\./i),
      screen.getByText(/To leave a machine running for a short time until it reaches its optimal operating temperature\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To increase in temperature or make someone or something warmer\./i)).toHaveAttribute(
      'title',
      'To increase in temperature or make someone or something warmer.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To prepare for an activity, event, or performance by practicing or doing gentle exercises\./i)).toHaveAttribute(
      'title',
      'To prepare for an activity, event, or performance by practicing or doing gentle exercises.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To become more animated, relaxed, or friendly in a social or professional setting\./i)).toHaveAttribute(
      'title',
      'To become more animated, relaxed, or friendly in a social or professional setting.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To reheat food that has already been cooked\./i)).toHaveAttribute(
      'title',
      'To reheat food that has already been cooked.'
    );
  });

  it('fifth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To leave a machine running for a short time until it reaches its optimal operating temperature\./i)).toHaveAttribute(
      'title',
      'To leave a machine running for a short time until it reaches its optimal operating temperature.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'warmUp_section_expanded', /To increase in temperature or make someone or something warmer\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'warmUp', /To increase in temperature or make someone or something warmer\./i, /Let's step inside the cafe to warm up; the wind is freezing today\./i, renderPage, getCard);
