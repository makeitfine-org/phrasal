import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StickVerbPage — "about / around" section definitions', () => {
  it('renders definition for staying in a place for a little while', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To stay in a place for a little while, often waiting for something to happen\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To stay in a place for a little while, often waiting for something to happen\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To stay in a place for a little while, often waiting for something to happen\./i)).toHaveAttribute(
      'title',
      'To stay in a place for a little while, often waiting for something to happen.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around', 'stickAbout_section_expanded', /To stay in a place for a little while, often waiting for something to happen\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around', renderPage);

describeDefaultImageCards(LABEL, 'about / around', 'stickAbout', /To stay in a place for a little while, often waiting for something to happen\./i, /Stick around after the sprint review; we need to discuss the Java 21 migration\./i, renderPage, getCard);
