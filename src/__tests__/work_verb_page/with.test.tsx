import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "with" section definitions', () => {
  it('renders definition for collaborating alongside someone', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To collaborate alongside someone\./i)).toBeInTheDocument();
  });

  it('renders definition for using something as a tool or material', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To use something as a tool, material, or basis for a project\./i)).toBeInTheDocument();
  });

  it('renders definition for accommodating or adapting to a constraint', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To accommodate or adapt to a situation or constraint\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('with');
    const defs = [
      screen.getByText(/To collaborate alongside someone\./i),
      screen.getByText(/To use something as a tool, material, or basis for a project\./i),
      screen.getByText(/To accommodate or adapt to a situation or constraint\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To collaborate alongside someone\./i)).toHaveAttribute(
      'title',
      'To collaborate alongside someone.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To use something as a tool, material, or basis for a project\./i)).toHaveAttribute(
      'title',
      'To use something as a tool, material, or basis for a project.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To accommodate or adapt to a situation or constraint\./i)).toHaveAttribute(
      'title',
      'To accommodate or adapt to a situation or constraint.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'workWith_section_expanded', /To collaborate alongside someone\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'workWith', /To collaborate alongside someone\./i, /I love working with my new team\./i, renderPage, getCard);
