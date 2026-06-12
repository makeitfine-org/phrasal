import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WearVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WearVerbPage — "out" section definitions', () => {
  it('renders definition for using something until damaged or useless', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To use something until it is damaged, broken, or completely useless\./i)).toBeInTheDocument();
  });

  it('renders definition for making someone extremely tired', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To make someone extremely physically or mentally tired; to exhaust\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To use something until it is damaged, broken, or completely useless\./i),
      screen.getByText(/To make someone extremely physically or mentally tired; to exhaust\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To use something until it is damaged, broken, or completely useless\./i)).toHaveAttribute(
      'title',
      'To use something until it is damaged, broken, or completely useless.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To make someone extremely physically or mentally tired; to exhaust\./i)).toHaveAttribute(
      'title',
      'To make someone extremely physically or mentally tired; to exhaust.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'wearOut_section_expanded', /To use something until it is damaged, broken, or completely useless\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'wearOut', /To use something until it is damaged, broken, or completely useless\./i, /I've practically worn out my laptop's keyboard from typing so many outreach messages\./i, renderPage, getCard);
