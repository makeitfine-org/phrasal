import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FigureVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FigureVerbPage — "into" section definitions', () => {
  it('renders definition for being a relevant factor in a situation or plan', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be a relevant factor or play a part in a situation, decision, or plan\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be a relevant factor or play a part in a situation, decision, or plan\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be a relevant factor or play a part in a situation, decision, or plan\./i)).toHaveAttribute(
      'title',
      'To be a relevant factor or play a part in a situation, decision, or plan.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'figureInto_section_expanded', /To be a relevant factor or play a part in a situation, decision, or plan\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'figureInto', /To be a relevant factor or play a part in a situation, decision, or plan\./i, /The cost of hiring new developers did not figure into the original budget\./i, renderPage, getCard);
