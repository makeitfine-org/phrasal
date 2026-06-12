import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "to" section definitions', () => {
  it('renders definition for sending a written message to someone', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To send a written message or letter to a specific person or entity\./i)).toBeInTheDocument();
  });

  it('renders definition for targeting writing toward a demographic', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To target a piece of writing toward a specific demographic\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To send a written message or letter to a specific person or entity\./i),
      screen.getByText(/To target a piece of writing toward a specific demographic\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To send a written message or letter to a specific person or entity\./i)).toHaveAttribute(
      'title',
      'To send a written message or letter to a specific person or entity.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To target a piece of writing toward a specific demographic\./i)).toHaveAttribute(
      'title',
      'To target a piece of writing toward a specific demographic.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'writeTo_section_expanded', /To send a written message or letter to a specific person or entity\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'writeTo', /To send a written message or letter to a specific person or entity\./i, /I write to my grandmother at least once a month\./i, renderPage, getCard);
