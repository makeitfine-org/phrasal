import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HandVerbPage — "out" section definitions', () => {
  it('renders definition for distributing something to multiple people in a group', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to multiple people in a group\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to multiple people in a group\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to multiple people in a group\./i)).toHaveAttribute(
      'title',
      'To distribute something to multiple people in a group.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'handOut_section_expanded', /To distribute something to multiple people in a group\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'handOut', /To distribute something to multiple people in a group\./i, /The team leader handed out the new coding guidelines during the meeting\./i, renderPage, getCard);
