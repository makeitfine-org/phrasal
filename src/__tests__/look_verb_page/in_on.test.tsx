import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "in (on)" section definitions', () => {
  it('renders definition for visiting a person for a short time', () => {
    renderPage();
    expandSection('in (on)');
    expect(screen.getByText(/To visit a person for a short time/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in (on)');
    const defs = [
      screen.getByText(/To visit a person for a short time/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in (on)');
    expect(screen.getByText(/To visit a person for a short time/i)).toHaveAttribute(
      'title',
      'To visit a person for a short time, usually to check that they are okay.'
    );
  });
});

describeSectionToggle(LABEL, 'in (on)', 'lookIn_section_expanded', /To visit a person for a short time/i, renderPage);

describeChevronAndColour(LABEL, 'in (on)', renderPage);

describeDefaultImageCards(LABEL, 'in (on)', 'lookIn', /To visit a person for a short time/i, /I will look in on the new trainees/i, renderPage, getCard);
