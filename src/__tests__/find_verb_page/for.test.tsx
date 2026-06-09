import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FindVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FindVerbPage — "for" section definitions', () => {
  it('renders definition for making an official decision in favor of someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To make an official decision in favor of someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To make an official decision in favor of someone/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To make an official decision in favor of someone/i)).toHaveAttribute(
      'title',
      'To make an official decision in favor of someone (formal, used in legal or official settings).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'findFor_section_expanded', /To make an official decision in favor of someone/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'findFor', /To make an official decision in favor of someone/i, /After reviewing the contract, the judge found for the software developer/i, renderPage, getCard);
