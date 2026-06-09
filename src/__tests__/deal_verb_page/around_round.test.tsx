import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DealVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DealVerbPage — "around / round" section definitions', () => {
  it('renders definition for giving a share to everyone present', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To give a share of something to everyone present in a circle or group\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To give a share of something to everyone present in a circle or group\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To give a share of something to everyone present in a circle or group\./i)).toHaveAttribute(
      'title',
      'To give a share of something to everyone present in a circle or group.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'dealAround_section_expanded', /To give a share of something to everyone present in a circle or group\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'dealAround', /To give a share of something to everyone present in a circle or group\./i, /Please deal the documents around so everyone has a copy/i, renderPage, getCard);
