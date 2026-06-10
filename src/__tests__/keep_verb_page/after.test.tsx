import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "after" section definitions', () => {
  it('renders definition for repeatedly reminding someone to do something', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To repeatedly remind or nag someone to do something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To repeatedly remind or nag someone to do something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To repeatedly remind or nag someone to do something/i)).toHaveAttribute(
      'title',
      'To repeatedly remind or nag someone to do something (mainly US English).'
    );
  });
});

describeSectionToggle(LABEL, 'after', 'keepAfter_section_expanded', /To repeatedly remind or nag someone to do something/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'keepAfter', /To repeatedly remind or nag someone to do something/i, /I have to keep after my team to submit their timesheets on Friday\./i, renderPage, getCard);
