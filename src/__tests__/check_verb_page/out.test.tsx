import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "out" section definitions', () => {
  it('renders definition for paying bill and leaving a hotel', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To pay your bill and leave a hotel\./i)).toBeInTheDocument();
  });

  it('renders definition for examining something interesting', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To examine, investigate, or look at something interesting\./i)).toBeInTheDocument();
  });

  it('renders definition for proving to be true', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To prove to be true or correct after investigation\./i)).toBeInTheDocument();
  });

  it('renders definition for paying for goods', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To pay for goods at a store or online\./i)).toBeInTheDocument();
  });

  it('renders definition for downloading a branch from a repository', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To download or switch to a specific version of code from a repository/i)).toBeInTheDocument();
  });

  it('renders definition for stopping paying attention', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop paying attention or disconnect mentally because you are tired or bored\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To pay your bill and leave a hotel\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To pay your bill and leave a hotel\./i)).toHaveAttribute(
      'title',
      'To pay your bill and leave a hotel.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'checkOut_section_expanded', /To pay your bill and leave a hotel\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'checkOut', /To pay your bill and leave a hotel\./i, /We have to check out of our rooms by 11:00 AM\./i, renderPage, getCard);
