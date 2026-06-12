import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "up" section definitions', () => {
  it('renders definition for gradually building something like an appetite', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually develop or build something, often a feeling like an appetite, courage, or sweat\./i)).toBeInTheDocument();
  });

  it('renders definition for making someone feel upset or anxious', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make oneself or someone else feel upset, excited, or anxious/i)).toBeInTheDocument();
  });

  it('renders definition for gradually progressing to something more demanding', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually progress to something more advanced or demanding\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To gradually develop or build something, often a feeling like an appetite, courage, or sweat\./i),
      screen.getByText(/To make oneself or someone else feel upset, excited, or anxious/i),
      screen.getByText(/To gradually progress to something more advanced or demanding\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually develop or build something, often a feeling like an appetite, courage, or sweat\./i)).toHaveAttribute(
      'title',
      'To gradually develop or build something, often a feeling like an appetite, courage, or sweat.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make oneself or someone else feel upset, excited, or anxious/i)).toHaveAttribute(
      'title',
      'To make oneself or someone else feel upset, excited, or anxious (often used in the passive: worked up).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually progress to something more advanced or demanding\./i)).toHaveAttribute(
      'title',
      'To gradually progress to something more advanced or demanding.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'workUp_section_expanded', /To gradually develop or build something, often a feeling like an appetite, courage, or sweat\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'workUp', /To gradually develop or build something, often a feeling like an appetite, courage, or sweat\./i, /We went for a long hike and worked up a huge appetite\./i, renderPage, getCard);
