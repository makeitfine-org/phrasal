import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "into" section definitions', () => {
  it('renders definition for fitting someone into a busy schedule', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To successfully fit someone or something into a busy schedule\./i)).toBeInTheDocument();
  });

  it('renders definition for blending or pushing material into another', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To blend or push one material into another\./i)).toBeInTheDocument();
  });

  it('renders definition for gradually reaching an emotional state', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To gradually reach a certain emotional state, usually negative\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    const defs = [
      screen.getByText(/To successfully fit someone or something into a busy schedule\./i),
      screen.getByText(/To blend or push one material into another\./i),
      screen.getByText(/To gradually reach a certain emotional state, usually negative\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To successfully fit someone or something into a busy schedule\./i)).toHaveAttribute(
      'title',
      'To successfully fit someone or something into a busy schedule.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To blend or push one material into another\./i)).toHaveAttribute(
      'title',
      'To blend or push one material into another.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To gradually reach a certain emotional state, usually negative\./i)).toHaveAttribute(
      'title',
      'To gradually reach a certain emotional state, usually negative.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'workInto_section_expanded', /To successfully fit someone or something into a busy schedule\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'workInto', /To successfully fit someone or something into a busy schedule\./i, /The dentist was able to work me into her schedule\./i, renderPage, getCard);
