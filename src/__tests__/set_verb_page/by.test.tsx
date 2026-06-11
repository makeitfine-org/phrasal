import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "by" section definitions', () => {
  it('renders definition for saving money or things for the future', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To save money or things for the future\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To save money or things for the future\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To save money or things for the future\./i)).toHaveAttribute(
      'title',
      'To save money or things for the future.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'setBy_section_expanded', /To save money or things for the future\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'setBy', /To save money or things for the future\./i, /The company has a budget set by for emergency server repairs\./i, renderPage, getCard);
