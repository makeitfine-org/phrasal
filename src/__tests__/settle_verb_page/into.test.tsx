import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SettleVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SettleVerbPage — "into" section definitions', () => {
  it('renders definition for getting used to a new role or situation', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To get used to a new role, routine, or situation and become comfortable with it\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To get used to a new role, routine, or situation and become comfortable with it\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To get used to a new role, routine, or situation and become comfortable with it\./i)).toHaveAttribute(
      'title',
      'To get used to a new role, routine, or situation and become comfortable with it.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'settleInto_section_expanded', /To get used to a new role, routine, or situation and become comfortable with it\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'settleInto', /To get used to a new role, routine, or situation and become comfortable with it\./i, /She quickly settled into her new position as the lead project manager\./i, renderPage, getCard);
