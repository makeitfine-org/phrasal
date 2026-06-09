import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "up" section definitions', () => {
  it('renders definition for investigating someone or something', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To investigate someone or something to discover what they are doing or if they are okay\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To investigate someone or something to discover what they are doing or if they are okay\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To investigate someone or something to discover what they are doing or if they are okay\./i)).toHaveAttribute(
      'title',
      'To investigate someone or something to discover what they are doing or if they are okay.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'checkUp_section_expanded', /To investigate someone or something to discover what they are doing or if they are okay\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'checkUp', /To investigate someone or something to discover what they are doing or if they are okay\./i, /The client called to check up on the progress of the software release\./i, renderPage, getCard);
