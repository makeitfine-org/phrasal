import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "up" section definitions', () => {
  it('renders definition for starting a hobby', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start a new activity or hobby/i)).toBeInTheDocument();
  });

  it('renders definition for occupying time or space', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To use or fill an amount of time or space/i)).toBeInTheDocument();
  });

  it('renders definition for accepting an offer', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To accept an offer that has been made/i)).toBeInTheDocument();
  });

  it('renders definition for shortening clothing', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To shorten a piece of clothing/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'up', 'takeUp_section_expanded', /To start a new activity or hobby/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'takeUp', /To start a new activity or hobby/i, /"He took up golf/i, renderPage, getCard);
