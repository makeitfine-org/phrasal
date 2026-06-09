import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FillVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FillVerbPage — "down" section definitions', () => {
  it('renders definition for copying data or formulas to cells below', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To copy data or formulas to the cells below/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To copy data or formulas to the cells below/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To copy data or formulas to the cells below/i)).toHaveAttribute(
      'title',
      'To copy data or formulas to the cells below (specific to software/business context like Excel).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'fillDown_section_expanded', /To copy data or formulas to the cells below/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'fillDown', /To copy data or formulas to the cells below/i, /Select the top cell and fill down the formula to the bottom of the column\./i, renderPage, getCard);
