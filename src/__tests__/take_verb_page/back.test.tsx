import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "back" section definitions', () => {
  it('renders definition for returning something', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to the place where it was bought/i)).toBeInTheDocument();
  });

  it('renders definition for admitting being wrong', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To admit that something you said was wrong/i)).toBeInTheDocument();
  });

  it('renders definition for reminding of the past', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To remind someone of an earlier time/i)).toBeInTheDocument();
  });

  it('renders definition for accepting back', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To accept someone back into a relationship/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'back', 'takeBack_section_expanded', /To return something to the place where it was bought/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'takeBack', /To return something to the place where it was bought/i, /"The laptop was broken/i, renderPage, getCard);
