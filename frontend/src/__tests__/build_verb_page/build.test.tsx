import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'BuildVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- around_round ---

describe('BuildVerbPage — "around / round" section definitions', () => {
  it('renders definition for basing a strategy on a concept', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To base a strategy, system, plan, or team on a central person, idea, or concept\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To base a strategy, system, plan, or team on a central person, idea, or concept\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To base a strategy, system, plan, or team on a central person, idea, or concept\./i)).toHaveAttribute(
      'title',
      'To base a strategy, system, plan, or team on a central person, idea, or concept.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'buildAround_section_expanded', /To base a strategy, system, plan, or team on a central person, idea, or concept\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'buildAround', /To base a strategy, system, plan, or team on a central person, idea, or concept\./i, /build the new marketing strategy around customer retention/i, renderPage, getCard);

// --- in_into ---

describe('BuildVerbPage — "in / into" section definitions', () => {
  it('renders definition for including as permanent part', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To include something as a permanent, essential, or integral part/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To include something as a permanent, essential, or integral part/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To include something as a permanent, essential, or integral part/i)).toHaveAttribute(
      'title',
      'To include something as a permanent, essential, or integral part of a system, plan, or structure from the beginning.'
    );
  });
});

describeSectionToggle(LABEL, 'in / into', 'buildIn_section_expanded', /To include something as a permanent, essential, or integral part/i, renderPage);

describeChevronAndColour(LABEL, 'in / into', renderPage);

describeDefaultImageCards(LABEL, 'in / into', 'buildIn', /To include something as a permanent, essential, or integral part/i, /build in some extra time for unexpected delays/i, renderPage, getCard);

// --- on ---

describe('BuildVerbPage — "on" section definitions', () => {
  it('renders definition for using past success as foundation', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To use a past achievement, existing idea, or success as a foundation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To use a past achievement, existing idea, or success as a foundation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To use a past achievement, existing idea, or success as a foundation/i)).toHaveAttribute(
      'title',
      'To use a past achievement, existing idea, or success as a foundation for further progress and development.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'buildOn_section_expanded', /To use a past achievement, existing idea, or success as a foundation/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'buildOn', /To use a past achievement, existing idea, or success as a foundation/i, /build on the momentum of last quarter's sales/i, renderPage, getCard);

// --- out ---

describe('BuildVerbPage — "out" section definitions', () => {
  it('renders definition for developing to full potential', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To develop, expand, or complete a system, space, or business/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To develop, expand, or complete a system, space, or business/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To develop, expand, or complete a system, space, or business/i)).toHaveAttribute(
      'title',
      'To develop, expand, or complete a system, space, or business so that it reaches its full potential or size.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'buildOut_section_expanded', /To develop, expand, or complete a system, space, or business/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'buildOut', /To develop, expand, or complete a system, space, or business/i, /received funding to build out its sales and marketing/i, renderPage, getCard);

// --- to ---

describe('BuildVerbPage — "to" section definitions', () => {
  it('renders definition for approaching a climax', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To gradually increase and approach a climax, peak, or major event\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To gradually increase and approach a climax, peak, or major event\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To gradually increase and approach a climax, peak, or major event\./i)).toHaveAttribute(
      'title',
      'To gradually increase and approach a climax, peak, or major event.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'buildTo_section_expanded', /To gradually increase and approach a climax, peak, or major event\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'buildTo', /To gradually increase and approach a climax, peak, or major event\./i, /tension in the boardroom was building to a breaking point/i, renderPage, getCard);

// --- up ---

describe('BuildVerbPage — "up" section definitions', () => {
  it('renders definition for gradually increasing', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually increase in amount, size, strength, or intensity\./i)).toBeInTheDocument();
  });

  it('renders definition for talking positively about someone', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To talk about someone or something in a very positive way/i)).toBeInTheDocument();
  });

  it('renders definition for developing an area with buildings', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To develop an area with many buildings and infrastructure\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually increase in amount, size, strength, or intensity\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually increase in amount, size, strength, or intensity\./i)).toHaveAttribute(
      'title',
      'To gradually increase in amount, size, strength, or intensity.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'buildUp_section_expanded', /To gradually increase in amount, size, strength, or intensity\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'buildUp', /To gradually increase in amount, size, strength, or intensity\./i, /technical debt will build up quickly/i, renderPage, getCard);
