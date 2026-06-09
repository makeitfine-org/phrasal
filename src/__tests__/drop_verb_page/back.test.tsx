import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "back" section definitions', () => {
  it('renders definition for returning to a lower position', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a lower position or level\./i)).toBeInTheDocument();
  });

  it('renders definition for moving into a position behind someone', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To move into a position behind someone else/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a lower position or level\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a lower position or level\./i)).toHaveAttribute(
      'title',
      'To return to a lower position or level.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'dropBack_section_expanded', /To return to a lower position or level\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'dropBack', /To return to a lower position or level\./i, /Our company's market share dropped back/i, renderPage, getCard);
