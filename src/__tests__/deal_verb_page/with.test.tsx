import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DealVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DealVerbPage — "with" section definitions', () => {
  it('renders definition for taking action to solve a problem', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To take action to solve a problem or complete a task\./i)).toBeInTheDocument();
  });

  it('renders definition for doing business with someone', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To do business with someone or an organization\./i)).toBeInTheDocument();
  });

  it('renders definition for being about a specific subject', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To be about a specific subject\./i)).toBeInTheDocument();
  });

  it('renders definition for managing difficult emotions', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To manage or handle difficult emotions or situations\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To take action to solve a problem or complete a task\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To take action to solve a problem or complete a task\./i)).toHaveAttribute(
      'title',
      'To take action to solve a problem or complete a task.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'dealWith_section_expanded', /To take action to solve a problem or complete a task\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'dealWith', /To take action to solve a problem or complete a task\./i, /I have a lot of emails to deal with this morning/i, renderPage, getCard);
