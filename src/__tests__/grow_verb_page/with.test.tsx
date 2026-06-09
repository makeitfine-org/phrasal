import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GrowVerbPage — "with" section definitions', () => {
  it('renders definition for expanding proportionally alongside something else', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To expand, develop, or change proportionally alongside something else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To expand, develop, or change proportionally alongside something else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To expand, develop, or change proportionally alongside something else\./i)).toHaveAttribute(
      'title',
      'To expand, develop, or change proportionally alongside something else.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'growWith_section_expanded', /To expand, develop, or change proportionally alongside something else\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'growWith', /To expand, develop, or change proportionally alongside something else\./i, /You need a server architecture that can grow with your business needs\./i, renderPage, getCard);
