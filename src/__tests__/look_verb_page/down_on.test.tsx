import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "down on" section definitions', () => {
  it('renders definition for thinking you are better than someone else', () => {
    renderPage();
    expandSection('down on');
    expect(screen.getByText(/To think that you are better or more important than someone else\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down on');
    const defs = [
      screen.getByText(/To think that you are better or more important than someone else\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down on');
    expect(screen.getByText(/To think that you are better or more important than someone else\./i)).toHaveAttribute(
      'title',
      'To think that you are better or more important than someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'down on', 'lookDown_section_expanded', /To think that you are better or more important than someone else\./i, renderPage);

describeChevronAndColour(LABEL, 'down on', renderPage);

describeDefaultImageCards(LABEL, 'down on', 'lookDown', /To think that you are better or more important than someone else\./i, /A professional leader should never look down on/i, renderPage, getCard);
