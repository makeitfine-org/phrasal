import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GiveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GiveVerbPage — "in" section definitions', () => {
  it('renders definition for yielding/surrendering', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To finally agree to what someone wants after initially refusing/i)).toBeInTheDocument();
  });

  it('renders definition for submitting a document', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hand over or submit a document/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'in', 'giveIn_section_expanded', /To finally agree to what someone wants after initially refusing/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'giveIn', /To finally agree to what someone wants after initially refusing/i, /"Management finally gave in to the workers/i, renderPage, getCard);
