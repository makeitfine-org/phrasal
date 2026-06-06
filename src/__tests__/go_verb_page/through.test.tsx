import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "through" section definitions', () => {
  it('renders definition for experiencing a difficult situation', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To experience a difficult situation/i)).toBeInTheDocument();
  });

  it('renders definition for searching or examining carefully', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To search or examine something carefully/i)).toBeInTheDocument();
  });

  it('renders definition for being officially approved or completed', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be officially approved or completed/i)).toBeInTheDocument();
  });

  it('renders definition for using up a supply', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To use up a supply of something/i)).toBeInTheDocument();
  });

  it('renders definition for practising or rehearsing', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To practise or rehearse something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'through', 'goThrough_section_expanded', /To experience a difficult situation/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'goThrough', /To experience a difficult situation/i, /"The company went through a tough financial period/i, renderPage, getCard);
