import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LayVerbPage — "about" section definitions', () => {
  it('renders definition for attacking violently', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To hit out in all directions; to attack violently\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To hit out in all directions; to attack violently\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To hit out in all directions; to attack violently\./i)).toHaveAttribute(
      'title',
      'To hit out in all directions; to attack violently.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'layAbout_section_expanded', /To hit out in all directions; to attack violently\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'layAbout', /To hit out in all directions; to attack violently\./i, /When the attackers approached, he began laying about him with a heavy stick\./i, renderPage, getCard);
