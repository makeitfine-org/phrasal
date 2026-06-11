import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "up" section definitions', () => {
  it('renders definition for starting a new business or organization', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start a new business or organization\./i)).toBeInTheDocument();
  });

  it('renders definition for arranging or planning a meeting or event', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To arrange or plan a meeting or event\./i)).toBeInTheDocument();
  });

  it('renders definition for preparing equipment or software', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To prepare equipment or software so it is ready to use\./i)).toBeInTheDocument();
  });

  it('renders definition for tricking someone to look guilty', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To trick someone in order to make them look guilty of a crime or mistake\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start a new business or organization\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start a new business or organization\./i)).toHaveAttribute(
      'title',
      'To start a new business or organization.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'setUp_section_expanded', /To start a new business or organization\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'setUp', /To start a new business or organization\./i, /They set up a successful software company five years ago\./i, renderPage, getCard);
