import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "together" section definitions', () => {
  it('renders definition for calling a group together', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To formally ask a group of people to meet in one place\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To formally ask a group of people to meet in one place\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To formally ask a group of people to meet in one place\./i)).toHaveAttribute(
      'title',
      'To formally ask a group of people to meet in one place.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'callTogether_section_expanded', /To formally ask a group of people to meet in one place\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'callTogether', /To formally ask a group of people to meet in one place\./i, /call the board of directors together to discuss the merger/i, renderPage, getCard);
