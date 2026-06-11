import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShutVerbPage — "up" section definitions', () => {
  it('renders definition for stopping talking or making noise', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop talking or making a noise \(informal, considered rude\)\./i)).toBeInTheDocument();
  });

  it('renders definition for closing and locking a building', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To close and lock a building completely/i)).toBeInTheDocument();
  });

  it('renders definition for keeping someone securely in a place', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To keep someone or an animal securely in a room or place\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop talking or making a noise \(informal, considered rude\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To close and lock a building completely/i)).toHaveClass('truncate');
    expect(screen.getByText(/To keep someone or an animal securely in a room or place\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop talking or making a noise \(informal, considered rude\)\./i)).toHaveAttribute(
      'title',
      'To stop talking or making a noise (informal, considered rude).'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'shutUp_section_expanded', /To stop talking or making a noise \(informal, considered rude\)\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'shutUp', /To stop talking or making a noise \(informal, considered rude\)\./i, /I wish the dog next door would shut up; I'm trying to sleep\./i, renderPage, getCard);
