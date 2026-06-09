import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "for" section definitions', () => {
  it('renders definition for demanding a specific action', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To demand or require a specific action or quality\./i)).toBeInTheDocument();
  });

  it('renders definition for publicly asking for something', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To publicly ask for something to happen\./i)).toBeInTheDocument();
  });

  it('renders definition for picking someone up', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To go to a place to pick someone or something up\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To demand or require a specific action or quality\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To demand or require a specific action or quality\./i)).toHaveAttribute(
      'title',
      'To demand or require a specific action or quality.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'callFor_section_expanded', /To demand or require a specific action or quality\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'callFor', /To demand or require a specific action or quality\./i, /calls for great communication skills/i, renderPage, getCard);
