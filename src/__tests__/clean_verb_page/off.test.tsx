import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CleanVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CleanVerbPage — "off" section definitions', () => {
  it('renders definition for removing dirt or marks from a surface', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove dirt, marks, or a substance from a surface\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove dirt, marks, or a substance from a surface\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove dirt, marks, or a substance from a surface\./i)).toHaveAttribute(
      'title',
      'To remove dirt, marks, or a substance from a surface.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'cleanOff_section_expanded', /To remove dirt, marks, or a substance from a surface\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'cleanOff', /To remove dirt, marks, or a substance from a surface\./i, /Make sure to clean the mud off your boots/i, renderPage, getCard);
