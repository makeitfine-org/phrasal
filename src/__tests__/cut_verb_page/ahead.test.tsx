import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "ahead" section definitions', () => {
  it('renders definition for moving in front in a queue', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To move in front of others in a line unethically/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To move in front of others in a line unethically/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To move in front of others in a line unethically/i)).toHaveAttribute(
      'title',
      'To move in front of others in a line unethically.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'cutAhead_section_expanded', /To move in front of others in a line unethically/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'cutAhead', /To move in front of others in a line unethically/i, /A group of teenagers tried to cut ahead/i, renderPage, getCard);
