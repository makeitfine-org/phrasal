import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "down" section definitions', () => {
  it('renders definition for reducing a level or amount', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce a level, rate, or amount/i)).toBeInTheDocument();
  });

  it('renders definition for causing a government to lose power', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To cause a government or leader to lose power/i)).toBeInTheDocument();
  });

  it('renders definition for making someone feel sad', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make someone feel sad, depressed, or less energetic/i)).toBeInTheDocument();
  });

  it('renders definition for causing an aircraft to fall', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To cause an aircraft or an animal to fall to the ground/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce a level, rate, or amount/i)).toHaveClass('truncate');
    expect(screen.getByText(/To cause a government or leader to lose power/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make someone feel sad, depressed, or less energetic/i)).toHaveClass('truncate');
    expect(screen.getByText(/To cause an aircraft or an animal to fall to the ground/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce a level, rate, or amount/i)).toHaveAttribute(
      'title',
      'To reduce a level, rate, or amount.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'bringDown_section_expanded', /To reduce a level, rate, or amount/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'bringDown', /To reduce a level, rate, or amount/i, /We need to bring down our time-to-hire/i, renderPage, getCard);
