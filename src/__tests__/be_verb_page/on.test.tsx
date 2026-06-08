import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "on" section definitions', () => {
  it('renders definition for happening as planned', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To happen as planned\./i)).toBeInTheDocument();
  });

  it('renders definition for functioning', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To function or operate \(for machines or devices\)\./i)).toBeInTheDocument();
  });

  it('renders definition for taking medication', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To take medication\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To happen as planned\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To function or operate \(for machines or devices\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To take medication\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To happen as planned\./i)).toHaveAttribute('title', 'To happen as planned.');
  });
});

describeSectionToggle(LABEL, 'on', 'beOn_section_expanded', /To happen as planned\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'beOn', /To happen as planned\./i, /Is the team meeting still on for tomorrow/i, renderPage, getCard);
