import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "down" section definitions', () => {
  it('renders definition for decreasing volume or power', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To decrease the volume, heat, or power of a device\./i)).toBeInTheDocument();
  });

  it('renders definition for rejecting an offer', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reject or refuse an offer, request, or person\./i)).toBeInTheDocument();
  });

  it('renders definition for folding down bed covers', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fold down the covers of a bed in preparation for sleep\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To decrease the volume, heat, or power of a device\./i),
      screen.getByText(/To reject or refuse an offer, request, or person\./i),
      screen.getByText(/To fold down the covers of a bed in preparation for sleep\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To decrease the volume, heat, or power of a device\./i)).toHaveAttribute(
      'title',
      'To decrease the volume, heat, or power of a device.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reject or refuse an offer, request, or person\./i)).toHaveAttribute(
      'title',
      'To reject or refuse an offer, request, or person.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fold down the covers of a bed in preparation for sleep\./i)).toHaveAttribute(
      'title',
      'To fold down the covers of a bed in preparation for sleep.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'turnDown_section_expanded', /To decrease the volume, heat, or power of a device\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'turnDown', /To decrease the volume, heat, or power of a device\./i, /Please turn down the music/i, renderPage, getCard);
