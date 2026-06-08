import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('AskVerbPage — "up" section definitions', () => {
  it('renders definition for inviting someone upstairs', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To invite someone to come upstairs to a higher floor/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To invite someone to come upstairs to a higher floor/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To invite someone to come upstairs to a higher floor/i)).toHaveAttribute(
      'title',
      'To invite someone to come upstairs to a higher floor.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'askUp_section_expanded', /To invite someone to come upstairs to a higher floor/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'askUp', /To invite someone to come upstairs to a higher floor/i, /I asked him up to my apartment/i, renderPage, getCard);
