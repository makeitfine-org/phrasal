import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "about" section definitions', () => {
  it('renders definition for starting something needing time and energy', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To start doing something that needs a lot of time and energy\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To start doing something that needs a lot of time and energy\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To start doing something that needs a lot of time and energy\./i)).toHaveAttribute(
      'title',
      'To start doing something that needs a lot of time and energy.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'setAbout_section_expanded', /To start doing something that needs a lot of time and energy\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'setAbout', /To start doing something that needs a lot of time and energy\./i, /The team immediately set about rewriting the legacy Java code\./i, renderPage, getCard);
