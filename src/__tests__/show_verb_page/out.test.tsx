import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShowVerbPage — "out" section definitions', () => {
  it('renders definition for leading someone to the exit', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To lead or escort someone to the exit of a building or room\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To lead or escort someone to the exit of a building or room\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To lead or escort someone to the exit of a building or room\./i)).toHaveAttribute(
      'title',
      'To lead or escort someone to the exit of a building or room.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'showOut_section_expanded', /To lead or escort someone to the exit of a building or room\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'showOut', /To lead or escort someone to the exit of a building or room\./i, /Thank you for the interview\. My assistant will show you out\./i, renderPage, getCard);
