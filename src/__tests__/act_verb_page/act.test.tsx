import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'ActVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- against ---

describe('ActVerbPage — "against" section definitions', () => {
  it('renders definition for opposing or violating', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To do something that opposes, harms, or violates/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To do something that opposes, harms, or violates/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To do something that opposes, harms, or violates/i)).toHaveAttribute(
      'title',
      'To do something that opposes, harms, or violates a person, rule, or interest.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'actAgainst_section_expanded', /To do something that opposes, harms, or violates/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'actAgainst', /To do something that opposes/i, /By sharing confidential data/i, renderPage, getCard);

// --- for ---

describe('ActVerbPage — "for" section definitions', () => {
  it('renders definition for representing someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To represent someone else or do something on their behalf/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To represent someone else or do something on their behalf/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To represent someone else or do something on their behalf/i)).toHaveAttribute(
      'title',
      'To represent someone else or do something on their behalf (especially in legal or business situations).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'actFor_section_expanded', /To represent someone else or do something on their behalf/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'actFor', /To represent someone else/i, /The lawyer was hired to act for/i, renderPage, getCard);

// --- on_upon ---

describe('ActVerbPage — "on / upon" section definitions', () => {
  it('renders definition for taking action', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To take action because of information/i)).toBeInTheDocument();
  });

  it('renders definition for having an effect', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To have an effect on something/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To take action because of information/i)).toHaveClass('truncate');
    expect(screen.getByText(/To have an effect on something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To take action because of information/i)).toHaveAttribute(
      'title',
      'To take action because of information, advice, or instructions.'
    );
  });
});

describeSectionToggle(LABEL, 'on / upon', 'actOn_section_expanded', /To take action because of information/i, renderPage);

describeChevronAndColour(LABEL, 'on / upon', renderPage);

describeDefaultImageCards(LABEL, 'on / upon', 'actOn', /To take action because of information/i, /The manager decided to act on/i, renderPage, getCard);

// --- out ---

describe('ActVerbPage — "out" section definitions', () => {
  it('renders definition for performing a scene', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To perform a story, scene/i)).toBeInTheDocument();
  });

  it('renders definition for expressing negative emotions', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To express negative emotions or stress/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To perform a story, scene/i)).toHaveClass('truncate');
    expect(screen.getByText(/To express negative emotions or stress/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To perform a story, scene/i)).toHaveAttribute(
      'title',
      'To perform a story, scene, or situation using actions and words.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'actOut_section_expanded', /To perform a story, scene/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'actOut', /To perform a story, scene/i, /the developers acted out/i, renderPage, getCard);

// --- up ---

describe('ActVerbPage — "up" section definitions', () => {
  it('renders definition for misbehaving', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To misbehave or cause trouble/i)).toBeInTheDocument();
  });

  it('renders definition for malfunctioning', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To malfunction, stop working properly/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To misbehave or cause trouble/i)).toHaveClass('truncate');
    expect(screen.getByText(/To malfunction, stop working properly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To misbehave or cause trouble/i)).toHaveAttribute(
      'title',
      'To misbehave or cause trouble (usually referring to children).'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'actUp_section_expanded', /To misbehave or cause trouble/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'actUp', /To misbehave or cause trouble/i, /The children were bored/i, renderPage, getCard);
