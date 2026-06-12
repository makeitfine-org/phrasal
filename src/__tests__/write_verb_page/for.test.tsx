import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "for" section definitions', () => {
  it('renders definition for being employed by a publication', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be employed by or submit writing to a specific publication\./i)).toBeInTheDocument();
  });

  it('renders definition for requesting something by mail', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To request something by mail\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    const defs = [
      screen.getByText(/To be employed by or submit writing to a specific publication\./i),
      screen.getByText(/To request something by mail\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be employed by or submit writing to a specific publication\./i)).toHaveAttribute(
      'title',
      'To be employed by or submit writing to a specific publication.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To request something by mail\./i)).toHaveAttribute(
      'title',
      'To request something by mail.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'writeFor_section_expanded', /To be employed by or submit writing to a specific publication\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'writeFor', /To be employed by or submit writing to a specific publication\./i, /She writes for several major technology magazines\./i, renderPage, getCard);
