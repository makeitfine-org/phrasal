import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "apart" section definitions', () => {
  it('renders definition for hitting something into pieces', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To hit something so hard it breaks into pieces\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To hit something so hard it breaks into pieces\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To hit something so hard it breaks into pieces\./i)).toHaveAttribute(
      'title',
      'To hit something so hard it breaks into pieces.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'knockApart_section_expanded', /To hit something so hard it breaks into pieces\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'knockApart', /To hit something so hard it breaks into pieces\./i, /The storm knocked the old warehouse apart\./i, renderPage, getCard);
