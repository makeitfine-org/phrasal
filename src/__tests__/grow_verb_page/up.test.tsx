import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GrowVerbPage — "up" section definitions', () => {
  it('renders definition for changing from child to adult', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To change from being a child to being an adult\./i)).toBeInTheDocument();
  });

  it('renders definition for behaving in a mature adult way', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To behave in a mature, adult way/i)).toBeInTheDocument();
  });

  it('renders definition for slowly developing or establishing itself', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To slowly develop, arise, or establish itself/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To change from being a child to being an adult\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To change from being a child to being an adult\./i)).toHaveAttribute(
      'title',
      'To change from being a child to being an adult.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'growUp_section_expanded', /To change from being a child to being an adult\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'growUp', /To change from being a child to being an adult\./i, /He grew up in Poland and later moved abroad to study software engineering\./i, renderPage, getCard);
