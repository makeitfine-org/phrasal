import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BlowVerbPage — "through" section definitions', () => {
  it('renders definition for spending money quickly', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To spend money very quickly and irresponsibly\./i)).toBeInTheDocument();
  });

  it('renders definition for traveling quickly without stopping', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To travel through a place quickly without stopping\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To spend money very quickly and irresponsibly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To spend money very quickly and irresponsibly\./i)).toHaveAttribute(
      'title',
      'To spend money very quickly and irresponsibly.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'blowThrough_section_expanded', /To spend money very quickly and irresponsibly\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'blowThrough', /To spend money very quickly and irresponsibly\./i, /blew through its entire budget/i, renderPage, getCard);
