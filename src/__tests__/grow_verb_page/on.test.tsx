import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GrowVerbPage — "on" section definitions', () => {
  it('renders definition for becoming increasingly liked over time', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To become increasingly liked or appreciated by someone over time\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To become increasingly liked or appreciated by someone over time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To become increasingly liked or appreciated by someone over time\./i)).toHaveAttribute(
      'title',
      'To become increasingly liked or appreciated by someone over time.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'growOn_section_expanded', /To become increasingly liked or appreciated by someone over time\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'growOn', /To become increasingly liked or appreciated by someone over time\./i, /I didn't like the new management software at first/i, renderPage, getCard);
