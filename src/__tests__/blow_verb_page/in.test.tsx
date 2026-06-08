import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BlowVerbPage — "in" section definitions', () => {
  it('renders definition for arriving unexpectedly', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive casually, suddenly, or unexpectedly\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive casually, suddenly, or unexpectedly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive casually, suddenly, or unexpectedly\./i)).toHaveAttribute(
      'title',
      'To arrive casually, suddenly, or unexpectedly.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'blowIn_section_expanded', /To arrive casually, suddenly, or unexpectedly\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'blowIn', /To arrive casually, suddenly, or unexpectedly\./i, /The CEO just blew in from London/i, renderPage, getCard);
