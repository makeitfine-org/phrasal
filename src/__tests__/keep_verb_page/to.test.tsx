import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "to" section definitions', () => {
  it('renders definition for following a plan or agreement', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To follow a plan, rule, or agreement\./i)).toBeInTheDocument();
  });

  it('renders definition for limiting something to a certain amount', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To limit something to a certain amount\./i)).toBeInTheDocument();
  });

  it('renders definition for staying on a path', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To stay on a particular path or road\./i)).toBeInTheDocument();
  });

  it('renders definition for avoiding talking to other people', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To avoid talking to other people; to stay private\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To follow a plan, rule, or agreement\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To follow a plan, rule, or agreement\./i)).toHaveAttribute(
      'title',
      'To follow a plan, rule, or agreement.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'keepTo_section_expanded', /To follow a plan, rule, or agreement\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'keepTo', /To follow a plan, rule, or agreement\./i, /We have a tight deadline, so let's keep to the schedule\./i, renderPage, getCard);
