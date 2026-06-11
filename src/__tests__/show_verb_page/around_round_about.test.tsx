import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShowVerbPage — "around / round / about" section definitions', () => {
  it('renders definition for acting as a guide and giving a tour', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To act as a guide and give someone a tour of a new place\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To act as a guide and give someone a tour of a new place\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To act as a guide and give someone a tour of a new place\./i)).toHaveAttribute(
      'title',
      'To act as a guide and give someone a tour of a new place.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round / about', 'showAround_section_expanded', /To act as a guide and give someone a tour of a new place\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round / about', renderPage);

describeDefaultImageCards(LABEL, 'around / round / about', 'showAround', /To act as a guide and give someone a tour of a new place\./i, /Welcome to the new headquarters! Let me show you around the office\./i, renderPage, getCard);
