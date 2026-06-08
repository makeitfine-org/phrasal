import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "with" section definitions', () => {
  it('renders definition for stopping following a tradition', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To stop following a tradition, habit, or custom/i)).toBeInTheDocument();
  });

  it('renders definition for ending a relationship with a person or group', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To end a relationship or association with a person or group/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To stop following a tradition, habit, or custom/i)).toHaveClass('truncate');
    expect(screen.getByText(/To end a relationship or association with a person or group/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To stop following a tradition, habit, or custom/i)).toHaveAttribute(
      'title',
      'To stop following a tradition, habit, or custom.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'breakWith_section_expanded', /To stop following a tradition, habit, or custom/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'breakWith', /To stop following a tradition, habit, or custom/i, /The designer broke with tradition/i, renderPage, getCard);
