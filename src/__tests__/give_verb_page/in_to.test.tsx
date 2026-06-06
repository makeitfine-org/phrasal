import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GiveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GiveVerbPage — "in to" section definitions', () => {
  it('renders definition for stopping resistance to a feeling', () => {
    renderPage();
    expandSection('in to');
    expect(screen.getByText(/To stop resisting a feeling, desire, or pressure/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'in to', 'giveInTo_section_expanded', /To stop resisting a feeling, desire, or pressure/i, renderPage);

describeChevronAndColour(LABEL, 'in to', renderPage);

describeDefaultImageCards(LABEL, 'in to', 'giveInTo', /To stop resisting a feeling, desire, or pressure/i, /"The company gave in to market pressure/i, renderPage, getCard);
