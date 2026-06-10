import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "off" section definitions', () => {
  it('renders definition for succeeding in something difficult', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something very difficult or unexpected/i)).toBeInTheDocument();
  });

  it('renders definition for driving off the main road', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To drive a vehicle off the main road/i)).toBeInTheDocument();
  });

  it('renders definition for removing clothing quickly', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove clothing quickly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something very difficult or unexpected/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something very difficult or unexpected/i)).toHaveAttribute(
      'title',
      'To succeed in doing something very difficult or unexpected.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'pullOff_section_expanded', /To succeed in doing something very difficult or unexpected/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'pullOff', /To succeed in doing something very difficult or unexpected/i, /but the team pulled it off/i, renderPage, getCard);
