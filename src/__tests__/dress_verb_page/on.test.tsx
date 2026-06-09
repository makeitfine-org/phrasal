import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DressVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DressVerbPage — "on" section definitions', () => {
  it('renders definition for using a point as a guide to align a formation', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To use a specific person or point directly as a guide to align a formation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To use a specific person or point directly as a guide to align a formation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To use a specific person or point directly as a guide to align a formation/i)).toHaveAttribute(
      'title',
      'To use a specific person or point directly as a guide to align a formation (military / marching context).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'dressOn_section_expanded', /To use a specific person or point directly as a guide to align a formation/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'dressOn', /To use a specific person or point directly as a guide to align a formation/i, /The captain ordered the soldiers to dress on the center guide/i, renderPage, getCard);
