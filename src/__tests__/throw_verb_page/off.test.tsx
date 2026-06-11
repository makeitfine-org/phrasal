import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThrowVerbPage — "off" section definitions', () => {
  it('renders definition for removing clothing quickly', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove quickly or carelessly/i)).toBeInTheDocument();
  });

  it('renders definition for freeing oneself from something negative', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To free oneself from something negative/i)).toBeInTheDocument();
  });

  it('renders definition for confusing or misleading someone', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To confuse, distract, or mislead someone\./i)).toBeInTheDocument();
  });

  it('renders definition for emitting or radiating', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To emit or radiate/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    const defs = [
      screen.getByText(/To remove quickly or carelessly/i),
      screen.getByText(/To free oneself from something negative/i),
      screen.getByText(/To confuse, distract, or mislead someone\./i),
      screen.getByText(/To emit or radiate/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove quickly or carelessly/i)).toHaveAttribute(
      'title',
      'To remove quickly or carelessly (clothing).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To free oneself from something negative/i)).toHaveAttribute(
      'title',
      'To free oneself from something negative (illness, trouble, restraint).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To confuse, distract, or mislead someone\./i)).toHaveAttribute(
      'title',
      'To confuse, distract, or mislead someone.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To emit or radiate/i)).toHaveAttribute(
      'title',
      'To emit or radiate (heat, light, smell).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'throwOff_section_expanded', /To remove quickly or carelessly/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'throwOff', /To remove quickly or carelessly/i, /She threw off her heavy winter coat as soon as she entered the house\./i, renderPage, getCard);
