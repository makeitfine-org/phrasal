import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HandVerbPage — "in" section definitions', () => {
  it('renders definition for submitting something to a person in authority', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To submit something or give it to a person in authority/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To submit something or give it to a person in authority/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To submit something or give it to a person in authority/i)).toHaveAttribute(
      'title',
      'To submit something or give it to a person in authority (like a boss, teacher, or official).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'handIn_section_expanded', /To submit something or give it to a person in authority/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'handIn', /To submit something or give it to a person in authority/i, /He decided to hand in his resignation because he found a new job in software development\./i, renderPage, getCard);
