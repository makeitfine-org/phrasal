import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BrushVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BrushVerbPage — "by" section definitions', () => {
  it('renders definition for walking past in a narrow space', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To walk past someone in a narrow space, touching them slightly\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To walk past someone in a narrow space, touching them slightly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To walk past someone in a narrow space, touching them slightly\./i)).toHaveAttribute(
      'title',
      'To walk past someone in a narrow space, touching them slightly.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'brushBy_section_expanded', /To walk past someone in a narrow space, touching them slightly\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'brushBy', /To walk past someone in a narrow space, touching them slightly\./i, /He brushed by me in the crowded hallway/i, renderPage, getCard);
