import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "up" section definitions', () => {
  it('renders definition for increasing or rising', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To increase or rise/i)).toBeInTheDocument();
  });

  it('renders definition for being built or constructed', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be built or constructed/i)).toBeInTheDocument();
  });

  it('renders definition for exploding or catching fire', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To explode or catch fire/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'up', 'goUp_section_expanded', /To increase or rise/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'goUp', /To increase or rise/i, /"Software licensing prices have gone up/i, renderPage, getCard);
