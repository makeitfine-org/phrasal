import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'UseVerbPage';

beforeEach(() => {
  localStorage.clear();
});

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
