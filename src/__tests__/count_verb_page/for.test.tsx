import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CountVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CountVerbPage — "for" section definitions', () => {
  it('renders definition for having importance or value', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To have a specific level of importance or value\./i)).toBeInTheDocument();
  });

  it('renders definition for being worth something', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be worth something \(often used with "nothing" or "something"\)\./i)).toBeInTheDocument();
  });

  it('first definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To have a specific level of importance or value\./i)).toHaveClass('truncate');
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To have a specific level of importance or value\./i)).toHaveAttribute(
      'title',
      'To have a specific level of importance or value.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'countFor_section_expanded', /To have a specific level of importance or value\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'countFor', /To have a specific level of importance or value\./i, /Good communication skills count for a lot/i, renderPage, getCard);
