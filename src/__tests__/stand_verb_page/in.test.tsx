import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "in" section definitions', () => {
  it('renders definition for temporarily replacing someone', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To temporarily replace or substitute for someone who is absent/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To temporarily replace or substitute for someone who is absent/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To temporarily replace or substitute for someone who is absent/i)).toHaveAttribute(
      'title',
      'To temporarily replace or substitute for someone who is absent (often "stand in for").'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'standIn_section_expanded', /To temporarily replace or substitute for someone who is absent/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'standIn', /To temporarily replace or substitute for someone who is absent/i, /I will stand in for the manager while she is on a business trip\./i, renderPage, getCard);
