import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'UseVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- against ---

describe('UseVerbPage — "against" section definitions', () => {
  it('renders definition for utilizing information to harm or gain advantage', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To utilize information, evidence, or a person's trait to harm, manipulate, or gain an advantage over them\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To utilize information, evidence, or a person's trait to harm, manipulate, or gain an advantage over them\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To utilize information, evidence, or a person's trait to harm, manipulate, or gain an advantage over them\./i)).toHaveAttribute(
      'title',
      "To utilize information, evidence, or a person's trait to harm, manipulate, or gain an advantage over them."
    );
  });
});

describeSectionToggle(LABEL, 'against', 'useAgainst_section_expanded', /To utilize information, evidence, or a person's trait to harm, manipulate, or gain an advantage over them\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'useAgainst', /To utilize information, evidence, or a person's trait to harm, manipulate, or gain an advantage over them\./i, /You have the right to remain silent/i, renderPage, getCard);

// --- to_used_to ---

describe('UseVerbPage — "to / used to" section definitions', () => {
  it('renders definition for past habitual action', () => {
    renderPage();
    expandSection('to / used to');
    expect(screen.getByText(/Indicates an action done regularly in the past but no longer done, or a past state that no longer exists\./i)).toBeInTheDocument();
  });

  it('renders definition for being familiar with something', () => {
    renderPage();
    expandSection('to / used to');
    expect(screen.getByText(/To be familiar with something so it no longer seems new, strange, or difficult/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to / used to');
    const defs = [
      screen.getByText(/Indicates an action done regularly in the past but no longer done, or a past state that no longer exists\./i),
      screen.getByText(/To be familiar with something so it no longer seems new, strange, or difficult/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to / used to');
    expect(screen.getByText(/Indicates an action done regularly in the past but no longer done, or a past state that no longer exists\./i)).toHaveAttribute(
      'title',
      'Indicates an action done regularly in the past but no longer done, or a past state that no longer exists.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to / used to');
    expect(screen.getByText(/To be familiar with something so it no longer seems new, strange, or difficult/i)).toHaveAttribute(
      'title',
      'To be familiar with something so it no longer seems new, strange, or difficult (be/get used to).'
    );
  });
});

describeSectionToggle(LABEL, 'to / used to', 'useTo_section_expanded', /Indicates an action done regularly in the past but no longer done, or a past state that no longer exists\./i, renderPage);

describeChevronAndColour(LABEL, 'to / used to', renderPage);

describeDefaultImageCards(LABEL, 'to / used to', 'useTo', /Indicates an action done regularly in the past but no longer done, or a past state that no longer exists\./i, /I used to play the piano every day when I was a child\./i, renderPage, getCard);

// --- up ---

describe('UseVerbPage — "up" section definitions', () => {
  it('renders definition for consuming entirely', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To consume entirely, expending the entirety of a supply, resource, or material so that nothing is left\./i)).toBeInTheDocument();
  });

  it('renders definition for draining energy or strength', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To drain someone of their energy, strength, or usefulness \(often passive\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To consume entirely, expending the entirety of a supply, resource, or material so that nothing is left\./i),
      screen.getByText(/To drain someone of their energy, strength, or usefulness \(often passive\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To consume entirely, expending the entirety of a supply, resource, or material so that nothing is left\./i)).toHaveAttribute(
      'title',
      'To consume entirely, expending the entirety of a supply, resource, or material so that nothing is left.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To drain someone of their energy, strength, or usefulness \(often passive\)\./i)).toHaveAttribute(
      'title',
      'To drain someone of their energy, strength, or usefulness (often passive).'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'useUp_section_expanded', /To consume entirely, expending the entirety of a supply, resource, or material so that nothing is left\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'useUp', /To consume entirely, expending the entirety of a supply, resource, or material so that nothing is left\./i, /We need to use up all the fresh vegetables in the fridge before they spoil\./i, renderPage, getCard);
