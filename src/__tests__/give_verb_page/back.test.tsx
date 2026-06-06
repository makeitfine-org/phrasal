import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GiveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GiveVerbPage — "back" section definitions', () => {
  it('renders definition for returning something to its owner', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to its original owner/i)).toBeInTheDocument();
  });

  it('renders definition for contributing to society', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To contribute to society or a community/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'back', 'giveBack_section_expanded', /To return something to its original owner/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'giveBack', /To return something to its original owner/i, /"You must give back the company laptop/i, renderPage, getCard);
