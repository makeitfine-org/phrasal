import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "over" section definitions', () => {
  it('renders definition for flipping something', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To flip something so the other side faces up\./i)).toBeInTheDocument();
  });

  it('renders definition for transferring control', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To transfer control, responsibility, or possession to someone else\./i)).toBeInTheDocument();
  });

  it('renders definition for starting an engine', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To start an engine \(referring to the mechanical rotation\)\./i)).toBeInTheDocument();
  });

  it('renders definition for generating revenue', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To generate a specific amount of revenue in a business\./i)).toBeInTheDocument();
  });

  it('renders definition for thinking carefully', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To think about a concept or idea carefully\./i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To flip something so the other side faces up\./i),
      screen.getByText(/To transfer control, responsibility, or possession to someone else\./i),
      screen.getByText(/To start an engine \(referring to the mechanical rotation\)\./i),
      screen.getByText(/To generate a specific amount of revenue in a business\./i),
      screen.getByText(/To think about a concept or idea carefully\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To flip something so the other side faces up\./i)).toHaveAttribute(
      'title',
      'To flip something so the other side faces up.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To transfer control, responsibility, or possession to someone else\./i)).toHaveAttribute(
      'title',
      'To transfer control, responsibility, or possession to someone else.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To start an engine \(referring to the mechanical rotation\)\./i)).toHaveAttribute(
      'title',
      'To start an engine (referring to the mechanical rotation).'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To generate a specific amount of revenue in a business\./i)).toHaveAttribute(
      'title',
      'To generate a specific amount of revenue in a business.'
    );
  });

  it('fifth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To think about a concept or idea carefully\./i)).toHaveAttribute(
      'title',
      'To think about a concept or idea carefully.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'turnOver_section_expanded', /To flip something so the other side faces up\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'turnOver', /To flip something so the other side faces up\./i, /If your pancakes are bubbling/i, renderPage, getCard);
