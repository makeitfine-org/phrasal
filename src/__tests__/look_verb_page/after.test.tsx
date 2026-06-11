import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "after" section definitions', () => {
  it('renders definition for taking care of someone or something', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To take care of someone or something/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('after');
    const defs = [
      screen.getByText(/To take care of someone or something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To take care of someone or something/i)).toHaveAttribute(
      'title',
      'To take care of someone or something and make sure they have what they need.'
    );
  });
});

describeSectionToggle(LABEL, 'after', 'lookAfter_section_expanded', /To take care of someone or something/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'lookAfter', /To take care of someone or something/i, /As a manager, you must look after/i, renderPage, getCard);
