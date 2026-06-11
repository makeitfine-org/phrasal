import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShowVerbPage — "off" section definitions', () => {
  it('renders definition for behaving to attract attention or admiration', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To behave in a way that is intended to attract attention or admiration/i)).toBeInTheDocument();
  });

  it('renders definition for proudly displaying something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To proudly display something you have or have achieved\./i)).toBeInTheDocument();
  });

  it('renders definition for making something look its best', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To make something look its best or highlight its good qualities\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To behave in a way that is intended to attract attention or admiration/i)).toHaveClass('truncate');
    expect(screen.getByText(/To proudly display something you have or have achieved\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To make something look its best or highlight its good qualities\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To behave in a way that is intended to attract attention or admiration/i)).toHaveAttribute(
      'title',
      'To behave in a way that is intended to attract attention or admiration (often seen as negative or boastful).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'showOff_section_expanded', /To behave in a way that is intended to attract attention or admiration/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'showOff', /To behave in a way that is intended to attract attention or admiration/i, /He only bought that expensive sports car to show off\./i, renderPage, getCard);
