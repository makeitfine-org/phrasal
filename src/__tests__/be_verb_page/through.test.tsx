import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "through" section definitions', () => {
  it('renders definition for being finished with something', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be finished doing something or to end a relationship\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be finished doing something or to end a relationship\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be finished doing something or to end a relationship\./i)).toHaveAttribute(
      'title',
      'To be finished doing something or to end a relationship.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'beThrough_section_expanded', /To be finished doing something or to end a relationship\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'beThrough', /To be finished doing something or to end a relationship\./i, /I am through with using this outdated software/i, renderPage, getCard);
