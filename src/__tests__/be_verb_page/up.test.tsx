import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "up" section definitions', () => {
  it('renders definition for being awake', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be awake and out of bed\./i)).toBeInTheDocument();
  });

  it('renders definition for increasing', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To increase\./i)).toBeInTheDocument();
  });

  it('renders definition for being next in turn', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be next in turn\./i)).toBeInTheDocument();
  });

  it('renders definition for expiring', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To expire \(for time\)\./i)).toBeInTheDocument();
  });

  it('renders definition for something happening informally', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To happen \(informal\)\./i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be awake and out of bed\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To increase\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be next in turn\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To expire \(for time\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To happen \(informal\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be awake and out of bed\./i)).toHaveAttribute('title', 'To be awake and out of bed.');
  });
});

describeSectionToggle(LABEL, 'up', 'beUp_section_expanded', /To be awake and out of bed\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'beUp', /To be awake and out of bed\./i, /I was up all night fixing the Java code/i, renderPage, getCard);
