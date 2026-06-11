import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "into" section definitions', () => {
  it('renders definition for persuading someone to do something', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To persuade someone to do something they initially did not want to do\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To persuade someone to do something they initially did not want to do\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To persuade someone to do something they initially did not want to do\./i)).toHaveAttribute(
      'title',
      'To persuade someone to do something they initially did not want to do.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'talkInto_section_expanded', /To persuade someone to do something they initially did not want to do\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'talkInto', /To persuade someone to do something they initially did not want to do\./i, /She talked me into taking the management course\./i, renderPage, getCard);
