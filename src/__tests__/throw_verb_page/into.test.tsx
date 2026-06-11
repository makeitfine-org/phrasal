import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThrowVerbPage — "into" section definitions', () => {
  it('renders definition for forcing into a negative condition', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To force a person, group, or place into a specific, usually negative, condition\./i)).toBeInTheDocument();
  });

  it('renders definition for engaging enthusiastically in a task', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To engage enthusiastically in a task/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    const defs = [
      screen.getByText(/To force a person, group, or place into a specific, usually negative, condition\./i),
      screen.getByText(/To engage enthusiastically in a task/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To force a person, group, or place into a specific, usually negative, condition\./i)).toHaveAttribute(
      'title',
      'To force a person, group, or place into a specific, usually negative, condition.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To engage enthusiastically in a task/i)).toHaveAttribute(
      'title',
      'To engage enthusiastically in a task (usually "throw oneself into").'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'throwInto_section_expanded', /To force a person, group, or place into a specific, usually negative, condition\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'throwInto', /To force a person, group, or place into a specific, usually negative, condition\./i, /The sudden power outage threw the entire city into chaos\./i, renderPage, getCard);
