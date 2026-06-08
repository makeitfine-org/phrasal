import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BlowVerbPage — "about / around (round)" section definitions', () => {
  it('renders definition for moving in different directions', () => {
    renderPage();
    expandSection('about / around (round)');
    expect(screen.getByText(/To move in different directions because of the wind\./i)).toBeInTheDocument();
  });

  it('renders definition for spreading rumors', () => {
    renderPage();
    expandSection('about / around (round)');
    expect(screen.getByText(/To spread rumors or stories/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around (round)');
    expect(screen.getByText(/To move in different directions because of the wind\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around (round)');
    expect(screen.getByText(/To move in different directions because of the wind\./i)).toHaveAttribute(
      'title',
      'To move in different directions because of the wind.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around (round)', 'blowAbout_section_expanded', /To move in different directions because of the wind\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around (round)', renderPage);

describeDefaultImageCards(LABEL, 'about / around (round)', 'blowAbout', /To move in different directions because of the wind\./i, /The autumn leaves are blowing around the garden/i, renderPage, getCard);
