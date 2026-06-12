import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'UseVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('UseVerbPage — "to / used to" section definitions', () => {
  it('renders definition for past habitual action', () => {
    renderPage();
    expandSection('to / used to');
    expect(screen.getByText(/Indicates an action done regularly in the past but no longer done, or a past state that no longer exists\./i)).toBeInTheDocument();
  });

  it('renders definition for being familiar with something', () => {
    renderPage();
    expandSection('to / used to');
    expect(screen.getByText(/To be familiar with something so it no longer seems new, strange, or difficult/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to / used to');
    const defs = [
      screen.getByText(/Indicates an action done regularly in the past but no longer done, or a past state that no longer exists\./i),
      screen.getByText(/To be familiar with something so it no longer seems new, strange, or difficult/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to / used to');
    expect(screen.getByText(/Indicates an action done regularly in the past but no longer done, or a past state that no longer exists\./i)).toHaveAttribute(
      'title',
      'Indicates an action done regularly in the past but no longer done, or a past state that no longer exists.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to / used to');
    expect(screen.getByText(/To be familiar with something so it no longer seems new, strange, or difficult/i)).toHaveAttribute(
      'title',
      'To be familiar with something so it no longer seems new, strange, or difficult (be/get used to).'
    );
  });
});

describeSectionToggle(LABEL, 'to / used to', 'useTo_section_expanded', /Indicates an action done regularly in the past but no longer done, or a past state that no longer exists\./i, renderPage);

describeChevronAndColour(LABEL, 'to / used to', renderPage);

describeDefaultImageCards(LABEL, 'to / used to', 'useTo', /Indicates an action done regularly in the past but no longer done, or a past state that no longer exists\./i, /I used to play the piano every day when I was a child\./i, renderPage, getCard);
