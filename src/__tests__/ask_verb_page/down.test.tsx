import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('AskVerbPage — "down" section definitions', () => {
  it('renders definition for inviting someone downstairs', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To invite someone to come downstairs from a higher floor/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To invite someone to come downstairs from a higher floor/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To invite someone to come downstairs from a higher floor/i)).toHaveAttribute(
      'title',
      'To invite someone to come downstairs from a higher floor.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'askDown_section_expanded', /To invite someone to come downstairs from a higher floor/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'askDown', /To invite someone to come downstairs from a higher floor/i, /His mother asked him down for breakfast/i, renderPage, getCard);
