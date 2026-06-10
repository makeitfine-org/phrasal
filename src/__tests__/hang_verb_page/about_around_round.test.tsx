import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HangVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HangVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for spending time somewhere doing nothing in particular', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time somewhere doing nothing in particular/i)).toBeInTheDocument();
  });

  it('renders definition for waiting or staying in a place for a specific reason', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To wait or stay in a place for a specific reason\./i)).toBeInTheDocument();
  });

  it('renders definition for spending time with a specific group of people', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time with a specific group of people\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time somewhere doing nothing in particular/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time somewhere doing nothing in particular/i)).toHaveAttribute(
      'title',
      'To spend time somewhere doing nothing in particular, just waiting or relaxing.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'hangAbout_section_expanded', /To spend time somewhere doing nothing in particular/i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'hangAbout', /To spend time somewhere doing nothing in particular/i, /Teenagers often hang around the shopping mall on weekends\./i, renderPage, getCard);
