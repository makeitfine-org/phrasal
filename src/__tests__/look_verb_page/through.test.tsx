import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "through" section definitions', () => {
  it('renders definition for reading something quickly', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To read something quickly\./i)).toBeInTheDocument();
  });

  it('renders definition for deliberately ignoring someone', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To deliberately ignore someone you know/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    const defs = [
      screen.getByText(/To read something quickly\./i),
      screen.getByText(/To deliberately ignore someone you know/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To read something quickly\./i)).toHaveAttribute(
      'title',
      'To read something quickly.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To deliberately ignore someone you know/i)).toHaveAttribute(
      'title',
      'To deliberately ignore someone you know by pretending you do not see them.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'lookThrough_section_expanded', /To read something quickly\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'lookThrough', /To read something quickly\./i, /I will look through the Java documentation/i, renderPage, getCard);
