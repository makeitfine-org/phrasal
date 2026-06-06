import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "after" section definitions', () => {
  it('renders definition for trying to catch or stop someone', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To try to catch or stop someone/i)).toBeInTheDocument();
  });

  it('renders definition for trying to achieve a goal', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To try to achieve or get something \(like a job or goal\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'after', 'goAfter_section_expanded', /To try to catch or stop someone/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'goAfter', /To try to catch or stop someone/i, /"The police went after the thief/i, renderPage, getCard);
