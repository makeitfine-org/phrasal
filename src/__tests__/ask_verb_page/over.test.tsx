import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('AskVerbPage — "over" section definitions', () => {
  it('renders definition for inviting someone to your home', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To invite someone to your home, usually for a short visit/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To invite someone to your home, usually for a short visit/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To invite someone to your home, usually for a short visit/i)).toHaveAttribute(
      'title',
      'To invite someone to your home, usually for a short visit or a meal.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'askOver_section_expanded', /To invite someone to your home, usually for a short visit/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'askOver', /To invite someone to your home, usually for a short visit/i, /Let's ask Tom and Sarah over for dinner/i, renderPage, getCard);
