import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "off" section definitions', () => {
  it('renders definition for finishing workday', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To finish your workday\./i)).toBeInTheDocument();
  });

  it('renders definition for removing an amount from a total', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove an amount from a total\./i)).toBeInTheDocument();
  });

  it('renders definition for producing work quickly', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To produce a piece of work very quickly\./i)).toBeInTheDocument();
  });

  it('renders definition for making a cheap imitation', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To make a cheap imitation of a product illegally\./i)).toBeInTheDocument();
  });

  it('renders definition for robbing a place', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To rob a place \(informal\)\./i)).toBeInTheDocument();
  });

  it('renders definition for killing someone', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To kill someone \(informal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To finish your workday\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To finish your workday\./i)).toHaveAttribute(
      'title',
      'To finish your workday.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'knockOff_section_expanded', /To finish your workday\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'knockOff', /To finish your workday\./i, /Let's knock off early today and go home\./i, renderPage, getCard);
