import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('AskVerbPage — "off" section definitions', () => {
  it('renders definition for requesting time off work', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To request permission to not go to work/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To request permission to not go to work/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To request permission to not go to work/i)).toHaveAttribute(
      'title',
      'To request permission to not go to work for a specific period of time.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'askOff_section_expanded', /To request permission to not go to work/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'askOff', /To request permission to not go to work/i, /I need to ask Friday off/i, renderPage, getCard);
