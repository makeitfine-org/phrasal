import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "with" section definitions', () => {
  it('renders definition for supporting someone', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To support someone\./i)).toBeInTheDocument();
  });

  it('renders definition for understanding someone', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To understand someone\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To support someone\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To understand someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To support someone\./i)).toHaveAttribute('title', 'To support someone.');
  });
});

describeSectionToggle(LABEL, 'with', 'beWith_section_expanded', /To support someone\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'beWith', /To support someone\./i, /I am with you on this proposal/i, renderPage, getCard);
