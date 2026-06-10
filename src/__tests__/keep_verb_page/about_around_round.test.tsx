import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for keeping something near because it might be useful', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To keep something near you because it might be useful\./i)).toBeInTheDocument();
  });

  it('renders definition for continuing to associate with someone', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To continue to associate with someone or let them stay in a group or company\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To keep something near you because it might be useful\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To keep something near you because it might be useful\./i)).toHaveAttribute(
      'title',
      'To keep something near you because it might be useful.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'keepAbout_section_expanded', /To keep something near you because it might be useful\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'keepAbout', /To keep something near you because it might be useful\./i, /I always keep a pen around just in case I need to take notes\./i, renderPage, getCard);
