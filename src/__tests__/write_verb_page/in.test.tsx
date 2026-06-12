import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "in" section definitions', () => {
  it('renders definition for sending a letter to express an opinion', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To send a letter or email to an organization or television station to express an opinion\./i)).toBeInTheDocument();
  });

  it('renders definition for casting a write-in vote', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To cast a vote for a candidate whose name is not on the official ballot by writing their name\./i)).toBeInTheDocument();
  });

  it('renders definition for inserting text into a document', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To insert text into a document or form\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    const defs = [
      screen.getByText(/To send a letter or email to an organization or television station to express an opinion\./i),
      screen.getByText(/To cast a vote for a candidate whose name is not on the official ballot by writing their name\./i),
      screen.getByText(/To insert text into a document or form\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To send a letter or email to an organization or television station to express an opinion\./i)).toHaveAttribute(
      'title',
      'To send a letter or email to an organization or television station to express an opinion.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To cast a vote for a candidate whose name is not on the official ballot by writing their name\./i)).toHaveAttribute(
      'title',
      'To cast a vote for a candidate whose name is not on the official ballot by writing their name.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To insert text into a document or form\./i)).toHaveAttribute(
      'title',
      'To insert text into a document or form.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'writeIn_section_expanded', /To send a letter or email to an organization or television station to express an opinion\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'writeIn', /To send a letter or email to an organization or television station to express an opinion\./i, /Hundreds of viewers wrote in to complain about the controversial episode\./i, renderPage, getCard);
