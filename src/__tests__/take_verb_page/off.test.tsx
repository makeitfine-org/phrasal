import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "off" section definitions', () => {
  it('renders definition for removing clothing', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove clothing or accessories/i)).toBeInTheDocument();
  });

  it('renders definition for leaving the ground', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave the ground and begin flying/i)).toBeInTheDocument();
  });

  it('renders definition for becoming successful quickly', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To become very successful very quickly/i)).toBeInTheDocument();
  });

  it('renders definition for leaving without warning', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave quickly or without warning/i)).toBeInTheDocument();
  });

  it('renders definition for time away from work', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To have time away from work/i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove clothing or accessories/i)).toHaveClass('truncate');
    expect(screen.getByText(/To leave the ground and begin flying/i)).toHaveClass('truncate');
    expect(screen.getByText(/To become very successful very quickly/i)).toHaveClass('truncate');
    expect(screen.getByText(/To leave quickly or without warning/i)).toHaveClass('truncate');
    expect(screen.getByText(/To have time away from work/i)).toHaveClass('truncate');
  });
});

describeSectionToggle(LABEL, 'off', 'takeOff_section_expanded', /To remove clothing or accessories/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'takeOff', /To remove clothing or accessories/i, /"Please take off your shoes/i, renderPage, getCard);
