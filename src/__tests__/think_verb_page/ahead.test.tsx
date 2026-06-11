import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThinkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThinkVerbPage — "ahead" section definitions', () => {
  it('renders definition for considering the future to be prepared', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To consider what might happen in the future so that you are prepared\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To consider what might happen in the future so that you are prepared\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To consider what might happen in the future so that you are prepared\./i)).toHaveAttribute(
      'title',
      'To consider what might happen in the future so that you are prepared.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'thinkAhead_section_expanded', /To consider what might happen in the future so that you are prepared\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'thinkAhead', /To consider what might happen in the future so that you are prepared\./i, /Good managers always think ahead to avoid potential problems\./i, renderPage, getCard);
