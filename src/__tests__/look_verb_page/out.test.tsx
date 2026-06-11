import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "out" section definitions', () => {
  it('renders definition for being careful or warning of danger', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be careful or to warn someone of danger\./i)).toBeInTheDocument();
  });

  it('renders definition for taking care of someone', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To take care of someone and make sure they are treated well/i)).toBeInTheDocument();
  });

  it('renders definition for watching carefully to find something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To watch carefully in order to find something/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To be careful or to warn someone of danger\./i),
      screen.getByText(/To take care of someone and make sure they are treated well/i),
      screen.getByText(/To watch carefully in order to find something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be careful or to warn someone of danger\./i)).toHaveAttribute(
      'title',
      'To be careful or to warn someone of danger.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To take care of someone and make sure they are treated well/i)).toHaveAttribute(
      'title',
      'To take care of someone and make sure they are treated well (look out for).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To watch carefully in order to find something/i)).toHaveAttribute(
      'title',
      'To watch carefully in order to find something (look out for).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'lookOut_section_expanded', /To be careful or to warn someone of danger\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'lookOut', /To be careful or to warn someone of danger\./i, /Look out! That server rack is falling\./i, renderPage, getCard);
