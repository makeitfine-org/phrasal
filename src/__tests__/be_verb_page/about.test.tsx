import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "about" section definitions', () => {
  it('renders definition for something happening very soon', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To be going to happen very soon/i)).toBeInTheDocument();
  });

  it('renders definition for meaning or consisting of something', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To mean or consist of \(what something is about\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To be going to happen very soon/i)).toHaveClass('truncate');
    expect(screen.getByText(/To mean or consist of \(what something is about\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To be going to happen very soon/i)).toHaveAttribute(
      'title',
      'To be going to happen very soon (be about to).'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'beAbout_section_expanded', /To be going to happen very soon/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'beAbout', /To be going to happen very soon/i, /Save your work; the system is about to restart/i, renderPage, getCard);
