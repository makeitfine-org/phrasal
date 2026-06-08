import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BackVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BackVerbPage — "onto" section definitions', () => {
  it('renders definition for a building facing something at the back', () => {
    renderPage();
    expandSection('onto');
    expect(screen.getByText(/If a building backs onto something, the back of the building faces it/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('onto');
    expect(screen.getByText(/If a building backs onto something, the back of the building faces it/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('onto');
    expect(screen.getByText(/If a building backs onto something, the back of the building faces it/i)).toHaveAttribute(
      'title',
      'If a building backs onto something, the back of the building faces it.'
    );
  });
});

describeSectionToggle(LABEL, 'onto', 'backOnto_section_expanded', /If a building backs onto something, the back of the building faces it/i, renderPage);

describeChevronAndColour(LABEL, 'onto', renderPage);

describeDefaultImageCards(LABEL, 'onto', 'backOnto', /If a building backs onto something, the back of the building faces it/i, /Our new corporate headquarters backs onto/i, renderPage, getCard);
