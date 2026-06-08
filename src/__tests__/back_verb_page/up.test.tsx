import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BackVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BackVerbPage — "up" section definitions', () => {
  it('renders definition for moving backwards', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move backwards\./i)).toBeInTheDocument();
  });

  it('renders definition for supporting someone', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To support someone or confirm that what they are saying is true/i)).toBeInTheDocument();
  });

  it('renders definition for copying data', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a copy of computer data so it is not lost/i)).toBeInTheDocument();
  });

  it('renders definition for causing traffic', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To cause traffic to stop or move very slowly/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move backwards\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To support someone or confirm that what they are saying is true/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make a copy of computer data so it is not lost/i)).toHaveClass('truncate');
    expect(screen.getByText(/To cause traffic to stop or move very slowly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move backwards\./i)).toHaveAttribute(
      'title',
      'To move backwards.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'backUp_section_expanded', /To move backwards\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'backUp', /To move backwards\./i, /Could you back up a few steps/i, renderPage, getCard);
