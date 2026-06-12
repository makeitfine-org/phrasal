import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "out" section definitions', () => {
  it('renders definition for going out for a quick errand', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To go outside or leave a place for a very brief, quick errand\./i)).toBeInTheDocument();
  });

  it('renders definition for removing an inner lining', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove an inner lining from a garment by unzipping it\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To go outside or leave a place for a very brief, quick errand\./i),
      screen.getByText(/To remove an inner lining from a garment by unzipping it\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To go outside or leave a place for a very brief, quick errand\./i)).toHaveAttribute(
      'title',
      'To go outside or leave a place for a very brief, quick errand.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove an inner lining from a garment by unzipping it\./i)).toHaveAttribute(
      'title',
      'To remove an inner lining from a garment by unzipping it.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'zipOut_section_expanded', /To go outside or leave a place for a very brief, quick errand\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'zipOut', /To go outside or leave a place for a very brief, quick errand\./i, /I'm going to zip out to the grocery store for some milk; I'll be back in ten minutes\./i, renderPage, getCard);
