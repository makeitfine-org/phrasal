import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WatchVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WatchVerbPage — "out" section definitions', () => {
  it('renders definition for being careful about immediate danger', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be careful and pay attention to immediate danger \(usually used as an exclamation or warning\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    const def = screen.getByText(/To be careful and pay attention to immediate danger \(usually used as an exclamation or warning\)\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be careful and pay attention to immediate danger \(usually used as an exclamation or warning\)\./i)).toHaveAttribute(
      'title',
      'To be careful and pay attention to immediate danger (usually used as an exclamation or warning).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'watchOut_section_expanded', /To be careful and pay attention to immediate danger \(usually used as an exclamation or warning\)\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'watchOut', /To be careful and pay attention to immediate danger \(usually used as an exclamation or warning\)\./i, /Watch out! There is a car coming right at us\./i, renderPage, getCard);
