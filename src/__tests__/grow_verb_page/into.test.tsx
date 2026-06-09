import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GrowVerbPage — "into" section definitions', () => {
  it('renders definition for developing skills for a new role', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To develop the skills and confidence needed for a new role or responsibility\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming large enough to fit clothing', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To become large enough to fit into clothing\./i)).toBeInTheDocument();
  });

  it('renders definition for developing into a different or larger state', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To develop into a different or larger state\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To develop the skills and confidence needed for a new role or responsibility\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To develop the skills and confidence needed for a new role or responsibility\./i)).toHaveAttribute(
      'title',
      'To develop the skills and confidence needed for a new role or responsibility.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'growInto_section_expanded', /To develop the skills and confidence needed for a new role or responsibility\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'growInto', /To develop the skills and confidence needed for a new role or responsibility\./i, /It was a big promotion, but she quickly grew into her position as a team leader\./i, renderPage, getCard);
