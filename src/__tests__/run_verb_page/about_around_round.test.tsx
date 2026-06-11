import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for being very busy doing many tasks', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To be very busy doing many different tasks/i)).toBeInTheDocument();
  });

  it('renders definition for deceiving or cheating someone', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To deceive or cheat someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To be very busy doing many different tasks/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To be very busy doing many different tasks/i)).toHaveAttribute(
      'title',
      'To be very busy doing many different tasks.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'runAbout_section_expanded', /To be very busy doing many different tasks/i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'runAbout', /To be very busy doing many different tasks/i, /The project manager was running around all day/i, renderPage, getCard);
