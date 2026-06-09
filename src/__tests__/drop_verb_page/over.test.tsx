import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "over" section definitions', () => {
  it('renders definition for visiting someone informally at their location', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To visit someone informally at their location/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To visit someone informally at their location/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To visit someone informally at their location/i)).toHaveAttribute(
      'title',
      'To visit someone informally at their location (often their home).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'dropOver_section_expanded', /To visit someone informally at their location/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'dropOver', /To visit someone informally at their location/i, /drop over later to review the Java architecture/i, renderPage, getCard);
