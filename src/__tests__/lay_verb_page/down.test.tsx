import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LayVerbPage — "down" section definitions', () => {
  it('renders definition for establishing a rule or policy', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To officially establish a rule, policy, or principle\./i)).toBeInTheDocument();
  });

  it('renders definition for surrendering weapons', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To surrender weapons; to stop fighting\./i)).toBeInTheDocument();
  });

  it('renders definition for recording music', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To record music or audio\./i)).toBeInTheDocument();
  });

  it('renders definition for storing wine for aging', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To store wine in a cellar for aging\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To officially establish a rule, policy, or principle\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To officially establish a rule, policy, or principle\./i)).toHaveAttribute(
      'title',
      'To officially establish a rule, policy, or principle.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'layDown_section_expanded', /To officially establish a rule, policy, or principle\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'layDown', /To officially establish a rule, policy, or principle\./i, /The management team laid down clear guidelines for remote work\./i, renderPage, getCard);
