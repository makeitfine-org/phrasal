import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StickVerbPage — "up" section definitions', () => {
  it('renders definition for pointing upwards or standing above a surface', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To point upwards or stand above a surface\./i)).toBeInTheDocument();
  });

  it('renders definition for defending or supporting someone or an idea', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To defend or support someone or an idea/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To point upwards or stand above a surface\./i),
      screen.getByText(/To defend or support someone or an idea/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To point upwards or stand above a surface\./i)).toHaveAttribute(
      'title',
      'To point upwards or stand above a surface.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To defend or support someone or an idea/i)).toHaveAttribute(
      'title',
      'To defend or support someone or an idea (used as "stick up for").'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'stickUp_section_expanded', /To point upwards or stand above a surface\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'stickUp', /To point upwards or stand above a surface\./i, /The cooling fan on the new server model sticks up higher than the old one\./i, renderPage, getCard);
