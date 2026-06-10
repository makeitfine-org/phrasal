import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "behind" section definitions', () => {
  it('renders definition for staying in a place after everyone else has left', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To stay in a place after everyone else has left\./i)).toBeInTheDocument();
  });

  it('renders definition for making someone stay after others have left', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To make someone stay after others have left\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To stay in a place after everyone else has left\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To stay in a place after everyone else has left\./i)).toHaveAttribute(
      'title',
      'To stay in a place after everyone else has left.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'keepBehind_section_expanded', /To stay in a place after everyone else has left\./i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'keepBehind', /To stay in a place after everyone else has left\./i, /I kept behind after the meeting to ask the speaker a question\./i, renderPage, getCard);
