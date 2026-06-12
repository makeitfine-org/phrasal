import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "about" section definitions', () => {
  it('renders definition for discussing a subject in writing', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To discuss a particular subject in writing\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    const def = screen.getByText(/To discuss a particular subject in writing\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To discuss a particular subject in writing\./i)).toHaveAttribute(
      'title',
      'To discuss a particular subject in writing.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'writeAbout_section_expanded', /To discuss a particular subject in writing\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'writeAbout', /To discuss a particular subject in writing\./i, /I want to write about the impact of artificial intelligence on the job market\./i, renderPage, getCard);
