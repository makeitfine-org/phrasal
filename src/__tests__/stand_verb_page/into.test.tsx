import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "into" section definitions', () => {
  it('renders definition for sailing toward danger', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To sail or move toward danger/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To sail or move toward danger/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To sail or move toward danger/i)).toHaveAttribute(
      'title',
      'To sail or move toward danger (rare, old nautical term).'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'standInto_section_expanded', /To sail or move toward danger/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'standInto', /To sail or move toward danger/i, /The ship was standing into the storm\./i, renderPage, getCard);
