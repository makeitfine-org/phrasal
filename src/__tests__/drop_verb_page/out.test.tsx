import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "out" section definitions', () => {
  it('renders definition for stopping participation in something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop participating or being involved in something\./i)).toBeInTheDocument();
  });

  it('renders definition for leaving school before finishing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave a school, college, or course before finishing\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop participating or being involved in something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop participating or being involved in something\./i)).toHaveAttribute(
      'title',
      'To stop participating or being involved in something.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'dropOut_section_expanded', /To stop participating or being involved in something\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'dropOut', /To stop participating or being involved in something\./i, /One of our main investors dropped out/i, renderPage, getCard);
