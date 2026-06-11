import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "up" section definitions', () => {
  it('renders definition for increasing volume or power', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To increase the volume, heat, or power of a device\./i)).toBeInTheDocument();
  });

  it('renders definition for appearing unexpectedly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To appear unexpectedly or arrive, sometimes late\./i)).toBeInTheDocument();
  });

  it('renders definition for being found after being lost', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be found, usually by accident, after being lost\./i)).toBeInTheDocument();
  });

  it('renders definition for shortening a garment', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To shorten a garment by folding the hem upward\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To increase the volume, heat, or power of a device\./i),
      screen.getByText(/To appear unexpectedly or arrive, sometimes late\./i),
      screen.getByText(/To be found, usually by accident, after being lost\./i),
      screen.getByText(/To shorten a garment by folding the hem upward\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To increase the volume, heat, or power of a device\./i)).toHaveAttribute(
      'title',
      'To increase the volume, heat, or power of a device.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To appear unexpectedly or arrive, sometimes late\./i)).toHaveAttribute(
      'title',
      'To appear unexpectedly or arrive, sometimes late.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be found, usually by accident, after being lost\./i)).toHaveAttribute(
      'title',
      'To be found, usually by accident, after being lost.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To shorten a garment by folding the hem upward\./i)).toHaveAttribute(
      'title',
      'To shorten a garment by folding the hem upward.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'turnUp_section_expanded', /To increase the volume, heat, or power of a device\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'turnUp', /To increase the volume, heat, or power of a device\./i, /Can you turn up the radio\?/i, renderPage, getCard);
