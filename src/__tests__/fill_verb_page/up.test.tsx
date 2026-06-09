import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FillVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FillVerbPage — "up" section definitions', () => {
  it('renders definition for making something completely full', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make something completely full, or to become completely full\./i)).toBeInTheDocument();
  });

  it('renders definition for eating enough food', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To eat enough food so that you are no longer hungry\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make something completely full, or to become completely full\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make something completely full, or to become completely full\./i)).toHaveAttribute(
      'title',
      'To make something completely full, or to become completely full.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'fillUp_section_expanded', /To make something completely full, or to become completely full\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'fillUp', /To make something completely full, or to become completely full\./i, /We need to fill up the car with petrol before we start driving\./i, renderPage, getCard);
