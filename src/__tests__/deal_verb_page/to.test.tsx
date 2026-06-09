import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DealVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DealVerbPage — "to" section definitions', () => {
  it('renders definition for taking strong action to fix a problem', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To punish, attack someone, or take strong action to fix a problem/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To punish, attack someone, or take strong action to fix a problem/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To punish, attack someone, or take strong action to fix a problem/i)).toHaveAttribute(
      'title',
      'To punish, attack someone, or take strong action to fix a problem (Regional: Australia / New Zealand).'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'dealTo_section_expanded', /To punish, attack someone, or take strong action to fix a problem/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'dealTo', /To punish, attack someone, or take strong action to fix a problem/i, /the IT department will have to deal to it/i, renderPage, getCard);
