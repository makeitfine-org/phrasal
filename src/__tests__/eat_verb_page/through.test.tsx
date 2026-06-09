import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'EatVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('EatVerbPage — "through" section definitions', () => {
  it('renders definition for making a physical hole by eating or corroding', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To make a physical hole in something by biting, chewing, or corroding\./i)).toBeInTheDocument();
  });

  it('renders definition for exhausting a supply of money rapidly', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To exhaust or consume a massive supply of money or resources very rapidly\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To make a physical hole in something by biting, chewing, or corroding\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To make a physical hole in something by biting, chewing, or corroding\./i)).toHaveAttribute(
      'title',
      'To make a physical hole in something by biting, chewing, or corroding.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'eatThrough_section_expanded', /To make a physical hole in something by biting, chewing, or corroding\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'eatThrough', /To make a physical hole in something by biting, chewing, or corroding\./i, /During the winter, mice managed to eat through the drywall in the garage\./i, renderPage, getCard);
