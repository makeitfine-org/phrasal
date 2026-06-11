import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "on" section definitions', () => {
  it('renders definition for insisting on strict rules or formalities', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To insist on strict rules or formalities\./i)).toBeInTheDocument();
  });

  it('renders definition for relying on or being based on', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To rely on or be based on\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To insist on strict rules or formalities\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To rely on or be based on\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To insist on strict rules or formalities\./i)).toHaveAttribute(
      'title',
      'To insist on strict rules or formalities.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'standOn_section_expanded', /To insist on strict rules or formalities\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'standOn', /To insist on strict rules or formalities\./i, /We don't need to stand on ceremony; just call me by my first name\./i, renderPage, getCard);
