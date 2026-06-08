import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ActVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ActVerbPage — "up" section definitions', () => {
  it('renders definition for misbehaving', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To misbehave or cause trouble/i)).toBeInTheDocument();
  });

  it('renders definition for malfunctioning', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To malfunction, stop working properly/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To misbehave or cause trouble/i)).toHaveClass('truncate');
    expect(screen.getByText(/To malfunction, stop working properly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To misbehave or cause trouble/i)).toHaveAttribute(
      'title',
      'To misbehave or cause trouble (usually referring to children).'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'actUp_section_expanded', /To misbehave or cause trouble/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'actUp', /To misbehave or cause trouble/i, /The children were bored/i, renderPage, getCard);
