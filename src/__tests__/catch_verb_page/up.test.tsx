import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CatchVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CatchVerbPage — "up" section definitions', () => {
  it('renders definition for reaching the same level', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To reach the same level, standard, or position as someone or something else\./i)).toBeInTheDocument();
  });

  it('renders definition for doing delayed work', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To do work or tasks that you did not have time to do earlier/i)).toBeInTheDocument();
  });

  it('renders definition for talking to find out latest news', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To talk to someone to find out the latest news about their life or work\./i)).toBeInTheDocument();
  });

  it('renders definition for involving someone in a situation', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To involve someone in a situation, often against their will/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To reach the same level, standard, or position as someone or something else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To reach the same level, standard, or position as someone or something else\./i)).toHaveAttribute(
      'title',
      'To reach the same level, standard, or position as someone or something else.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'catchUp_section_expanded', /To reach the same level, standard, or position as someone or something else\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'catchUp', /To reach the same level, standard, or position as someone or something else\./i, /Our software is lacking some features/i, renderPage, getCard);
