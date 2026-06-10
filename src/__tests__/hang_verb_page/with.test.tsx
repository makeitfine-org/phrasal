import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HangVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HangVerbPage — "with" section definitions', () => {
  it('renders definition for spending time with people (informal)', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/An informal version of "hang out with"; to spend time with people\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/An informal version of "hang out with"/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/An informal version of "hang out with"/i)).toHaveAttribute(
      'title',
      'An informal version of "hang out with"; to spend time with people.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'hangWith_section_expanded', /An informal version of "hang out with"/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'hangWith', /An informal version of "hang out with"/i, /I prefer to hang with people who share my interest in business management\./i, renderPage, getCard);
