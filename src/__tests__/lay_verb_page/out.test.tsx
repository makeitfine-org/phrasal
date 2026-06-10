import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LayVerbPage — "out" section definitions', () => {
  it('renders definition for explaining a plan clearly', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To explain a plan or idea clearly and in detail\./i)).toBeInTheDocument();
  });

  it('renders definition for arranging things visibly', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To arrange things so they can be easily seen or used\./i)).toBeInTheDocument();
  });

  it('renders definition for spending a large amount of money', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To spend a large amount of money\./i)).toBeInTheDocument();
  });

  it('renders definition for knocking someone unconscious', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To knock someone unconscious\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To explain a plan or idea clearly and in detail\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To explain a plan or idea clearly and in detail\./i)).toHaveAttribute(
      'title',
      'To explain a plan or idea clearly and in detail.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'layOut_section_expanded', /To explain a plan or idea clearly and in detail\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'layOut', /To explain a plan or idea clearly and in detail\./i, /The CEO laid out the new business strategy during the meeting\./i, renderPage, getCard);
