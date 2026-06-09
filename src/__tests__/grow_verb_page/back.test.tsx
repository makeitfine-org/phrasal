import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GrowVerbPage — "back" section definitions', () => {
  it('renders definition for growing again after being cut or damaged', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To grow again after being cut, broken, or damaged/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To grow again after being cut, broken, or damaged/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To grow again after being cut, broken, or damaged/i)).toHaveAttribute(
      'title',
      'To grow again after being cut, broken, or damaged (usually referring to plants or hair).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'growBack_section_expanded', /To grow again after being cut, broken, or damaged/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'growBack', /To grow again after being cut, broken, or damaged/i, /We had to cut down the tree, but the branches are starting to grow back\./i, renderPage, getCard);
