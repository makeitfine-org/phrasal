import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "out" section definitions', () => {
  it('renders definition for not entering a place', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not enter a place, or to stop someone or something from entering\./i)).toBeInTheDocument();
  });

  it('renders definition for staying away from a problem or argument', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stay away from a problem, argument, or situation\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not enter a place, or to stop someone or something from entering\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not enter a place, or to stop someone or something from entering\./i)).toHaveAttribute(
      'title',
      'To not enter a place, or to stop someone or something from entering.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'keepOut_section_expanded', /To not enter a place, or to stop someone or something from entering\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'keepOut', /To not enter a place, or to stop someone or something from entering\./i, /There is a sign on the door that says 'Danger: Keep Out\.'/i, renderPage, getCard);
