import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "up" section definitions', () => {
  it('renders definition for telephoning someone', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To telephone someone\./i)).toBeInTheDocument();
  });

  it('renders definition for showing information on screen', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To find and show information on a computer screen\./i)).toBeInTheDocument();
  });

  it('renders definition for joining the military', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To officially order someone to join the military\./i)).toBeInTheDocument();
  });

  it('renders definition for making someone remember', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make someone remember something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To telephone someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To telephone someone\./i)).toHaveAttribute(
      'title',
      'To telephone someone.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'callUp_section_expanded', /To telephone someone\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'callUp', /To telephone someone\./i, /call up the software vendor to ask about the pricing/i, renderPage, getCard);
