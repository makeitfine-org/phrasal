import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "away" section definitions', () => {
  it('renders definition for departing very rapidly', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To depart or move away very rapidly\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    const def = screen.getByText(/To depart or move away very rapidly\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To depart or move away very rapidly\./i)).toHaveAttribute(
      'title',
      'To depart or move away very rapidly.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'zipAway_section_expanded', /To depart or move away very rapidly\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'zipAway', /To depart or move away very rapidly\./i, /As soon as the light turned green, the sports car zipped away\./i, renderPage, getCard);
