import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "forward to" section definitions', () => {
  it('renders definition for feeling excited about something in the future', () => {
    renderPage();
    expandSection('forward to');
    expect(screen.getByText(/To feel excited and happy about something/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('forward to');
    const defs = [
      screen.getByText(/To feel excited and happy about something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward to');
    expect(screen.getByText(/To feel excited and happy about something/i)).toHaveAttribute(
      'title',
      'To feel excited and happy about something that is going to happen in the future.'
    );
  });
});

describeSectionToggle(LABEL, 'forward to', 'lookForward_section_expanded', /To feel excited and happy about something/i, renderPage);

describeChevronAndColour(LABEL, 'forward to', renderPage);

describeDefaultImageCards(LABEL, 'forward to', 'lookForward', /To feel excited and happy about something/i, /I look forward to reviewing the new business strategy/i, renderPage, getCard);
