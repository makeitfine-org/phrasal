import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "down" section definitions', () => {
  it('renders definition for falling to a lower position', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fall or move to a lower position\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fall or move to a lower position\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fall or move to a lower position\./i)).toHaveAttribute(
      'title',
      'To fall or move to a lower position.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'dropDown_section_expanded', /To fall or move to a lower position\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'dropDown', /To fall or move to a lower position\./i, /select your country from the drop-down menu/i, renderPage, getCard);
