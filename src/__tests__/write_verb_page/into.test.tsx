import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "into" section definitions', () => {
  it('renders definition for including a clause in a contract', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To formally include a specific clause, rule, or condition in a contract or script\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    const def = screen.getByText(/To formally include a specific clause, rule, or condition in a contract or script\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To formally include a specific clause, rule, or condition in a contract or script\./i)).toHaveAttribute(
      'title',
      'To formally include a specific clause, rule, or condition in a contract or script.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'writeInto_section_expanded', /To formally include a specific clause, rule, or condition in a contract or script\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'writeInto', /To formally include a specific clause, rule, or condition in a contract or script\./i, /We made sure to write a penalty clause into the agreement to protect our investment\./i, renderPage, getCard);
