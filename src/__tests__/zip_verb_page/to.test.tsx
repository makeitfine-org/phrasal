import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "to" section definitions', () => {
  it('renders definition for moving rapidly to a destination', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To move rapidly to a specific destination or state\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    const def = screen.getByText(/To move rapidly to a specific destination or state\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To move rapidly to a specific destination or state\./i)).toHaveAttribute(
      'title',
      'To move rapidly to a specific destination or state.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'zipTo_section_expanded', /To move rapidly to a specific destination or state\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'zipTo', /To move rapidly to a specific destination or state\./i, /Zip to the end of the video to see the surprise reveal\./i, renderPage, getCard);
