import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "over" section definitions', () => {
  it('renders definition for asking someone to come over', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ask someone to come to where you are standing\./i)).toBeInTheDocument();
  });

  it('renders definition for reading aloud a list of names', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To read aloud a list of names to check who is present/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ask someone to come to where you are standing\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ask someone to come to where you are standing\./i)).toHaveAttribute(
      'title',
      'To ask someone to come to where you are standing.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'callOver_section_expanded', /To ask someone to come to where you are standing\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'callOver', /To ask someone to come to where you are standing\./i, /called the junior developer over to look at my screen/i, renderPage, getCard);
