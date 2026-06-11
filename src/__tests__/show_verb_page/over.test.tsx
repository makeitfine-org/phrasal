import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShowVerbPage — "over" section definitions', () => {
  it('renders definition for guiding someone around a building to inspect it', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To guide someone around a building to inspect it/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To guide someone around a building to inspect it/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To guide someone around a building to inspect it/i)).toHaveAttribute(
      'title',
      'To guide someone around a building to inspect it (primarily British English, similar to "show around").'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'showOver_section_expanded', /To guide someone around a building to inspect it/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'showOver', /To guide someone around a building to inspect it/i, /The real estate agent showed us over the new office space\./i, renderPage, getCard);
