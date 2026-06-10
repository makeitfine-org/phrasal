import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "into" section definitions', () => {
  it('renders definition for becoming part of history or legend', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To become part of something, usually history or legend/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To become part of something, usually history or legend/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To become part of something, usually history or legend/i)).toHaveAttribute(
      'title',
      'To become part of something, usually history or legend.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'passInto_section_expanded', /To become part of something, usually history or legend/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'passInto', /To become part of something, usually history or legend/i, /His successful software release passed into company history\./i, renderPage, getCard);
