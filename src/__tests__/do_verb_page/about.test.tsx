import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DoVerbPage — "about" section definitions', () => {
  it('renders definition for taking action to fix a problem', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To take action to fix a problem\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To take action to fix a problem\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To take action to fix a problem\./i)).toHaveAttribute(
      'title',
      'To take action to fix a problem.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'doAbout_section_expanded', /To take action to fix a problem\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'doAbout', /To take action to fix a problem\./i, /what are we going to do about it/i, renderPage, getCard);
