import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PointVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PointVerbPage — "off" section definitions', () => {
  it('renders definition for separating numbers with a decimal point', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To separate numbers with a decimal point/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To separate numbers with a decimal point/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To separate numbers with a decimal point/i)).toHaveAttribute(
      'title',
      'To separate numbers with a decimal point (used mainly in mathematics and accounting).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'pointOff_section_expanded', /To separate numbers with a decimal point/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'pointOff', /To separate numbers with a decimal point/i, /When calculating the final cost, remember to point off/i, renderPage, getCard);
