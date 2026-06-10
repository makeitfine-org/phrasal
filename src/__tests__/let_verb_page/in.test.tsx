import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LetVerbPage — "in" section definitions', () => {
  it('renders definition for allowing someone to enter a place', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To allow someone or something to enter a place/i)).toBeInTheDocument();
  });

  it('renders definition for sharing a secret', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To allow someone to share a secret or know about a special plan/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To allow someone or something to enter a place/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To allow someone or something to enter a place/i)).toHaveAttribute(
      'title',
      'To allow someone or something to enter a place.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'letIn_section_expanded', /To allow someone or something to enter a place/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'letIn', /To allow someone or something to enter a place/i, /Please open the door and let the client in\./i, renderPage, getCard);
