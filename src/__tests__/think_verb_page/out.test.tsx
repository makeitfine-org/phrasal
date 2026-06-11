import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThinkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThinkVerbPage — "out" section definitions', () => {
  it('renders definition for planning something completely from start to finish', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To plan something completely and carefully from start to finish\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To plan something completely and carefully from start to finish\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To plan something completely and carefully from start to finish\./i)).toHaveAttribute(
      'title',
      'To plan something completely and carefully from start to finish.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'thinkOut_section_expanded', /To plan something completely and carefully from start to finish\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'thinkOut', /To plan something completely and carefully from start to finish\./i, /We need to think out our strategy before the client meeting\./i, renderPage, getCard);
