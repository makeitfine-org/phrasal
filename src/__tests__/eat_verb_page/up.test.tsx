import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'EatVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('EatVerbPage — "up" section definitions', () => {
  it('renders definition for consuming food completely', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To consume a meal or food completely\./i)).toBeInTheDocument();
  });

  it('renders definition for consuming time money or resources', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To consume a large amount of time, money, or resources\./i)).toBeInTheDocument();
  });

  it('renders definition for enjoying something greatly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To enjoy something greatly, or to eagerly believe something without questioning it\./i)).toBeInTheDocument();
  });

  it('renders definition for consuming someone emotionally', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To consume someone emotionally with negative feelings like guilt or jealousy\./i)).toBeInTheDocument();
  });

  it('renders definition for absorbing or defeating a competitor', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To completely absorb, destroy, or defeat a competitor\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To consume a meal or food completely\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To consume a meal or food completely\./i)).toHaveAttribute(
      'title',
      'To consume a meal or food completely.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'eatUp_section_expanded', /To consume a meal or food completely\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'eatUp', /To consume a meal or food completely\./i, /You need to eat up your vegetables before you can have dessert\./i, renderPage, getCard);
