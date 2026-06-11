import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThrowVerbPage — "up" section definitions', () => {
  it('renders definition for vomiting', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To vomit\./i)).toBeInTheDocument();
  });

  it('renders definition for producing or revealing something', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To produce, reveal, or bring to light/i)).toBeInTheDocument();
  });

  it('renders definition for building something hastily', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To build or construct something hastily\./i)).toBeInTheDocument();
  });

  it('renders definition for quitting or abandoning suddenly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To quit or abandon/i)).toBeInTheDocument();
  });

  it('renders definition for causing something to rise into the air', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To cause something/i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To vomit\./i),
      screen.getByText(/To produce, reveal, or bring to light/i),
      screen.getByText(/To build or construct something hastily\./i),
      screen.getByText(/To quit or abandon/i),
      screen.getByText(/To cause something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To vomit\./i)).toHaveAttribute(
      'title',
      'To vomit.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To produce, reveal, or bring to light/i)).toHaveAttribute(
      'title',
      'To produce, reveal, or bring to light (ideas, problems, results).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To build or construct something hastily\./i)).toHaveAttribute(
      'title',
      'To build or construct something hastily.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To quit or abandon/i)).toHaveAttribute(
      'title',
      'To quit or abandon (a job or position) suddenly.'
    );
  });

  it('fifth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To cause something/i)).toHaveAttribute(
      'title',
      'To cause something (like dust or water) to rise into the air.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'throwUp_section_expanded', /To vomit\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'throwUp', /To vomit\./i, /The turbulent flight made him throw up\./i, renderPage, getCard);
