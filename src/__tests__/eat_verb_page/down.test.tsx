import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'EatVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('EatVerbPage — "down" section definitions', () => {
  it('renders definition for grazing pasture until gone', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To graze pasture or grass until it is very short or completely gone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To graze pasture or grass until it is very short or completely gone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To graze pasture or grass until it is very short or completely gone\./i)).toHaveAttribute(
      'title',
      'To graze pasture or grass until it is very short or completely gone.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'eatDown_section_expanded', /To graze pasture or grass until it is very short or completely gone\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'eatDown', /To graze pasture or grass until it is very short or completely gone\./i, /The herd of sheep completely ate down the grass in the lower field\./i, renderPage, getCard);
