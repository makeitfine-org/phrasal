import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "up" section definitions', () => {
  it('renders definition for making something quickly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a meal or item in a short time\./i)).toBeInTheDocument();
  });

  it('renders definition for knocking on a door to wake someone', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To knock on a door to wake someone \(UK English\)\./i)).toBeInTheDocument();
  });

  it('renders definition for making someone pregnant', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make someone pregnant \(informal\/slang\)\./i)).toBeInTheDocument();
  });

  it('renders definition for warming up for tennis', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To warm up for tennis by hitting the ball before a match\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a meal or item in a short time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a meal or item in a short time\./i)).toHaveAttribute(
      'title',
      'To make a meal or item in a short time.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'knockUp_section_expanded', /To make a meal or item in a short time\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'knockUp', /To make a meal or item in a short time\./i, /Let me knock up a quick presentation for the client\./i, renderPage, getCard);
