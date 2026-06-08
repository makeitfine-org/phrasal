import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BrushVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BrushVerbPage — "up / up on" section definitions', () => {
  it('renders definition for improving forgotten knowledge', () => {
    renderPage();
    expandSection('up / up on');
    expect(screen.getByText(/To improve your knowledge or skill in something you learned in the past/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up / up on');
    expect(screen.getByText(/To improve your knowledge or skill in something you learned in the past/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up / up on');
    expect(screen.getByText(/To improve your knowledge or skill in something you learned in the past/i)).toHaveAttribute(
      'title',
      'To improve your knowledge or skill in something you learned in the past but have partly forgotten.'
    );
  });
});

describeSectionToggle(LABEL, 'up / up on', 'brushUp_section_expanded', /To improve your knowledge or skill in something you learned in the past/i, renderPage);

describeChevronAndColour(LABEL, 'up / up on', renderPage);

describeDefaultImageCards(LABEL, 'up / up on', 'brushUp', /To improve your knowledge or skill in something you learned in the past/i, /brush up on your management skills/i, renderPage, getCard);
