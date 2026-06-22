import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'CheerVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- against ---

describe('CheerVerbPage — "against" section definitions', () => {
  it('renders definition for expressing a desire for someone to fail', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To express a desire for someone or something to fail or lose\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To express a desire for someone or something to fail or lose\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To express a desire for someone or something to fail or lose\./i)).toHaveAttribute(
      'title',
      'To express a desire for someone or something to fail or lose.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'cheerAgainst_section_expanded', /To express a desire for someone or something to fail or lose\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'cheerAgainst', /To express a desire for someone or something to fail or lose\./i, /In a healthy business environment/i, renderPage, getCard);

// --- for ---

describe('CheerVerbPage — "for" section definitions', () => {
  it('renders definition for publicly supporting a person, team, or idea', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To publicly support a specific person, team, or idea, hoping they will succeed\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To publicly support a specific person, team, or idea, hoping they will succeed\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To publicly support a specific person, team, or idea, hoping they will succeed\./i)).toHaveAttribute(
      'title',
      'To publicly support a specific person, team, or idea, hoping they will succeed.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'cheerFor_section_expanded', /To publicly support a specific person, team, or idea, hoping they will succeed\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'cheerFor', /To publicly support a specific person, team, or idea, hoping they will succeed\./i, /Everyone in the office is cheering for the new software release/i, renderPage, getCard);

// --- off ---

describe('CheerVerbPage — "off" section definitions', () => {
  it('renders definition for applauding someone as they leave', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To applaud or shout in support of someone as they are leaving a stage, field, or room\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To applaud or shout in support of someone as they are leaving a stage, field, or room\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To applaud or shout in support of someone as they are leaving a stage, field, or room\./i)).toHaveAttribute(
      'title',
      'To applaud or shout in support of someone as they are leaving a stage, field, or room.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'cheerOff_section_expanded', /To applaud or shout in support of someone as they are leaving a stage, field, or room\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'cheerOff', /To applaud or shout in support of someone as they are leaving a stage, field, or room\./i, /After 20 years with the company/i, renderPage, getCard);

// --- on ---

describe('CheerVerbPage — "on" section definitions', () => {
  it('renders definition for encouraging someone by shouting words of support', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To encourage someone by shouting words of support, usually when they are competing or doing something difficult\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To encourage someone by shouting words of support, usually when they are competing or doing something difficult\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To encourage someone by shouting words of support, usually when they are competing or doing something difficult\./i)).toHaveAttribute(
      'title',
      'To encourage someone by shouting words of support, usually when they are competing or doing something difficult.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'cheerOn_section_expanded', /To encourage someone by shouting words of support, usually when they are competing or doing something difficult\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'cheerOn', /To encourage someone by shouting words of support, usually when they are competing or doing something difficult\./i, /The whole department went to the meeting to cheer her on/i, renderPage, getCard);

// --- up ---

describe('CheerVerbPage — "up" section definitions', () => {
  it('renders definition for starting to feel happier', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start feeling happier; to stop being sad\./i)).toBeInTheDocument();
  });

  it('renders definition for making another person feel happier', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make another person feel happier\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start feeling happier; to stop being sad\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start feeling happier; to stop being sad\./i)).toHaveAttribute(
      'title',
      'To start feeling happier; to stop being sad.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'cheerUp_section_expanded', /To start feeling happier; to stop being sad\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'cheerUp', /To start feeling happier; to stop being sad\./i, /You need to cheer up!/i, renderPage, getCard);
