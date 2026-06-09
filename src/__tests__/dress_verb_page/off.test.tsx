import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DressVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DressVerbPage — "off" section definitions', () => {
  it('renders definition for using a reference point to form a straight line in a formation', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To use a specific reference point to form a straight line in a formation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To use a specific reference point to form a straight line in a formation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To use a specific reference point to form a straight line in a formation/i)).toHaveAttribute(
      'title',
      'To use a specific reference point to form a straight line in a formation (military / marching context).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'dressOff_section_expanded', /To use a specific reference point to form a straight line in a formation/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'dressOff', /To use a specific reference point to form a straight line in a formation/i, /The soldiers were ordered to dress off the right flank/i, renderPage, getCard);
