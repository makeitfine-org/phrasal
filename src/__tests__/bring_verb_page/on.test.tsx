import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "on" section definitions', () => {
  it('renders definition for causing something negative to happen', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To cause something to happen \(usually something negative/i)).toBeInTheDocument();
  });

  it('renders definition for helping someone develop or improve', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To help someone develop or improve, especially in their career/i)).toBeInTheDocument();
  });

  it('renders definition for sending a player onto the field', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To send a player onto the field during a sports match/i)).toBeInTheDocument();
  });

  it('renders definition for showing readiness for a challenge', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/Used as an exclamation.*to show you are prepared for a challenge/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To cause something to happen \(usually something negative/i)).toHaveClass('truncate');
    expect(screen.getByText(/To help someone develop or improve, especially in their career/i)).toHaveClass('truncate');
    expect(screen.getByText(/To send a player onto the field during a sports match/i)).toHaveClass('truncate');
    expect(screen.getByText(/Used as an exclamation.*to show you are prepared for a challenge/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To cause something to happen \(usually something negative/i)).toHaveAttribute(
      'title',
      'To cause something to happen (usually something negative, like an illness or bad situation).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'bringOn_section_expanded', /To cause something to happen \(usually something negative/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'bringOn', /To cause something to happen \(usually something negative/i, /I think the sudden change in weather brought on my cold/i, renderPage, getCard);
