import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for discussing casually', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To talk about ideas in an informal way\./i)).toBeInTheDocument();
  });

  it('renders definition for spending time without a plan', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To relax or travel without a strict schedule\./i)).toBeInTheDocument();
  });

  it('renders definition for existing somewhere', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/When an object is somewhere in a room but not organised\./i)).toBeInTheDocument();
  });

  it('renders definition for treating violently', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To hit someone repeatedly\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To talk about ideas in an informal way\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To talk about ideas in an informal way\./i)).toHaveAttribute(
      'title',
      'To talk about ideas in an informal way.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'knockAbout_section_expanded', /To talk about ideas in an informal way\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'knockAbout', /To talk about ideas in an informal way\./i, /We knocked a few new software features around during the meeting\./i, renderPage, getCard);
