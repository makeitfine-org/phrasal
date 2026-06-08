import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "by" section definitions', () => {
  it('renders definition for visiting briefly to deliver something', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To visit someone briefly in order to deliver something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To visit someone briefly in order to deliver something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To visit someone briefly in order to deliver something/i)).toHaveAttribute(
      'title',
      'To visit someone briefly in order to deliver something.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'bringBy_section_expanded', /To visit someone briefly in order to deliver something/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'bringBy', /To visit someone briefly in order to deliver something/i, /I'll bring the signed contracts by the office/i, renderPage, getCard);
