import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThrowVerbPage — "together" section definitions', () => {
  it('renders definition for assembling something quickly', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To make, prepare, or assemble something quickly or hastily\./i)).toBeInTheDocument();
  });

  it('renders definition for forcing people to associate due to circumstances', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To force people to associate with each other due to circumstances\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('together');
    const defs = [
      screen.getByText(/To make, prepare, or assemble something quickly or hastily\./i),
      screen.getByText(/To force people to associate with each other due to circumstances\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To make, prepare, or assemble something quickly or hastily\./i)).toHaveAttribute(
      'title',
      'To make, prepare, or assemble something quickly or hastily.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To force people to associate with each other due to circumstances\./i)).toHaveAttribute(
      'title',
      'To force people to associate with each other due to circumstances.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'throwTogether_section_expanded', /To make, prepare, or assemble something quickly or hastily\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'throwTogether', /To make, prepare, or assemble something quickly or hastily\./i, /I didn't have much time, so I just threw together a quick salad\./i, renderPage, getCard);
