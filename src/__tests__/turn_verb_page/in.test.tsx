import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "in" section definitions', () => {
  it('renders definition for submitting a document', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To submit an assignment, report, or document\./i)).toBeInTheDocument();
  });

  it('renders definition for going to bed', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To go to bed \(informal\)\./i)).toBeInTheDocument();
  });

  it('renders definition for surrendering to authorities', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To surrender to the authorities or police\./i)).toBeInTheDocument();
  });

  it('renders definition for producing a performance', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To produce a particular amount or degree of something/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    const defs = [
      screen.getByText(/To submit an assignment, report, or document\./i),
      screen.getByText(/To go to bed \(informal\)\./i),
      screen.getByText(/To surrender to the authorities or police\./i),
      screen.getByText(/To produce a particular amount or degree of something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To submit an assignment, report, or document\./i)).toHaveAttribute(
      'title',
      'To submit an assignment, report, or document.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To go to bed \(informal\)\./i)).toHaveAttribute(
      'title',
      'To go to bed (informal).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To surrender to the authorities or police\./i)).toHaveAttribute(
      'title',
      'To surrender to the authorities or police.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To produce a particular amount or degree of something/i)).toHaveAttribute(
      'title',
      'To produce a particular amount or degree of something (like a performance).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'turnIn_section_expanded', /To submit an assignment, report, or document\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'turnIn', /To submit an assignment, report, or document\./i, /Don't forget to turn in your paperwork/i, renderPage, getCard);
