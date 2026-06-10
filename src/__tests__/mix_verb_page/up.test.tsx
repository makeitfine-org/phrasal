import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'MixVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('MixVerbPage — "up" section definitions', () => {
  it('renders definition for confusing two similar things or people', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To confuse two things or people by thinking that one person or thing is another/i)).toBeInTheDocument();
  });

  it('renders definition for making a mixture by combining ingredients', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a mixture by combining different ingredients/i)).toBeInTheDocument();
  });

  it('renders definition for doing something differently to make it more interesting', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To do something differently to make it more interesting/i)).toBeInTheDocument();
  });

  it('renders definition for being involved in something illegal or complicated', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be connected to or involved in something illegal/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To confuse two things or people by thinking that one person or thing is another/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To confuse two things or people by thinking that one person or thing is another/i)).toHaveAttribute(
      'title',
      'To confuse two things or people by thinking that one person or thing is another because they are similar.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'mixUp_section_expanded', /To confuse two things or people by thinking that one person or thing is another/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'mixUp', /To confuse two things or people by thinking that one person or thing is another/i, /I always mix up the two brothers because they look exactly the same\./i, renderPage, getCard);
