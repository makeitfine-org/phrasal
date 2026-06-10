import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "across" section definitions', () => {
  it('renders definition for staying informed about a situation', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To stay informed about a situation or topic/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To stay informed about a situation or topic/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To stay informed about a situation or topic/i)).toHaveAttribute(
      'title',
      'To stay informed about a situation or topic (mainly British English).'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'keepAcross_section_expanded', /To stay informed about a situation or topic/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'keepAcross', /To stay informed about a situation or topic/i, /As a project manager, I need to keep across all the software updates\./i, renderPage, getCard);
